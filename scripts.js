// ==================== MOBILE MENU TOGGLE ====================

function toggleMenu() {

    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburgerBtn');

    if (!navMenu || !hamburger) return;

    const isOpen = navMenu.classList.toggle('active');

    hamburger.classList.toggle('active', isOpen);

    hamburger.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
    );

    hamburger.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu' : 'Buka menu'
    );
}


// Tutup menu saat link diklik

function closeMenuOnClick() {

    const navLinks = document.querySelectorAll('.nav-link');

    const navMenu = document.getElementById('navMenu');

    const hamburger = document.getElementById('hamburgerBtn');

    if (!navMenu || !hamburger) return;

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            navMenu.classList.remove('active');

            hamburger.classList.remove('active');

            hamburger.setAttribute(
                'aria-expanded',
                'false'
            );

            hamburger.setAttribute(
                'aria-label',
                'Buka menu'
            );

        });

    });

}


// ==================== CAROUSEL FUNCTIONALITY ====================

let currentSlideIndex = 0;

let autoSlideTimer;


function showSlide(index) {

    const slides = document.querySelectorAll('.carousel-slide');

    const dots = document.querySelectorAll('.dot');

    if (index >= slides.length) {

        currentSlideIndex = 0;

    } else if (index < 0) {

        currentSlideIndex = slides.length - 1;

    } else {

        currentSlideIndex = index;

    }

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    slides[currentSlideIndex].classList.add('active');

    dots[currentSlideIndex].classList.add('active');
}


function changeSlide(n) {

    clearTimeout(autoSlideTimer);

    showSlide(currentSlideIndex + n);

    autoSlide();
}


function currentSlide(n) {

    clearTimeout(autoSlideTimer);

    showSlide(n);

    autoSlide();
}


function autoSlide() {

    autoSlideTimer = setTimeout(() => {

        showSlide(currentSlideIndex + 1);

        autoSlide();

    }, 4000);

}


// ==================== LOKASI WISATA DATA ====================

const dataLokasi = {

    lokasi1: {

        nama: "Pantai Semparuk",

        foto: "🏖️",

        deskripsi:
            "Pantai Semparuk adalah salah satu pantai terindah di Kabupaten Sambas dengan pasir putih yang lembut dan air laut yang jernih. Pantai ini merupakan tempat yang sempurna untuk bersantai, bermain, dan menikmati keindahan alam. Pengunjung dapat menikmati pemandangan matahari terbenam yang spektakuler di sore hari."

    },

    lokasi2: {

        nama: "Hutan Mangrove",

        foto: "🌿",

        deskripsi:
            "Hutan Mangrove Desa Semparuk Sutera adalah ekosistem alami yang masih terjaga dengan baik. Hutan ini menjadi habitat berbagai jenis burung, ikan, dan organisme laut lainnya. Pengunjung dapat melakukan tur perjalanan dengan perahu untuk mengamati keanekaragaman hayati yang menakjubkan."

    },

    lokasi3: {

        nama: "Taman Desa",

        foto: "🌳",

        deskripsi:
            "Taman Desa Semparuk Sutera adalah ruang publik yang hijau dan asri. Dikelilingi oleh pohon-pohon besar dan tanaman hias, taman ini menjadi tempat berkumpul masyarakat lokal dan pengunjung. Fasilitas seperti bangku taman, area bermain anak, dan jogging track tersedia untuk kenyamanan pengunjung."

    },

    lokasi4: {

        nama: "Rumah Adat",

        foto: "🏛️",

        deskripsi:
            "Rumah Adat Semparuk adalah warisan budaya tradisional yang masih dipertahankan hingga saat ini. Bangunan ini memiliki arsitektur khas yang mencerminkan budaya lokal. Pengunjung dapat melihat langsung bagaimana kehidupan dan tradisi masyarakat Semparuk melalui dekorasi dan peralatan yang ada di dalam rumah adat."

    },

    lokasi5: {

        nama: "Sawah dan Perkebunan",

        foto: "🌾",

        deskripsi:
            "Sawah dan Perkebunan Desa Semparuk Sutera menunjukkan kehidupan pertanian tradisional Indonesia. Lahan pertanian yang luas dengan pola tanam yang alami menciptakan pemandangan alam yang indah. Pengunjung dapat belajar tentang proses pertanian dari masyarakat lokal dan mencoba pengalaman bertani langsung."

    },

    lokasi6: {

        nama: "Rumah Makan Desa",

        foto: "🍲",

        deskripsi:
            "Rumah Makan Desa menyajikan cita rasa autentik makanan lokal Kalimantan Barat. Menu-menu tradisional seperti soto banjar, perkedel, dan berbagai masakan berbahan lokal disajikan dengan cita rasa yang nikmat. Tempat ini merupakan pilihan tepat bagi yang ingin merasakan kuliner asli desa kami."

    }

};


// ==================== MODAL FUNCTIONALITY ====================

function openModal(lokasiId) {

    const lokasi = dataLokasi[lokasiId];

    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `

        <div class="detail-lokasi">

            <div class="detail-foto">
                ${lokasi.foto}
            </div>

            <h2>
                ${lokasi.nama}
            </h2>

            <p>
                ${lokasi.deskripsi}
            </p>

        </div>

    `;

    const modal = document.getElementById('lokasiModal');

    modal.style.display = 'block';

    modal.classList.add('show-modal');

    createParticles(event);
}


function closeModal() {

    const modal = document.getElementById('lokasiModal');

    modal.classList.remove('show-modal');

    setTimeout(() => {

        modal.style.display = 'none';

    }, 300);
}


window.onclick = function(event) {

    const modal = document.getElementById('lokasiModal');

    if (event.target == modal) {

        closeModal();

    }

}


// ==================== SCROLL ANIMATIONS ====================

const observerOptions = {

    threshold: 0.1,

    rootMargin: '0px 0px -50px 0px'

};


const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                observer.unobserve(entry.target);

            }

        });

    },

    observerOptions

);


function initScrollAnimations() {

    const elements = document.querySelectorAll(

        '.tentang-text, .tentang-image, .kartu-lokasi, .statistik-card, ' +
        '.demographic-item, .ekonomi-item, .section-title'

    );

    elements.forEach(el => {

        el.classList.add('fade-in-element');

        observer.observe(el);

    });

}


// ==================== STATISTIK COUNTER ANIMATION ====================

function animateCounters() {

    const counterElements =
        document.querySelectorAll('.statistik-number');

    counterElements.forEach(element => {

        const finalValue =
            parseInt(
                element.textContent.replace(/,/g, '')
            );

        if (isNaN(finalValue)) return;

        const duration = 2000;

        const increment =
            finalValue / (duration / 16);

        let currentValue = 0;


        const updateCounter = () => {

            currentValue += increment;

            if (currentValue >= finalValue) {

                element.textContent =
                    finalValue.toLocaleString('id-ID');

            } else {

                element.textContent =
                    Math.floor(currentValue)
                        .toLocaleString('id-ID');

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

    });

}


// ==================== SCROLL TO SECTION ====================

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: 'smooth'
        });

    }

}


// ==================== PARTICLE EFFECT ====================

function createParticles(event) {

    const container =
        document.querySelector('.modal-content');

    const rect =
        container.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {

        const particle =
            document.createElement('div');

        particle.style.cssText = `

            position: fixed;

            pointer-events: none;

            font-size: 2rem;

            animation: float-away 1s ease-out forwards;

            z-index: 3000;

        `;

        const emojis = [
            '✨',
            '🌟',
            '💚',
            '🎉',
            '🌸'
        ];

        particle.textContent = emojis[i];

        particle.style.left =
            (rect.left + rect.width / 2) + 'px';

        particle.style.top =
            (rect.top + rect.height / 2) + 'px';

        document.body.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 1000);

    }

}


// ==================== NAVBAR SCROLL EFFECT ====================

function initNavbarScroll() {

    const navbar =
        document.querySelector('.navbar');

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        if (scrollTop > 100) {

            navbar.style.boxShadow =
                '0 4px 20px rgba(0, 0, 0, 0.2)';

        } else {

            navbar.style.boxShadow =
                '0 2px 10px rgba(0, 0, 0, 0.1)';

        }

        lastScrollTop =
            scrollTop <= 0 ? 0 : scrollTop;

    });

}


// ==================== CARD HOVER EFFECT ====================

function initCardHoverEffects() {

    const cards =
        document.querySelectorAll('.kartu-lokasi');

    cards.forEach(card => {

        card.addEventListener(
            'mouseenter',
            function() {

                this.style.transform =
                    'translateY(-15px) scale(1.02)';

                this.style.boxShadow =
                    '0 15px 40px rgba(44, 95, 45, 0.3)';

            }
        );

        card.addEventListener(
            'mouseleave',
            function() {

                this.style.transform =
                    'translateY(0) scale(1)';

                this.style.boxShadow =
                    '0 4px 15px rgba(0, 0, 0, 0.1)';

            }
        );

    });

}


// ==================== STATISTIK CARD HOVER ====================

function initStatistikHoverEffects() {

    const statistikCards =
        document.querySelectorAll('.statistik-card');

    statistikCards.forEach(card => {

        card.addEventListener(
            'mouseenter',
            function() {

                this.style.transform =
                    'translateY(-8px) rotateY(5deg)';

                this.style.backgroundColor =
                    'rgba(44, 95, 45, 1)';

            }
        );

        card.addEventListener(
            'mouseleave',
            function() {

                this.style.transform =
                    'translateY(0) rotateY(0)';

            }
        );

    });

}


// ==================== BUTTON RIPPLE EFFECT ====================

function initRippleEffect() {

    const buttons =
        document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {

        button.addEventListener(
            'click',
            function(e) {

                const ripple =
                    document.createElement('span');

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                const x =
                    e.clientX -
                    rect.left -
                    size / 2;

                const y =
                    e.clientY -
                    rect.top -
                    size / 2;

                ripple.style.cssText = `

                    position: absolute;

                    width: ${size}px;

                    height: ${size}px;

                    background:
                        rgba(255, 255, 255, 0.5);

                    border-radius: 50%;

                    left: ${x}px;

                    top: ${y}px;

                    pointer-events: none;

                    animation:
                        ripple-animation
                        0.6s ease-out;

                `;

                this.appendChild(ripple);

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}


// ==================== SMOOTH SCROLL LINKS ====================

function initSmoothScrollLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            'click',
            function(e) {

                e.preventDefault();

                const targetId =
                    this.getAttribute('href');

                const targetElement =
                    document.querySelector(targetId);

                if (targetElement) {

                    targetElement.scrollIntoView({

                        behavior: 'smooth',

                        block: 'start'

                    });

                }

            }
        );

    });

}


// ==================== AOS-LIKE STAGGER ANIMATION ====================

function initStaggerAnimation() {

    const container =
        document.querySelector('.lokasi-grid');

    if (!container) return;

    const cards =
        container.querySelectorAll('.kartu-lokasi');

    cards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.1}s`;

        card.classList.add(
            'stagger-animation'
        );

    });

}


// ==================== SCROLL PROGRESS BAR ====================

function initScrollProgressBar() {

    const progressBar =
        document.createElement('div');

    progressBar.style.cssText = `

        position: fixed;

        top: 0;

        left: 0;

        height: 3px;

        background:
            linear-gradient(
                90deg,
                #2c5f2d 0%,
                #1b3a1c 100%
            );

        z-index: 999;

        width: 0%;

        transition:
            width 0.2s ease;

    `;

    document.body.appendChild(progressBar);


    window.addEventListener('scroll', () => {

        const scrollTop =
            window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const scrollPercent =
            (scrollTop / docHeight) * 100;

        progressBar.style.width =
            scrollPercent + '%';

    });

}


// ==================== PARALLAX EFFECT ====================

function initParallaxEffect() {

    const parallaxElements =
        document.querySelectorAll(
            '.hero-content'
        );

    window.addEventListener('scroll', () => {

        const scrollTop =
            window.pageYOffset;

        parallaxElements.forEach(element => {

            element.style.transform =
                `translateY(${scrollTop * 0.5}px)`;

        });

    });

}


// ==================== TYPING ANIMATION ====================

function typeWriter(
    element,
    text,
    speed = 50
) {

    let i = 0;

    element.innerHTML = '';


    const type = () => {

        if (i < text.length) {

            element.innerHTML +=
                text.charAt(i);

            i++;

            setTimeout(
                type,
                speed
            );

        }

    };

    type();

}


// ==================== BOUNCE ANIMATION ====================

function initBounceAnimation() {

    const buttons =
        document.querySelectorAll(
            '.btn-primary'
        );

    buttons.forEach(btn => {

        btn.style.animation =
            'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    });

}


// ==================== INITIALIZE ALL ANIMATIONS ====================

function initAllAnimations() {

    // Carousel

    autoSlide();


    // Mobile menu close on link click

    closeMenuOnClick();


    // Scroll animations

    initScrollAnimations();


    // Counter animation saat scroll ke statistik

    const statistikSection =
        document.querySelector('.statistik');

    if (statistikSection) {

        const statistikObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {

                        animateCounters();

                        entry.target.dataset.animated =
                            'true';

                    }

                });

            });

        statistikObserver.observe(
            statistikSection
        );

    }


    // Card effects

    initCardHoverEffects();

    initStatistikHoverEffects();


    // Button effects

    initRippleEffect();

    initBounceAnimation();


    // Smooth scroll

    initSmoothScrollLinks();


    // Other effects

    initNavbarScroll();

    initStaggerAnimation();

    initScrollProgressBar();

    initParallaxEffect();

}


// ==================== LOAD ANIMATIONS ON DOM READY ====================

document.addEventListener(
    'DOMContentLoaded',
    initAllAnimations
);


// ==================== KEYBOARD NAVIGATION ====================

document.addEventListener(
    'keydown',
    (e) => {

        if (e.key === 'ArrowLeft') {

            changeSlide(-1);

        } else if (e.key === 'ArrowRight') {

            changeSlide(1);

        } else if (e.key === 'Escape') {

            closeModal();

        }

    }
);


// ==================== MOBILE TOUCH SWIPE ====================

function initTouchSwipe() {

    const carousel =
        document.querySelector(
            '.carousel-container'
        );

    if (!carousel) return;

    let touchStartX = 0;

    let touchEndX = 0;


    carousel.addEventListener(
        'touchstart',
        (e) => {

            touchStartX =
                e.changedTouches[0].screenX;

        },
        false
    );


    carousel.addEventListener(
        'touchend',
        (e) => {

            touchEndX =
                e.changedTouches[0].screenX;

            handleSwipe();

        },
        false
    );


    function handleSwipe() {

        if (
            touchEndX <
            touchStartX - 50
        ) {

            changeSlide(1);

        } else if (
            touchEndX >
            touchStartX + 50
        ) {

            changeSlide(-1);

        }

    }

}


document.addEventListener(
    'DOMContentLoaded',
    initTouchSwipe
);


// ==================== ADD CSS ANIMATIONS ====================

const style =
    document.createElement('style');

style.innerHTML = `

    @keyframes fade-in {

        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }

    }


    @keyframes float-away {

        from {
            opacity: 1;
            transform:
                translate(0, 0)
                rotate(0deg);
        }

        to {
            opacity: 0;
            transform:
                translate(
                    ${Math.random() * 200 - 100}px,
                    -200px
                )
                rotate(360deg);
        }

    }


    @keyframes ripple-animation {

        to {
            transform: scale(4);
            opacity: 0;
        }

    }


    @keyframes bounce-in {

        from {
            opacity: 0;
            transform: scale(0.8);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }

    }


    @keyframes stagger-animation {

        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }

    }


    .fade-in-element {

        opacity: 0;

        animation:
            fade-in
            0.8s ease
            forwards;

    }


    .fade-in-element.visible {

        opacity: 1;

        animation:
            fade-in
            0.8s ease
            forwards;

    }


    .stagger-animation {

        animation:
            stagger-animation
            0.6s ease
            forwards;

    }


    .show-modal {

        animation:
            fadeIn
            0.3s ease;

    }


    .btn-primary {

        position: relative;

        overflow: hidden;

    }


    .kartu-lokasi {

        transition:
            all
            0.3s
            cubic-bezier(
                0.34,
                1.56,
                0.64,
                1
            );

    }


    .statistik-card {

        transition:
            all
            0.3s ease;

    }

`;

document.head.appendChild(style);


// ==================== LEAFLET MAP INITIALIZATION ====================

function initMap() {

    const mapElement =
        document.getElementById('map');

    if (!mapElement) {

        console.error(
            'Map element not found'
        );

        return;

    }


    // Cek apakah Leaflet sudah dimuat

    if (typeof L === 'undefined') {

        console.error(
            'Leaflet library not loaded'
        );

        mapElement.innerHTML =
            '<p style="padding: 20px; text-align: center; color: #999;">Peta sedang memuat...</p>';

        setTimeout(
            initMap,
            1000
        );

        return;

    }


    try {

        // Koordinat Desa Semparuk Sutera

        const desaLocation = [
            1.1828505,
            109.0722672
        ];


        // Buat map dengan Leaflet

        const map =
            L.map('map', {

                center: desaLocation,

                zoom: 14,

                scrollWheelZoom: true,

                touchZoom: true

            });


        // Layer 1: OpenStreetMap

        const osmLayer =
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {

                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

                    maxZoom: 19,

                    minZoom: 2,

                    errorTileUrl:
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect fill="%23f0f0f0" width="256" height="256"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="14">Tile Error</text></svg>'

                }
            ).addTo(map);


        // Layer 2: Satelit

        const satelitLayer =
            L.tileLayer(
                'https://tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
                {

                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

                    maxZoom: 18,

                    minZoom: 2

                }
            );


        // Layer 3: Peta Topografi

        const topoLayer =
            L.tileLayer(
                'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                {

                    attribution:
                        'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',

                    maxZoom: 17,

                    minZoom: 2

                }
            );


        // Marker untuk desa pusat

        const desaMarker =
            L.marker(
                desaLocation,
                {

                    icon:
                        L.icon({

                            iconUrl:
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="18" fill="%232c5f2d" stroke="white" stroke-width="2"/><text x="20" y="25" font-size="24" text-anchor="middle" fill="white" font-weight="bold">◎</text></svg>',

                            iconSize: [
                                40,
                                40
                            ],

                            iconAnchor: [
                                20,
                                40
                            ],

                            popupAnchor: [
                                0,
                                -40
                            ]

                        })

                }
            ).addTo(map).bindPopup(`

                <div
                    style="
                        color: #333;
                        font-family: Arial;
                        font-size: 12px;
                    "
                >

                    <h3
                        style="
                            margin: 0 0 10px 0;
                            color: #2c5f2d;
                            font-size: 16px;
                        "
                    >
                        📍 Desa Semparuk Sutera
                    </h3>

                    <p style="margin: 5px 0;">
                        <strong>Kecamatan:</strong>
                        Semparuk
                    </p>

                    <p style="margin: 5px 0;">
                        <strong>Kabupaten:</strong>
                        Sambas
                    </p>

                    <p style="margin: 5px 0;">
                        <strong>Provinsi:</strong>
                        Kalimantan Barat
                    </p>

                    <p style="margin: 5px 0;">
                        <strong>Negara:</strong>
                        Indonesia
                    </p>

                    <p
                        style="
                            margin: 8px 0 0 0;
                            border-top: 1px solid #ccc;
                            padding-top: 8px;
                        "
                    >
                        <strong>Lat:</strong>
                        -1.1829°

                        |

                        <strong>Lon:</strong>
                        109.0728°
                    </p>

                </div>

            `);


        // Buka popup otomatis

        desaMarker.openPopup();


        // Tambahkan kontrol layer

        const baseLayers = {

            "🗺️ Peta Jalan":
                osmLayer,

            "🏔️ Topografi":
                topoLayer,

            "🛰️ Satelit":
                satelitLayer

        };


        L.control.layers(
            baseLayers,
            null,
            {

                position: 'topright',

                collapsed: true

            }
        ).addTo(map);


        // Tambahkan kontrol zoom

        L.control.zoom({

            position: 'bottomright'

        }).addTo(map);


        // Log success

        console.log(
            'Map initialized successfully at',
            desaLocation
        );


    } catch (error) {

        console.error(
            'Error initializing map:',
            error
        );

        mapElement.innerHTML =
            '<p style="padding: 20px; text-align: center; color: #d32f2f;">Gagal memuat peta. Silakan refresh halaman.</p>';

    }

}


// Panggil initMap saat window load

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initMap
    );

} else {

    initMap();

}