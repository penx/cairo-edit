export const exportElementToSvg = (el: HTMLElement | null) => {
  el?.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svg = el?.outerHTML || '';

  const blob = new Blob(['<?xml version="1.0" standalone="no"?>\r\n', svg], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'moof.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
