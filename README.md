# SHO Equine Sports Medicine

Sitio web y portal de propietarios para una clínica de medicina deportiva equina. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (auth, base de datos y almacenamiento de imágenes).

## Requisitos

- Node.js 18+ y npm — **no están instalados en esta máquina todavía.** Instálalos desde [nodejs.org](https://nodejs.org/) o con Homebrew (`brew install node`) antes del siguiente paso.
- Una cuenta gratuita en [supabase.com](https://supabase.com) (auth + base de datos + storage).

## Primeros pasos

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local` con las llaves de tu proyecto de Supabase (Settings → API). Nunca pongas la `SUPABASE_SERVICE_ROLE_KEY` en una variable `NEXT_PUBLIC_*` — solo se usa en el servidor.

En el editor SQL de tu proyecto de Supabase, ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql). Esto crea las tablas (`caballos`, `registros_clinicos`, `imagenes_diagnosticas`, `mensajes_chat`, `profiles`) con Row Level Security activado: cada propietario solo puede ver sus propios caballos, y solo el rol `veterinario` puede escribir historias clínicas.

Luego:

```bash
npm run dev
```

Abre `http://localhost:3000`.

### Crear el primer veterinario

1. Regístrate normalmente desde `/login` (o crea el usuario desde el dashboard de Supabase → Authentication).
2. En la tabla `profiles`, cambia su `role` a `veterinario`:
   ```sql
   update profiles set role = 'veterinario' where id = '<uuid-del-usuario>';
   ```
3. Los demás usuarios quedan por defecto como `propietario` y solo verán los caballos donde `owner_id` sea su propio `id`.

## Estructura

```
src/app/(marketing)/   páginas públicas: inicio, educación continuada, contacto, pagos, privacidad, términos, login
src/app/portal/        portal de propietarios (protegido por middleware + verificación en el layout)
src/app/api/           formulario de contacto, cierre de sesión, callback de auth
src/components/        Navbar, Footer, formularios, visor de imágenes, chat, etc.
src/lib/supabase/      clientes de Supabase para navegador y servidor
supabase/schema.sql    esquema completo + políticas de Row Level Security
```

## Qué está resuelto y qué falta configurar

**Ya implementado:**

- Identidad visual (blanco / negro / navy + acento terracota opcional), tipografía Arial, diseño basado en tarjetas, logo real de SHO integrado (navbar, favicon, imagen social).
- Flujo de autenticación completo (login, logout, middleware que protege `/portal`).
- Portal de propietarios: listado de caballos, ficha del paciente, visor interactivo de imágenes diagnósticas (zoom), chat interno en tiempo real (Supabase Realtime).
- Historia clínica y vacunaciones por caballo.
- Educación Continuada (artículos/video/casos clínicos) con datos de ejemplo.
- Botones de pago segregados por país (CO/EC/PE/US).
- Secretos fuera del front-end (solo `NEXT_PUBLIC_*` llega al navegador; la service-role key es server-only).
- HTTPS forzado en producción (middleware + cabecera HSTS) — en Vercel esto ya es automático.
- Banner de consentimiento de cookies; Analytics (GA4) solo se carga si el usuario acepta.
- Meta títulos/descripciones por página, `sitemap.xml`, `robots.txt`, favicon, imagen social (Open Graph generada dinámicamente).
- Texto alternativo en todas las imágenes; `next/image` comprime y sirve WebP/AVIF automáticamente.
- Validación de formularios (Zod + react-hook-form) y protección anti-spam (honeypot) en el formulario de contacto.
- Página 404 personalizada.
- Diseño responsive (mobile-first) en todas las páginas.

**Pendiente de tu parte (no podíamos hacerlo sin tus credenciales/decisiones):**

- Crear el proyecto de Supabase y pegar sus llaves en `.env.local`.
- Reemplazar las fotografías de marcador de posición (`public/images/*.svg`) con fotos reales de los caballos. El logo real ya está en `public/brand/` y en uso (`src/components/Logo.tsx`, favicon, imagen social) — si luego lo necesitas sobre fondo oscuro, pide una exportación en PNG/SVG transparente, porque hoy es una imagen con fondo blanco.
- Añadir las URLs oficiales reales de MARE, ANIMAL SPORTS y TIENDA HERRAJES en `src/components/home/PartnersStrip.tsx` (hoy apuntan a `#`).
- Configurar los enlaces reales de pago por país en `.env.local` (`NEXT_PUBLIC_PAYMENT_LINK_*`) — no integramos una pasarela de pago real porque requiere tus propias cuentas y llaves de API.
- (Opcional) `NEXT_PUBLIC_GA_MEASUREMENT_ID` para Google Analytics 4, y las llaves de reCAPTCHA si quieres una segunda capa anti-spam además del honeypot.
- Pedir revisión legal de `/privacidad` y `/terminos` — son plantillas iniciales, no asesoría legal.
- Desplegar (Vercel es lo más simple con Next.js y fuerza HTTPS automáticamente) y conectar el dominio real.
- Una vez desplegado, correr Lighthouse/PageSpeed Insights sobre la URL real para la auditoría final de velocidad y contraste de color con las fotos reales ya cargadas.

## Despliegue recomendado

[Vercel](https://vercel.com) + este repositorio de GitHub: detecta Next.js automáticamente, sirve todo por HTTPS y permite configurar las variables de entorno desde su panel sin tocar el código.
