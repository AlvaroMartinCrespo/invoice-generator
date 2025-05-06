// src/utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

const formatDate = (str) => new Date(str).toLocaleDateString('es-ES');

applyPlugin(jsPDF);

export const generatePDF = (formData, items) => {
  const doc = new jsPDF();
  const marginTop = 20;

  // — Encabezado —
  doc.setFontSize(16).text('FACTURA', 105, marginTop, { align: 'center' });
  doc.setFontSize(12).text(formData.companyName, 15, marginTop + 10);
  doc.setFontSize(10);
  doc.text(formData.companyAddress, 15, marginTop + 15);
  doc.text(`NIF/CIF: ${formData.companyTaxId}`, 15, marginTop + 20);

  doc.text(`Factura Nº: ${formData.invoiceNumber}`, 140, marginTop + 10);
  doc.text(`Fecha: ${formatDate(formData.invoiceDate)}`, 140, marginTop + 15);
  doc.text(`Vto.: ${formatDate(formData.dueDate)}`, 140, marginTop + 20);

  // — Datos del cliente —
  doc.setFontSize(11).text('Cliente:', 15, marginTop + 35);
  doc.setFontSize(10).text(formData.clientName, 15, marginTop + 40);
  if (formData.clientAddress) {
    doc.text(formData.clientAddress, 15, marginTop + 45);
  }
  if (formData.clientTaxId) {
    doc.text(`NIF/CIF: ${formData.clientTaxId}`, 15, marginTop + 50);
  }

  // — Tabla de conceptos —
  const head = [['Descripción', 'Cantidad', 'Precio', 'Total']];
  const body = items.map(i => [
    i.description,
    i.quantity.toString(),
    `${i.price.toFixed(2)} €`,
    `${i.total.toFixed(2)} €`
  ]);

  doc.autoTable({
    startY: marginTop + 60,
    head,
    body,
    margin: { left: 15, right: 15 },
    styles: { lineWidth: 0.1 },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    },
  });

  // — Totales —
  const finalY = doc.lastAutoTable?.finalY || marginTop + 60 + body.length * 10;
  const base = items.reduce((sum, i) => sum + i.total, 0);
  const iva  = base * 0.21;

  doc.setFontSize(10)
     .text('Base imponible:', 140, finalY + 10)
     .text(`${base.toFixed(2)} €`, 190, finalY + 10, { align: 'right' })
     .text('IVA (21%):', 140, finalY + 15)
     .text(`${iva.toFixed(2)} €`, 190, finalY + 15, { align: 'right' });

  doc.setFontSize(12).setFont(undefined, 'bold')
     .text('TOTAL:', 140, finalY + 25)
     .text(`${(base + iva).toFixed(2)} €`, 190, finalY + 25, { align: 'right' });

  // — Pie de página —
  doc.setFontSize(9).setTextColor(100)
     .text('Documento generado electrónicamente. No requiere firma.', 105, 280, { align: 'center' });

  // — Descargar PDF —
  const filename = `factura-${formData.invoiceNumber.replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);

  return doc.output('blob');
};
