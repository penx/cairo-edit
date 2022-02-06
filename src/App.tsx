import { useState, useMemo, useCallback } from 'react';
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
  DialogContent,
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger
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
  FilePlusIcon,
  FileIcon
} from '@radix-ui/react-icons';

import { ColorPicker } from './components/ColorPicker';
import { ColorBox } from './components/ColorBox';
import { Canvas } from './components/Canvas';
import { Canvas3D } from './components/Canvas3D';
import { Footer } from './components/Footer';
import { Help } from './components/Help';
import {
  exportElementToSvg,
  exportDataToJson,
  exportElementToPng
} from './utils/export';
import { load, save } from './utils/local-storage';

import clarus from './presets/clarus.json';
import mac from './presets/mac.json';

const DEFAULT_COLOR_TOP = '#FCB900';
const DEFAULT_COLOR_BOTTOM = '#EB144C';

function App() {
  const initialLoad = useMemo(() => load(), []);
  const [bitmap, setBitmap] = useState<(0 | 1 | 2)[][]>(
    initialLoad?.bitmap || clarus.bitmap
  );
  const [colorTop, setColorTop] = useState<string>(
    initialLoad?.colorTop || DEFAULT_COLOR_TOP
  );
  const [colorBottom, setColorBottom] = useState<string>(
    initialLoad?.colorBottom || DEFAULT_COLOR_BOTTOM
  );
  const [writeValue, setWriteValue] = useState<0 | 1 | 2 | null>(null);

  const handleMouseDown = useCallback((rowClicked, columnClicked) => {
    setBitmap((b) => {
      const currentValue = b[rowClicked][columnClicked];
      const newWriteValue = ((currentValue + 1) % 3) as 0 | 1 | 2;
      setWriteValue(newWriteValue);
      return b.map((rowData, rowIndex) =>
        rowClicked !== rowIndex
          ? rowData
          : rowData.map((columnData, columnIndex) =>
              columnIndex === columnClicked ? newWriteValue : columnData
            )
      );
    });
  }, []);

  const handleMouseOver = useCallback(
    (rowClicked, columnClicked) => {
      if (writeValue != null) {
        setBitmap((b) =>
          b.map((rowData, rowIndex) =>
            rowClicked !== rowIndex
              ? rowData
              : rowData.map((columnData, columnIndex) =>
                  columnIndex === columnClicked ? writeValue : columnData
                )
          )
        );
      }
    },
    [writeValue]
  );

  const clearWriteValue = useCallback(() => {
    setWriteValue(null);
  }, []);

  return (
    <>
      <Box className={darkTheme.className}>
        <Section>
          <Flex direction='column' align='center' gap='6'>
            <Tabs defaultValue='2D' >
              <TabsList>
                <TabsTrigger value='2D'>2D</TabsTrigger>
                <TabsTrigger value='3D'>3D</TabsTrigger>
              </TabsList>
              <TabsContent value='2D'>
                <Canvas
                  bitmap={bitmap}
                  onPixelMouseDown={handleMouseDown}
                  onPixelMouseOver={
                    writeValue != null ? handleMouseOver : undefined
                  }
                  onMouseUp={clearWriteValue}
                  onMouseLeave={clearWriteValue}
                  colorTop={colorTop}
                  colorBottom={colorBottom}
                />
              </TabsContent>
              <TabsContent value='3D'>
                <Canvas3D
                  bitmap={bitmap}
                  colorTop={colorTop}
                  colorBottom={colorBottom}
                />
              </TabsContent>
            </Tabs>
            <Flex align='center' direction='column' gap='2'>
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
                    <ResetIcon />
                  </Box>
                  Revert
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Box css={{ mr: '$1' }}>
                        <UploadIcon />
                      </Box>
                      Load preset
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setBitmap(clarus.bitmap as (0 | 1 | 2)[][]);
                      }}
                    >
                      Clarus
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setBitmap(mac.bitmap as (0 | 1 | 2)[][]);
                      }}
                    >
                      Mac
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  title='New'
                  onClick={() => {
                    // TODO: ask for dimensions
                    setBitmap(new Array(38).fill(new Array(38).fill(0)));
                  }}
                >
                  <Box css={{ mr: '$1' }}>
                    <FilePlusIcon />
                  </Box>
                  New
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
                          exportElementToPng(
                            document.getElementById('canvas'),
                            bitmap[0].length * 20,
                            bitmap.length * 20
                          );
                        }}
                      >
                        PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          exportElementToSvg(document.getElementById('canvas'));
                        }}
                      >
                        SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          exportDataToJson({ bitmap, colorTop, colorBottom });
                        }}
                      >
                        JSON
                      </DropdownMenuItem>
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
