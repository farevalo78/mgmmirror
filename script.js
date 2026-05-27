// Variables globales para mantener el estado
let currentData = {};

// Navegación entre páginas
function navigateTo(page) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Mostrar página solicitada
    switch(page) {
        case 'main':
            document.getElementById('mainPage').classList.add('active');
            break;
        case 'showerDoor':
            document.getElementById('showerDoorPage').classList.add('active');
            updateGlassTypes(); // Actualizar tipos de vidrio al abrir
            break;
        case 'windowVinyl':
            alert('Función Window Vinyl - Próximamente disponible');
            break;
        case 'panelMeasurements':
            document.getElementById('panelMeasurementsPage').classList.add('active');
            break;
        case 'result':
            document.getElementById('resultPage').classList.add('active');
            break;
    }
}

// Iniciar medidas de paneles
function startPanelMeasurements() {
    const numPanels = parseInt(document.getElementById('numPanels').value);
    const glassThickness = document.getElementById('glassThickness').value;
    const glassType = document.getElementById('glassType').value;
    
    // Validar que todos los campos estén completo
    if (!numPanels || !glassThickness || !glassType) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Guardar datos
    currentData = {
        numPanels: numPanels,
        glassThickness: glassThickness,
        glassType: glassType,
        panels: []
    };
    
    // Crear formularios dinámicos para cada panel
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
        `;
        container.appendChild(panelForm);
    }
    
    // Navegar a la página de medidas
    navigateTo('panelMeasurements');
}

// Calcular cotización
function calculateQuote() {
    const { numPanels, glassThickness, glassType } = currentData;
    
    let totalPrice = 0;
    let panelsDetails = [];
    
    // Procesar cada panel
    for (let i = 1; i <= numPanels; i++) {
        const length = parseFloat(document.getElementById(`length${i}`).value);
        const width = parseFloat(document.getElementById(`width${i}`).value);
        
        // Validar datos
        if (!length || !width || length <= 0 || width <= 0) {
            alert(`Por favor ingresa medidas válidas para el panel ${i}`);
            return;
        }
        
        // Fórmula: (largo × ancho) / 144, redondeado al superior
        const squareInches = length * width;
        const squareFeet = Math.ceil(squareInches / 144);
        
        // Obtener precio temper de la tabla
        const pricePerSquareFoot = getTemperPrice(glassThickness, glassType);
        
        if (pricePerSquareFoot === 0 && glassType !== 'Mirror') {
            alert(`Precio no encontrado para ${glassType} de ${glassThickness}"`);
            return;
        }
        
        const panelPrice = squareFeet * pricePerSquareFoot;
        totalPrice += panelPrice;
        
        panelsDetails.push({
            number: i,
            length: length.toFixed(2),
            width: width.toFixed(2),
            squareFeet: squareFeet,
            pricePerSquareFoot: pricePerSquareFoot.toFixed(2),
            panelPrice: panelPrice.toFixed(2)
        });
    }
    
    // Mostrar resultados
    displayResults(panelsDetails, totalPrice);
}

// Mostrar resultados de cotización
function displayResults(panelsDetails, totalPrice) {
    const resultDetails = document.getElementById('resultDetails');
    
    let html = `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">Detalles de la Cotización</h2>
            <div class="panel-details">
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
                <p>Pies Cuadrados: ${panel.squareFeet} sq ft</p>
                <p>Precio Unitario: $${panel.pricePerSquareFoot} / sq ft</p>
                <p style="color: #667eea; font-weight: 700; font-size: 1.1em;">Subtotal: $${panel.panelPrice}</p>
            </div>
        `;
    });
    
    // Total
    html += `
        <div class="result-item total-price">
            <span>TOTAL:</span>
            <span>$${totalPrice.toFixed(2)}</span>
        </div>
    `;
    
    resultDetails.innerHTML = html;
    
    // Guardar total para descargar
    currentData.totalPrice = totalPrice.toFixed(2);
    currentData.panelsDetails = panelsDetails;
    
    // Navegar a resultados
    navigateTo('result');
}

// Generar y descargar PDF como texto
function generatePDF() {
    const { glassThickness, glassType, numPanels, totalPrice, panelsDetails } = currentData;
    
    let content = `
╔════════════════════════════════════════════════════════════════════╗
║          COTIZADOR DE VIDRIO TEMPERED - MGM MIRROR                ║
║                    COTIZACIÓN DE SHOWER DOOR                      ║
╚════════════════════════════════════════════════════════════════════╝

INFORMACIÓN DEL PROYECTO:
──────────────────────────────────────────────────────────────────────
Tipo de Vidrio:           ${glassType}
Grosor:                   ${glassThickness}"
Cantidad de Paneles:      ${numPanels}

DETALLES POR PANEL:
──────────────────────────────────────────────────────────────────────
`;
    
    panelsDetails.forEach(panel => {
        content += `
Panel ${panel.number}:
  Medidas:                ${panel.length}" × ${panel.width}"
  Pies Cuadrados:         ${panel.squareFeet} sq ft
  Precio Unitario:        $${panel.pricePerSquareFoot} / sq ft
  Subtotal:               $${panel.panelPrice}
`;
    });
    
    content += `
──────────────────────────────────────────────────────────────────────
TOTAL GENERAL:                              $${totalPrice}
──────────────────────────────────────────────────────────────────────

Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

╔════════════════════════════════════════════════════════════════════╗
║  Esta cotización es válida. Para más información, contacte a MGM. ║
╚════════════════════════════════════════════════════════════════════╝
`;
    
    // Crear blob y descargar
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cotizacion_shower_door_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    navigateTo('main');
});