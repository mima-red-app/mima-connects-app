# MimaConnect

App móvil (Expo + React Native) para encontrar profesionales de servicios del hogar: electricistas, plomeros, pintores y más. Incluye autenticación, home con destacados, explorador con buscador y asistente IA, y perfiles de profesional con reseñas.

## Stack

- **Expo SDK 57** + React Native 0.86 + React 19 (file-based routing con `expo-router`, `typedRoutes`)
- **HeroUI Native** (componentes UI) + **Uniwind** (Tailwind v4) + fuente **Poppins**
- **Supabase** (auth con sesión persistida en AsyncStorage)
- **react-hook-form + zod** (formularios con validación)
- **pnpm** como gestor de paquetes

## Funcionalidades

- **Auth**: login/registro con Supabase, sesión persistida, rutas protegidas (`Stack.Protected`), redirect automático según sesión y loader de pantalla completa solo durante la llamada real.
- **Home**: scroll con categorías (pills, 6 visibles → "Ver todas" va a Explorar con filtro), profesionales destacados (carrusel con snap) y recomendados por la comunidad.
- **Explorar**: buscador por nombre/servicio/ubicación (insensible a tildes), categorías con selección toggle, resultados en lista vertical y asistente IA inline que vuelca sugerencias en la lista principal.
- **Perfil de profesional** (`/professional/[id]`): stats, contactar, reseñas con diseño propio, "ver más" en comentarios largos y fecha relativa ("hace 3 días"). Back genérico a la pantalla anterior.
- **UI**: tema HeroUI personalizado (light/dark), tipografía uniforme y responsiva (`useTypeScale`), header reutilizable con back automático y loader global.

## Estructura

```
src/
├── app/                    # Rutas (expo-router)
│   ├── _layout.tsx         # Providers, fuentes, sesión y rutas protegidas
│   ├── index.tsx           # Redirect según sesión
│   ├── (auth)/             # login, register
│   ├── (tab)/              # home, explore (tabs)
│   └── professional/[id].tsx
├── components/             # Header, Loader, Text (Poppins), Category, Review…
├── features/
│   ├── auth/               # service, hooks (useAuth, useCurrentUser), AuthForm
│   ├── professional/       # cards, listas, datos y tipos
│   └── ai/                 # Asistente IA + matcher por palabras clave
└── util/                   # supabase client, responsive, search, time-ago
assets/fonts/               # Poppins empaquetada en local
```

## Puesta en marcha

1. Instalar dependencias:

   ```bash
   pnpm install
   ```

2. Crear un archivo `.env` con las claves de Supabase:

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   EXPO_PUBLIC_SUPABASE_KEY=tu-anon-key
   ```

   > Para registro con login inmediato (sin correo de confirmación): en el dashboard de Supabase → Authentication → Providers → Email → desactivar **"Confirm email"**.

3. Iniciar la app:

   ```bash
   npx expo start
   ```

   Abrir con [Expo Go](https://expo.dev/go), emulador Android o `npx expo run:android` (los cambios de `app.json` nativo requieren rebuild, no basta el reload).

## Verificación

```bash
npx tsc --noEmit                                  # tipos
npx expo export --platform android                 # bundle sin errores
```

## Notas

- Las fuentes Poppins van empaquetadas en `assets/fonts` (la carga desde `@expo-google-fonts` fallaba por el `+` en rutas pnpm de Metro).
- Los datos de profesionales/reseñas y la IA son mocks locales listos para conectar a Supabase (`ai-matcher.ts`, `data/professionals.ts`).
