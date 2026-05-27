// Tabla completa de precios de vidrio tempered
// Estructura: grosor -> tipo -> temper (precio)

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

// Obtener tipos de vidrio disponibles por grosor
function getGlassTypesByThickness(thickness) {
    if (!thickness || !priceDatabase[thickness]) {
        return [];
    }
    return Object.keys(priceDatabase[thickness]).sort();
}

// Obtener precio temper para un tipo y grosor específico
function getTemperPrice(thickness, type) {
    return priceDatabase[thickness]?.[type] || 0;
}

// Actualizar opciones de tipo de vidrio en el formulario
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