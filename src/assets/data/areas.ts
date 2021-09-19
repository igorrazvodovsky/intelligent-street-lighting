
export const AREA = Array.from({ length: 10 }, () => {
  return Array.from({ length: 23 }, (e, i) => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      date: new Date(null, null, 1, i)
    }
  });
});
