(function() {
    /* ------------------- Parámetros de animación ------------------- */
    const NORMAL_SPEED = 0.05;
    const SLOW_SPEED = 0.02;
    const constrain = 0.5;

    // Función para inicializar el efecto en cada contenedor
    function initItem(cardContainer) {
        // Elementos internos
        const card = cardContainer.querySelector('.card');
        const shadow = cardContainer.querySelector('.shadow');
        const overlay = cardContainer.querySelector('.overlay');

        // Configuración individual (opcional, según data attributes)
        const defaultCardSrc = cardContainer.getAttribute("data-card-src");
        const hoverCardSrc = cardContainer.getAttribute("data-hover-src");
        const overlaySrc = cardContainer.getAttribute("data-overlay-src");
        // Guarda la posición de fondo original (ya sea la definida en linea o la de CSS)
        const defaultBgPosition = card.style.backgroundPosition || "center";
        if (defaultCardSrc) {
            card.style.backgroundImage = `url('${defaultCardSrc}')`;
        }
        
        // Variables de animación
        let currentAnimationSpeed = NORMAL_SPEED;
        let angle = 0;
        let calcX = 0;
        let calcY = 0;
        let mouseVerticalPosition = 0;  // Rango: 0 (arriba) a 1 (abajo)

        // Eventos
        cardContainer.addEventListener('mouseover', () => {
            currentAnimationSpeed = SLOW_SPEED;
            // Actualiza la imagen hover si se define
            if (hoverCardSrc) {
                card.style.backgroundImage = `url('${hoverCardSrc}')`;
                card.style.backgroundPosition = 'center';
                card.style.backgroundSize = 'cover';
            }
            if (overlaySrc) {
                overlay.style.backgroundImage = `url('${overlaySrc}')`;
            }
        });

        cardContainer.addEventListener('mouseout', () => {
            currentAnimationSpeed = NORMAL_SPEED;
            calcX = 0;
            calcY = 0;
            // Restaura imagen original y posición de fondo definida inicialmente
            if (defaultCardSrc) {
                card.style.backgroundImage = `url('${defaultCardSrc}')`;
                card.style.backgroundPosition = defaultBgPosition;
            }
        });

        cardContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = cardContainer.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            calcX = ((x - width / 1.5) / (width / 1.5)) * constrain;
            calcY = ((y - height / 1.5) / (height / 1.5)) * constrain;
            mouseVerticalPosition = 1 - (y / height);
        });

        // Función para construir la transformación base
        const getBaseTransform = (dx, dy, rot) => {
            return `translateZ(0) translateX(${dx}px) translateY(${dy}px) rotate(${rot}deg)`;
        };

        // Bucle principal de animación para este contenedor
        function animate() {
            const desplazamientoX = Math.sin(angle) * 3;
            const desplazamientoY = Math.cos(angle) * 5;
            const rotacion = Math.sin(angle * 2) * 2;
            const baseTransform = getBaseTransform(desplazamientoX, desplazamientoY, rotacion);

            let cardTransform = baseTransform;
            let shadowTransform = baseTransform;
            let overlayTransform = baseTransform;

            if (currentAnimationSpeed === SLOW_SPEED) {
                const elevacionSombra = Math.min(Math.max((1 - mouseVerticalPosition) * 50, 0), 7);
                shadowTransform = `translateZ(-10px) translateX(${desplazamientoX + calcX * 3}px)
                    translateY(${desplazamientoY + calcY * 3 - elevacionSombra}px) perspective(100px)
                    rotateX(${calcY * 2}deg)
                    rotateY(${-calcX * 2}deg)
                    scale(1)
                    ${baseTransform}`;

                cardTransform = `translateZ(0px) perspective(100px)
                    rotateX(${-calcY * 6}deg)
                    rotateY(${calcX * 6}deg)
                    ${baseTransform}`;

                overlayTransform = `translateZ(5px) perspective(100px)
                    rotateX(${-calcY * 8}deg)
                    rotateY(${calcX * 8}deg)
                    scale(1.1)
                    ${baseTransform}`;
            }

            card.style.transform = cardTransform;
            shadow.style.transform = shadowTransform;
            overlay.style.transform = overlayTransform;

            angle += currentAnimationSpeed;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Inicializa el efecto para cada .customcards-container encontrado en la página
    document.querySelectorAll('.customcards-container').forEach(initItem);
})();