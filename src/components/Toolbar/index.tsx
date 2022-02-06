import {
  Box,
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
  FilePlusIcon,
  FileIcon
} from '@radix-ui/react-icons';

import { useRecoilState } from 'recoil';

import { ColorPicker } from '../ColorPicker';
import { ColorBox } from '../ColorBox';
import { Footer } from '../Footer';
import { Help } from '../Help';

import {
  exportElementToSvg,
  exportDataToJson,
  exportElementToPng
} from '../../utils/export';
import { load, save } from '../../utils/local-storage';

import clarus from '../../presets/clarus.json';
import mac from '../../presets/mac.json';
import {
  bitmapState,
  colorTopState,
  colorBottomState
} from '../../recoil/canvas/atom';

export const Toolbar = () => {
  const [bitmap, setBitmap] = useRecoilState(bitmapState);
  const [colorTop, setColorTop] = useRecoilState(colorTopState);
  const [colorBottom, setColorBottom] = useRecoilState(colorBottomState);

  return (
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
            <ColorPicker color={colorBottom} onChange={setColorBottom} />
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
            loadedData?.colorBottom && setColorBottom(loadedData.colorBottom);
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
  );
};
