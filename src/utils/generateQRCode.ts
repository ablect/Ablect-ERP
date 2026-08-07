import QRCode from "qrcode";

export async function generateQRCode(
  value: string
) {
  return await QRCode.toDataURL(value);
}