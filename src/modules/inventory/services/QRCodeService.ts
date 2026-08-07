import QRCode from "qrcode";

export class QRCodeService{

async generate(

canvas:HTMLCanvasElement,

value:string

){

await QRCode.toCanvas(

canvas,

value

);

}

}

export const qrCodeService=new QRCodeService();