// Precios de hardware para Shower Door
const hardwarePrices = {
    clamps: 20,
    brackets: 28,
    orificios: 14,
    hinges: 40,
    cortes: 100
};

// Tabla de precios de vidrio tempered para Shower Door
const priceDatabase = {
    "1/4": {
        "Clear": 4.4,
        "Mirror": 0,
        "Pilkington energy": 9.85,
        "Bronze": 8.6,
        "Green": 8.65,
        "Grey": 8.65,
        "Low iron": 12,
        "Acid etch": 9.8
    },
    "3/8": {
        "Clear": 8.25,
        "Low iron": 15,
        "Acid etch": 19.1,
        "Acid etch low iron": 24.25,
        "Shower guard": 17.5,
        "Low iron shower guard": 21
    },
    "1/2": {
        "Clear": 10.3,
        "Acid etch": 22.85,
        "Acid etch low iron": 28.5,
        "Low iron": 17.3,
        "Shower guard": 20.75
    }
};

// Variables globales
let currentData = {};

// Navegación entre páginas
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    switch(page) {
        case 'main':
            document.getElementById('mainPage').classList.add('active');
            break;
        case 'showerDoor':
            document.getElementById('showerDoorPage').classList.add('active');
            updateGlassTypes();
            break;
        case 'windowVinyl':
            document.getElementById('windowVinylPage').classList.add('active');
            break;
        case 'panelMeasurements':
            document.getElementById('panelMeasurementsPage').classList.add('active');
            break;
        case 'additionalCosts':
            document.getElementById('additionalCostsPage').classList.add('active');
            break;
        case 'result':
            document.getElementById('resultPage').classList.add('active');
            break;
        case 'vinylResult':
            document.getElementById('vinylResultPage').classList.add('active');
            break;
    }
}

// Obtener tipos de vidrio para Shower Door
function getGlassTypesByThickness(thickness) {
    return Object.keys(priceDatabase[thickness] || {}).sort();
}

// Obtener precio temper
function getTemperPrice(thickness, type) {
    return priceDatabase[thickness]?.[type] || 0;
}

// Actualizar opciones de vidrio en Shower Door
function updateGlassTypes() {
    const thickness = document.getElementById('glassThickness').value;
    const glassTypeSelect = document.getElementById('glassType');
    
    glassTypeSelect.innerHTML = '<option value="">Seleccione tipo</option>';
    
    if (thickness) {
        const types = getGlassTypesByThickness(thickness);
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            glassTypeSelect.appendChild(option);
        });
    }
}

// Iniciar medidas de paneles (Shower Door)
function startPanelMeasurements() {
    const projectName = document.getElementById('projectName').value;
    const numPanels = parseInt(document.getElementById('numPanels').value);
    const glassThickness = document.getElementById('glassThickness').value;
    const glassType = document.getElementById('glassType').value;
    
    if (!projectName || !numPanels || !glassThickness || !glassType) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    currentData = {
        type: 'showerDoor',
        projectName: projectName,
        numPanels: numPanels,
        glassThickness: glassThickness,
        glassType: glassType,
        panels: []
    };
    
    const container = document.getElementById('panelFormsContainer');
    container.innerHTML = '';
    
    for (let i = 1; i <= numPanels; i++) {
        const panelForm = document.createElement('div');
        panelForm.className = 'panel-form';
        panelForm.innerHTML = `
            <h3>Panel ${i}</h3>
            <div class="panel-form-group">
                <div class="form-group">
                    <label for="length${i}">Largo (pulgadas)</label>
                    <input type="number" id="length${i}" placeholder="Ej: 36" min="1" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="width${i}">Ancho (pulgadas)</label>
                    <input type="number" id="width${i}" placeholder="Ej: 76" min="1" step="0.1" required>
                </div>
            </div>
            
            <h4 style="color: #667eea; margin-top: 20px; margin-bottom: 15px;">Hardware para Panel ${i}</h4>
            <div class="hardware-grid">
                <div class="form-group">
                    <label for="clamps${i}">Clamps (x$${hardwarePrices.clamps})</label>
                    <input type="number" id="clamps${i}" placeholder="0" min="0" value="0" required>
                </div>
                <div class="form-group">
                    <label for="brackets${i}">Brackets (x$${hardwarePrices.brackets})</label>
                    <input type="number" id="brackets${i}" placeholder="0" min="0" value="0" required>
                </div>
                <div class="form-group">
                    <label for="orificios${i}">Orificios (x$${hardwarePrices.orificios})</label>
                    <input type="number" id="orificios${i}" placeholder="0" min="0" value="0" required>
                </div>
                <div class="form-group">
                    <label for="hinges${i}">Hinges (x$${hardwarePrices.hinges})</label>
                    <input type="number" id="hinges${i}" placeholder="0" min="0" value="0" required>
                </div>
                <div class="form-group">
                    <label for="cortes${i}">Cortes (x$${hardwarePrices.cortes})</label>
                    <input type="number" id="cortes${i}" placeholder="0" min="0" value="0" required>
                </div>
            </div>
        `;
        container.appendChild(panelForm);
    }
    
    navigateTo('panelMeasurements');
}

// Ir a costos adicionales
function goToAdditionalCosts() {
    const { numPanels } = currentData;
    
    for (let i = 1; i <= numPanels; i++) {
        const length = document.getElementById(`length${i}`).value;
        const width = document.getElementById(`width${i}`).value;
        
        if (!length || !width) {
            alert(`Por favor ingresa las medidas del panel ${i}`);
            return;
        }
    }
    
    currentData.panels = [];
    for (let i = 1; i <= numPanels; i++) {
        const clamps = parseInt(document.getElementById(`clamps${i}`).value) || 0;
        const brackets = parseInt(document.getElementById(`brackets${i}`).value) || 0;
        const orificios = parseInt(document.getElementById(`orificios${i}`).value) || 0;
        const hinges = parseInt(document.getElementById(`hinges${i}`).value) || 0;
        const cortes = parseInt(document.getElementById(`cortes${i}`).value) || 0;
        
        currentData.panels.push({
            length: parseFloat(document.getElementById(`length${i}`).value),
            width: parseFloat(document.getElementById(`width${i}`).value),
            clamps: clamps,
            brackets: brackets,
            orificios: orificios,
            hinges: hinges,
            cortes: cortes
        });
    }
    
    navigateTo('additionalCosts');
}

// Calcular cotización Shower Door
function calculateQuote() {
    const percentageIncrease = parseFloat(document.getElementById('percentageIncrease').value) || 0;
    const hwValue = parseFloat(document.getElementById('hwValue').value) || 0;
    const laborCost = parseFloat(document.getElementById('laborCost').value) || 0;
    
    const { numPanels, glassThickness, glassType } = currentData;
    
    let totalGlassPrice = 0;
    let totalHardwarePrice = 0;
    let panelsDetails = [];
    
    // Calcular precio de cada panel
    for (let i = 0; i < numPanels; i++) {
        const panel = currentData.panels[i];
        const { length, width, clamps, brackets, orificios, hinges, cortes } = panel;
        
        // Cálculo de vidrio
        const squareInches = length * width;
        const squareFeet = Math.ceil(squareInches / 144);
        const pricePerSquareFoot = getTemperPrice(glassThickness, glassType);
        let glassPrice = squareFeet * pricePerSquareFoot;
        
        // Cálculo de hardware
        let hardwarePrice = (
            clamps * hardwarePrices.clamps +
            brackets * hardwarePrices.brackets +
            orificios * hardwarePrices.orificios +
            hinges * hardwarePrices.hinges +
            cortes * hardwarePrices.cortes
        );
        
        // Subtotal panel + hardware
        let panelSubtotal = glassPrice + hardwarePrice;
        
        // Aumentar 13% al panel - REDONDEADO AL SUPERIOR
        const panelWith13Percent = Math.ceil(panelSubtotal * 1.13 * 100) / 100;
        
        totalGlassPrice += glassPrice;
        totalHardwarePrice += hardwarePrice;
        
        panelsDetails.push({
            number: i + 1,
            length: length.toFixed(2),
            width: width.toFixed(2),
            squareFeet: squareFeet,
            glassPrice: glassPrice.toFixed(2),
            clamps: clamps,
            brackets: brackets,
            orificios: orificios,
            hinges: hinges,
            cortes: cortes,
            hardwarePrice: hardwarePrice.toFixed(2),
            subtotal: panelSubtotal.toFixed(2),
            with13Percent: panelWith13Percent
        });
    }
    
    // Subtotal antes de % adicional
    const subtotalAllPanels = panelsDetails.reduce((sum, p) => sum + p.with13Percent, 0);
    
    // Aplicar porcentaje adicional - REDONDEADO AL SUPERIOR
    const percentageAmount = Math.ceil(subtotalAllPanels * (percentageIncrease / 100) * 100) / 100;
    const subtotalWithPercentage = subtotalAllPanels + percentageAmount;
    
    // Hardware con porcentaje - REDONDEADO AL SUPERIOR
    const hwWithPercentage = Math.ceil((hwValue + (hwValue * (percentageIncrease / 100))) * 100) / 100;
    
    // Total final
    const totalFinal = subtotalWithPercentage + hwWithPercentage + laborCost;
    
    // Guardar para generación de PDF
    currentData.percentageIncrease = percentageIncrease;
    currentData.hwValue = hwValue;
    currentData.laborCost = laborCost;
    currentData.panelsDetails = panelsDetails;
    currentData.subtotalAllPanels = subtotalAllPanels.toFixed(2);
    currentData.percentageAmount = percentageAmount.toFixed(2);
    currentData.hwWithPercentage = hwWithPercentage.toFixed(2);
    currentData.totalFinal = totalFinal.toFixed(2);
    
    displayResults(panelsDetails, subtotalAllPanels, percentageAmount, hwValue, hwWithPercentage, laborCost, totalFinal);
}

// Mostrar resultados Shower Door
function displayResults(panelsDetails, subtotalAllPanels, percentageAmount, hwValue, hwWithPercentage, laborCost, totalFinal) {
    const resultDetails = document.getElementById('resultDetails');
    const { projectName, percentageIncrease } = currentData;
    
    let html = `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">Detalles de la Cotización</h2>
            <div class="panel-details">
                <p><strong>Proyecto:</strong> ${projectName}</p>
                <p><strong>Tipo de Vidrio:</strong> ${currentData.glassType}</p>
                <p><strong>Grosor:</strong> ${currentData.glassThickness}"</p>
                <p><strong>Cantidad de Paneles:</strong> ${currentData.numPanels}</p>
            </div>
        </div>
    `;
    
    // Detalles por panel
    html += '<h3 style="color: #667eea; margin-top: 30px; margin-bottom: 20px;">Detalles por Panel:</h3>';
    
    panelsDetails.forEach(panel => {
        html += `
            <div class="panel-details">
                <p><strong>Panel ${panel.number}:</strong> ${panel.length}" × ${panel.width}"</p>
                <div style="margin-left: 20px; margin-top: 10px; border-left: 3px solid #667eea; padding-left: 15px;">
                    <p><strong>Vidrio:</strong> ${panel.squareFeet} sq ft × $${panel.glassPrice}</p>
                    <p><strong>Hardware:</strong></p>
                    <div style="margin-left: 15px; font-size: 0.95em;">
                        ${panel.clamps > 0 ? `<p>Clamps: ${panel.clamps} × $${hardwarePrices.clamps} = $${(panel.clamps * hardwarePrices.clamps).toFixed(2)}</p>` : ''}
                        ${panel.brackets > 0 ? `<p>Brackets: ${panel.brackets} × $${hardwarePrices.brackets} = $${(panel.brackets * hardwarePrices.brackets).toFixed(2)}</p>` : ''}
                        ${panel.orificios > 0 ? `<p>Orificios: ${panel.orificios} × $${hardwarePrices.orificios} = $${(panel.orificios * hardwarePrices.orificios).toFixed(2)}</p>` : ''}
                        ${panel.hinges > 0 ? `<p>Hinges: ${panel.hinges} × $${hardwarePrices.hinges} = $${(panel.hinges * hardwarePrices.hinges).toFixed(2)}</p>` : ''}
                        ${panel.cortes > 0 ? `<p>Cortes: ${panel.cortes} × $${hardwarePrices.cortes} = $${(panel.cortes * hardwarePrices.cortes).toFixed(2)}</p>` : ''}
                    </div>
                    <p style="margin-top: 10px;"><strong>Hardware Total:</strong> $${panel.hardwarePrice}</p>
                    <p style="margin-top: 10px; border-top: 1px solid #e0e0e0; padding-top: 10px;"><strong>Subtotal:</strong> $${panel.subtotal}</p>
                    <p style="color: #667eea; font-weight: 700; font-size: 1.05em;"><strong>+ 13%:</strong> $${panel.with13Percent.toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    
    // Resumen de costos
    html += `
        <div style="margin-top: 30px; border-top: 3px solid #667eea; padding-top: 30px;">
            <h3 style="color: #667eea; margin-bottom: 20px;">Resumen de Costos:</h3>
            <div class="panel-details">
                <p><strong>Subtotal Vidrio + Hardware + 13%:</strong> $${subtotalAllPanels.toFixed(2)}</p>
                <p><strong>Aumento ${percentageIncrease}%:</strong> $${percentageAmount.toFixed(2)}</p>
                <p style="border-top: 1px solid #e0e0e0; padding-top: 10px; margin-top: 10px;"><strong>Subtotal con Aumento:</strong> $${(parseFloat(subtotalAllPanels) + parseFloat(percentageAmount)).toFixed(2)}</p>
                
                <p style="margin-top: 20px;"><strong>Hardware (HW): </strong> $${hwValue.toFixed(2)}</p>
                <p><strong>Hardware con ${percentageIncrease}%:</strong> $${hwWithPercentage.toFixed(2)}</p>
                
                <p style="margin-top: 20px; border-top: 2px solid #667eea; padding-top: 20px;"><strong>Mano de Obra (Labor):</strong> $${laborCost.toFixed(2)}</p>
                
                <p style="margin-top: 30px; font-size: 1.5em; color: #667eea; font-weight: 700; border-top: 3px solid #667eea; padding-top: 20px;">TOTAL FINAL: $${totalFinal.toFixed(2)}</p>
            </div>
        </div>
    `;
    
    resultDetails.innerHTML = html;
    navigateTo('result');
}

// Calcular cotización Window Vinyl
function calculateWindowVinylQuote() {
    const width = parseFloat(document.getElementById('vinylWidth').value);
    const height = parseFloat(document.getElementById('vinylHeight').value);
    const glassType = document.getElementById('vinylGlassType').value;
    const windowType = document.getElementById('vinylWindowType').value;
    const color = document.getElementById('vinylColor').value;
    
    if (!width || !height || !glassType || !windowType || !color) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Precios base por color
    const colorPrices = {
        'White': 0,
        'Bronze/Beige': 22,
        'Black/White': 40
    };
    
    // Precios por tipo de vidrio
    const glassPrices = {
        'Frosted': 40,
        'Clear': 0,
        'Tempered': (width * height / 144) * 40,
        'Low-e': 60
    };
    
    let baseCost = 0;
    const colorCost = colorPrices[color];
    const glassCost = glassPrices[glassType];
    
    // Calcular según tipo de ventana - REDONDEADO AL SUPERIOR
    if (windowType === 'Double Hang') {
        const sum = width + height;
        if (sum <= 102) {
            baseCost = 152;
        } else {
            const difference = sum - 102;
            baseCost = 152 + (difference * 2.5);
        }
    } else if (windowType === 'Picture Window') {
        const sum = width + height;
        baseCost = sum * 1.75;
    } else if (windowType === 'Slider') {
        const sum = width + height;
        if (sum <= 72) {
            baseCost = 132;
        } else {
            const difference = sum - 72;
            baseCost = 132 + (difference * 2.5);
        }
    }
    
    // Total antes de 18%
    let totalBeforeTax = baseCost + colorCost + glassCost;
    
    // Aplicar 18% y redondear al superior
    const totalWithTax = Math.ceil((totalBeforeTax * 1.18) * 100) / 100;
    
    // Precio de venta sin taxes (multiplicar por 2)
    const salePrice = Math.ceil(totalWithTax * 2 * 100) / 100;
    
    currentData = {
        type: 'windowVinyl',
        width: width.toFixed(2),
        height: height.toFixed(2),
        glassType: glassType,
        windowType: windowType,
        color: color,
        baseCost: Math.ceil(baseCost * 100) / 100,
        colorCost: colorCost.toFixed(2),
        glassCost: Math.ceil(glassCost * 100) / 100,
        totalBeforeTax: Math.ceil(totalBeforeTax * 100) / 100,
        totalWithTax: totalWithTax.toFixed(2),
        salePrice: salePrice.toFixed(2)
    };
    
    displayVinylResults();
}

// Mostrar resultados Window Vinyl
function displayVinylResults() {
    const vinylResultDetails = document.getElementById('vinylResultDetails');
    const { width, height, glassType, windowType, color, baseCost, colorCost, glassCost, totalBeforeTax, totalWithTax, salePrice } = currentData;
    
    let html = `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">Detalles de la Cotización Window Vinyl</h2>
            <div class="panel-details">
                <p><strong>Ancho:</strong> ${width}"</p>
                <p><strong>Alto:</strong> ${height}"</p>
                <p><strong>Tipo de Vidrio:</strong> ${glassType}</p>
                <p><strong>Tipo de Ventana:</strong> ${windowType}</p>
                <p><strong>Color:</strong> ${color}</p>
            </div>
        </div>

        <div style="margin-top: 30px; border-top: 3px solid #667eea; padding-top: 30px;">
            <h3 style="color: #667eea; margin-bottom: 20px;">Desglose de Costos:</h3>
            <div class="panel-details">
                <p><strong>Costo Base (${windowType}):</strong> $${baseCost}</p>
                <p><strong>Costo Color (${color}):</strong> $${colorCost}</p>
                <p><strong>Costo Vidrio (${glassType}):</strong> $${glassCost}</p>
                <p style="border-top: 1px solid #e0e0e0; padding-top: 10px; margin-top: 10px;"><strong>Subtotal:</strong> $${totalBeforeTax}</p>
                <p><strong>+ 18%:</strong> $${(parseFloat(totalWithTax) - parseFloat(totalBeforeTax)).toFixed(2)}</p>
                <p style="color: #667eea; font-weight: 700; font-size: 1.1em; border-top: 1px solid #e0e0e0; padding-top: 10px; margin-top: 10px;">Total con 18%: $${totalWithTax}</p>
                
                <p style="margin-top: 25px; font-size: 1.4em; color: #667eea; font-weight: 700; border-top: 3px solid #667eea; padding-top: 20px;">Precio de Venta (sin taxes): $${salePrice}</p>
            </div>
        </div>
    `;
    
    vinylResultDetails.innerHTML = html;
    navigateTo('vinylResult');
}

// Generar PDF para Shower Door
function generatePDF() {
    const { projectName, glassThickness, glassType, numPanels, percentageIncrease, hwValue, laborCost, subtotalAllPanels, percentageAmount, hwWithPercentage, totalFinal, panelsDetails } = currentData;
    
    let content = `
╔════════════════════════════════════════════════════════════════════════════╗
║          COTIZADOR DE VIDRIO TEMPERED - MGM MIRROR                        ║
║                    COTIZACIÓN DE SHOWER DOOR                              ║
╚════════════════════════════════════════════════════════════════════════════╝

INFORMACIÓN DEL PROYECTO:
═════════════════════════════════════════════════════════════════════════════
Proyecto:                 ${projectName}
Tipo de Vidrio:           ${glassType}
Grosor:                   ${glassThickness}"
Cantidad de Paneles:      ${numPanels}

DETALLES POR PANEL:
═════════════════════════════════════════════════════════════════════════════
`;
    
    panelsDetails.forEach(panel => {
        content += `
Panel ${panel.number}: ${panel.length}" × ${panel.width}"
  Vidrio (${panel.squareFeet} sq ft):     $${panel.glassPrice}
  Clamps (${panel.clamps}):             $${(panel.clamps * hardwarePrices.clamps).toFixed(2)}
  Brackets (${panel.brackets}):         $${(panel.brackets * hardwarePrices.brackets).toFixed(2)}
  Orificios (${panel.orificios}):       $${(panel.orificios * hardwarePrices.orificios).toFixed(2)}
  Hinges (${panel.hinges}):            $${(panel.hinges * hardwarePrices.hinges).toFixed(2)}
  Cortes (${panel.cortes}):            $${(panel.cortes * hardwarePrices.cortes).toFixed(2)}
  Hardware Total:          $${panel.hardwarePrice}
  Subtotal:                $${panel.subtotal}
  + 13%:                   $${panel.with13Percent.toFixed(2)}
`;
    });
    
    content += `
═════════════════════════════════════════════════════════════════════════════
RESUMEN DE COSTOS:
═════════════════════════════════════════════════════════════════════════════
Subtotal (Vidrio + Hardware + 13%):  $${subtotalAllPanels}
Aumento ${percentageIncrease}%:                        $${percentageAmount}
Subtotal con Aumento:                $${(parseFloat(subtotalAllPanels) + parseFloat(percentageAmount)).toFixed(2)}

Hardware Base:                       $${hwValue.toFixed(2)}
Hardware con ${percentageIncrease}%:                 $${hwWithPercentage}

Mano de Obra (Labor):                $${laborCost.toFixed(2)}

═════════════════════════════════════════════════════════════════════════════
TOTAL FINAL:                         $${totalFinal}
═════════════════════════════════════════════════════════════════════════════

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

╔════════════════════════════════════════════════════════════════════════════╗
║  Esta cotización es válida. Para más información, contacte a MGM.         ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cotizacion_${projectName.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Generar PDF para Window Vinyl
function generateVinylPDF() {
    const { width, height, glassType, windowType, color, baseCost, colorCost, glassCost, totalBeforeTax, totalWithTax, salePrice } = currentData;
    
    let content = `
╔════════════════════════════════════════════════════════════════════════════╗
║          COTIZADOR DE VIDRIO TEMPERED - MGM MIRROR                        ║
║                   COTIZACIÓN WINDOW VINYL                                 ║
╚════════════════════════════════════════════════════════════════════════════╝

INFORMACIÓN DE LA VENTANA:
═════════════════════════════════════════════════════════════════════════════
Ancho:                    ${width}"
Alto:                     ${height}"
Tipo de Vidrio:           ${glassType}
Tipo de Ventana:          ${windowType}
Color:                    ${color}

DETALLE DE COSTOS:
═════════════════════════════════════════════════════════════════════════════
Costo Base:               $${baseCost}
Costo Color:              $${colorCost}
Costo Vidrio:             $${glassCost}
Subtotal:                 $${totalBeforeTax}
Impuesto (18%):           $${(parseFloat(totalWithTax) - parseFloat(totalBeforeTax)).toFixed(2)}
Total con 18%:            $${totalWithTax}

═════════════════════════════════════════════════════════════════════════════
PRECIO DE VENTA (Sin taxes): $${salePrice}
═════════════════════════════════════════════════════════════════════════════

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

╔════════════════════════════════════════════════════════════════════════════╗
║  Esta cotización es válida. Para más información, contacte a MGM.         ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cotizacion_window_vinyl_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
    navigateTo('main');
});
