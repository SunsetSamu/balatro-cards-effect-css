(function() {
    /* ------------------- Parámetros de animación ------------------- */
    const NORMAL_SPEED = 0.05;
    const SLOW_SPEED = 0.02;
    const constrain = 0.5;

    // Función para inicializar el efecto en cada contenedor
    function initItem(itemContainer) {
        // Elementos internos
        const card = itemContainer.querySelector('.card');
        const shadow = itemContainer.querySelector('.shadow');
        const overlay = itemContainer.querySelector('.overlay');

        // Configuración individual (opcional, según data attributes)
        const defaultCardSrc = itemContainer.getAttribute("data-card-src");
        const hoverCardSrc = itemContainer.getAttribute("data-hover-src");
        const overlaySrc = itemContainer.getAttribute("data-overlay-src");
        // Guarda la posición de fondo original (ya sea la definida en linea o la de CSS)
        const defaultBgPosition = card.style.backgroundPosition || "center";
        if (defaultCardSrc) {
            card.style.backgroundImage = `url('${defaultCardSrc}')`;
        }
        
        // Variables de animación
        let currentAnimationSpeed = SLOW_SPEED;
        let angle = 0;
        let calcX = 0;
        let calcY = 0;
        let mouseVerticalPosition = 0;  // Rango: 0 (arriba) a 1 (abajo)

        // Eventos
        itemContainer.addEventListener('mouseover', () => {
            currentAnimationSpeed = NORMAL_SPEED;
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

        itemContainer.addEventListener('mouseout', () => {
            currentAnimationSpeed = SLOW_SPEED;
            calcX = 0;
            calcY = 0;
            // Restaura imagen original y posición de fondo definida inicialmente
            if (defaultCardSrc) {
                card.style.backgroundImage = `url('${defaultCardSrc}')`;
                card.style.backgroundPosition = defaultBgPosition;
            }
        });

        itemContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = itemContainer.getBoundingClientRect();
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
            const desplazamientoX = Math.sin(angle) * 0.5;
            const desplazamientoY = Math.cos(angle) * 0.5;
            const rotacion = Math.sin(angle * 2) * 1;
            const baseTransform = getBaseTransform(desplazamientoX, desplazamientoY, rotacion);

            if (currentAnimationSpeed === NORMAL_SPEED) {
                const elevacionSombra = Math.min(Math.max((1 - mouseVerticalPosition) * 50, 0), 7);
                const cardTransform = `translateZ(0px) perspective(100px)
                        rotateX(${-calcY * 6}deg)
                        rotateY(${calcX * 6}deg)
                        ${baseTransform}`;
                const shadowTransform = `translateZ(-10px) translateX(${desplazamientoX + calcX * 3}px)
                        translateY(${desplazamientoY + calcY * 3 - elevacionSombra}px) perspective(100px)
                        rotateX(${calcY * 2}deg)
                        rotateY(${-calcX * 2}deg)
                        scale(1)
                        ${baseTransform}`;
                const overlayTransform = `translateZ(5px) perspective(100px)
                        rotateX(${-calcY * 8}deg)
                        rotateY(${calcX * 8}deg)
                        scale(1.1)
                        ${baseTransform}`;
                card.style.transform = cardTransform;
                shadow.style.transform = shadowTransform;
                overlay.style.transform = overlayTransform;
            } else {
                // Movimiento circular simulado en SLOW_SPEED sin detectar el mouse
                const simX = Math.cos(angle) * constrain;
                const simY = Math.sin(angle) * constrain;
                const cardTransform = `translateZ(0px) perspective(100px)
                        rotateX(${-simY * 6}deg)
                        rotateY(${simX * 6}deg)
                        ${baseTransform}`;
                const shadowTransform = `translateZ(-10px) translateX(${desplazamientoX + simX * 5}px)
                        translateY(${desplazamientoY + simY * 9 - 8}px) perspective(100px)
                        rotateX(${simY * 2}deg)
                        rotateY(${-simX / 2}deg)
                        scale(0.95)
                        ${baseTransform}`;
                const overlayTransform = `translateZ(5px) perspective(100px)
                        rotateX(${-simY * 8}deg)
                        rotateY(${simX * 8}deg)
                        scale(1.1)
                        ${baseTransform}`;
                card.style.transform = cardTransform;
                shadow.style.transform = shadowTransform;
                overlay.style.transform = overlayTransform;
            }

            angle += currentAnimationSpeed;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Inicializa el efecto para cada .item-container encontrado en la página
    document.querySelectorAll('.balatrocards-container').forEach(initItem);
})();