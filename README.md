# 🚀 Pokémon Static App

Una aplicación web moderna y responsive para explorar el mundo Pokémon, construida con Astro, SolidJS y Tailwind CSS.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)

## 🌐 Sitio en Vivo

<!-- TODO: Agregar el enlace del sitio desplegado aquí -->
**URL del sitio:** [Próximamente - Agregar enlace de despliegue]

## ✨ Características Principales

### 🎨 **Diseño Moderno y Responsive**
- Interfaz minimalista y elegante
- Totalmente responsive para móviles, tablets y escritorio
- Tema oscuro/claro con toggle dinámico
- Transiciones suaves y animaciones
- Colores temáticos de Pokémon

### 📱 **Funcionalidades Principales**
- **Exploración de Pokémon**: Navegación paginada de los primeros 151 Pokémon
- **Detalles Individuales**: Página dedicada para cada Pokémon con información completa
- **Sistema de Favoritos**: Agregar/eliminar Pokémon favoritos con persistencia local
- **Audio**: Reproducir los gritos característicos de cada Pokémon
- **Búsqueda Visual**: Imágenes de alta calidad y artwork oficial

### ⚡ **Tecnologías y Características Técnicas**
- **Astro**: Framework principal para generación estática
- **SolidJS**: Componentes reactivos para funcionalidades dinámicas
- **Tailwind CSS**: Estilos utility-first con tema personalizado
- **TypeScript**: Tipado estático para mejor desarrollo
- **View Transitions**: Navegación fluida entre páginas
- **LocalStorage**: Persistencia de preferencias y favoritos
- **PokeAPI**: Integración con la API oficial de Pokémon

### 🎯 **Páginas y Rutas**
- **Inicio** (`/`): Página principal con introducción y navegación
- **Lista de Pokémon** (`/pokemons/[page]`): Exploración paginada
- **Detalles** (`/pokemons/[name]`): Información completa de cada Pokémon
- **Favoritos** (`/favorites`): Gestión de Pokémon favoritos
- **Demo Components** (`/demo`, `/islands`): Páginas de demostración

## 🚀 Project Structure

El proyecto está organizado siguiendo las mejores prácticas de Astro:

```text
PokemonPageAstro/
├── public/                    # Archivos estáticos
│   └── favicon.svg           # Icono del sitio
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── pokemons/        # Componentes específicos de Pokémon
│   │   │   ├── FavoritePokemonCard.tsx
│   │   │   ├── FavoritePokemons.tsx
│   │   │   └── PokemonCard.astro
│   │   ├── shared/          # Componentes compartidos
│   │   │   ├── NavBar.astro
│   │   │   └── Title.astro
│   │   ├── Counter.tsx      # Componente contador (demo)
│   │   └── ThemeToggle.tsx  # Toggle de tema oscuro/claro
│   ├── consts/              # Constantes del proyecto
│   │   └── site-info.ts
│   ├── icons/               # Iconos SVG personalizados
│   │   ├── heart-full.svg
│   │   └── heart-outline.svg
│   ├── interfaces/          # Tipos TypeScript
│   │   ├── favorite-pokemon.ts
│   │   └── pokemon-list.response.ts
│   ├── layouts/            # Layouts de página
│   │   └── MainLayout.astro
│   ├── pages/              # Rutas de la aplicación
│   │   ├── index.astro      # Página principal
│   │   ├── demo/           # Páginas de demostración
│   │   ├── favorites/      # Página de favoritos
│   │   ├── islands/        # Demo de islas de hidratación
│   │   ├── pokemon/        # Rutas dinámicas por ID
│   │   └── pokemons/       # Rutas dinámicas por nombre/página
│   ├── utils/              # Utilidades
│   │   └── theme.ts        # Gestión de temas
│   └── env.d.ts           # Definiciones de tipos de entorno
├── astro.config.mjs       # Configuración de Astro
├── tailwind.config.mjs    # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## 🎮 Funcionalidades Detalladas

### 🏠 **Página Principal**
- Hero section con título dinámico
- Navegación intuitiva hacia las diferentes secciones
- Estadísticas en tiempo real de favoritos
- Links de acceso rápido a funcionalidades principales

### 📊 **Lista de Pokémon**
- Navegación paginada con controles intuitivos
- Tarjetas de Pokémon con imagen, nombre y ID
- Lazy loading de imágenes para mejor rendimiento
- Animaciones de entrada escalonadas

### 🔍 **Página de Detalles**
- Información completa del Pokémon seleccionado
- Imagen de alta resolución del artwork oficial
- Reproducción del grito característico
- Botón de favoritos con feedback visual inmediato
- Navegación contextual (breadcrumbs)
- Botones de acción secundarios

### ❤️ **Sistema de Favoritos**
- Agregar/eliminar Pokémon de favoritos
- Persistencia en localStorage
- Contador dinámico en la navegación
- Página dedicada para gestionar favoritos
- Sincronización en tiempo real entre pestañas
- Estados vacíos informativos

### 🌙 **Tema Dinámico**
- Toggle entre tema claro y oscuro
- Respeta preferencias del sistema
- Transiciones suaves entre temas
- Persistencia de preferencia del usuario
- Prevención de FOUC (Flash of Unstyled Content)

### 📱 **Responsive Design**
- Diseño mobile-first
- Breakpoints optimizados para todos los dispositivos
- Menú de navegación responsive
- Grids adaptativos
- Tipografía escalable

## 🧞 Commands

Todos los comandos se ejecutan desde la raíz del proyecto:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Instala las dependencias del proyecto           |
| `pnpm run dev`            | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm run build`          | Construye el sitio para producción en `./dist/` |
| `pnpm run preview`        | Previsualiza la build localmente                |
| `pnpm run astro ...`      | Ejecuta comandos CLI de Astro                   |
| `pnpm run astro -- --help`| Obtiene ayuda del CLI de Astro                  |

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Pasos para desarrollo local

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd PokemonPageAstro
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   pnpm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4321
   ```

### Build para producción

```bash
# Construir el sitio estático
pnpm run build

# Previsualizar la build
pnpm run preview
```

## 🚀 Despliegue

### Preparación para despliegue
El proyecto está optimizado para despliegue estático en cualquier CDN o servicio de hosting:

- **Vercel**: Despliegue automático desde Git
- **Netlify**: Drag & drop o Git integration  
- **GitHub Pages**: Actions workflow incluido
- **AWS S3 + CloudFront**: Distribución global
- **Cloudflare Pages**: Edge computing

### Variables de entorno
No requiere variables de entorno especiales. Toda la configuración está en:
- `astro.config.mjs`
- `tailwind.config.mjs` 
- `src/consts/site-info.ts`

### URL del sitio desplegado
<!-- 🔗 Actualizar esta sección cuando el sitio esté en línea -->
**Sitio en producción:** [Agregar enlace aquí]

---

## 🎯 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework principal
- **[SolidJS](https://solidjs.com)** - Componentes reactivos
- **[Tailwind CSS](https://tailwindcss.com)** - Framework de CSS
- **[TypeScript](https://typescriptlang.org)** - Tipado estático
- **[PokeAPI](https://pokeapi.co)** - API de datos Pokémon

## 👨‍💻 Desarrollado por

**Brandon Valencia** - [GitHub](https://github.com/[tu-usuario])

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👀 ¿Quieres aprender más?

- [Documentación de Astro](https://docs.astro.build)
- [Discord de Astro](https://astro.build/chat)
- [SolidJS Docs](https://solidjs.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
