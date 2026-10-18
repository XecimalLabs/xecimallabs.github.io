// Datos Mock de Aplicaciones/Proyectos de Xecimal Labs
const appsData = [
    {
        id: 0,
        title: "Xecimal Code Studio",
        category: "Herramientas",
        type: "herramientas",
        isFeatured: true,
        rating: 4.9,
        price: "Gratis",
        icon: "fa-code",
        bgGradient: "from-blue-600 to-cyan-500",
        description: "Entorno de desarrollo rápido totalmente funcional cliente-servidor basado en la web para prototipado acelerado de aplicaciones web modernas."
    },
    {
        id: 1,
        title: "X-Matrix Visualizer",
        category: "Proyectos",
        type: "juegos",
        isFeatured: true,
        rating: 4.8,
        price: "Gratis",
        icon: "fa-network-wired",
        bgGradient: "from-purple-600 to-indigo-600",
        description: "Herramienta de visualización gráfica en 3D para análisis de nodos y procesamiento de estructuras matemáticas complejas."
    },
    {
        id: 2,
        title: "Quantum Terminal",
        category: "Herramientas",
        type: "herramientas",
        isFeatured: false,
        rating: 4.7,
        price: "Gratis",
        icon: "fa-terminal",
        bgGradient: "from-emerald-600 to-teal-500",
        description: "Consola interactiva ligera embebible para la ejecución simulada de comandos y automatización de tareas en proyectos."
    },
    {
        id: 3,
        title: "CyberRunner 2D",
        category: "Juegos",
        type: "juegos",
        isFeatured: true,
        rating: 4.5,
        price: "Gratis",
        icon: "fa-gamepad",
        bgGradient: "from-pink-600 to-rose-500",
        description: "Un minijuego de plataformas arcade estilo retro diseñado con Canvas HTML5 directo y efectos de iluminación synthwave."
    },
    {
        id: 4,
        title: "Xecimal Palette FX",
        category: "Herramientas",
        type: "herramientas",
        isFeatured: false,
        rating: 4.6,
        price: "Gratis",
        icon: "fa-palette",
        bgGradient: "from-amber-500 to-orange-600",
        description: "Generador inteligente de paletas de color compatibles con Fluent Design y Tailwind CSS con previsualización en tiempo real."
    },
    {
        id: 5,
        title: "Lab Audio Synth",
        category: "Juegos",
        type: "juegos",
        isFeatured: false,
        rating: 4.9,
        price: "Gratis",
        icon: "fa-sliders",
        bgGradient: "from-violet-600 to-purple-800",
        description: "Sintetizador Web Audio interactivo para la creación de efectos de sonido procedurales para videojuegos e interfaces."
    }
];

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    setupSearch();
});

// Renderizar catálogo de aplicaciones
function renderCatalog(filterText = '') {
    const gridDestacados = document.getElementById('gridDestacados');
    const gridHerramientas = document.getElementById('gridHerramientas');
    const gridJuegos = document.getElementById('gridJuegos');

    gridDestacados.innerHTML = '';
    gridHerramientas.innerHTML = '';
    gridJuegos.innerHTML = '';

    const filteredApps = appsData.filter(app => 
        app.title.toLowerCase().includes(filterText.toLowerCase()) || 
        app.description.toLowerCase().includes(filterText.toLowerCase())
    );

    filteredApps.forEach(app => {
        const cardHTML = createCardHTML(app);

        if (app.isFeatured) gridDestacados.innerHTML += cardHTML;
        if (app.type === 'herramientas') gridHerramientas.innerHTML += cardHTML;
        if (app.type === 'juegos') gridJuegos.innerHTML += cardHTML;
    });
}

// Generar HTML para cada tarjeta
function createCardHTML(app) {
    const stars = Array(5).fill(0).map((_, i) => 
        `<i class="fa-solid fa-star ${i < Math.floor(app.rating) ? 'text-amber-400' : 'text-slate-600'} text-xs"></i>`
    ).join('');

    return `
        <div onclick="openModal(${app.id})" class="fluent-card rounded-xl p-4 flex flex-col justify-between cursor-pointer group">
            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${app.bgGradient} flex items-center justify-center text-xl text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                        <i class="fa-solid ${app.icon}"></i>
                    </div>
                    <div class="overflow-hidden">
                        <h3 class="font-semibold text-slate-100 truncate text-sm group-hover:text-blue-400 transition-colors">${app.title}</h3>
                        <span class="text-xs text-slate-400 block">${app.category}</span>
                    </div>
                </div>
                <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed">${app.description}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div class="flex items-center gap-1">
                    ${stars}
                    <span class="text-[10px] text-slate-400 ml-1 font-medium">${app.rating}</span>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    ${app.price}
                </span>
            </div>
        </div>
    `;
}

// Filtros laterales
function filterCategory(category) {
    const sections = document.querySelectorAll('.app-section');
    const buttons = document.querySelectorAll('.sidebar-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active', 'text-blue-400', 'bg-blue-500/10', 'border', 'border-blue-500/20');
        btn.classList.add('text-slate-400');
    });

    // Resaltar botón seleccionado (simulado por evento o índice simple)
    event.currentTarget.classList.add('active', 'text-blue-400', 'bg-blue-500/10', 'border', 'border-blue-500/20');

    sections.forEach(sec => {
        if (category === 'all' || sec.dataset.section === category) {
            sec.style.display = 'block';
        } else {
            sec.style.display = 'none';
        }
    });
}

// Buscador interactivo
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        renderCatalog(e.target.value);
    });
}

// Control del Modal
function openModal(appId) {
    const app = appsData.find(a => a.id === appId);
    if (!app) return;

    document.getElementById('modalTitle').textContent = app.title;
    document.getElementById('modalCategory').textContent = app.category;
    document.getElementById('modalDescription').textContent = app.description;
    document.getElementById('modalPrice').textContent = app.price;
    
    const modalIcon = document.getElementById('modalIcon');
    modalIcon.className = `w-20 h-20 rounded-2xl bg-gradient-to-tr ${app.bgGradient} flex items-center justify-center text-4xl text-white shadow-xl flex-shrink-0`;
    modalIcon.innerHTML = `<i class="fa-solid ${app.icon}"></i>`;

    const modalRating = document.getElementById('modalRating');
    modalRating.innerHTML = Array(5).fill(0).map((_, i) => 
        `<i class="fa-solid fa-star ${i < Math.floor(app.rating) ? 'text-amber-400' : 'text-slate-600'} text-xs"></i>`
    ).join('') + `<span class="ml-1 text-slate-300 font-medium">${app.rating}</span>`;

    const modal = document.getElementById('appModal');
    const content = document.getElementById('modalContent');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('appModal');
    const content = document.getElementById('modalContent');
    
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

// Simulación de descarga/instalación
function simularInstalacion() {
    const btn = document.getElementById('modalActionBtn');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Obteniendo...</span>`;

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Instalado</span>`;
        btn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
        btn.classList.add('bg-emerald-600');

        showToast("¡Proyecto/App lista para usarse!");
    }, 1500);
}

// Toast de notificación
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
