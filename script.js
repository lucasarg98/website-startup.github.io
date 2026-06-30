gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ANIMACIONES DE ENTRADA AL CARGAR LA PÁGINA ---
    gsap.from(".navbar", {
        y: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    gsap.from(".nav-links li", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.12,
        ease: "power2.out"
    });

    // Animación letra por letra para el H1 principal
    const h1 = document.querySelector('.tracking-in-expand');
    if (h1) {
        h1.innerHTML = h1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        gsap.from(".letter", {
            opacity: 0,
            y: 20,
            rotationX: -90,
            stagger: 0.03,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    // --- 2. CARRUSEL INFINITO DE LOGOS ---
    gsap.to(".logos-track", {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1
    });

    // --- 3. NUEVA ANIMACIÓN GSAP: FONDO LÍQUIDO DE PRODUCTOS ---
    gsap.to(".products-section", {
        "--s-start-0": "9%", "--s-end-0": "55%", "--c-0": "hsla(266, 0%, 12%, 1)", "--x-0": "31%", "--y-0": "94%",
        "--s-start-1": "5%", "--s-end-1": "72%", "--c-1": "hsla(0, 4%, 19%, 1)", "--x-1": "2%", "--y-1": "25%",
        "--s-start-2": "5%", "--s-end-2": "52%", "--c-2": "hsla(54, 0%, 0%, 0.49)", "--x-2": "98%", "--y-2": "20%",
        "--x-3": "95%", "--y-3": "92%", "--s-start-3": "13%", "--s-end-3": "68%", "--c-3": "hsla(298, 3%, 41%, 1)",
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    // --- 4. ANIMACIONES CON SCROLLTRIGGER ---
    
    // Animación sección "About Content"
    gsap.from(".about-content", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".about-section",  
            start: "top 70%",          
            end: "bottom 30%",          
            toggleActions: "play none none reverse" 
        }
    });

    // Animación imagen del Drone
    gsap.fromTo(".about-image", 
        { opacity: 0, y: 70, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );

    // Animación de las Tarjetas de Productos
    gsap.to(".product-card", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".products-section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

  // --- 5. SINCRO RESPONSIVA DE NAVBAR Y TEXTOS CON MATCHMEDIA ---
    let mm = gsap.matchMedia();

    // CONFIGURACIÓN PARA ESCRITORIO (Computadoras)
    mm.add("(min-width: 769px)", () => {
        const navTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top -60px",
                end: "top -60px",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true
            }
        });

        navTimeline.to(".navbar", {
            backgroundColor: "rgba(10, 10, 10, 0.7)", // Desenfoque oscuro elegante
            backdropFilter: "blur(12px)",            // Efecto vidrio esmerilado
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Línea de separación sutil
            duration: 0.4
        }, 0)
        .to(".logo-link, .title, .nav-links a", {
            color: "#ffffff",
            duration: 0.4
        }, 0);
    });

    // CONFIGURACIÓN PARA MÓVILES (Celulares)
    mm.add("(max-width: 768px)", () => {
        const navTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top -60px",
                end: "top -60px",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true
            }
        });

        navTimeline.to(".navbar", {
            backgroundColor: "rgba(10, 10, 10, 0.75)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            duration: 0.4
        }, 0)
        .to(".logo-link, .title, .nav-links a", {
            color: "#ffffff",
            duration: 0.4
        }, 0)
        .to(".hamburger .bar", {
            backgroundColor: "#ffffff",
            duration: 0.4
        }, 0)
        .to(".nav-links", {
            // El fondo oscuro traslúcido solo se aplica al menú desplegable en celulares
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(12px)",
            duration: 0.4
        }, 0);
    });
    // --- 6. LÓGICA DEL MENÚ HAMBURGUESA (MOBILE) ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }
});

// --- 6. SCROLL SUAVE SINCRO CON SCROLLTOPLUGIN ---

// Registrar el plugin en GSAP
gsap.registerPlugin(ScrollToPlugin);

// Seleccionamos tanto los links del menú como el logo
const navLinks = document.querySelectorAll('.nav-links a, .logo-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el salto instantáneo y tosco por defecto

        const targetId = link.getAttribute('href');
        
        // Si el href es "#" (típico del logo), viaja al inicio de la página (0)
        // De lo contrario, viaja al ID de la sección (ej: #products)
        const destination = (targetId === '#' || !targetId) ? 0 : targetId;

        gsap.to(window, {
            duration: 1.2,          // Duración del viaje en segundos
            scrollTo: {
                y: destination,
                offsetY: 70         // COMPENSACIÓN: Tu navbar mide 70px, así evitamos que tape el título
            },
            ease: "power4.out"      // Aceleración premium: arranca rápido y frena suave
        });
    });
});