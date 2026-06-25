

export const AREA = Array.from({ length: 10 }, () => {
  return Array.from({ length: 24 }, (e, i) => {
    let value = 0;
    if (i < 6 || i > 17) {
      value = Math.floor(Math.random() * 4) + 7; // 7 to 10 (longer dark hours)
      if (i >= 1 && i <= 4) {
        value = Math.floor(Math.random() * 3) + 3; // 3 to 5 (dimmed deep night)
      }
      if (i === 16 || i === 17) {
        value = Math.floor(Math.random() * 2) + 6; // dusk kick-in 6 to 7
      }
    } else if (i === 6 || i === 17) {
      value = Math.floor(Math.random() * 3) + 2; // transition hours 2 to 4
    }
    return {
      value,
      date: new Date(null as any, null as any, 1, i)
    }
  });
});
