/* =============================================
   USAMA PORTFOLIO — CINEMATIC EDITION
   Three.js + GSAP + Lenis | Film Effects
   ============================================= */

// ============ LENIS SMOOTH SCROLL ============
let lenis;
try {
    lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
} catch (e) { /* fallback to native */ }

// ============ CINEMATIC PRELOADER ============
(function initPreloader() {
    const fill = document.querySelector('.preloader-bar-fill');
    const percent = document.querySelector('.preloader-percent');
    const preloader = document.getElementById('preloader');
    const flash = document.querySelector('.preloader-flash');
    const topBar = document.querySelector('.preloader-letterbox.top');
    const bottomBar = document.querySelector('.preloader-letterbox.bottom');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        fill.style.width = progress + '%';
        percent.textContent = Math.floor(progress) + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(startCinematicIntro, 400);
        }
    }, 150);

    function startCinematicIntro() {
        const tl = gsap.timeline();

        tl
            // Flash white like a camera flash
            .to(flash, { opacity: 0.8, duration: 0.08 })
            .to(flash, { opacity: 0, duration: 0.4 })
            // Letterbox bars slide open
            .to(topBar, { yPercent: -100, duration: 1, ease: 'power3.inOut' }, '-=0.2')
            .to(bottomBar, { yPercent: 100, duration: 1, ease: 'power3.inOut' }, '<')
            // Glitch text zooms
            .to('.preloader-glitch', { scale: 3, opacity: 0, duration: 0.6, ease: 'power4.in' }, '-=0.6')
            .to('.preloader-subtitle', { opacity: 0, duration: 0.3 }, '<')
            .to('.preloader-loading', { opacity: 0, duration: 0.3 }, '<')
            // Fade out entire preloader
            .to(preloader, { opacity: 0, duration: 0.3, onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = '';
                initHeroAnimation();
                initScrollAnimations();
                initDepthMotion();
                initBackToTop();
            }});
    }
})();

// ============ THREE.JS — CINEMATIC PARTICLE UNIVERSE ============
(function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    camera.position.set(0, 0, 40);

    // --- NEBULA PARTICLE FIELD ---
    const particleCount = 3000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount); // for individual motion

    const blues = [
        new THREE.Color(0x0044cc),
        new THREE.Color(0x0066ff),
        new THREE.Color(0x0088ff),
        new THREE.Color(0x00aaff),
        new THREE.Color(0x00ccff),
        new THREE.Color(0x00d4ff),
    ];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Distribute in a spherical shell for depth
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 20 + Math.random() * 50;
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3+1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3+2] = r * Math.cos(phi) - 20;

        const c = blues[Math.floor(Math.random() * blues.length)];
        col[i3] = c.r; col[i3+1] = c.g; col[i3+2] = c.b;
        vel[i] = (Math.random() - 0.5) * 0.02;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    // Soft glow particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64; pCanvas.height = 64;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32,32,0,32,32,32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(255,255,255,0.5)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);

    const mat = new THREE.PointsMaterial({
        size: 0.35,
        map: new THREE.CanvasTexture(pCanvas),
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // --- WIREFRAME SHAPES ---
    const shapes = [];
    const shapeConfigs = [
        { geo: new THREE.IcosahedronGeometry(4, 1), pos: [18, 10, -15], color: 0x0066ff, opacity: 0.08 },
        { geo: new THREE.OctahedronGeometry(3, 0), pos: [-20, -8, -10], color: 0x00aaff, opacity: 0.06 },
        { geo: new THREE.TorusGeometry(2.5, 0.6, 8, 24), pos: [-14, 12, -18], color: 0x00d4ff, opacity: 0.05 },
        { geo: new THREE.DodecahedronGeometry(2.5, 0), pos: [22, -12, -14], color: 0x3399ff, opacity: 0.05 },
        { geo: new THREE.TorusKnotGeometry(1.5, 0.5, 64, 8), pos: [0, -18, -20], color: 0x0088ff, opacity: 0.04 },
    ];

    shapeConfigs.forEach(cfg => {
        const m = new THREE.Mesh(cfg.geo, new THREE.MeshBasicMaterial({
            color: cfg.color, wireframe: true, transparent: true, opacity: cfg.opacity,
        }));
        m.position.set(...cfg.pos);
        scene.add(m);
        shapes.push(m);
    });

    // --- MOUSE & SCROLL ---
    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    let scrollY = 0;

    document.addEventListener('mousemove', e => {
        tMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        tMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    // --- ANIMATION ---
    const clock = new THREE.Clock();
    const posArray = geo.attributes.position.array;

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        mouseX += (tMouseX - mouseX) * 0.04;
        mouseY += (tMouseY - mouseY) * 0.04;

        // Slowly rotate entire particle system
        particles.rotation.y = t * 0.015 + mouseX * 0.08;
        particles.rotation.x = t * 0.01 + mouseY * 0.04;

        // Scroll-driven camera zoom and Y offset (cinematic dolly)
        const scrollFactor = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
        camera.position.z = 40 - scrollFactor * 15;
        camera.position.y = -scrollFactor * 8;

        // Subtle particle drift
        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.002;
        }
        geo.attributes.position.needsUpdate = true;

        // Rotate shapes cinematically
        shapes.forEach((s, i) => {
            s.rotation.x = t * (0.06 + i * 0.02);
            s.rotation.y = t * (0.08 + i * 0.015);
            s.position.y += Math.sin(t * 0.5 + i * 1.5) * 0.002;
        });

        // Camera follows mouse for parallax feel
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.015;
        camera.lookAt(0, -scrollFactor * 4, 0);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// ============ CUSTOM CURSOR ============
(function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!dot || !ring || window.innerWidth <= 768 || !hasFinePointer) return;
    document.body.classList.add('has-custom-cursor');

    let dx = 0, dy = 0, rx = 0, ry = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

    function update() {
        dx += (cx - dx) * 0.9;
        dy += (cy - dy) * 0.9;
        rx += (cx - rx) * 0.12;
        ry += (cy - ry) * 0.12;
        dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(update);
    }
    update();

    document.querySelectorAll('a, button, .project-card-cinema, .service-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
})();

// ============ NAVIGATION ============
(function initNav() {
    const navbar = document.getElementById('navbar');
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(l => l.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }));

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const sp = window.scrollY + 200;
        sections.forEach(sec => {
            const t = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
            if (sp >= t && sp < t + h) {
                navLinks.forEach(l => l.classList.remove('active'));
                const al = document.querySelector(`.nav-link[href="#${id}"]`);
                if (al) al.classList.add('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            let target;
            try {
                target = document.querySelector(href);
            } catch (error) {
                return;
            }
            e.preventDefault();
            if (target) {
                if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.8 });
                else gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' });
            }
        });
    });
})();

// ============ TYPEWRITER ============
(function initTypewriter() {
    const roles = ['AI Automation Specialist', 'Web Developer', 'Zapier / Make / n8n Builder', 'MS365 GCC High Admin', 'Tenant Migration Engineer', 'Server Operations Specialist'];
    const el = document.getElementById('typewriter');
    if (!el) return;
    let ri = 0, ci = 0, del = false, speed = 80;

    function type() {
        const cur = roles[ri];
        if (!del) {
            el.textContent = cur.substring(0, ci + 1);
            ci++;
            speed = ci === cur.length ? 2500 : 70;
            if (ci === cur.length) del = true;
        } else {
            el.textContent = cur.substring(0, ci - 1);
            ci--;
            speed = 35;
            if (ci === 0) { del = false; ri = (ri + 1) % roles.length; speed = 400; }
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 3000);
})();

// ============ HERO CINEMATIC ENTRANCE ============
function initHeroAnimation() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const tl = gsap.timeline({ delay: 0.1 });

    tl
        .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('.char-reveal', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.4')
        .from('.char-reveal-name', {
            opacity: 0, y: 80, rotationX: 90, duration: 1,
            ease: 'power4.out', stagger: 0.08, transformOrigin: 'bottom center'
        }, '-=0.6')
        .from('.role-typewriter', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hero-description', { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .from('.hero-cta .btn', { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
        .from('.stat-item', { opacity: 0, y: 25, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.2')
        .from('.hero-scroll-indicator', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .from('.hero-socials .social-link', { opacity: 0, x: -15, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.3');

    // Counter animation
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        gsap.to(counter, {
            innerText: target, duration: 2.5, delay: 1,
            ease: 'power2.out', snap: { innerText: 1 },
            onUpdate() { counter.textContent = Math.ceil(this.targets()[0].innerText); }
        });
    });

    gsap.to('.hero-content', { y: -50, opacity: 0.3, scrollTrigger: { trigger: '#hero', start: '60% top', end: 'bottom top', scrub: 1 } });
}

// ============ SCROLL-DRIVEN CINEMATIC ANIMATIONS ============
function initScrollAnimations() {
    const isNarrow = window.innerWidth <= 1024;

    // --- Section curtain reveals ---
    document.querySelectorAll('.section-reveal-curtain').forEach(curtain => {
        gsap.to(curtain, {
            scaleY: 0,
            scrollTrigger: {
                trigger: curtain.parentElement,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 0.8,
            },
        });
    });

    // --- Section headers ---
    gsap.utils.toArray('.section-header').forEach(h => {
        gsap.from(h.children, {
            scrollTrigger: { trigger: h, start: 'top 78%' },
            opacity: 0, y: 35, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        });
    });

    // --- About ---
    gsap.from('.about-image-container', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 72%' },
        opacity: 0, scale: 0.85, duration: 1, ease: 'power3.out',
    });
    gsap.from('.about-floating-card', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 72%' },
        opacity: 0, y: 35, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    });
    gsap.from('.about-terminal', {
        scrollTrigger: { trigger: '.about-terminal', start: 'top 78%' },
        opacity: 0, x: isNarrow ? 0 : 50, y: isNarrow ? 24 : 0, duration: 1, ease: 'power3.out',
    });
    gsap.from('.about-tags .tag', {
        scrollTrigger: { trigger: '.about-tags', start: 'top 88%' },
        opacity: 0, y: 15, duration: 0.4, stagger: 0.05, ease: 'power3.out',
    });

    // --- Skill cards ---
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', onEnter: () => card.classList.add('animated') },
            opacity: 0, y: 30, duration: 0.5, delay: i * 0.04, ease: 'power3.out',
        });
    });

    // --- Service cards (staggered cinema reveal) ---
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            opacity: 0, y: 50, scale: 0.95, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
        });
    });

    // --- HORIZONTAL SCROLL PROJECTS ---
    const track = document.querySelector('.projects-horizontal-track');
    const wrapper = document.querySelector('.projects-horizontal-wrapper');
    const allowHorizontalProjects = window.matchMedia('(min-width: 901px)').matches;
    if (track && wrapper && allowHorizontalProjects) {
        const totalScroll = track.scrollWidth - wrapper.clientWidth;
        if (totalScroll > 0) {
            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 20%',
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            });
        }
    }

    // --- Timeline ---
    const timelineFill = document.querySelector('.timeline-line-fill');
    if (timelineFill) {
        gsap.to(timelineFill, {
            height: '100%',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: 1,
            },
        });
    }

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 80%' },
            opacity: 0, x: isNarrow ? 0 : -50, y: isNarrow ? 24 : 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
        });
    });

    // --- Contact ---
    gsap.from('.contact-card', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 78%' },
        opacity: 0, x: isNarrow ? 0 : -30, y: isNarrow ? 18 : 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
    });
    gsap.from('.contact-form .form-group', {
        scrollTrigger: { trigger: '.contact-form', start: 'top 78%' },
        opacity: 0, y: 25, duration: 0.5, stagger: 0.1, ease: 'power3.out',
    });

    // --- Floating card parallax ---
    gsap.utils.toArray('.about-floating-card').forEach(card => {
        gsap.to(card, {
            y: -25,
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
    });
}

// ============ TRUE DEPTH MOTION ============
function initDepthMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 1024) return;

    const depthScenes = [
        { trigger: '#hero', target: '.hero-content', from: { z: 0, rotateX: 0, y: 0 }, to: { z: 180, rotateX: 10, y: -80 }, scrub: 1.2 },
        { trigger: '#about', target: '#about .depth-stage', from: { z: -120, rotateX: 10, y: 70 }, to: { z: 120, rotateX: -5, y: -30 }, scrub: 1.1 },
        { trigger: '#skills', target: '#skills .depth-stage', from: { z: -140, rotateX: 12, y: 90 }, to: { z: 110, rotateX: -4, y: -40 }, scrub: 1.1 },
        { trigger: '#services', target: '#services .depth-stage', from: { z: -150, rotateX: 11, y: 80 }, to: { z: 140, rotateX: -6, y: -35 }, scrub: 1.15 },
        { trigger: '#projects', target: '#projects .depth-stage', from: { z: -200, rotateX: 12, y: 110 }, to: { z: 130, rotateX: -5, y: -30 }, scrub: 1.2 },
        { trigger: '#experience', target: '#experience .depth-stage', from: { z: -120, rotateX: 10, y: 80 }, to: { z: 100, rotateX: -4, y: -25 }, scrub: 1.1 },
        { trigger: '#contact', target: '#contact .depth-stage', from: { z: -100, rotateX: 8, y: 70 }, to: { z: 110, rotateX: -3, y: -20 }, scrub: 1.05 },
    ];

    depthScenes.forEach(scene => {
        const target = document.querySelector(scene.target);
        if (!target) return;

        gsap.fromTo(target, scene.from, {
            ...scene.to,
            ease: 'none',
            force3D: true,
            transformPerspective: 1400,
            scrollTrigger: {
                trigger: scene.trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: scene.scrub,
            },
        });
    });

    document.querySelectorAll('.cinematic-section, #hero').forEach(section => {
        const planeA = section.querySelector('.depth-plane-a');
        const planeB = section.querySelector('.depth-plane-b');
        const header = section.querySelector('.section-header');

        if (planeA) {
            gsap.fromTo(planeA, {
                xPercent: -12,
                yPercent: 6,
                z: -280,
                rotateZ: -10,
            }, {
                xPercent: 18,
                yPercent: -10,
                z: 80,
                rotateZ: 8,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.6,
                },
            });
        }

        if (planeB) {
            gsap.fromTo(planeB, {
                xPercent: 10,
                yPercent: -4,
                z: -340,
                rotateZ: 18,
            }, {
                xPercent: -16,
                yPercent: 12,
                z: 60,
                rotateZ: -10,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.8,
                },
            });
        }

        if (header) {
            gsap.fromTo(header, {
                z: -40,
                y: 60,
                rotateX: 14,
            }, {
                z: 90,
                y: -10,
                rotateX: 0,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    end: 'top 20%',
                    scrub: 1,
                },
            });
        }
    });

    const pointerStages = document.querySelectorAll('.depth-stage, .hero-content');
    pointerStages.forEach(stage => {
        const quickX = gsap.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const quickY = gsap.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const quickZ = gsap.quickTo(stage, 'z', { duration: 0.8, ease: 'power3.out' });

        stage.addEventListener('mousemove', e => {
            if (window.innerWidth <= 768) return;
            const rect = stage.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            quickX(px * 5);
            quickY(py * -5);
            quickZ(60);
        });

        stage.addEventListener('mouseleave', () => {
            quickX(0);
            quickY(0);
            quickZ(0);
        });
    });

    gsap.utils.toArray('.skill-card, .timeline-card, .contact-card').forEach((card, i) => {
        gsap.fromTo(card, {
            z: -60,
            y: 26,
            opacity: 0.35,
        }, {
            z: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.02,
            force3D: true,
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
            },
        });
    });
}

// ============ SKILLS TABS ============
(function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skills-panel');
    const loadMore = document.getElementById('skillsLoadMore');
    const initialVisible = 6;
    const step = 6;
    const visibleCounts = new Map();

    const getActivePanel = () => document.querySelector('.skills-panel.active');

    function refreshScrollAnimations() {
        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    function updateLoadMoreButton(panel) {
        if (!loadMore || !panel) return;
        const cards = panel.querySelectorAll('.skill-card');
        const visibleCount = visibleCounts.get(panel.id) || initialVisible;
        const hasMore = cards.length > visibleCount;
        loadMore.hidden = !hasMore;
        loadMore.setAttribute('aria-hidden', String(!hasMore));
    }

    function renderPanel(panel) {
        if (!panel) return;
        const cards = panel.querySelectorAll('.skill-card');
        const visibleCount = visibleCounts.get(panel.id) || initialVisible;

        cards.forEach((card, i) => {
            const shouldShow = i < visibleCount;
            card.classList.toggle('skill-hidden', !shouldShow);
            if (shouldShow) {
                if (window.gsap) {
                    gsap.set(card, { clearProps: 'opacity,transform' });
                }
                card.classList.remove('animated');
                setTimeout(() => card.classList.add('animated'), Math.min(i, step - 1) * 60);
            }
        });

        updateLoadMoreButton(panel);
        refreshScrollAnimations();
    }

    panels.forEach(panel => {
        visibleCounts.set(panel.id, initialVisible);
        renderPanel(panel);
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            panels.forEach(p => {
                p.classList.remove('active');
                if (p.id === target) {
                    p.classList.add('active');
                    visibleCounts.set(p.id, initialVisible);
                    renderPanel(p);
                }
            });
        });
    });

    if (loadMore) {
        loadMore.addEventListener('click', () => {
            const activePanel = getActivePanel();
            if (!activePanel) return;
            const currentCount = visibleCounts.get(activePanel.id) || initialVisible;
            visibleCounts.set(activePanel.id, currentCount + step);
            renderPanel(activePanel);
        });
    }
})();

// ============ CONTACT FORM ============
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const endpoint = form.dataset.endpoint || form.action;
    const btn = form.querySelector('button[type="submit"]');
    const status = document.getElementById('contactStatus');
    const originalButton = btn ? btn.innerHTML : '';

    function setStatus(message, type) {
        if (!status) return;
        status.textContent = message;
        status.classList.remove('success', 'error');
        if (type) status.classList.add(type);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!btn) return;

        const formData = new FormData(form);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const subject = (formData.get('subject') || 'Portfolio inquiry').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !subject || !message) {
            setStatus('Please fill all fields before sending.', 'error');
            return;
        }

        formData.set('_subject', `Portfolio inquiry: ${subject}`);
        formData.set('_replyto', email);
        formData.set('message', message);

        setStatus('Sending your message...', '');
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        })
            .then(response => {
                if (!response.ok) throw new Error('Form service rejected the message.');
                return response.json().catch(() => ({}));
            })
            .then(() => {
                form.reset();
                btn.innerHTML = '<span>Message Sent</span><i class="fas fa-check"></i>';
                setStatus('Message sent. If this is your first test, check Gmail for the FormSubmit confirmation email and approve it.', 'success');
                setTimeout(() => {
                    btn.innerHTML = originalButton;
                    btn.disabled = false;
                }, 3500);
            })
            .catch(() => {
                btn.innerHTML = originalButton;
                btn.disabled = false;
                setStatus('Message could not be sent from this browser. Please use the email or WhatsApp link.', 'error');
            });
    });
})();

// ============ BACK TO TOP ============
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    const fill = btn.querySelector('.progress-ring-fill');
    const circ = 2 * Math.PI * 22;

    window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        btn.classList.toggle('visible', window.scrollY > 400);
        if (fill) fill.style.strokeDashoffset = circ - (pct * circ);
    });

    btn.addEventListener('click', () => {
        if (lenis) lenis.scrollTo(0, { duration: 2 });
        else gsap.to(window, { duration: 1.2, scrollTo: 0, ease: 'power3.inOut' });
    });
}

// ============ MAGNETIC BUTTONS ============
(function initMagnetic() {
    if (window.innerWidth <= 768) return;
    document.querySelectorAll('.btn, .social-link, .contact-social-link').forEach(el => {
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect();
            gsap.to(el, { x: (e.clientX - r.left - r.width/2) * 0.15, y: (e.clientY - r.top - r.height/2) * 0.15, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
})();

// ============ TILT ON CARDS ============
(function initTilt() {
    if (window.innerWidth <= 768) return;
    document.querySelectorAll('.service-card, .project-card-cinema').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            gsap.to(card, { rotateX: (0.5-y)*8, rotateY: (x-0.5)*8, transformPerspective: 1000, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
        });
    });
})();
