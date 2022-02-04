import { useState, useMemo } from 'react';
import {
  darkTheme,
  Box,
  Section,
  Flex,
  ControlGroup,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  Dialog,
  DialogTrigger,
  DialogContent
} from '@modulz/design-system';

import {
  Pencil1Icon,
  TrashIcon,
  DotIcon,
  DotFilledIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
  DownloadIcon,
  Share2Icon,
  UploadIcon,
  FileIcon
} from '@radix-ui/react-icons';

import { ColorPicker } from './components/ColorPicker';
import { ColorBox } from './components/ColorBox';
import { Canvas } from './components/Canvas';
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

  return (
    <>
      <Box className={darkTheme.className}>
        <Section>
          <Flex
            direction='column'
            align='center'
            gap="6"
          >
            <Canvas
              bitmap={bitmap}
              onPixelClick={(rowClicked, columnClicked) => {
                setBitmap((b) =>
                  b.map((rowData, rowIndex) =>
                    rowData.map((columnData, columnIndex) =>
                      columnIndex === columnClicked && rowIndex === rowClicked
                        ? (((columnData + 1) % 3) as 0 | 1 | 2)
                        : columnData
                    )
                  )
                );
              }}
              colorTop={colorTop}
              colorBottom={colorBottom}
            />
            <Flex align='center' direction='column' gap="2">
              <ControlGroup>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <ColorBox color={colorTop} />
                      Top
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <ColorPicker color={colorTop} onChange={setColorTop} />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <ColorBox color={colorBottom} />
                      Bottom
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <ColorPicker
                      color={colorBottom}
                      onChange={setColorBottom}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Box css={{ mr: '$1' }}>
                        <Pencil1Icon />
                      </Box>
                      Toggle
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Toggle <Pencil1Icon />
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        White <DotFilledIcon />
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        Black <DotIcon />
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        Eraser <TrashIcon />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ControlGroup>

              <ControlGroup>
                {/* TODO: load/save should open dialogs or similar */}
                <Button
                  title="Save to your browser's local storage"
                  onClick={() => save({ bitmap, colorTop, colorBottom })}
                >
                  <Box css={{ mr: '$1' }}>
                    <DownloadIcon />
                  </Box>
                  Save
                </Button>
                <Button
                  title="Load from your browser's local storage"
                  onClick={() => {
                    const loadedData = load();
                    loadedData?.bitmap && setBitmap(loadedData.bitmap);
                    loadedData?.colorTop && setColorTop(loadedData.colorTop);
                    loadedData?.colorBottom &&
                      setColorBottom(loadedData.colorBottom);
                  }}
                >
                  <Box css={{ mr: '$1' }}>
                    <UploadIcon />
                  </Box>
                  Load
                </Button>
                <Button
                  title="Reset to defaults"
                  onClick={() => {
                    setBitmap(clarus as (0 | 1 | 2)[][]);
                    setColorTop(DEFAULT_COLOR_TOP);
                    setColorBottom(DEFAULT_COLOR_BOTTOM);
                  }}
                >
                  <Box css={{ mr: '$1' }}>
                    <ResetIcon />
                  </Box>
                  Reset
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Box css={{ mr: '$1' }}>
                        <FileIcon />
                      </Box>
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          exportElementToSvg(document.getElementById('canvas'));
                        }}
                      >
                        SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>JSON</DropdownMenuItem>
                      <DropdownMenuItem disabled>PNG</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ControlGroup>
              <ControlGroup>
                <Button disabled>
                  <Box css={{ mr: '$1' }}>
                    <Share2Icon />
                  </Box>
                  Share
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button title='About'>
                      <Box css={{ mr: '$1' }}>
                        <QuestionMarkCircledIcon />
                      </Box>
                      About
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Flex css={{ fd: 'column', gap: '$4' }}>
                      <Help />
                      <Footer />
                    </Flex>
                  </DialogContent>
                </Dialog>
              </ControlGroup>
            </Flex>
          </Flex>
        </Section>
      </Box>
    </>
  );
}

export default App;
