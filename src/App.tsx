import { useState, useMemo } from 'react';
import {
  darkTheme,
  Box,
  Section,
  Flex,
  ControlGroup,
  Button
} from '@modulz/design-system';

import { ColorPicker } from './components/ColorPicker';
import { ColorBox } from './components/ColorBox';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { Footer } from './components/Footer';
import { Help } from './components/Help';
import { exportElementToSvg } from './utils/svg';
import { load, save } from './utils/local-storage';

import clarus from './icons/clarus.json';

const DEFAULT_COLOR_TOP = '#FCB900';
const DEFAULT_COLOR_BOTTOM = '#EB144C';

function App() {
  const initialLoad = useMemo(() => load(), []);
  const [bitmap, setBitmap] = useState<(0 | 1 | 2)[][]>(
    initialLoad?.bitmap || clarus
  );
  const [colorTop, setColorTop] = useState<string>(
    initialLoad?.colorTop || DEFAULT_COLOR_TOP
  );
  const [colorBottom, setColorBottom] = useState<string>(
    initialLoad?.colorBottom || DEFAULT_COLOR_BOTTOM
  );
  const [colorPickerVisible, setColorPickerVisible] = useState<
    false | 'top' | 'bottom'
  >(false);
  
  return (
    <Box className={darkTheme.className}>
      <Section>
        <Flex
          direction='column'
          align='center'
          css={{
            rowGap: '$6'
          }}
        >
          <Canvas
            bitmap={bitmap}
            onPixelClick={(rowClicked, columnClicked) => {
              const newBitmap = bitmap.map((rowData, rowIndex) =>
                rowData.map((columnData, columnIndex) =>
                  columnIndex === columnClicked && rowIndex === rowClicked
                    ? (((columnData + 1) % 3) as 0 | 1 | 2)
                    : columnData
                )
              );
              setBitmap(newBitmap);
            }}
            colorTop={colorTop}
            colorBottom={colorBottom}
          />
          <Toolbar
            // TODO: load/save should open dialogs or similar
            onSaveClick={() => save({ bitmap, colorTop, colorBottom })}
            onLoadClick={() => {
              const loadedData = load();
              loadedData?.bitmap && setBitmap(loadedData.bitmap);
              loadedData?.colorTop && setColorTop(loadedData.colorTop);
              loadedData?.colorBottom && setColorBottom(loadedData.colorBottom);
            }}
            onResetClick={() => {
              setBitmap(clarus as (0 | 1 | 2)[][]);
              setColorTop(DEFAULT_COLOR_TOP);
              setColorBottom(DEFAULT_COLOR_BOTTOM);
            }}
            onExportClick={() => {
              exportElementToSvg(document.getElementById('canvas'));
            }}
          />
          <ControlGroup>
            <Button
              onClick={() =>
                setColorPickerVisible(
                  colorPickerVisible === 'top' ? false : 'top'
                )
              }
            >
              <ColorBox color={colorTop} />
              Top
            </Button>
            <Button
              onClick={() =>
                setColorPickerVisible(
                  colorPickerVisible === 'bottom' ? false : 'bottom'
                )
              }
            >
              <ColorBox color={colorBottom} />
              Bottom
            </Button>
          </ControlGroup>
          <>
            {colorPickerVisible === 'top' && (
              <ColorPicker color={colorTop} onChange={setColorTop} />
            )}
            {colorPickerVisible === 'bottom' && (
              <ColorPicker color={colorBottom} onChange={setColorBottom} />
            )}
          </>
        </Flex>
      </Section>
      <Help />
      <Footer />
    </Box>
  );
}

export default App;
