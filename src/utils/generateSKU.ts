export function generateSKU(prefix = "ABL") {
  const value = Math.floor(Math.random() * 100000);

  return `${prefix}-${value}`;
}