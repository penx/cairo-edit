export const exportElementToSvg = (el: HTMLElement | null) => {
  el?.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svg = el?.outerHTML || '';

  const blob = new Blob(['<?xml version="1.0" standalone="no"?>\r\n', svg], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  downloadUrl(url, 'moof.svg');
};

const downloadUrl = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportDataToJson = (data: {
  bitmap: (0 | 1 | 2)[][];
  colorTop: string;
  colorBottom: string;
}) => {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  );

  downloadUrl(url, 'moof.json');
};

export const exportElementToPng = async (
  el: HTMLElement | null,
  width: number,
  height: number
) => {
  const mod = await import('canvg');
  const Canvg = mod.default;
  const presets = mod.presets;

  if (!el || !window.OffscreenCanvas) return; // TODO: handle error or change types
  const canvas = new window.OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // I don't think this should ever be hit, but need it in order to satify TypeScript
  const v = await Canvg.from(ctx, el.outerHTML, {
    ...presets.offscreen(),
    window: undefined
  });

  // Render only first frame, ignoring animations and mouse.
  await v.render();

  const blob = await canvas.convertToBlob();
  const url = URL.createObjectURL(blob);
  downloadUrl(url, 'moof.png');
};
