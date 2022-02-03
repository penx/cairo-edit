import { useState, useMemo } from 'react';
import {
  darkTheme,
  Box,
  Section,
  Flex,
  Paragraph,
  Link,
  ControlGroup,
  Button,
  Heading
} from '@modulz/design-system';
import { TwitterPicker } from 'react-color';

import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import clarus from './icons/clarus.json';

const DEFAULT_COLOR_TOP = '#FCB900';
const DEFAULT_COLOR_BOTTOM = '#EB144C';

const save = (data: {
  bitmap: (0 | 1 | 2)[][];
  colorTop?: string;
  colorBottom?: string;
}) => {
  localStorage.setItem('moof', JSON.stringify(data));
};

const load = () => {
  try {
    const initialLoad = localStorage.getItem('moof');
    return initialLoad ? JSON.parse(initialLoad) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

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
              const el = document.getElementById('canvas');
              el?.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
              const svg = el?.outerHTML || '';

              const blob = new Blob(
                ['<?xml version="1.0" standalone="no"?>\r\n', svg],
                { type: 'image/svg+xml;charset=utf-8' }
              );
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'moof.svg';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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
              <Box
                css={{
                  mr: '$1',
                  backgroundColor: colorTop,
                  width: '$2',
                  height: '$2'
                }}
              />
              Top
            </Button>
            <Button
              onClick={() =>
                setColorPickerVisible(
                  colorPickerVisible === 'bottom' ? false : 'bottom'
                )
              }
            >
              <Box
                css={{
                  mr: '$1',
                  backgroundColor: colorBottom,
                  width: '$2',
                  height: '$2'
                }}
              />
              Bottom
            </Button>
          </ControlGroup>
          {colorPickerVisible === 'top' && (
            <TwitterPicker
              color={colorTop}
              triangle='hide'
              onChangeComplete={({ hex }: { hex: string }) => setColorTop(hex)}
            />
          )}
          {colorPickerVisible === 'bottom' && (
            <TwitterPicker
              color={colorBottom}
              triangle='hide'
              onChangeComplete={({ hex }: { hex: string }) =>
                setColorBottom(hex)
              }
            />
          )}
        </Flex>
      </Section>
      <Section>
        <Paragraph>
          Click image to toggle pixels between black, white and transparent.
        </Paragraph>
      </Section>
      <Section>
        <Paragraph>
          Copyright © 2022{' '}
          <Link href='https://twitter.com/penx'>Alasdair McLeay</Link>. Based on
          the work of{' '}
          <Link href='https://twitter.com/susankare'>Susan Kare</Link>.
        </Paragraph>
        <Paragraph>
          Order prints at{' '}
          <Link href='https://kareprints.com'>kareprints.com</Link>.
        </Paragraph>
        <Paragraph>
          Source code available at{' '}
          <Link href='https://github.com/penx/cairo-edit'>github.com/penx/cairo-edit</Link>.
        </Paragraph>
        
      </Section>
    </Box>
  );
}

export default App;
