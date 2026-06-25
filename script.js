document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos del DOM
    const montoSlider = document.getElementById('monto-slider');
    const plazoSlider = document.getElementById('plazo-slider');
    const montoDisplay = document.getElementById('monto-display');
    const plazoValue = document.getElementById('plazo-value');
    const cuotaDisplay = document.getElementById('cuota-display');

    // Tasa de interés mensual aproximada para que coincida con la imagen (1.2497%)
    const tasaMensual = 0.012497;

    // Función para formatear números a moneda colombiana (sin decimales)
    function formatCurrency(value) {
        return '$ ' + new Intl.NumberFormat('es-CO', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }).format(value);
    }

    // Función para calcular la cuota
    function calcularCuota() {
        const p = parseFloat(montoSlider.value); // Principal (Monto)
        const n = parseInt(plazoSlider.value);   // Número de meses (Plazo)
        const r = tasaMensual;                   // Tasa mensual

        // Fórmula de amortización: Cuota = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
        const cuota = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        // Actualizar UI
        montoDisplay.textContent = formatCurrency(p);
        plazoValue.textContent = n;
        cuotaDisplay.textContent = formatCurrency(Math.round(cuota));
        
        // Actualizar el color de la barra (fill de webkit slider)
        updateSliderProgress(montoSlider);
        updateSliderProgress(plazoSlider);
    }

    function updateSliderProgress(slider) {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #00C875 ${val}%, #E5E7EB ${val}%)`;
    }

    // Event Listeners
    montoSlider.addEventListener('input', calcularCuota);
    plazoSlider.addEventListener('input', calcularCuota);

    // Inicializar cálculo en la carga
    calcularCuota();

    // Lógica para el Formulario de WhatsApp
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const whatsappNumber = document.getElementById('whatsapp-number').value;
            const montoDeseado = document.getElementById('monto-deseado').value;
            
            // Construir el mensaje
            const mensaje = `Hola, mi nombre es ${nombre}. Quiero solicitar mi crédito ahora.%0A- Número de WhatsApp: ${whatsappNumber}%0A- Monto deseado: ${montoDeseado}`;
            
            // Redirigir a WhatsApp (Número proporcionado: +57 3242014391)
            window.open(`https://api.whatsapp.com/send?phone=573242014391&text=${mensaje}`, '_blank');
        });
    }

    // Lógica para el botón del simulador
    const btnSimulador = document.getElementById('btn-solicitar-simulador');
    if (btnSimulador) {
        btnSimulador.addEventListener('click', function(e) {
            e.preventDefault();
            const monto = parseFloat(montoSlider.value);
            const plazo = parseInt(plazoSlider.value);
            
            const mensaje = `Hola, he utilizado el simulador en su página web y estoy interesado en un crédito por ${formatCurrency(monto)} a un plazo de ${plazo} meses. Quisiera más información.`;
            
            window.open(`https://api.whatsapp.com/send?phone=573242014391&text=${mensaje}`, '_blank');
        });
    }
});
