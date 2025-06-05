const phi = 1.61803398875;
const toRem = px => `${(px / 16).toFixed(6)}rem`;

function goldenHeightExtensions(start, end) {
  const result = {};
  for (let base = start; base <= end; base++) {
    const px = base * 4; // Tailwind h-x maps x to 4*x px
    for (let i = 1; i <= 3; i++) {
      const upKey = `g${base}_up_${i}`;
      const downKey = `g${base}_down_${i}`;
      result[upKey] = toRem(px * Math.pow(phi, i));
      result[downKey] = toRem(px / Math.pow(phi, i));
    }
  }
  return result;
}

module.exports = {
  theme: {
    extend: {
      height: {
        ...goldenHeightExtensions(1, 64) // creates h-gX_up_Y and h-gX_down_Y
      }
    }
  }
};
