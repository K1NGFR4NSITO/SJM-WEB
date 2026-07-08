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
            
        },
        perfil: {
  support: "Perfil Migratorio 2024 - 2025",
  title: "Perfil Migratorio",
  body: `
      <div>
        <span>2024 - 2025</span>
        <h3>1.364 personas migrantes caracterizadas</h3>
        <p>El Perfil Migratorio caracteriza integralmente a la población migrante externa atendida por el SJM durante 2024 y 2025. La información se organiza en dimensiones sociodemográficas, familiares, migratorias, de protección, habitabilidad, salud y atención legal. Algunos indicadores usan universos específicos o registros de servicios, por lo que sus totales no siempre son directamente comparables.</p>
      </div>
      <div class="stats-popup-kpis">
        <div><strong>95,1%</strong><span>Ingreso irregular</span></div>
        <div><strong>83,7%</strong><span>Tránsito a otro país</span></div>
      </div>
    </div>

    <div class="stats-popup-section">
      <h3>Contexto territorial y migratorio</h3>
      <p>El Alto se ha consolidado como territorio receptor de migración interna e internacional. Su proximidad a la frontera con Perú y su función como puerta de ingreso al eje troncal convierten a la ciudad en un espacio estratégico de tránsito y destino, especialmente para población venezolana y colombiana.</p>
      <p>En un escenario de alta informalidad laboral, restricciones económicas y mecanismos temporales de regularización, Bolivia cumple simultáneamente funciones de tránsito, retorno y destino. La integración social, laboral, documental y habitacional continúa siendo frágil. En este contexto, el SJM desarrolla acciones de atención, acompañamiento y protección, con énfasis en población en situación migratoria irregular, pobreza extrema y alta vulnerabilidad social.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Síntesis ejecutiva</h3>
      <p>La población atendida presenta un perfil predominantemente masculino, joven y de origen venezolano. El 63,8% son hombres; las edades de 20 a 35 años concentran el 65,6% de los casos con edad registrada; Venezuela representa el 70,7% de las procedencias. La movilidad está marcada por razones laborales y económicas (81,8%) y por el tránsito hacia otro país (83,7%).</p>
      <p>La irregularidad migratoria constituye un factor estructural de vulnerabilidad: 1.297 personas (95,1%) reportaron ingreso irregular. Además, 957 personas (70,2%) estaban en situación de calle y 717 (52,6%) reportaron alguna forma de violencia por parte de la población durante el viaje.</p>
      <p>Durante el viaje, 918 personas (67,3%) recibieron ayuda de alguna institución; en Bolivia, 740 (54,3%) reportaron apoyo institucional. En el ámbito jurídico se registraron 428 atenciones legales y 333 seguimientos, con predominio de la orientación legal.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Caracterización sociodemográfica</h3>

      <h4>Género</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Masculino</h4><strong>870</strong><span>63,8%</span></div>
        <div class="profile-data-card"><h4>Femenino</h4><strong>460</strong><span>33,7%</span></div>
        <div class="profile-data-card"><h4>LGBT</h4><strong>34</strong><span>2,5%</span></div>
      </div>
      <p>La composición evidencia una marcada mayoría masculina. La presencia de mujeres y población LGBT exige respuestas diferenciadas de protección frente a violencia, discriminación y acceso desigual a derechos.</p>

      <h4>Estructura por edad</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>17–19 años</h4><strong>105</strong><span>7,7%</span></div>
        <div class="profile-data-card"><h4>20–25 años</h4><strong>346</strong><span>25,5%</span></div>
        <div class="profile-data-card"><h4>26–30 años</h4><strong>318</strong><span>23,4%</span></div>
        <div class="profile-data-card"><h4>31–35 años</h4><strong>227</strong><span>16,7%</span></div>
        <div class="profile-data-card"><h4>36–40 años</h4><strong>154</strong><span>11,3%</span></div>
        <div class="profile-data-card"><h4>41–50 años</h4><strong>154</strong><span>11,3%</span></div>
        <div class="profile-data-card"><h4>51–60 años</h4><strong>43</strong><span>3,2%</span></div>
        <div class="profile-data-card"><h4>60 años o más</h4><strong>10</strong><span>0,7%</span></div>
      </div>
      <p>Total con edad registrada: 1.357. Los grupos de 20 a 35 años reúnen el 65,6%, mostrando una migración esencialmente joven y económicamente activa, con presión sobre empleo, ingresos, vivienda y regularización documental.</p>

      <h4>País de procedencia</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Venezuela</h4><strong>965</strong><span>70,7%</span></div>
        <div class="profile-data-card"><h4>Colombia</h4><strong>299</strong><span>21,9%</span></div>
        <div class="profile-data-card"><h4>Ecuador</h4><strong>40</strong><span>2,9%</span></div>
        <div class="profile-data-card"><h4>Argentina</h4><strong>24</strong><span>1,8%</span></div>
        <div class="profile-data-card"><h4>Perú</h4><strong>17</strong><span>1,2%</span></div>
        <div class="profile-data-card"><h4>Otros</h4><strong>19</strong><span>1,4%</span></div>
      </div>
      <p>Venezuela y Colombia representan conjuntamente el 92,6% del total, confirmando una fuerte concentración de movilidad sudamericana.</p>

      <h4>Nivel educativo</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Primaria</h4><strong>249</strong><span>18,3%</span></div>
        <div class="profile-data-card"><h4>Secundaria</h4><strong>516</strong><span>37,8%</span></div>
        <div class="profile-data-card"><h4>Bachillerato</h4><strong>428</strong><span>31,4%</span></div>
        <div class="profile-data-card"><h4>Técnico</h4><strong>112</strong><span>8,2%</span></div>
        <div class="profile-data-card"><h4>Titulado</h4><strong>59</strong><span>4,3%</span></div>
      </div>
      <p>Existe una base importante de capacidades educativas que puede favorecer inserción laboral y emprendimiento, aunque la irregularidad migratoria y la precariedad habitacional limitan su aprovechamiento.</p>

      <h4>Autoidentificación indígena</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>No</h4><strong>906</strong><span>66,4%</span></div>
        <div class="profile-data-card"><h4>Sí</h4><strong>282</strong><span>20,7%</span></div>
        <div class="profile-data-card"><h4>No responde</h4><strong>176</strong><span>12,9%</span></div>
      </div>
      <p>La proporción de autoidentificación indígena es relevante para incorporar pertinencia cultural, enfoque intercultural y atención a posibles barreras lingüísticas o de discriminación.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Identidad, familia y vínculos</h3>

      <h4>Estado civil en el país de origen</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Unión libre</h4><strong>614</strong><span>45,0%</span></div>
        <div class="profile-data-card"><h4>Soltera/o</h4><strong>494</strong><span>36,2%</span></div>
        <div class="profile-data-card"><h4>Separada/o</h4><strong>168</strong><span>12,3%</span></div>
        <div class="profile-data-card"><h4>Casada/o</h4><strong>77</strong><span>5,6%</span></div>
        <div class="profile-data-card"><h4>Viuda/o</h4><strong>11</strong><span>0,8%</span></div>
      </div>

      <h4>Número de hijas e hijos</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>0</h4><strong>359</strong><span>26,3%</span></div>
        <div class="profile-data-card"><h4>1</h4><strong>367</strong><span>26,9%</span></div>
        <div class="profile-data-card"><h4>2</h4><strong>275</strong><span>20,2%</span></div>
        <div class="profile-data-card"><h4>3</h4><strong>188</strong><span>13,8%</span></div>
        <div class="profile-data-card"><h4>4</h4><strong>110</strong><span>8,1%</span></div>
        <div class="profile-data-card"><h4>5 o más</h4><strong>65</strong><span>4,8%</span></div>
      </div>
      <p>El 73,7% tiene al menos una hija o hijo. Los hogares con uno o dos hijos concentran 642 casos y 363 personas reportan tres o más.</p>

      <h4>Cuidado de hijas e hijos que permanecieron en origen</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Nadie</h4><strong>417</strong><span>41,5%</span></div>
        <div class="profile-data-card"><h4>Su madre</h4><strong>371</strong><span>36,9%</span></div>
        <div class="profile-data-card"><h4>Abuelo materno</h4><strong>103</strong><span>10,2%</span></div>
        <div class="profile-data-card"><h4>Abuelo paterno</h4><strong>49</strong><span>4,9%</span></div>
        <div class="profile-data-card"><h4>Su padre</h4><strong>37</strong><span>3,7%</span></div>
        <div class="profile-data-card"><h4>Otro familiar</h4><strong>28</strong><span>2,8%</span></div>
        <div class="profile-data-card"><h4>Amigos</h4><strong>0</strong><span>0,0%</span></div>
      </div>
      <p>Base: 1.005 casos. El reducido peso del padre como cuidador muestra una distribución desigual del cuidado y la importancia de las redes femeninas y de abuelos.</p>

      <h4>Envío de apoyo económico</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Sí</h4><strong>378</strong><span>37,6%</span></div>
        <div class="profile-data-card"><h4>No</h4><strong>627</strong><span>62,4%</span></div>
      </div>
      <p>Base: 1.005 casos. La mayoría no logra generar excedentes suficientes para sostener remesas o transferencias regulares.</p>

      <h4>Estado civil actual</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Unión libre</h4><strong>674</strong><span>49,4%</span></div>
        <div class="profile-data-card"><h4>Soltera/o</h4><strong>527</strong><span>38,6%</span></div>
        <div class="profile-data-card"><h4>Separada/o</h4><strong>101</strong><span>7,4%</span></div>
        <div class="profile-data-card"><h4>Casada/o</h4><strong>55</strong><span>4,0%</span></div>
        <div class="profile-data-card"><h4>Viuda/o</h4><strong>7</strong><span>0,5%</span></div>
      </div>

      <h4>Tipología familiar</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Reconstruida o simultánea</h4><strong>559</strong><span>41,0%</span></div>
        <div class="profile-data-card"><h4>Nuclear</h4><strong>396</strong><span>29,0%</span></div>
        <div class="profile-data-card"><h4>Monoparental</h4><strong>292</strong><span>21,4%</span></div>
        <div class="profile-data-card"><h4>Extensa o ampliada</h4><strong>117</strong><span>8,6%</span></div>
      </div>
      <p>La elevada proporción de familias reconstruidas muestra procesos de recomposición de vínculos y convivencia propios de trayectorias migratorias prolongadas.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Dinámica y trayectoria migratoria</h3>

      <h4>Causas de migración</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Laboral / económica</h4><strong>1.116</strong><span>81,8%</span></div>
        <div class="profile-data-card"><h4>Conflictos armados</h4><strong>192</strong><span>14,1%</span></div>
        <div class="profile-data-card"><h4>Violencia</h4><strong>21</strong><span>1,5%</span></div>
        <div class="profile-data-card"><h4>Crisis política</h4><strong>19</strong><span>1,4%</span></div>
        <div class="profile-data-card"><h4>Ecológica</h4><strong>6</strong><span>0,4%</span></div>
        <div class="profile-data-card"><h4>Opinión política</h4><strong>5</strong><span>0,4%</span></div>
        <div class="profile-data-card"><h4>Conflictos internos</h4><strong>3</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Religión</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Violación masiva de DDHH</h4><strong>1</strong><span>0,1%</span></div>
      </div>
      <p>Las motivaciones combinan necesidad económica y factores de protección; por ello, debe evitarse una separación rígida entre migración económica y migración forzada.</p>

      <h4>Tipo de ingreso</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Irregular</h4><strong>1.297</strong><span>95,1%</span></div>
        <div class="profile-data-card"><h4>Regular</h4><strong>67</strong><span>4,9%</span></div>
      </div>

      <h4>Documentación declarada entre personas con ingreso irregular</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Cédula de identidad</h4><strong>868</strong><span>66,9%</span></div>
        <div class="profile-data-card"><h4>Ningún documento</h4><strong>295</strong><span>22,7%</span></div>
        <div class="profile-data-card"><h4>Carta de denuncia</h4><strong>89</strong><span>6,9%</span></div>
        <div class="profile-data-card"><h4>Residencia de otro país</h4><strong>27</strong><span>2,1%</span></div>
        <div class="profile-data-card"><h4>Pasaporte</h4><strong>18</strong><span>1,4%</span></div>
      </div>
      <p>Base: 1.297 personas. La irregularidad no equivale necesariamente a ausencia de identidad documental, aunque 295 personas sin documentación requieren atención prioritaria.</p>

      <h4>Motivo y proyecto migratorio</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Tránsito a otro país</h4><strong>1.141</strong><span>83,7%</span></div>
        <div class="profile-data-card"><h4>Permanencia</h4><strong>128</strong><span>9,4%</span></div>
        <div class="profile-data-card"><h4>Retorno a su país</h4><strong>90</strong><span>6,6%</span></div>
        <div class="profile-data-card"><h4>Reunificación familiar</h4><strong>4</strong><span>0,3%</span></div>
        <div class="profile-data-card"><h4>Trabajo</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Salud</h4><strong>0</strong><span>0,0%</span></div>
        <div class="profile-data-card"><h4>Estudios</h4><strong>0</strong><span>0,0%</span></div>
        <div class="profile-data-card"><h4>Mayor seguridad</h4><strong>0</strong><span>0,0%</span></div>
      </div>
      <p>Bolivia y particularmente El Alto funcionan como nodos de tránsito, aunque una fracción modifica su proyecto y permanece, exigiendo combinar asistencia de emergencia con integración.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Protección, violencia y riesgos</h3>

      <h4>Violencia durante el viaje por parte de la población</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Ninguna</h4><strong>647</strong><span>47,4%</span></div>
        <div class="profile-data-card"><h4>Xenofobia</h4><strong>215</strong><span>15,8%</span></div>
        <div class="profile-data-card"><h4>Discriminación</h4><strong>211</strong><span>15,5%</span></div>
        <div class="profile-data-card"><h4>Robo</h4><strong>192</strong><span>14,1%</span></div>
        <div class="profile-data-card"><h4>Extorsión</h4><strong>50</strong><span>3,7%</span></div>
        <div class="profile-data-card"><h4>Física</h4><strong>25</strong><span>1,8%</span></div>
        <div class="profile-data-card"><h4>Verbal</h4><strong>13</strong><span>1,0%</span></div>
        <div class="profile-data-card"><h4>Secuestro</h4><strong>7</strong><span>0,5%</span></div>
        <div class="profile-data-card"><h4>Sexual</h4><strong>3</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Económica</h4><strong>1</strong><span>0,1%</span></div>
      </div>
      <p>717 personas (52,6%) reportaron alguna forma de violencia por parte de la población durante el viaje.</p>

      <h4>Violencia durante el viaje por parte de la familia</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Ninguna</h4><strong>1.339</strong><span>98,2%</span></div>
        <div class="profile-data-card"><h4>Verbal</h4><strong>6</strong><span>0,4%</span></div>
        <div class="profile-data-card"><h4>Física</h4><strong>6</strong><span>0,4%</span></div>
        <div class="profile-data-card"><h4>Robo</h4><strong>6</strong><span>0,4%</span></div>
        <div class="profile-data-card"><h4>Xenofobia</h4><strong>3</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Sexual</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Discriminación</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Secuestro</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Económica</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Extorsión</h4><strong>0</strong><span>0,0%</span></div>
      </div>

      <h4>Violencia en Bolivia por parte de la población</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Ninguna</h4><strong>1.146</strong><span>84,0%</span></div>
        <div class="profile-data-card"><h4>Discriminación</h4><strong>101</strong><span>7,4%</span></div>
        <div class="profile-data-card"><h4>Robo</h4><strong>38</strong><span>2,8%</span></div>
        <div class="profile-data-card"><h4>Extorsión</h4><strong>32</strong><span>2,3%</span></div>
        <div class="profile-data-card"><h4>Xenofobia</h4><strong>25</strong><span>1,8%</span></div>
        <div class="profile-data-card"><h4>Verbal</h4><strong>13</strong><span>1,0%</span></div>
        <div class="profile-data-card"><h4>Física</h4><strong>8</strong><span>0,6%</span></div>
        <div class="profile-data-card"><h4>Secuestro</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Sexual</h4><strong>0</strong><span>0,0%</span></div>
        <div class="profile-data-card"><h4>Económica</h4><strong>0</strong><span>0,0%</span></div>
      </div>
      <p>218 personas (16,0%) señalaron algún hecho de violencia por parte de la población en Bolivia.</p>

      <h4>Violencia en Bolivia por parte de la familia</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Ninguna</h4><strong>1.356</strong><span>99,4%</span></div>
        <div class="profile-data-card"><h4>Discriminación</h4><strong>4</strong><span>0,3%</span></div>
        <div class="profile-data-card"><h4>Xenofobia</h4><strong>2</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Extorsión</h4><strong>2</strong><span>0,1%</span></div>
      </div>
      <p>Aunque los registros son reducidos, este tipo de violencia puede estar subregistrado; conviene mantener canales seguros de identificación y acompañamiento.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Redes de apoyo y asistencia humanitaria</h3>

      <h4>Ayuda recibida durante el viaje</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Alguna institución</h4><strong>918</strong><span>67,3%</span></div>
        <div class="profile-data-card"><h4>Ninguna</h4><strong>422</strong><span>30,9%</span></div>
        <div class="profile-data-card"><h4>Población</h4><strong>20</strong><span>1,5%</span></div>
        <div class="profile-data-card"><h4>Familia y amigos</h4><strong>4</strong><span>0,3%</span></div>
        <div class="profile-data-card"><h4>Embajada</h4><strong>0</strong><span>0,0%</span></div>
      </div>

      <h4>Tipo de ayuda durante el viaje</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Alimentación</h4><strong>623</strong><span>45,7%</span></div>
        <div class="profile-data-card"><h4>Ninguna</h4><strong>530</strong><span>38,9%</span></div>
        <div class="profile-data-card"><h4>Hospedaje</h4><strong>86</strong><span>6,3%</span></div>
        <div class="profile-data-card"><h4>Otro tipo</h4><strong>81</strong><span>5,9%</span></div>
        <div class="profile-data-card"><h4>Ropa</h4><strong>32</strong><span>2,3%</span></div>
        <div class="profile-data-card"><h4>Atención médica</h4><strong>12</strong><span>0,9%</span></div>
      </div>

      <h4>Ayuda recibida en Bolivia</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Alguna institución</h4><strong>740</strong><span>54,3%</span></div>
        <div class="profile-data-card"><h4>Ninguna</h4><strong>576</strong><span>42,2%</span></div>
        <div class="profile-data-card"><h4>Población</h4><strong>46</strong><span>3,4%</span></div>
        <div class="profile-data-card"><h4>Embajada</h4><strong>1</strong><span>0,1%</span></div>
        <div class="profile-data-card"><h4>Familia y amigos</h4><strong>1</strong><span>0,1%</span></div>
      </div>

      <h4>Tipo de ayuda brindada en Bolivia</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Ninguna</h4><strong>610</strong><span>44,7%</span></div>
        <div class="profile-data-card"><h4>Hospedaje</h4><strong>547</strong><span>40,1%</span></div>
        <div class="profile-data-card"><h4>Alimentación</h4><strong>101</strong><span>7,4%</span></div>
        <div class="profile-data-card"><h4>Otro tipo</h4><strong>43</strong><span>3,2%</span></div>
        <div class="profile-data-card"><h4>Ropa</h4><strong>41</strong><span>3,0%</span></div>
        <div class="profile-data-card"><h4>Atención médica</h4><strong>22</strong><span>1,6%</span></div>
      </div>
      <p>La alta presencia de apoyo institucional demuestra que las organizaciones humanitarias constituyen una red de protección decisiva.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Habitabilidad y salud</h3>

      <h4>Condición de habitabilidad</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Situación de calle</h4><strong>957</strong><span>70,2%</span></div>
        <div class="profile-data-card"><h4>Albergue o refugio</h4><strong>122</strong><span>8,9%</span></div>
        <div class="profile-data-card"><h4>Hospedaje individual</h4><strong>96</strong><span>7,0%</span></div>
        <div class="profile-data-card"><h4>Alquiler individual</h4><strong>87</strong><span>6,4%</span></div>
        <div class="profile-data-card"><h4>Hospedaje en grupo</h4><strong>49</strong><span>3,6%</span></div>
        <div class="profile-data-card"><h4>Otro</h4><strong>27</strong><span>2,0%</span></div>
        <div class="profile-data-card"><h4>Alquiler grupal</h4><strong>26</strong><span>1,9%</span></div>
      </div>
      <p>La situación de calle es la expresión más crítica del perfil habitacional y amplifica riesgos de violencia, enfermedad, inseguridad alimentaria y pérdida de documentación.</p>

      <h4>Presencia de enfermedad</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Sí</h4><strong>436</strong><span>32,0%</span></div>
        <div class="profile-data-card"><h4>No</h4><strong>928</strong><span>68,0%</span></div>
      </div>

      <h4>Antecedente de COVID-19</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Sí</h4><strong>44</strong><span>3,2%</span></div>
        <div class="profile-data-card"><h4>No</h4><strong>1.320</strong><span>96,8%</span></div>
      </div>
      <p>La baja cifra puede reflejar ausencia de diagnóstico, dificultades de acceso a pruebas o subregistro y debe interpretarse con cautela.</p>

      <h4>Conocimiento de personas con COVID-19</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Sí</h4><strong>59</strong><span>4,3%</span></div>
        <div class="profile-data-card"><h4>No</h4><strong>1.305</strong><span>95,7%</span></div>
      </div>

      <h4>Medidas de prevención</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Otras medidas</h4><strong>1.193</strong><span>87,5%</span></div>
        <div class="profile-data-card"><h4>Solo barbijo</h4><strong>157</strong><span>11,5%</span></div>
        <div class="profile-data-card"><h4>Gel o alcohol</h4><strong>11</strong><span>0,8%</span></div>
        <div class="profile-data-card"><h4>Lavado de manos</h4><strong>3</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Distanciamiento social</h4><strong>0</strong><span>0,0%</span></div>
      </div>
      <p>La amplitud de la categoría “otras medidas” limita una interpretación precisa; se recomienda desagregarla en futuros registros.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Atención social e institucional</h3>

      <h4>Atenciones sociales registradas</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Atención social</h4><strong>1.364</strong><span>registros</span></div>
        <div class="profile-data-card"><h4>Seguimiento social</h4><strong>2.740</strong><span>registros</span></div>
        <div class="profile-data-card"><h4>Atención a hijos</h4><strong>637</strong><span>registros</span></div>
      </div>
      <p>El volumen de seguimientos, superior al número de atenciones iniciales, evidencia que una parte importante de los casos requiere intervención continuada. Las categorías representan registros de servicio, pueden superponerse y no deben sumarse como personas únicas.</p>

      <h4>Atención y seguimiento legal</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Atención legal</h4><strong>428</strong><span>56,2%</span></div>
        <div class="profile-data-card"><h4>Seguimiento legal</h4><strong>333</strong><span>43,8%</span></div>
      </div>
      <p>Total operativo: 761 actuaciones jurídicas.</p>

      <h4>Lugar de atención</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>El Alto</h4><strong>1.354</strong><span>91,4%</span></div>
        <div class="profile-data-card"><h4>La Paz</h4><strong>128</strong><span>8,6%</span></div>
      </div>
      <p>Total: 1.482 registros de atención. Pueden existir múltiples intervenciones para una misma persona.</p>

      <h4>Estado migratorio de las personas atendidas legalmente</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Irregular</h4><strong>297</strong><span>69,4%</span></div>
        <div class="profile-data-card"><h4>Regular</h4><strong>78</strong><span>18,2%</span></div>
        <div class="profile-data-card"><h4>Nacido en Bolivia</h4><strong>31</strong><span>7,2%</span></div>
        <div class="profile-data-card"><h4>Solicitante de refugio</h4><strong>22</strong><span>5,1%</span></div>
        <div class="profile-data-card"><h4>Refugiada/o</h4><strong>0</strong><span>0,0%</span></div>
      </div>

      <h4>Tipo de atención legal</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Orientación legal</h4><strong>421</strong><span>98,4%</span></div>
        <div class="profile-data-card"><h4>Acompañamiento y asesoramiento</h4><strong>6</strong><span>1,4%</span></div>
        <div class="profile-data-card"><h4>Representación legal</h4><strong>1</strong><span>0,2%</span></div>
      </div>

      <h4>Solicitudes y trámites jurídicos</h4>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Otros</h4><strong>284</strong><span>66,4%</span></div>
        <div class="profile-data-card"><h4>Permanencia temporal por familia</h4><strong>40</strong><span>9,3%</span></div>
        <div class="profile-data-card"><h4>Permanencia temporal por trabajo</h4><strong>22</strong><span>5,1%</span></div>
        <div class="profile-data-card"><h4>Duplicado de C.I. en Consulado</h4><strong>20</strong><span>4,7%</span></div>
        <div class="profile-data-card"><h4>Solicitud de refugio</h4><strong>17</strong><span>4,0%</span></div>
        <div class="profile-data-card"><h4>Otros trámites en Consulado</h4><strong>13</strong><span>3,0%</span></div>
        <div class="profile-data-card"><h4>Certificado de nacimiento en Bolivia</h4><strong>12</strong><span>2,8%</span></div>
        <div class="profile-data-card"><h4>Condonación de multas</h4><strong>12</strong><span>2,8%</span></div>
        <div class="profile-data-card"><h4>C.I. boliviano nacido en Bolivia</h4><strong>4</strong><span>0,9%</span></div>
        <div class="profile-data-card"><h4>Certificado REJAP</h4><strong>1</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Elaboración de memorial</h4><strong>1</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Nota para Migraciones</h4><strong>1</strong><span>0,2%</span></div>
        <div class="profile-data-card"><h4>Carnet de extranjería</h4><strong>1</strong><span>0,2%</span></div>
      </div>
      <p>La categoría “Otros” concentra el 66,4% de las solicitudes, por lo que se recomienda desagregarla en futuros sistemas de registro.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Lectura integral de resultados</h3>
      <p>El perfil muestra una movilidad regional concentrada en población venezolana y colombiana, con predominio de personas en edades económicamente activas. La combinación entre juventud, responsabilidades familiares y trayectorias de tránsito prolongadas genera una demanda simultánea de protección, medios de vida, documentación y apoyo para la reunificación o sostenimiento familiar.</p>
      <p>La irregularidad migratoria es el principal eje transversal de vulnerabilidad. Se relaciona con barreras documentales, exposición a controles, necesidad de orientación jurídica y dificultades de acceso a empleo formal, vivienda y servicios. La atención legal confirma esta presión: la mayoría de los casos se encontraba en situación irregular y casi toda la respuesta jurídica se concentró en orientación.</p>
      <p>La dimensión de protección requiere especial atención. Más de la mitad reportó alguna forma de violencia por parte de la población durante el viaje, principalmente xenofobia, discriminación y robo. Aunque la violencia reportada en Bolivia es menor, persisten episodios de discriminación, robo y extorsión.</p>
      <p>La situación de calle constituye la expresión más crítica del perfil habitacional: siete de cada diez personas se encontraban en esta condición. La alta presencia de apoyo institucional en ruta y en Bolivia demuestra el papel decisivo de las organizaciones humanitarias.</p>
      <p>En salud, 436 personas (32,0%) declararon alguna enfermedad. Este dato, combinado con precariedad habitacional y movilidad continua, refuerza la necesidad de articulación con servicios públicos, atención primaria, referencia y seguimiento de casos prioritarios.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Prioridades estratégicas para la intervención</h3>
      <div class="profile-data-grid">
        <div class="profile-data-card"><h4>Protección y regularización migratoria</h4><p>Fortalecer orientación, acompañamiento documental, derivación y seguimiento de casos de irregularidad, refugio y permanencia temporal.</p></div>
        <div class="profile-data-card"><h4>Respuesta humanitaria y habitabilidad</h4><p>Priorizar alojamiento temporal seguro, alimentación, protección frente a la intemperie y rutas sostenibles de salida de la situación de calle.</p></div>
        <div class="profile-data-card"><h4>Prevención y atención de violencias</h4><p>Reforzar identificación temprana, registro, derivación y acompañamiento de xenofobia, discriminación, robo, extorsión y otras violencias.</p></div>
        <div class="profile-data-card"><h4>Medios de vida e integración</h4><p>Vincular la alta motivación laboral y económica con formación, empleabilidad, emprendimiento e inclusión financiera y laboral.</p></div>
        <div class="profile-data-card"><h4>Salud y continuidad de cuidados</h4><p>Establecer rutas de acceso a atención primaria, medicamentos, salud preventiva y seguimiento de personas con enfermedades declaradas.</p></div>
        <div class="profile-data-card"><h4>Protección familiar y vínculos transnacionales</h4><p>Incorporar acciones para familias separadas, cuidados transnacionales, remesas y reunificación familiar cuando corresponda.</p></div>
      </div>
    </div>

    <div class="stats-popup-section">
      <h3>Consideraciones metodológicas</h3>
      <p>Los porcentajes se calcularon sobre el total específico de cada tabla o indicador. La base general es de 1.364 personas; edad cuenta con 1.357 registros válidos; cuidado de hijos y envío de apoyo económico utilizan una base de 1.005 casos; los módulos de atención social, legal y lugar de atención corresponden a registros de servicios y pueden contener múltiples intervenciones para una misma persona.</p>
      <p>Se conservaron las categorías y cantidades del documento fuente. Cuando existen diferencias entre universos, totales de atención o módulos, se presentan separadamente para evitar comparaciones incorrectas. Para futuras versiones se recomienda incorporar desagregación anual 2024/2025, cruces por género, edad, nacionalidad y situación migratoria, y una ficha técnica de la base de datos.</p>
    </div>

` }

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

/* OCULTAR / MOSTRAR REDES SOCIALES POR ACTIVIDAD */

const socialBar = document.querySelector(".social-bar");

let socialTimeout;

function mostrarRedes() {
    if (!socialBar) return;

    socialBar.classList.remove("hidden");

    clearTimeout(socialTimeout);

    socialTimeout = setTimeout(() => {
        socialBar.classList.add("hidden");
    }, 3000);
}

window.addEventListener("mousemove", mostrarRedes);
window.addEventListener("scroll", mostrarRedes);
window.addEventListener("touchstart", mostrarRedes);
window.addEventListener("click", mostrarRedes);
window.addEventListener("keydown", mostrarRedes);

mostrarRedes();