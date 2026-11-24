# InvestLab web + InvestLab AI (Groq + Vercel)

## Estructura (en la raíz del proyecto de Vercel, junto a index.html)
    api/chat.js          endpoint que habla con Groq (la clave queda en el servidor)
    api/_knowledge.js    lo que sabe la IA sobre la comunidad y el producto (edítalo)
    index.html           la web completa (el chat ya llama a /api/chat)
    package.json

## Puesta en marcha
1. Crea una clave en https://console.groq.com/keys
2. Vercel → tu proyecto → Settings → Environment Variables:
   - GROQ_API_KEY = tu clave   (Production, Preview y Development)
   - GROQ_MODEL   = llama-3.3-70b-versatile   (opcional; alternativas: llama-3.1-8b-instant, más rápido y barato)
3. Sube la carpeta api/ y vuelve a desplegar (las variables nuevas solo se aplican en un despliegue nuevo).
4. Prueba: curl -X POST https://myinvestlab.vercel.app/api/chat -H "content-type: application/json" \
     -d '{"messages":[{"role":"user","content":"¿Qué es InvestLab?"}]}'

## Protecciones incluidas
- Clave solo en el servidor. Límite de 12 mensajes/min por IP, mensajes de 1.200 caracteres máx., historial de 10 turnos, 500 tokens de respuesta.
- La IA solo habla de InvestLab, inversión y economía; no da recomendaciones ni predicciones.
- Para un límite estricto entre instancias, añade un almacén externo (p. ej. Upstash). Opcional.

## Mantenerla al día
Cuando cambies enlaces, canales o preguntas frecuentes, edita api/_knowledge.js y vuelve a desplegar.

## Notas de la web
- Si /api/chat no responde (por ejemplo, abriendo index.html en local), InvestLab AI pasa solo a «Modo glosario»: contesta con los 54 términos del glosario y las preguntas frecuentes de la comunidad.
- El endpoint está en una sola línea al inicio del script: const AI_ENDPOINT='/api/chat';
- El formulario sigue usando FormSubmit (investlab@outlook.es); el primer envío pide confirmar el correo de activación.

## Archivos del hero (vídeo de fondo, solo escritorio)
Sube `hero.mp4` y `trailer-poster.jpg` a la misma carpeta raíz que `index.html` (junto a `api/`). En móvil se mantiene el hero de texto.

## Páginas añadidas
- `glosario/*.html` (54 términos) + `glosario/index.html`, generados con `pages.py` desde el glosario de `index.html`.
- `sobre.html`, `404.html`, `og-image.png` (1200×630), `sitemap.xml` (57 URLs) y `vercel.json` (`cleanUrls`: /glosario, /sobre).
- Analítica sin cookies: activar **Analytics** en el panel de Vercel (Project → Analytics).
- Sube TODOS los archivos y carpetas (incluidos `hero.mp4` y `trailer-poster.jpg`).
