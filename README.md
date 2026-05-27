# 🪟 Cotizador de Vidrio Tempered - MGM Mirror

Aplicación web elegante para cotizar puertas de ducha y productos de vidrio tempered.

## ✨ Características

- 🎯 **Proceso de Cotización Completo**: Desde selección de opciones hasta generación de cotizaciones
- 📊 **Cálculo Automático**: Fórmula profesional para cálculo de pies cuadrados y precios
- 💾 **Descarga de Cotizaciones**: Genera archivos de texto descargables
- 📱 **Diseño Responsivo**: Compatible con desktop y dispositivos móviles
- 🎨 **Interfaz Elegante**: Gradientes modernos y animaciones suaves
- 🗂️ **Base de Datos Completa**: 19 tipos de vidrio tempered con 3 grosores

## 📋 Datos de Vidrio

### Grosores Disponibles
- 1/4"
- 3/8"
- 1/2"

### Tipos de Vidrio por Grosor

#### 1/4"
- Clear ($4.40)
- Mirror ($0.00)
- Pilkington energy ($9.85)
- Bronze ($8.60)
- Green ($8.65)
- Grey ($8.65)
- Low iron ($12.00)
- Acid etch ($9.80)

#### 3/8"
- Clear ($8.25)
- Low iron ($15.00)
- Acid etch ($19.10)
- Acid etch low iron ($24.25)
- Shower guard ($17.50)
- Low iron shower guard ($21.00)

#### 1/2"
- Clear ($10.30)
- Acid etch ($22.85)
- Acid etch low iron ($28.50)
- Low iron ($17.30)
- Shower guard ($20.75)

## 🚀 Uso

1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. Haz clic en "Shower Door"
4. Completa el formulario:
   - Selecciona cantidad de paneles (1-6)
   - Elige grosor de vidrio
   - Selecciona tipo de vidrio
   - Ingresa medidas en pulgadas
5. La cotización se calcula automáticamente
6. Descarga el resultado como archivo de texto

## 📐 Fórmula de Cálculo

```
Pies Cuadrados = REDONDEAR.MAS((Largo × Ancho) / 144)
Precio Panel = Pies Cuadrados × Precio Temper por Sq Ft
Total = Suma de todos los paneles
```

### Ejemplo
- Medidas: 36" × 76"
- Cálculo: (36 × 76) / 144 = 19 sq ft (redondeado)
- Tipo: Clear 1/4"
- Precio: 19 × $4.40 = $83.60

## 📁 Estructura de Archivos

```
mgmmirror/
├── index.html              # Estructura HTML
├── styles.css              # Estilos CSS
├── script.js               # Lógica JavaScript
├── data.js                 # Base de datos de precios
├── precio_vidrio_tempered.txt  # Datos originales
└── README.md              # Este archivo
```

## 🎨 Características de Diseño

- Gradiente Púrpura/Azul: `#667eea` a `#764ba2`
- Animaciones suaves de transición
- Efectos hover interactivos
- Validación de formularios
- Responsivo para todos los dispositivos

## 💻 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (opcional, funciona offline)

## 📝 Notas

- Todos los precios están en USD por pies cuadrados
- Las medidas deben ingresarse en pulgadas
- Las cotizaciones se pueden descargar como archivos de texto
- La aplicación funciona completamente en el navegador

## 📞 Soporte

Para más información o soporte, contacta a MGM Mirror.

---

**Versión 1.0** - Desarrollado con HTML5, CSS3 y JavaScript Vanilla