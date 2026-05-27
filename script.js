// Precios de hardware
const hardwarePrices = {
    clamps: 20,
    brackets: 28,
    orificios: 14,
    hinges: 40,
    cortes: 100
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
            alert('Función Window Vinyl - Próximamente disponible');
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
    }
}

// Iniciar medidas de paneles
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
    
    // Validar que todos los campos estén completos
    for (let i = 1; i <= numPanels; i++) {
        const length = document.getElementById(`length${i}`).value;
        const width = document.getElementById(`width${i}`).value;
        
        if (!length || !width) {
            alert(`Por favor ingresa las medidas del panel ${i}`);
            return;
        }
    }
    
    // Guardar datos de hardware
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

// Calcular cotización final
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
        
        // Aumentar 13% al panel
        const panelWith13Percent = panelSubtotal * 1.13;
        
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
            with13Percent: panelWith13Percent.toFixed(2)
        });
    }
    
    // Subtotal antes de % adicional
    const subtotalAllPanels = panelsDetails.reduce((sum, p) => sum + parseFloat(p.with13Percent), 0);
    
    // Aplicar porcentaje adicional
    const percentageAmount = subtotalAllPanels * (percentageIncrease / 100);
    const subtotalWithPercentage = subtotalAllPanels + percentageAmount;
    
    // Hardware con porcentaje
    const hwWithPercentage = hwValue + (hwValue * (percentageIncrease / 100));
    
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

// Mostrar resultados
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
                    <p style="color: #667eea; font-weight: 700; font-size: 1.05em;"><strong>+ 13%:</strong> $${panel.with13Percent}</p>
                </div>
            </div>
        `;
    });
    
    // Resumen de costos
    html += `
        <div style="margin-top: 30px; border-top: 3px solid #667eea; padding-top: 30px;">
            <h3 style="color: #667eea; margin-bottom: 20px;">Resumen de Costos:</h3>
            <div class="panel-details">
                <p><strong>Subtotal Vidrio + Hardware + 13%:</strong> $${subtotalAllPanels}</p>
                <p><strong>Aumento ${percentageIncrease}%:</strong> $${percentageAmount}</p>
                <p style="border-top: 1px solid #e0e0e0; padding-top: 10px; margin-top: 10px;"><strong>Subtotal con Aumento:</strong> $${(parseFloat(subtotalAllPanels) + parseFloat(percentageAmount)).toFixed(2)}</p>
                
                <p style="margin-top: 20px;"><strong>Hardware (HW): </strong> $${hwValue}</p>
                <p><strong>Hardware con ${percentageIncrease}%:</strong> $${hwWithPercentage}</p>
                
                <p style="margin-top: 20px; border-top: 2px solid #667eea; padding-top: 20px;"><strong>Mano de Obra (Labor):</strong> $${laborCost}</p>
                
                <p style="margin-top: 30px; font-size: 1.5em; color: #667eea; font-weight: 700; border-top: 3px solid #667eea; padding-top: 20px;">TOTAL FINAL: $${totalFinal}</p>
            </div>
        </div>
    `;
    
    resultDetails.innerHTML = html;
    navigateTo('result');
}

// Generar PDF
function generatePDF() {
    const { projectName, glassThickness, glassType, numPanels, percentageIncrease, hwValue, laborCost, subtotalAllPanels, percentageAmount, hwWithPercentage, totalFinal, panelsDetails } = currentData;
    
    let content = `
╔════════════════════════════════════════════════════════════════════╗
║          COTIZADOR DE VIDRIO TEMPERED - MGM MIRROR                ║
║                    COTIZACIÓN DE SHOWER DOOR                      ║
╚════════════════════════════════════════════════════════════════════╝

INFORMACIÓN DEL PROYECTO:
───────────────────────────────────────────────────────��──────────────
Proyecto:                 ${projectName}
Tipo de Vidrio:           ${glassType}
Grosor:                   ${glassThickness}"
Cantidad de Paneles:      ${numPanels}

DETALLES POR PANEL:
──────────────────────────────────────────────────────────────────────
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
  + 13%:                   $${panel.with13Percent}
`;
    });
    
    content += `
──────────────────────────────────────────────────────────────────────
RESUMEN DE COSTOS:
──────────────────────────────────────────────────────────────────────
Subtotal (Vidrio + Hardware + 13%):  $${subtotalAllPanels}
Aumento ${percentageIncrease}%:                        $${percentageAmount}
Subtotal con Aumento:                $${(parseFloat(subtotalAllPanels) + parseFloat(percentageAmount)).toFixed(2)}

Hardware Base:                       $${hwValue}
Hardware con ${percentageIncrease}%:                 $${hwWithPercentage}

Mano de Obra (Labor):                $${laborCost}

══════════════════════════════════════════════════════════════════════
TOTAL FINAL:                         $${totalFinal}
══════════════════════════════════════════════════════════════════════

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

╔════════════════════════════════════════════════════════════════════╗
║  Esta cotización es válida. Para más información, contacte a MGM. ║
╚════════════════════════════════════════════════════════════════════╝
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

document.addEventListener('DOMContentLoaded', function() {
    navigateTo('main');
});