export const load = () => {
  try {
    const initialLoad = localStorage.getItem('moof');
    return initialLoad ? JSON.parse(initialLoad) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const save = (data: {
  bitmap: (0 | 1 | 2)[][];
  colorTop?: string;
  colorBottom?: string;
}) => {
  localStorage.setItem('moof', JSON.stringify(data));
};
