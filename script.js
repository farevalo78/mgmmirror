function calculatePrice() {
    // Get input values
    const productName = document.getElementById('product-name').value || 'Sin nombre';
    const basePrice = parseFloat(document.getElementById('base-price').value) || 0;
    const installation = parseFloat(document.getElementById('installation').value) || 0;
    const materials = parseFloat(document.getElementById('materials').value) || 0;
    const labor = parseFloat(document.getElementById('labor').value) || 0;
    const otherCosts = parseFloat(document.getElementById('other-costs').value) || 0;

    // Calculate total sum
    const totalSum = basePrice + installation + materials + labor + otherCosts;
    
    // Calculate final price (sum × 2)
    const finalPrice = totalSum * 2;

    // Display results
    document.getElementById('total-sum').textContent = '$' + totalSum.toFixed(2);
    document.getElementById('final-price').textContent = '$' + finalPrice.toFixed(2);
    document.getElementById('result-product-name').textContent = productName;
    
    // Show results section
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    // Store values for Word generation
    window.calculatedData = {
        productName,
        basePrice,
        installation,
        materials,
        labor,
        otherCosts,
        totalSum,
        finalPrice
    };
}

function generateWord() {
    if (!window.calculatedData) {
        alert('Por favor, primero calcula los precios');
        return;
    }

    const data = window.calculatedData;
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('es-ES');
    const timeString = currentDate.toLocaleTimeString('es-ES');

    // Create document structure
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: [
                // Header
                new docx.Paragraph({
                    text: 'MGM MIRROR',
                    alignment: docx.AlignmentType.CENTER,
                    size: 32,
                    bold: true,
                    color: '667eea',
                }),
                new docx.Paragraph({
                    text: 'Soluciones de Espejos y Decoración',
                    alignment: docx.AlignmentType.CENTER,
                    size: 20,
                    color: '999999',
                    spacing: { after: 200 },
                }),
                
                // Title
                new docx.Paragraph({
                    text: 'COTIZACIÓN DE PRECIO - STOREFRONT',
                    alignment: docx.AlignmentType.CENTER,
                    size: 24,
                    bold: true,
                    spacing: { after: 200 },
                }),

                // Date and time
                new docx.Paragraph({
                    text: `Fecha: ${dateString}  |  Hora: ${timeString}`,
                    alignment: docx.AlignmentType.CENTER,
                    size: 18,
                    color: '666666',
                    spacing: { after: 300 },
                }),

                // Separator
                new docx.Paragraph({
                    text: '─'.repeat(60),
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),

                // Product info
                new docx.Paragraph({
                    text: 'INFORMACIÓN DEL PRODUCTO',
                    size: 22,
                    bold: true,
                    color: '667eea',
                    spacing: { after: 100 },
                }),

                new docx.Paragraph({
                    text: `Producto: ${data.productName}`,
                    size: 18,
                    spacing: { after: 50 },
                }),

                new docx.Paragraph({
                    text: '─'.repeat(60),
                    spacing: { after: 200 },
                }),

                // Cost breakdown table
                new docx.Paragraph({
                    text: 'DESGLOSE DE COSTOS',
                    size: 22,
                    bold: true,
                    color: '667eea',
                    spacing: { after: 100 },
                }),

                new docx.Table({
                    width: { size: 100, type: docx.WidthType.PERCENTAGE },
                    rows: [
                        // Header row
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({
                                    children: [new docx.Paragraph({ text: 'Concepto', bold: true, color: 'FFFFFF' })],
                                    shading: { fill: '667eea' },
                                }),
                                new docx.TableCell({
                                    children: [new docx.Paragraph({ text: 'Monto ($)', bold: true, color: 'FFFFFF', alignment: docx.AlignmentType.RIGHT })],
                                    shading: { fill: '667eea' },
                                }),
                            ],
                        }),
                        // Cost rows
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Precio Base')] }),
                                new docx.TableCell({ children: [new docx.Paragraph(data.basePrice.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Instalación')] }),
                                new docx.TableCell({ children: [new docx.Paragraph(data.installation.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Materiales')] }),
                                new docx.TableCell({ children: [new docx.Paragraph(data.materials.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Mano de Obra')] }),
                                new docx.TableCell({ children: [new docx.Paragraph(data.labor.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Otros Costos')] }),
                                new docx.TableCell({ children: [new docx.Paragraph(data.otherCosts.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        // Total sum row
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ 
                                    children: [new docx.Paragraph({ text: 'SUMA TOTAL', bold: true })],
                                    shading: { fill: 'f0f0f0' }
                                }),
                                new docx.TableCell({ 
                                    children: [new docx.Paragraph({ text: data.totalSum.toFixed(2), bold: true, alignment: docx.AlignmentType.RIGHT })],
                                    shading: { fill: 'f0f0f0' }
                                }),
                            ],
                        }),
                    ],
                }),

                new docx.Paragraph({ text: '', spacing: { after: 200 } }),

                // Final price section
                new docx.Paragraph({
                    text: 'CÁLCULO FINAL',
                    size: 22,
                    bold: true,
                    color: '667eea',
                    spacing: { after: 100 },
                }),

                new docx.Table({
                    width: { size: 100, type: docx.WidthType.PERCENTAGE },
                    rows: [
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({
                                    children: [new docx.Paragraph({ text: 'Descripción', bold: true })],
                                }),
                                new docx.TableCell({
                                    children: [new docx.Paragraph({ text: 'Valor', bold: true, alignment: docx.AlignmentType.RIGHT })],
                                }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Suma Total de Costos')] }),
                                new docx.TableCell({ children: [new docx.Paragraph('$' + data.totalSum.toFixed(2), { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ children: [new docx.Paragraph('Multiplicador')] }),
                                new docx.TableCell({ children: [new docx.Paragraph('× 2', { alignment: docx.AlignmentType.RIGHT })] }),
                            ],
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({ 
                                    children: [new docx.Paragraph({ text: 'PRECIO FINAL', bold: true, size: 20, color: 'FFFFFF' })],
                                    shading: { fill: '00b894' }
                                }),
                                new docx.TableCell({ 
                                    children: [new docx.Paragraph({ text: '$' + data.finalPrice.toFixed(2), bold: true, size: 20, alignment: docx.AlignmentType.RIGHT, color: 'FFFFFF' })],
                                    shading: { fill: '00b894' }
                                }),
                            ],
                        }),
                    ],
                }),

                new docx.Paragraph({ text: '', spacing: { after: 300 } }),

                // Separator
                new docx.Paragraph({
                    text: '─'.repeat(60),
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),

                // Notes
                new docx.Paragraph({
                    text: 'NOTAS Y CONDICIONES',
                    size: 22,
                    bold: true,
                    color: '667eea',
                    spacing: { after: 100 },
                }),

                new docx.Paragraph({
                    text: '• Esta cotización es válida por 30 días.',
                    size: 18,
                    spacing: { after: 50 },
                }),

                new docx.Paragraph({
                    text: '• El precio final incluye impuestos aplicables.',
                    size: 18,
                    spacing: { after: 50 },
                }),

                new docx.Paragraph({
                    text: '• Para proceder con la compra, confirme esta cotización por escrito.',
                    size: 18,
                    spacing: { after: 50 },
                }),

                new docx.Paragraph({
                    text: '• Contáctenos para más información o consultas adicionales.',
                    size: 18,
                    spacing: { after: 300 },
                }),

                // Footer
                new docx.Paragraph({
                    text: '─'.repeat(60),
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),

                new docx.Paragraph({
                    text: 'MGM Mirror - Soluciones de Espejos y Decoración',
                    alignment: docx.AlignmentType.CENTER,
                    size: 18,
                    bold: true,
                    spacing: { after: 50 },
                }),

                new docx.Paragraph({
                    text: 'Documento generado automáticamente por el sistema de cotización',
                    alignment: docx.AlignmentType.CENTER,
                    size: 16,
                    color: '999999',
                }),
            ],
        }],
    });

    // Generate and download document
    const fileName = `MGM_Cotizacion_${data.productName.replace(/\s+/g, '_')}_${currentDate.getTime()}.docx`;
    docx.Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    });
}

function resetForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('base-price').value = '';
    document.getElementById('installation').value = '';
    document.getElementById('materials').value = '';
    document.getElementById('labor').value = '';
    document.getElementById('other-costs').value = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('product-name').focus();
}
