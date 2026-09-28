const CONFIG = {
    telefonoWhatsApp: "573118002621",
    nombreMarca: "AiComp-Bot",
    mensajePredeterminado: "¡Hola! Vi la landing de AiComp-Bot y quiero agendar una demostración en vivo para mi negocio en Colombia."
};

const CLASE_TAB_ACTIVA = "py-4 border-r border-[#1E1E24] bg-[#1C1C1F] text-[#39FF14] font-bold uppercase tracking-wider transition-all border-b-2 border-b-[#39FF14]";
const CLASE_TAB_INACTIVA = "py-4 border-r border-[#1E1E24] text-gray-400 hover:bg-[#141416] hover:text-white uppercase tracking-wider transition-all";

const baseDeSimulaciones = {
    inmo: `
        <div class="flex flex-col items-end space-y-1">
            <span class="text-[10px] text-gray-500">CLIENTE (PROSPECTO)</span>
            <div class="bg-[#26262B] text-white px-4 py-2 max-w-[85%] border-r-2 border-gray-400">
                ¿Qué apartamentos tienen disponibles en El Poblado o Zona Norte por menos de $500 millones?
            </div>
        </div>
        <div class="flex flex-col items-start space-y-1">
            <span class="text-[10px] text-[#39FF14]">AICOMP-BOT // DB_QUERY_COL</span>
            <div class="bg-[#141416] text-[#39FF14] px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] font-bold">
                Ejecutando SQL Query en inventario real-time... ⚡
            </div>
            <div class="bg-[#141416] text-gray-300 px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] mt-1 leading-relaxed">
                Tengo 2 opciones disponibles: <strong>Apt 301</strong> ($420.000.000 COP) y <strong>Apt 104</strong> ($480.000.000 COP). Ambos con 2 alcobas y parqueadero. ¿Te interesa recibir el dossier en PDF o agendar una visita presencial?
            </div>
        </div>
    `,
    clinica: `
        <div class="flex flex-col items-end space-y-1">
            <span class="text-[10px] text-gray-500">CLIENTE (PACIENTE)</span>
            <div class="bg-[#26262B] text-white px-4 py-2 max-w-[85%] border-r-2 border-gray-400">
                Necesito una cita urgente con el dermatólogo para esta semana en Medellín/Bogotá.
            </div>
        </div>
        <div class="flex flex-col items-start space-y-1">
            <span class="text-[10px] text-[#39FF14]">AICOMP-BOT // CALENDAR_API</span>
            <div class="bg-[#141416] text-[#39FF14] px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] font-bold">
                Consultando agenda médica / EHR... 📅
            </div>
            <div class="bg-[#141416] text-gray-300 px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] mt-1 leading-relaxed">
                Consultando agenda del Dr. Silva (Medicina Prepaga / Particular)... Disponibles: <strong>Jueves 10:00 AM</strong> y <strong>Viernes 4:30 PM</strong>. Selecciona una opción para congelar la cita inmediatamente.
            </div>
        </div>
    `,
    ecom: `
        <div class="flex flex-col items-end space-y-1">
            <span class="text-[10px] text-gray-500">CLIENTE (COMPRADOR)</span>
            <div class="bg-[#26262B] text-white px-4 py-2 max-w-[85%] border-r-2 border-gray-400">
                Compré hace dos días y no sé si mi pedido #4890 ya fue despachado.
            </div>
        </div>
        <div class="flex flex-col items-start space-y-1">
            <span class="text-[10px] text-[#39FF14]">AICOMP-BOT // SHOPIFY_WEBHOOK</span>
            <div class="bg-[#141416] text-[#39FF14] px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] font-bold">
                Consultando Webhook Shopify & Logística Colombia... 📦
            </div>
            <div class="bg-[#141416] text-gray-300 px-4 py-2 max-w-[85%] border-l-2 border-[#39FF14] mt-1 leading-relaxed">
                Pedido <strong>#4890</strong> localizado. Estatus: Despachado por <strong>Servientrega</strong>. Código de guía: <strong>CO-992384</strong>. Tu paquete se encuentra en tránsito y llega mañana antes de las 6:00 PM.
            </div>
        </div>
    `
};

function irAWhatsApp() {
    const url = `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(CONFIG.mensajePredeterminado)}`;
    window.open(url, "_blank");
}

function irAFormulario() {
    const el = document.getElementById("seccion-formulario");
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
}

function cambiarSimulador(industria) {
    const contenedor = document.getElementById("chat-container");
    if (contenedor && baseDeSimulaciones[industria]) {
        contenedor.innerHTML = baseDeSimulaciones[industria];
    }

    ["inmo", "clinica", "ecom"].forEach((t) => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) {
            btn.className = t === industria ? CLASE_TAB_ACTIVA : CLASE_TAB_INACTIVA;
        }
    });
}

function procesarFormulario(event) {
    event.preventDefault();
    const web = document.getElementById("web_negocio").value.trim();
    const canal = document.getElementById("canal_saturado").value;
    const crm = document.getElementById("sistema_interno").value.trim() || "Ninguno / Por definir";
    const presupuestoEl = document.querySelector('input[name="presupuesto"]:checked');
    const presupuesto = presupuestoEl ? presupuestoEl.value : "No especificado";

    const mensajeFinal = `*NUEVA SOLICITUD DE DESARROLLO (${CONFIG.nombreMarca.toUpperCase()})* 🤖\n\n` +
        `• *Negocio / Perfil:* ${web}\n` +
        `• *Canal Crítico:* ${canal}\n` +
        `• *Integración CRM / Stack:* ${crm}\n` +
        `• *Estatus Inversión:* ${presupuesto}\n\n` +
        `_Hola, acabo de completar el brief en la landing de ${CONFIG.nombreMarca}. Me gustaría evaluar la viabilidad de este flujo para mi empresa en Colombia._`;

    const urlWhatsApp = `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(mensajeFinal)}`;
    window.open(urlWhatsApp, "_blank");
}

function aplicarNombreMarca() {
    document.title = `${CONFIG.nombreMarca} // Sistemas de Automatización Conversacional & RAG`;
    document.querySelectorAll(".brand-name-placeholder").forEach((el) => {
        el.textContent = CONFIG.nombreMarca;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarNombreMarca();
    cambiarSimulador("inmo");
});
