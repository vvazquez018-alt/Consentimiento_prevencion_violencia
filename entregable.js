// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers de Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Configurar elementos para mostrar toasts
    setupToastTriggers();
    
    // Configurar el envío del formulario de contacto
    setupContactForm();
    
    // Aplicar animaciones de entrada
    applyEntranceAnimations();
    
    // Configurar el tema específico de la página
    setupPageTheme();
});

// Configurar triggers para mostrar toasts
function setupToastTriggers() {
    // Ejemplo: Mostrar toast de bienvenida después de 2 segundos
    setTimeout(showWelcomeToast, 2000);
    
    // Ejemplo: Mostrar toast al hacer clic en elementos específicos
    const infoButtons = document.querySelectorAll('.btn-info');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            showToast('Información', 'Has consultado información adicional sobre este tema.', 'info');
        });
    });
}

// Mostrar un toast
function showToast(title, message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        console.warn('showToast: no se encontró .toast-container. Ignorando toast.');
        return;
    }
    
    // Determinar el color según el tipo
    let bgColor = 'bg-primary';
    let icon = 'bi-info-circle';
    
    switch(type) {
        case 'success':
            bgColor = 'bg-success';
            icon = 'bi-check-circle';
            break;
        case 'warning':
            bgColor = 'bg-warning';
            icon = 'bi-exclamation-triangle';
            break;
        case 'error':
            bgColor = 'bg-danger';
            icon = 'bi-x-circle';
            break;
    }
    
    // Crear el elemento toast
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white ${bgColor} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="${icon} me-2"></i>
                <strong>${title}</strong>: ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Agregar el toast al contenedor
    toastContainer.appendChild(toastEl);
    
    // Inicializar y mostrar el toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    // Eliminar el toast del DOM después de que se oculte
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// Mostrar toast de bienvenida
function showWelcomeToast() {
    showToast(
        'Bienvenido/a', 
        'Esta información tiene como objetivo educar y concienciar. Recuerda buscar ayuda profesional si la necesitas.', 
        'info'
    );
}

// Configurar el formulario de contacto
function setupContactForm() {
    const contactForm = document.querySelector('#contactModal form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías el formulario a un servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            showToast(
                'Mensaje Enviado', 
                'Hemos recibido tu mensaje. Un especialista se pondrá en contacto contigo pronto.', 
                'success'
            );
            
            // Cerrar el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            modal.hide();
            
            // Resetear el formulario
            contactForm.reset();
        });
    }
}

// Aplicar animaciones de entrada a los elementos
function applyEntranceAnimations() {
    const animatedElements = document.querySelectorAll('.card, .hero-section');
    
    animatedElements.forEach((element, index) => {
        // Añadir retraso escalonado para un efecto más dinámico
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
}

// Configurar el tema específico de la página
function setupPageTheme() {
    // Esta función debería personalizarse para cada página temática
    // Por ejemplo, cambiar colores, iconos, etc. según el tema
    
    // Obtener información de la página actual (podría venir de variables o atributos data)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Leer variable CSS con la función auxiliar (evita usar "var(...)" en JS)
    let categoryColor = getCssVariable('--secondary-color');
    categoryColor = categoryColor ? categoryColor.trim() : '#6c757d'; // fallback
    
    if (currentPage.includes('salud')) {
        categoryColor = '#2ecc71'; // Verde para salud
    } else if (currentPage.includes('adicciones')) {
        categoryColor = '#e74c3c'; // Rojo para adicciones
    } else if (currentPage.includes('sexual')) {
        categoryColor = '#9b59b6'; // Púrpura para salud sexual
    } else if (currentPage.includes('financiera')) {
        categoryColor = '#f39c12'; // Naranja para educación financiera
    }
    
    // Aplicar el color a elementos específicos
    document.documentElement.style.setProperty('--secondary-color', categoryColor);
    
    // También podrías cambiar el icono del hero según el tema
    const heroIcon = document.querySelector('.hero-icon i');
    if (heroIcon) {
        // Cambiar icono según la categoría
        if (currentPage.includes('salud-mental')) {
            heroIcon.className = 'bi bi-emoji-smile';
        } else if (currentPage.includes('adicciones')) {
            heroIcon.className = 'bi bi-shield-exclamation';
        }
        // Agregar más casos según sea necesario
    }
}

// Función auxiliar para obtener variables CSS
function getCssVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

// Función para establecer variables CSS
function setCssVariable(name, value) {
    document.documentElement.style.setProperty(name, value);
}

// Ejemplo de cómo cargar datos específicos del tema (podría venir de una API o archivo JSON)
function loadTopicData(topicId) {
    // En una implementación real, esto cargaría datos específicos del tema
    // Por ahora, es solo un esqueleto para mostrar cómo podría funcionar
    
    const topicData = {
        'vapeo': {
            title: 'Vapeo: Realidades Sin Humo',
            description: 'Mitos y verdades sobre el vapeo y sus efectos en la salud.',
            category: 'Salud Física y Mental',
            introduction: 'El vapeo se ha popularizado entre los jóvenes, pero ¿realmente conocemos sus efectos?'
        },
        // Agregar más temas según sea necesario
    };
    
    return topicData[topicId] || null;
}