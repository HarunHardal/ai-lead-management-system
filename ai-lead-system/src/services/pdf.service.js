const  PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generatePDF = (lead, offer) =>{
    const doc = new PDFDocument();

    const path = `offer/offer-${lead.id}.pdf`;

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(20).text("Teklif");

    doc.moveDown();

    doc.text(`Müşteri: ${lead.name}`);
    doc.text(`Hizmet: ${lead.service}`);
    doc.text(`Bütçe: ${lead.budget}`);

    doc.moveDown();

    doc.text(offer);

    doc.end();

    return path;
}