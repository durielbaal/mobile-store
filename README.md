# 📱 Mobile Store - Tienda de Dispositivos Móviles

Aplicación web SPA (Single Page Application) desarrollada con React para la visualización y compra de dispositivos móviles.

## 📋 Descripción

Este proyecto es una mini-aplicación de e-commerce especializada en dispositivos móviles que permite a los usuarios:
- Explorar un catálogo de productos
- Buscar dispositivos por marca o modelo
- Ver detalles técnicos completos de cada producto
- Seleccionar opciones (color y almacenamiento)
- Añadir productos al carrito de compra

## 🚀 Características Principales

### Vistas de la Aplicación

#### 1. **PLP (Product List Page) - Lista de Productos**
- Grid responsive con hasta 4 productos por fila
- Barra de búsqueda en tiempo real
- Filtrado por marca y modelo
- Tarjetas de producto con imagen, marca, modelo y precio
- Navegación directa a los detalles del producto

#### 2. **PDP (Product Details Page) - Detalle del Producto**
- Layout de dos columnas (imagen y detalles)
- Especificaciones técnicas completas
- Selectores de opciones (almacenamiento y color)
- Botón para añadir al carrito
- Validación de disponibilidad de precio
- Navegación de vuelta a la lista

### Componentes Clave

- **Header**: Navegación con breadcrumbs y contador de carrito
- **SearchBar**: Búsqueda en tiempo real
- **ProductItem**: Tarjeta de producto en la lista
- **ProductImage**: Visualización de imagen del producto
- **ProductDescription**: Especificaciones técnicas detalladas
- **ProductActions**: Selectores de opciones y botón de añadir al carrito

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería principal de UI
- **Tailwind CSS** - Framework de estilos (vía CDN)
- **React Router (Custom)** - Enrutamiento SPA con Hash Router
- **Fetch API** - Comunicación con el backend
- **LocalStorage** - Persistencia de datos en cliente

## 📁 Estructura del Proyecto

```
mobile-store/
├── public/
│   └── index.html              # HTML base de la aplicación
├── src/
│   ├── App.js                  # Componente principal y lógica del carrito
│   ├── index.js                # Punto de entrada de React
│   ├── components/
│   │   ├── Header.js           # Cabecera con breadcrumbs y carrito
│   │   ├── SearchBar.js        # Barra de búsqueda
│   │   ├── ProductItem.js      # Tarjeta de producto en lista
│   │   ├── ProductImage.js     # Componente de imagen
│   │   ├── ProductDescription.js # Detalles técnicos
│   │   └── ProductActions.js   # Selectores y botón añadir
│   ├── pages/
│   │   ├── ProductListPage.js  # Vista de listado (PLP)
│   │   └── ProductDetailPage.js # Vista de detalle (PDP)
│   ├── services/
│   │   ├── api.js              # Servicios de API y gestión de carrito
│   │   └── cache.js            # Sistema de caché con expiración
│   └── utils/
│       └── router.js           # Enrutador SPA personalizado
├── package.json
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd mobile-store
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar la aplicación en modo desarrollo**
```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## 📜 Scripts Disponibles

### `npm start`
Inicia la aplicación en modo desarrollo.
- Abre automáticamente en el navegador
- Hot-reload habilitado
- Puerto por defecto: 3000

### `npm run build`
Compila la aplicación para producción en la carpeta `build`.
- Optimiza el código para mejor rendimiento
- Minifica archivos
- Lista para desplegar

### `npm test`
Lanza el test runner en modo interactivo.

### `npm run lint`
Ejecuta ESLint para verificar la calidad del código.

## 🌐 Integración con API

### Endpoint Base
```
https://itx-frontend-test.onrender.com/api
```

### Endpoints Utilizados

#### 1. Obtener Lista de Productos
```
GET /api/product
```
**Respuesta:**
```json
[
  {
    "id": "0001",
    "brand": "Samsung",
    "model": "Galaxy S21",
    "price": 799,
    "imgUrl": "...",
    ...
  }
]
```

#### 2. Obtener Detalle de Producto
```
GET /api/product/:id
```
**Respuesta:**
```json
{
  "id": "0001",
  "brand": "Samsung",
  "model": "Galaxy S21",
  "price": 799,
  "cpu": "Exynos 2100",
  "ram": "8GB",
  "os": "Android 11",
  "displayResolution": "2400x1080",
  "battery": "4000mAh",
  "primaryCamera": ["64MP", "12MP", "12MP"],
  "dimentions": "151.7 x 71.2 x 7.9 mm",
  "weight": 169,
  "options": {
    "colors": [
      { "code": 1, "name": "Phantom Gray" },
      { "code": 2, "name": "Phantom White" }
    ],
    "storages": [
      { "code": 1, "name": "128GB" },
      { "code": 2, "name": "256GB" }
    ]
  }
}
```

#### 3. Añadir al Carrito
```
POST /api/cart
```
**Body:**
```json
{
  "id": "0001",
  "colorCode": 1,
  "storageCode": 2
}
```
**Respuesta:**
```json
{
  "count": 1
}
```

## 💾 Sistema de Caché

La aplicación implementa un sistema de caché inteligente para optimizar las peticiones:

### Características
- **Duración**: 1 hora (configurable)
- **Almacenamiento**: LocalStorage del navegador
- **Alcance**: Productos individuales y lista completa
- **Validación**: Timestamp automático para expiración

### Funcionamiento
1. Primera petición → API + Guardar en caché
2. Siguientes peticiones → Leer desde caché
3. Después de 1 hora → Revalidar desde API

## 🛒 Gestión del Carrito

### Implementación

Debido a limitaciones de CORS del backend (no permite `credentials: 'include'`), se implementó un **sistema de gestión de carrito en cliente**:

#### Características
- Almacenamiento en `localStorage`
- Persistencia entre sesiones
- Contador en tiempo real
- Función de vaciado de carrito

#### Estructura del Carrito
```json
[
  {
    "id": "0001",
    "colorCode": 1,
    "storageCode": 2,
    "addedAt": 1699564800000
  }
]
```

### Funciones Disponibles

```javascript
// Obtener cantidad de productos en el carrito
getCartCount() // → número

// Limpiar el carrito completamente
clearCart() // → 0

// Añadir producto al carrito
addToCart(productData) // → { count, success }
```

## 🎨 Diseño y UX

### Características de Diseño
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Grid Flexible**: Hasta 4 productos por fila en pantallas grandes
- **Hover Effects**: Efectos visuales en tarjetas de producto
- **Loading States**: Indicadores de carga durante peticiones
- **Error Handling**: Mensajes claros de error al usuario

### Validaciones
- ✅ Productos sin precio no pueden añadirse al carrito
- ✅ Los selectores se deshabilitan si el precio no está disponible
- ✅ Mensajes de error descriptivos
- ✅ Confirmación antes de vaciar el carrito

## 🔍 Búsqueda

La búsqueda es **en tiempo real** y filtra por:
- Marca del dispositivo
- Modelo del dispositivo
- Case-insensitive (no distingue mayúsculas/minúsculas)

## 🚧 Limitaciones Conocidas

1. **CORS**: El backend no permite `credentials: 'include'`, por lo que no se puede mantener sesión con cookies del servidor
2. **Gestión de Carrito**: Se implementó en cliente como workaround a las limitaciones de CORS
3. **API Externa**: Dependemos de un API externa que puede tener tiempos de respuesta variables

## 📝 Notas Técnicas

### Hash Router
Se utiliza Hash Router (`#/`) en lugar de Browser Router para:
- Evitar configuración de servidor para rutas
- Compatibilidad con despliegues estáticos
- Simplicidad en la implementación SPA

### LocalStorage vs SessionStorage
Se eligió `localStorage` sobre `sessionStorage` para:
- Mantener el carrito entre sesiones
- Persistencia de caché más duradera
- Mejor experiencia de usuario

### No se usa TypeScript
Como se especifica en los requisitos, se desarrolló en JavaScript ES6+ puro.

## 🐛 Solución de Problemas

### El carrito se resetea al añadir productos
**Solución**: Asegúrate de tener la última versión de `api.js` con el sistema de gestión local del carrito.

### Las imágenes no cargan
**Solución**: Se implementó un fallback a placeholder en caso de error de carga de imagen.

### Error de CORS
**Solución**: No usar `credentials: 'include'` en las peticiones fetch. El sistema actual gestiona el carrito localmente.

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica para ITX.

## 👥 Autor

Desarrollado como parte de la prueba técnica Front-End de ITX.

---

**Fecha de última actualización**: Noviembre 2024  
**Versión**: 1.0.0