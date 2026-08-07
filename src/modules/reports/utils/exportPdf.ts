import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf(

  filename: string,

  title: string,

  headers: string[],

  rows: string[][],

) {

  const doc = new jsPDF();

  doc.setFont("helvetica");

  doc.setFontSize(18);

  doc.text(title, 14, 18);

  doc.setFontSize(10);

  doc.text(

    `Generated: ${new Date().toLocaleString()}`,

    14,

    26,

  );

  autoTable(doc, {

    startY: 34,

    head: [headers],

    body: rows,

  });

  doc.save(filename);

}