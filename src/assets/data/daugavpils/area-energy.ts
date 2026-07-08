
export const AREA = Array.from({ length: 10 }, () => {
  return Array.from({ length: 24 }, (e, i) => {
    let value = 0;
    // High energy consumption during the night (before 6 AM and after 6 PM)
    if (i < 6 || i > 18) {
      value = Math.floor(Math.random() * 3) + 7; // 7 to 9
      // Dimming during deep night (1 AM to 4 AM)
      if (i >= 1 && i <= 4) {
        value = Math.floor(Math.random() * 2) + 3; // 3 to 4
      }
    } else if (i === 6 || i === 18) {
      // Transition hours at dawn and dusk
      value = Math.floor(Math.random() * 2) + 1; // 1 to 2
    }
    return {
      value,
      date: new Date(null as any, null as any, 1, i)
    }
  });
});
