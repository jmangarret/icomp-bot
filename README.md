# iCompBot

Sistema de **automatización conversacional a medida** para negocios en Colombia. No es un chatbot de respuestas genéricas: consulta inventarios, agendas, CRMs y documentos oficiales, y responde con datos anclados a tu operación.

Desarrollado por [iComp Soluciones](https://icompsoluciones-dev.github.io).

## Qué hace

iCompBot atiende al cliente en el canal donde ya te escriben (WhatsApp, Instagram o ambos), entiende la pregunta y ejecuta lógica de negocio:

- Consulta inventario, precios y políticas **sin inventar datos**.
- Califica el lead (presupuesto, zona, producto, urgencia).
- Agenda citas o visita cuando hay cupo real.
- Transfiere la conversación al equipo comercial **lista para cotizar**.

Ejemplos de flujo:

| Industria | Pregunta típica | Qué hace el bot |
|-----------|-----------------|-----------------|
| Inmobiliaria | ¿Hay apto en El Poblado bajo $500 millones? | Query a inventario, responde en COP, ofrece dossier o visita |
| Clínica | Cita urgente con dermatólogo esta semana | Consulta agenda / EHR y congela el slot |
| E-commerce | ¿Ya despacharon el pedido #4890? | Webhook de tienda + logística (p. ej. Servientrega) |

## Cómo se usa (lado negocio)

1. **Canal de entrada**  
   WhatsApp Business, Instagram DMs u omnicanal.

2. **Fuente de verdad**  
   Documentos, catálogo, hojas de cálculo, SQL, ERP/CRM o tienda. El agente **no improvisa precios ni políticas**.

3. **Conversación**  
   El usuario pregunta en lenguaje natural. El sistema recupera contexto, aplica reglas (stock, ciudad, pasarela, horario) y responde.

4. **Cierre o handoff**  
   Agenda, envía ficha, o pasa al asesor con variables de venta ya capturadas.

Para evaluar un caso concreto se usa un brief (web o perfil, canal saturado, software a integrar, presupuesto) y se continúa por WhatsApp.

## Arquitectura (concepto)

```
Cliente (WhatsApp / IG / Web)
        │
        ▼
  Orquestador conversacional
        │
        ├── RAG (embeddings + base vectorial + prompt estricto)
        ├── APIs / webhooks (CRM, tienda, calendario, pagos)
        └── SQL / Sheets / ERP (inventario y estado real)
        │
        ▼
  Respuesta + calificación + handoff comercial
```

El diseño se basa en **RAG con modo estricto**: embeddings del mensaje, recuperación de contexto (documentos e inventario) y un LLM con instrucciones de no alucinar fuera de esa evidencia.

## Tecnologías y herramientas implicadas

Stack típico de un despliegue (varía por cliente):

### Lenguaje y runtime

- **Python** para el handler RAG y orquestación.
- Posible capa **Node.js** si el canal o webhooks ya viven en ese ecosistema.

### IA y recuperación

- **LLM** (p. ej. OpenAI) para generar la respuesta.
- **Embeddings** (p. ej. OpenAI Embedding) para indexar preguntas y documentos.
- **Base vectorial** (p. ej. **Pinecone**) para similitud semántica.
- **RAG** con prompts restrictivos anclados a documentos, precios COP/USD y políticas oficiales.

### Canales

- **WhatsApp Business API** (Meta / BSP).
- **Instagram Messaging** (DMs).
- Widget o web si el negocio también atiende desde sitio.

### Datos e integraciones

- **SQL** para inventario y consultas en tiempo real.
- **Google Sheets** como fuente ligera.
- CRM / ventas: **HubSpot**, **Zoho**.
- Contabilidad Colombia: **Siigo**.
- E-commerce: **Shopify**, **WooCommerce** (webhooks de pedido y logística).
- Pagos: **Wompi**, **Bold**.
- Calendario / EHR para clínicas (API de agenda).

### Operación

- Webhooks (pedidos, estados de envío).
- Logs y trazas por conversación (auditoría de “de dónde salió este precio”).
- Handoff humano cuando el caso sale de las reglas.

## Principios de producto

1. **Cero alucinaciones operativas** — precios, stock y políticas solo desde fuentes conectadas.
2. **Integración nativa por API** — no copiar/pegar catálogos en un constructor de bots.
3. **Conversión primero** — el flujo existe para calificar y cerrar, no solo para “contestar amable”.

## Qué no es

- Un FAQ estático ni un bot de plantillas tipo ManyChat sin backend.
- Un LLM suelto sobre tu web sin inventario ni CRM.
- Un producto self-service genérico: cada instancia se **desarrolla e integra** contra el stack del cliente.

## Requisitos para ponerlo en marcha

- Canal oficial (WhatsApp Business / Instagram) con acceso a API.
- Fuente de datos estable (SQL, Sheets, ERP, tienda o PDFs/políticas a indexar).
- Definición de reglas: qué puede responder el bot y cuándo pasa a humano.
- Integraciones a conectar (CRM, pagos, logística, agenda).

## Contacto

- Marca: **iCompBot**
- Comercial / demo: WhatsApp (brief desde la landing o mensaje directo)
- Powered by **iComp Soluciones**
