import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDFUnicornios = (unicorns) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Listado de Unicornios', 14, 20);

    const columns = [
        { header: 'ID', dataKey: 'id' },
        { header: 'Nombre', dataKey: 'name' },
        { header: 'Color', dataKey: 'color' },
        { header: 'Edad', dataKey: 'age' },
        { header: 'Poder', dataKey: 'power' }
    ];

    const rows = unicorns.map(unicorn => ({
        id: unicorn._id,
        name: unicorn.name,
        color: unicorn.color,
        age: unicorn.age,
        power: unicorn.power
    }));

    autoTable(doc, {
        startY: 30,
        headStyles: { fillColor: [100, 149, 237], halign: 'center' },
        styles: { fontSize: 10 },
        columns,
        body: rows
    });

    doc.save('unicornios.pdf');
};
