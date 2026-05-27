// Tabla de precios de vidrio tempered
const priceDatabase = {
    "1/4": {
        "Clear": 4.4,
        "Mirror": 0,
        "Pilkington energy": 9.85,
        "bronze": 8.6,
        "green": 8.65,
        "grey": 8.65,
        "low iron": 12,
        "acid etch": 9.8
    },
    "3/8": {
        "clear": 8.25,
        "low iron": 15,
        "acid etch": 19.1,
        "acid etch low iron": 24.25,
        "shower guard": 17.5,
        "low iron shower guard": 21
    },
    "1/2": {
        "clear": 10.3,
        "acid etch": 22.85,
        "acid etch low iron": 28.5,
        "low iron": 17.3,
        "shower guard": 20.75
    }
};

// Obtener tipos de vidrio disponibles por grosor
function getGlassTypesByThickness(thickness) {
    if (!thickness || !priceDatabase[thickness]) {
        return [];
    }
    return Object.keys(priceDatabase[thickness]).sort();
}

// Actualizar opciones de tipo de vidrio
function updateGlassTypes() {
    const thickness = document.getElementById('glassThickness').value;
    const glassTypeSelect = document.getElementById('glassType');
    
    glassTypeSelect.innerHTML = '<option value="">Seleccione tipo</option>';
    
    if (thickness) {
        const types = getGlassTypesByThickness(thickness);
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            glassTypeSelect.appendChild(option);
        });
    }
}