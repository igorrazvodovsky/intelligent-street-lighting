import enUS from 'date-fns/locale/en-US';

const timeFormats: Record<string, string> = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm',
};

const defaultWidth = 'short';

const time = (options?: { width?: string }) => {
  const width = options?.width || defaultWidth;
  return timeFormats[width] || timeFormats[defaultWidth];
};

const enSE = {
  ...enUS,
  formatLong: {
    ...enUS.formatLong,
    time,
  },
};

export default enSE;
