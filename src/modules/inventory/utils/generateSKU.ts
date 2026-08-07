export function generateSKU(name: string): string {

  const prefix = name
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 3)
    .toUpperCase();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `${prefix}-${random}`;

}