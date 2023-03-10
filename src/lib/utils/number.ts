export function percentageFromNumber(number: number, total: number) {
  return (number / total) * 100;
}

export function numberWithDecimal(number: number) {
  return number > 0 ? number.toFixed(1) : 0;
}

export function ratioToPercentage(ratio: string) {
  const [first, second] = ratio.split('/');

  const aspectRatioAsPercentage =
    (parseInt(second, 10) / parseInt(first, 10)) * 100;

  return aspectRatioAsPercentage;
}

export function getRandomMinMax(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getRandomInteger(min: number, max: number) {
  return Math.floor(getRandomMinMax(min, max));
}

export function mapNumberToRange(
  mappedNumber: number,
  inRange: [number, number],
  outRange: [number, number],
): number {
  return (
    ((mappedNumber - inRange[0]) * (outRange[1] - outRange[0])) /
      (inRange[1] - inRange[0]) +
    outRange[0]
  );
}

export function getWidthFromMaxHeight(
  width: number,
  height: number,
  maxHeight: number,
) {
  const ratio = width / height;

  return maxHeight * ratio;
}
