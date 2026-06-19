let index = 0;

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const totalSlides = slideItems.length;

const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");
const dotsContainer = document.querySelector(".carousel-dots");

let autoPlay;

/* ========= CARRUSEL ========= */

if (carousel && slides && slideItems.length > 0 && dotsContainer) {

    slideItems.forEach((_, i) => {
        const dot = document.createElement("span");

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            index = i;
            updateCarousel();
            restartAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dots span");

    function resetSlideAnimation() {
        slideItems.forEach((slide) => {
            slide.classList.remove("active");

            const line = slide.querySelector(".title-line");
            const title = slide.querySelector(".slide-text h1");
            const text = slide.querySelector(".slide-text p");

            if (line) line.style.animation = "none";
            if (title) title.style.animation = "none";
            if (text) text.style.animation = "none";
        });
    }

    function activateSlideAnimation(currentSlide) {
        if (!currentSlide) return;

        void currentSlide.offsetWidth;

        const line = currentSlide.querySelector(".title-line");
        const title = currentSlide.querySelector(".slide-text h1");
        const text = currentSlide.querySelector(".slide-text p");

        if (line) line.style.animation = "";
        if (title) title.style.animation = "";
        if (text) text.style.animation = "";

        currentSlide.classList.add("active");
    }

    function updateCarousel() {
        slides.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[index]) dots[index].classList.add("active");

        resetSlideAnimation();
        activateSlideAnimation(slideItems[index]);
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            index++;
            if (index >= totalSlides) index = 0;
            updateCarousel();
            restartAutoplay();
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            index--;
            if (index < 0) index = totalSlides - 1;
            updateCarousel();
            restartAutoplay();
        });
    }

    function startAutoplay() {
        autoPlay = setInterval(() => {
            index++;
            if (index >= totalSlides) index = 0;
            updateCarousel();
        }, 20000);
    }

    function restartAutoplay() {
        clearInterval(autoPlay);
        startAutoplay();
    }

    window.addEventListener("load", updateCarousel);
    window.addEventListener("resize", updateCarousel);
    window.addEventListener("orientationchange", updateCarousel);

    carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
    carousel.addEventListener("mouseleave", () => startAutoplay());

    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;

        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                index++;
                if (index >= totalSlides) index = 0;
            } else {
                index--;
                if (index < 0) index = totalSlides - 1;
            }

            updateCarousel();
            restartAutoplay();
        }
    });

    updateCarousel();
    startAutoplay();
}

/* ========= MENU MOVIL ========= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

function openMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");
        document.body.classList.add("modal-open");
    }
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }
}

if (menuToggle) menuToggle.addEventListener("click", openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener("click", closeMobileMenu);

/* ========= DROPDOWN ORIENTACION MIGRATORIA ========= */

const pillDropdown = document.querySelector(".pill-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

if (dropdownToggle && pillDropdown) {
    dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        pillDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!pillDropdown.contains(e.target)) {
            pillDropdown.classList.remove("active");
        }
    });
}

/* ========= POPUP DEL MAPA ========= */

document.addEventListener("DOMContentLoaded", () => {

    const markers = document.querySelectorAll(".marker-btn");
    const popup = document.getElementById("mapPopup");
    const popupLink = document.getElementById("mapPopupLink");
    const map = document.querySelector(".map-interactive");

    if (markers.length && popup && popupLink && map) {
        markers.forEach(marker => {
            marker.addEventListener("click", (e) => {
                e.stopPropagation();

                const country = marker.dataset.country;
                const url = marker.dataset.url;

                popupLink.textContent = country;
                popupLink.href = url;

                const markerBox = marker.getBoundingClientRect();
                const mapBox = map.getBoundingClientRect();

                popup.style.left = `${markerBox.left - mapBox.left + 18}px`;
                popup.style.top = `${markerBox.top - mapBox.top - 8}px`;

                popup.classList.add("show");
            });
        });

        document.addEventListener("click", (e) => {
            if (!popup.contains(e.target)) {
                popup.classList.remove("show");
            }
        });
    }
});

/* ========= BLOQUEO DE SCROLL ========= */

let scrollPosition = 0;

function lockPageScroll() {
    scrollPosition = window.scrollY || document.documentElement.scrollTop;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    document.body.classList.add("modal-open");
}

function unlockPageScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    document.body.classList.remove("modal-open");

    window.scrollTo(0, scrollPosition);
}

/* ========= MODAL DE PROYECTOS ========= */

document.addEventListener("DOMContentLoaded", () => {

    const projectsData = {
        jovenes: {
            support: "Apoyado por: KINDERMISSIONWERK, ALEMANIA",
            title: "Jóvenes Rompiendo Fronteras. Promoviendo cultura de hospitalidad con enfoque intercultural y migratorio – El Alto / Bolivia",
            body: `
                <p>
                    El proyecto “Jóvenes Rompiendo Fronteras” promueve la construcción de una cultura de hospitalidad e interculturalidad en la ciudad de El Alto mediante procesos formativos dirigidos a adolescentes y jóvenes en situación de vulnerabilidad, fortaleciendo el reconocimiento de su identidad cultural y sus capacidades de convivencia en contextos diversos.
                </p>

                <p>
                    A través de formación progresiva, experiencias vivenciales e incidencia social, los participantes se convierten en protagonistas de encuentros interculturales y acciones de sensibilización, mientras el proyecto impulsa la organización juvenil, la producción de contenidos comunicacionales y el fortalecimiento institucional, consolidando a los jóvenes como actores clave en la construcción de relaciones basadas en la dignidad, la diversidad y la inclusión.
                </p>
            `
        },

        acompanamiento: {
            support: "Apoyado por: JESUITEN WELTWEIT, ALEMANIA",
            title: "Acompañamiento integral y visibilización de la migración forzada con enfoque intercultural (2024 – 2025)",
            body: `
                <p>
                    El proyecto “Acompañamiento integral y visibilización de la migración forzada” busca reducir la vulnerabilidad de las personas migrantes en Bolivia mediante una intervención integral basada en los principios de acoger, proteger, promover e integrar, brindando atención humanitaria, apoyo psicosocial, asesoramiento legal y oportunidades de integración sociocultural que garantizan el acceso a derechos y condiciones dignas.
                </p>

                <p>
                    Paralelamente, impulsa procesos de convivencia intercultural, visibilización del fenómeno migratorio y monitoreo de fronteras, contribuyendo a la sensibilización social, la generación de información y la incidencia pública, posicionando al SJM como un actor clave en la protección y promoción de los derechos de las personas migrantes.
                </p>
            `
        },

        emprendimiento: {
            support: "Apoyado por: Desarrollo y Paz – Caritas Canadá",
            title: "Propuesta metodológica para el apoyo a Emprendimientos con población vulnerable a partir de la evaluación de experiencias de emprendimiento con migrantes forzados residentes en Bolivia",
            body: `
                <p>
                    El proyecto piloto “Propuesta metodológica para el apoyo a Emprendimientos con población vulnerable” tiene como finalidad fortalecer la inclusión económica de personas migrantes mediante un proceso integral que inicia con un diagnóstico basado en la evaluación social sistémica, continúa con la formación en áreas productivas y gestión empresarial, y se concreta en la implementación y acompañamiento de emprendimientos piloto.
                </p>

                <p>
                    A partir de la evaluación participativa de estas experiencias, se identifican buenas prácticas que permiten diseñar una metodología institucional replicable, orientada a promover la sostenibilidad de los emprendimientos y la autonomía económica de las poblaciones migrantes en contextos de vulnerabilidad.
                </p>
            `
        }
    };

    const projectModal = document.getElementById("projectModal");
    const projectModalClose = document.getElementById("projectModalClose");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalSupport = document.getElementById("projectModalSupport");
    const projectModalBody = document.getElementById("projectModalBody");
    const projectModalBackdrop = document.querySelector("#projectModal .project-modal-backdrop");
    const projectTriggers = document.querySelectorAll(".project-capsule");

    if (
        projectModal &&
        projectModalClose &&
        projectModalTitle &&
        projectModalSupport &&
        projectModalBody &&
        projectTriggers.length
    ) {
        function openProjectModal(projectKey) {
            const project = projectsData[projectKey];
            if (!project) return;

            projectModalSupport.textContent = project.support;
            projectModalTitle.textContent = project.title;
            projectModalBody.innerHTML = project.body;

            const modalScroll = projectModal.querySelector(".project-modal-scroll");
            if (modalScroll) modalScroll.scrollTop = 0;

            projectModal.classList.add("active");
            projectModal.setAttribute("aria-hidden", "false");

            lockPageScroll();
        }

        function closeProjectModal() {
            projectModal.classList.remove("active");
            projectModal.setAttribute("aria-hidden", "true");

            unlockPageScroll();
        }

        projectTriggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                openProjectModal(trigger.dataset.project);
            });
        });

        projectModalClose.addEventListener("click", closeProjectModal);

        if (projectModalBackdrop) {
            projectModalBackdrop.addEventListener("click", closeProjectModal);
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && projectModal.classList.contains("active")) {
                closeProjectModal();
            }
        });
    }
});

/* ========= MODAL AREAS Y CIFRAS ========= */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("areaModal");
    const modalClose = document.getElementById("areaModalClose");
    const modalTitle = document.getElementById("areaModalTitle");
    const modalSupport = document.getElementById("areaModalSupport");
    const modalBody = document.getElementById("areaModalBody");

    if (!modal || !modalClose || !modalTitle || !modalSupport || !modalBody) return;

    const modalBackdrop = modal.querySelector(".project-modal-backdrop");

    const areasData = {
        sociopastoral: {
            title: "Área Socio Pastoral",
            body: `
                <section class="area-detail-section">
                    <h3>Objetivo del Área</h3>
                    <p>
                        Disminuir la vulnerabilidad de las personas migrantes y sus familias mediante la articulación con otras instituciones para el acompañamiento en los flujos migratorios, el fortalecimiento de una presencia intercultural orientada a la formación e información en zonas fronterizas, y el desarrollo de acciones de acompañamiento social y pastoral dirigidas a familias en situación de vulnerabilidad.
                    </p>
                </section>

                <section class="area-detail-section">
                    <h3>1. Acompañamiento social para el bienestar y la inclusión</h3>

                    <div class="area-detail-grid">
                        <div class="area-detail-content">
                            <p>
                                Brindamos acompañamiento integral a la población migrante, promoviendo su bienestar y facilitando su proceso de integración social.
                            </p>

                            <h4>Servicios:</h4>

                            <ul>
                                <li>Acompañamiento y seguimiento en situaciones de salud, mediante la articulación con centros de atención aliados.</li>
                                <li>Orientación social para la movilidad y adaptación en las ciudades de El Alto y La Paz.</li>
                                <li>Promoción de la integración social, económica y cultural.</li>
                            </ul>
                        </div>

                        <div class="area-detail-image">
                            <img src="area-socio1.png" alt="Acompañamiento social">
                        </div>
                    </div>
                </section>

                <section class="area-detail-section">
                    <h3>2. Orientación legal y migratoria para el acceso a derechos</h3>

                    <div class="area-detail-grid">
                        <div class="area-detail-content">
                            <p>
                                Ofrecemos orientación y acompañamiento en temas legales y migratorios, promoviendo el acceso efectivo a derechos y la regularización de la situación migratoria.
                            </p>

                            <h4>Servicios:</h4>

                            <ul>
                                <li>Orientación sobre la normativa migratoria vigente.</li>
                                <li>Asesoramiento legal básico según cada caso.</li>
                                <li>Acompañamiento en procesos administrativos migratorios.</li>
                            </ul>
                        </div>

                        <div class="area-detail-image">
                            <img src="area-socio2.png" alt="Orientación legal y migratoria">
                        </div>
                    </div>
                </section>

                <section class="area-detail-section">
                    <h3>3. Apoyo humanitario en situaciones de vulnerabilidad</h3>

                    <div class="area-detail-grid">
                        <div class="area-detail-content">
                            <p>
                                Brindamos asistencia oportuna y digna a personas migrantes en condiciones de vulnerabilidad, garantizando el acceso a servicios básicos.
                            </p>

                            <h4>Servicios:</h4>

                            <ul>
                                <li>Entrega de kits de aseo personal.</li>
                                <li>Dotación de ropa en buen estado.</li>
                                <li>Acceso a servicios básicos: ducha, cocina y lavandería.</li>
                            </ul>
                        </div>

                        <div class="area-detail-image">
                            <img src="area-socio3.png" alt="Apoyo humanitario">
                        </div>
                    </div>
                </section>
            `
        },

        jovenes: {
            support: "",
            title: "ÁREA FORMACIÓN INTERCULTURAL",
            body: `
                <div class="area-popup-section">
                    <h2>Objetivo del Área</h2>

                    <div class="popup-grid popup-grid-image-right">
                        <div class="popup-text">
                            <p>
                                Promover la convivencia intercultural en contextos marcados por la movilidad humana,
                                fortaleciendo las relaciones entre diversas culturas. En este marco, se impulsa la
                                incorporación de la dimensión intercultural vinculada a la migración en las políticas
                                educativas, con el propósito de incidir en procesos formativos que reconozcan y valoren
                                la interculturalidad como un elemento central para la cohesión social.
                            </p>
                        </div>

                        <div class="popup-image">
                            <img src="jovenes.png" alt="Área Formación Intercultural">
                        </div>
                    </div>
                </div>

                <hr class="popup-divider">

                <div class="area-popup-section">
                    <h2>Proceso de Formación</h2>

                    <p class="popup-intro">
                        El proceso está compuesto de 3 niveles de formación:
                    </p>

                    <div class="levels-box">
                        <div class="level-item">
                            <h3>Nivel I</h3>
                            <p>
                                Desarrollar en los jóvenes habilidades intrapersonales que les permita alcanzar un conocimiento de sí mismos y de su entorno a través de actividades centradas en el reconocimiento de su identidad cultural para lograr una afirmación de su propia cultura.
                            </p>
                        </div>

                        <div class="level-item">
                            <h3>Nivel II</h3>
                            <p>
                                Fomentar actitudes constructivas desde el reconocimiento de su propia cultura y de apertura al otro en un contexto de diversidad cultural, a través de actividades centradas en procesos de diálogo y comunicación para posibilitar una interacción cultural en diversidad.
                            </p>
                        </div>

                        <div class="level-item">
                            <h3>Nivel III</h3>
                            <p>
                                Promover procesos que posibiliten diálogos multiculturales desde una conciencia intercultural, a través de la incidencia en distintos grupos sociales para propiciar espacios de convivencia intercultural e interacción fraternal.
                            </p>
                        </div>
                    </div>
                </div>

                <hr class="popup-divider">

                <div class="area-popup-section">
                    <h2>Líneas de Acción</h2>

                    <h3 class="action-title">1. Procesos Formativos en Interculturalidad</h3>

                    <div class="popup-grid popup-grid-image-right">
                        <div class="popup-text">
                            <p>
                                Se realizan procesos formativos orientados al desarrollo de habilidades y actitudes interculturales en jóvenes, mediante la aplicación de la metodología multitransformadora, con el fin de fortalecer la convivencia y la interrelación cultural en la ciudad de El Alto, en un contexto de movilidad migratoria interna y externa que enriquece la diversidad cultural.
                            </p>
                        </div>

                        <div class="popup-image">
                            <img src="interculturalidad2.png" alt="Procesos Formativos en Interculturalidad">
                        </div>
                    </div>
                </div>

                <hr class="popup-divider">

                <div class="area-popup-section">
                    <h3 class="action-title">2. Encuentros y Diálogos Interculturales</h3>

                    <div class="popup-grid popup-grid-image-right">
                        <div class="popup-text">
                            <p>
                                Se desarrollan espacios de encuentro entre personas migrantes internacionales y jóvenes del programa Jóvenes Rompiendo Fronteras, orientados a fortalecer valores de hospitalidad y a promover la superación de barreras socioculturales, favoreciendo la convivencia y el reconocimiento mutuo.
                            </p>
                        </div>

                        <div class="popup-image">
                            <img src="interculturalidad3.png" alt="Encuentros y Diálogos Interculturales">
                        </div>
                    </div>
                </div>

                <hr class="popup-divider">

                <div class="area-popup-section">
                    <h3 class="action-title">3. Acciones Socioeducativas con la Niñez</h3>

                    <div class="popup-grid popup-grid-image-double">
                        <div class="popup-text">
                            <p>
                                Se implementan actividades lúdico-formativas orientadas a promover la interculturalidad mediante dinámicas y juegos que facilitan el reconocimiento, la valoración de la diversidad cultural y la interacción respetuosa entre niños y niñas.
                            </p>
                        </div>

                        <div class="popup-image-column">
                            <img src="interculturalidad5.png" alt="Acciones Socioeducativas con la Niñez">
                        </div>
                    </div>
                </div>
            `
        }
    };

    const statsData = {
        cifras: {
            support: "Cobertura y perfil de atención",
            title: "Cifras de Atención",
            body: `
                <div class="stats-popup-hero">
                    <div>
                        <span>2019 – 2026</span>
                        <h3>9.545 personas acompañadas</h3>
                        <p>
                            La atención institucional evidencia una cobertura sostenida a personas migrantes
                            y familias en situación de movilidad humana, con presencia significativa de población
                            adulta, niñez y adolescencia.
                        </p>
                    </div>

                    <div class="stats-popup-kpis">
                        <div>
                            <strong>68%</strong>
                            <span>Adultos</span>
                        </div>

                        <div>
                            <strong>32%</strong>
                            <span>Menores</span>
                        </div>
                    </div>
                </div>

                <div class="stats-popup-section">
                    <h3>Cobertura de Atención</h3>

                    <div class="stats-cover-grid">
                        <div class="stats-ribbon-list">
                            <div class="ribbon-item gray">
                                <span>2019 – 2026</span>
                                <strong>9.545</strong>
                            </div>

                            <div class="ribbon-item orange">
                                <span>Adultos</span>
                                <strong>68%</strong>
                            </div>

                            <div class="ribbon-item red">
                                <span>Menores</span>
                                <strong>32%</strong>
                            </div>
                        </div>

                        <div class="stats-image-placeholder">
                            <img src="cobertura-atencion.png" alt="Cobertura de atención">
                        </div>
                    </div>
                </div>

                <div class="stats-popup-section">
                    <h3>Atención por Gestión</h3>

                    <div class="stats-table-box">
                        <table>
                            <thead>
                                <tr>
                                    <th>Variable</th>
                                    <th>2019</th>
                                    <th>2020</th>
                                    <th>2021</th>
                                    <th>2022</th>
                                    <th>2023</th>
                                    <th>2024</th>
                                    <th>2025</th>
                                    <th>2026</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Adulto</td>
                                    <td>79%</td>
                                    <td>65%</td>
                                    <td>66%</td>
                                    <td>67%</td>
                                    <td>71%</td>
                                    <td>68%</td>
                                    <td>69%</td>
                                    <td>74%</td>
                                </tr>

                                <tr>
                                    <td>Menor</td>
                                    <td>21%</td>
                                    <td>35%</td>
                                    <td>34%</td>
                                    <td>33%</td>
                                    <td>29%</td>
                                    <td>32%</td>
                                    <td>31%</td>
                                    <td>26%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="stats-popup-section">
                    <h3>Perfil de la Población Atendida</h3>

                    <div class="stats-profile-grid">
                        <div class="profile-card">
                            <h4>Género</h4>
                            <strong>67%</strong>
                            <span>Masculino</span>
                            <p>32% femenino y 1% población LGBT.</p>
                        </div>

                        <div class="profile-card">
                            <h4>Nacionalidad</h4>
                            <strong>65%</strong>
                            <span>Venezuela</span>
                            <p>Colombia 24%, Perú 3%, Ecuador 1% y otros 8%.</p>
                        </div>

                        <div class="profile-card">
                            <h4>Causas de migración</h4>
                            <strong>71%</strong>
                            <span>Laboral / económica</span>
                            <p>Opinión política 11%, violencia 3% y conflictos armados 15%.</p>
                        </div>

                        <div class="profile-card">
                            <h4>Motivo de movilidad</h4>
                            <strong>70%</strong>
                            <span>Tránsito a otro país</span>
                            <p>24% retorno a su país y 6% permanencia.</p>
                        </div>
                    </div>
                </div>

                <div class="stats-popup-section">
                    <h3>Estado de Movilidad Humana</h3>

                    <div class="mobility-box">
                        <div class="mobility-image">
                            <img src="estado-movilidad.png" alt="Estado de movilidad humana">
                        </div>

                        <div class="mobility-table">
                            <div>
                                <strong>Tránsito</strong>
                                <span>70%</span>
                                <p>30% Chile / 70% Brasil.</p>
                            </div>

                            <div>
                                <strong>Retorno</strong>
                                <span>24%</span>
                                <p>91% país de origen / 9% país de mayor acogida.</p>
                            </div>

                            <div>
                                <strong>Residencia</strong>
                                <span>6%</span>
                                <p>Ya se encontraban residiendo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };

    function openSharedModal(data) {
        if (!data) return;

        modalSupport.textContent = data.support || "";
        modalTitle.textContent = data.title || "";
        modalBody.innerHTML = data.body || "";

        modalBody.scrollTop = 0;
        modal.classList.add("active");

        lockPageScroll();
    }

    function closeSharedModal() {
        modal.classList.remove("active");
        unlockPageScroll();
    }

    const areaTriggers = document.querySelectorAll(".area-trigger");
    const statsTriggers = document.querySelectorAll(".stats-trigger");

    areaTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openSharedModal(areasData[trigger.dataset.area]);
        });
    });

    statsTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openSharedModal(statsData[trigger.dataset.stats]);
        });
    });

    modalClose.addEventListener("click", closeSharedModal);

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeSharedModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeSharedModal();
        }
    });
});

/* ========= CARRUSEL NUESTRAS ALIANZAS ========= */

document.addEventListener("DOMContentLoaded", () => {

    const allianceSlides = document.querySelectorAll(".alliances-slide");
    const allianceDots = document.querySelectorAll(".alliance-dot");
    const allianceTitle = document.getElementById("alliancesTitle");

    if (!allianceSlides.length || !allianceDots.length) return;

    let allianceIndex = 0;
    let allianceAutoPlay;

    function showAllianceSlide(newIndex) {
        allianceSlides.forEach(slide => slide.classList.remove("active"));
        allianceDots.forEach(dot => dot.classList.remove("active"));

        if (allianceSlides[newIndex]) allianceSlides[newIndex].classList.add("active");
        if (allianceDots[newIndex]) allianceDots[newIndex].classList.add("active");

        if (allianceTitle && allianceSlides[newIndex]) {
            const newTitle = allianceSlides[newIndex].dataset.title;

            allianceTitle.style.opacity = "0";

            setTimeout(() => {
                allianceTitle.textContent = newTitle;
                allianceTitle.style.opacity = "1";
            }, 180);
        }
    }

    function nextAllianceSlide() {
        allianceIndex++;

        if (allianceIndex >= allianceSlides.length) {
            allianceIndex = 0;
        }

        showAllianceSlide(allianceIndex);
    }

    function restartAllianceAutoplay() {
        clearInterval(allianceAutoPlay);
        allianceAutoPlay = setInterval(nextAllianceSlide, 5000);
    }

    allianceDots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            allianceIndex = dotIndex;
            showAllianceSlide(allianceIndex);
            restartAllianceAutoplay();
        });
    });

    showAllianceSlide(0);
    restartAllianceAutoplay();
});