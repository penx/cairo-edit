import { atom } from 'recoil';
import clarus from '../../presets/clarus.json';
import { load } from '../../utils/local-storage';

type Bitmap = (0 | 1 | 2)[][];

const DEFAULT_COLOR_TOP = '#FCB900';
const DEFAULT_COLOR_BOTTOM = '#EB144C';

export const bitmapState = atom<Bitmap>({
  key: 'bitmapState',
  default: load()?.bitmap || clarus.bitmap,
});

export const colorTopState = atom<string>({
  key: 'colorTopState',
  default: load()?.colorTop || DEFAULT_COLOR_TOP,
});

export const colorBottomState = atom<string>({
  key: 'colorBottomState',
  default: load()?.colorBottom || DEFAULT_COLOR_BOTTOM,
});

export const writeValueState = atom<0 | 1 | 2 | null>({
  key: 'writeValueState',
  default: null,
});


