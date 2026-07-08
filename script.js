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
    <div class="stats-popup-hero profile-popup-hero">
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
      <div class="pie-chart-block" aria-label="Gráfico circular de Género">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 63.8%, #f6a300 63.8% 97.5%, #ff3d12 97.5% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Masculino: 63,8%</div><div><span class="pie-color" style="background:#f6a300;"></span>Femenino: 33,7%</div><div><span class="pie-color" style="background:#ff3d12;"></span>LGBT: 2,5%</div>
        </div>
      </div>

      
      <p>La composición evidencia una marcada mayoría masculina. La presencia de mujeres y población LGBT exige respuestas diferenciadas de protección frente a violencia, discriminación y acceso desigual a derechos.</p>

      <h4>Estructura por edad</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Estructura por edad">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 7.7%, #f6a300 7.7% 33.2%, #ff3d12 33.2% 56.6%, #7a8791 56.6% 73.3%, #1097ad 73.3% 84.6%, #8b5cf6 84.6% 95.9%, #13a35b 95.9% 99.1%, #d946ef 99.1% 99.8%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>17–19 años: 7,7%</div><div><span class="pie-color" style="background:#f6a300;"></span>20–25: 25,5%</div><div><span class="pie-color" style="background:#ff3d12;"></span>26–30: 23,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>31–35: 16,7%</div><div><span class="pie-color" style="background:#1097ad;"></span>36–40: 11,3%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>41–50: 11,3%</div><div><span class="pie-color" style="background:#13a35b;"></span>51–60: 3,2%</div><div><span class="pie-color" style="background:#d946ef;"></span>60+: 0,7%</div>
        </div>
      </div>

      
      <p>Total con edad registrada: 1.357. Los grupos de 20 a 35 años reúnen el 65,6%, mostrando una migración esencialmente joven y económicamente activa, con presión sobre empleo, ingresos, vivienda y regularización documental.</p>

      <h4>País de procedencia</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de País de procedencia">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 70.7%, #f6a300 70.7% 92.6%, #ff3d12 92.6% 95.5%, #7a8791 95.5% 97.3%, #1097ad 97.3% 98.5%, #8b5cf6 98.5% 99.9%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Venezuela: 70,7%</div><div><span class="pie-color" style="background:#f6a300;"></span>Colombia: 21,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Ecuador: 2,9%</div><div><span class="pie-color" style="background:#7a8791;"></span>Argentina: 1,8%</div><div><span class="pie-color" style="background:#1097ad;"></span>Perú: 1,2%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Otros: 1,4%</div>
        </div>
      </div>

      
      <p>Venezuela y Colombia representan conjuntamente el 92,6% del total, confirmando una fuerte concentración de movilidad sudamericana.</p>

      <h4>Nivel educativo</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Nivel educativo">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 18.3%, #f6a300 18.3% 56.1%, #ff3d12 56.1% 87.5%, #7a8791 87.5% 95.7%, #1097ad 95.7% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Primaria: 18,3%</div><div><span class="pie-color" style="background:#f6a300;"></span>Secundaria: 37,8%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Bachillerato: 31,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Técnico: 8,2%</div><div><span class="pie-color" style="background:#1097ad;"></span>Titulado: 4,3%</div>
        </div>
      </div>

      
      <p>Existe una base importante de capacidades educativas que puede favorecer inserción laboral y emprendimiento, aunque la irregularidad migratoria y la precariedad habitacional limitan su aprovechamiento.</p>

      <h4>Autoidentificación indígena</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Autoidentificación indígena">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 66.4%, #f6a300 66.4% 87.1%, #ff3d12 87.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>No: 66,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Sí: 20,7%</div><div><span class="pie-color" style="background:#ff3d12;"></span>No responde: 12,9%</div>
        </div>
      </div>

      
      <p>La proporción de autoidentificación indígena es relevante para incorporar pertinencia cultural, enfoque intercultural y atención a posibles barreras lingüísticas o de discriminación.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Identidad, familia y vínculos</h3>

      <h4>Estado civil en el país de origen</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Estado civil en el país de origen">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 45.0%, #f6a300 45.0% 81.2%, #ff3d12 81.2% 93.5%, #7a8791 93.5% 99.1%, #1097ad 99.1% 99.9%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Unión libre: 45,0%</div><div><span class="pie-color" style="background:#f6a300;"></span>Soltera/o: 36,2%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Separada/o: 12,3%</div><div><span class="pie-color" style="background:#7a8791;"></span>Casada/o: 5,6%</div><div><span class="pie-color" style="background:#1097ad;"></span>Viuda/o: 0,8%</div>
        </div>
      </div>

      

      <h4>Número de hijas e hijos</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Número de hijas e hijos">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 26.3%, #f6a300 26.3% 53.2%, #ff3d12 53.2% 73.4%, #7a8791 73.4% 87.2%, #1097ad 87.2% 95.3%, #8b5cf6 95.3% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>0: 26,3%</div><div><span class="pie-color" style="background:#f6a300;"></span>1: 26,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>2: 20,2%</div><div><span class="pie-color" style="background:#7a8791;"></span>3: 13,8%</div><div><span class="pie-color" style="background:#1097ad;"></span>4: 8,1%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>5 o más: 4,8%</div>
        </div>
      </div>

      
      <p>El 73,7% tiene al menos una hija o hijo. Los hogares con uno o dos hijos concentran 642 casos y 363 personas reportan tres o más.</p>

      <h4>Cuidado de hijas e hijos que permanecieron en origen</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Cuidado de hijas e hijos que permanecieron en origen">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 41.5%, #f6a300 41.5% 78.4%, #ff3d12 78.4% 88.6%, #7a8791 88.6% 93.5%, #1097ad 93.5% 97.2%, #8b5cf6 97.2% 100.0%, #13a35b 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Nadie: 41,5%</div><div><span class="pie-color" style="background:#f6a300;"></span>Su madre: 36,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Abuelo materno: 10,2%</div><div><span class="pie-color" style="background:#7a8791;"></span>Abuelo paterno: 4,9%</div><div><span class="pie-color" style="background:#1097ad;"></span>Su padre: 3,7%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Otro familiar: 2,8%</div><div><span class="pie-color" style="background:#13a35b;"></span>Amigos: 0,0%</div>
        </div>
      </div>

      
      <p>Base: 1.005 casos. El reducido peso del padre como cuidador muestra una distribución desigual del cuidado y la importancia de las redes femeninas y de abuelos.</p>

      <h4>Envío de apoyo económico</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Envío de apoyo económico">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 37.6%, #f6a300 37.6% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Sí: 37,6%</div><div><span class="pie-color" style="background:#f6a300;"></span>No: 62,4%</div>
        </div>
      </div>

      
      <p>Base: 1.005 casos. La mayoría no logra generar excedentes suficientes para sostener remesas o transferencias regulares.</p>

      <h4>Estado civil actual</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Estado civil actual">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 49.4%, #f6a300 49.4% 88.0%, #ff3d12 88.0% 95.4%, #7a8791 95.4% 99.4%, #1097ad 99.4% 99.9%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Unión libre: 49,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Soltera/o: 38,6%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Separada/o: 7,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Casada/o: 4,0%</div><div><span class="pie-color" style="background:#1097ad;"></span>Viuda/o: 0,5%</div>
        </div>
      </div>

      

      <h4>Tipología familiar</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Tipología familiar">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 41.0%, #f6a300 41.0% 70.0%, #ff3d12 70.0% 91.4%, #7a8791 91.4% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Reconstruida o simultánea: 41,0%</div><div><span class="pie-color" style="background:#f6a300;"></span>Nuclear: 29,0%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Monoparental: 21,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Extensa o ampliada: 8,6%</div>
        </div>
      </div>

      
      <p>La elevada proporción de familias reconstruidas muestra procesos de recomposición de vínculos y convivencia propios de trayectorias migratorias prolongadas.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Dinámica y trayectoria migratoria</h3>

      <h4>Causas de migración</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Causas de migración">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 81.8%, #f6a300 81.8% 95.9%, #ff3d12 95.9% 97.4%, #7a8791 97.4% 98.8%, #1097ad 98.8% 99.2%, #8b5cf6 99.2% 99.6%, #13a35b 99.6% 99.8%, #d946ef 99.8% 99.9%, #94a3b8 99.9% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Laboral / económica: 81,8%</div><div><span class="pie-color" style="background:#f6a300;"></span>Conflictos armados: 14,1%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Violencia: 1,5%</div><div><span class="pie-color" style="background:#7a8791;"></span>Crisis política: 1,4%</div><div><span class="pie-color" style="background:#1097ad;"></span>Ecológica: 0,4%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Opinión política: 0,4%</div><div><span class="pie-color" style="background:#13a35b;"></span>Conflictos internos: 0,2%</div><div><span class="pie-color" style="background:#d946ef;"></span>Religión: 0,1%</div><div><span class="pie-color" style="background:#94a3b8;"></span>Violación masiva de DDHH: 0,1%</div>
        </div>
      </div>

      
      <p>Las motivaciones combinan necesidad económica y factores de protección; por ello, debe evitarse una separación rígida entre migración económica y migración forzada.</p>

      <h4>Tipo de ingreso</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Tipo de ingreso">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 95.1%, #f6a300 95.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Irregular: 95,1%</div><div><span class="pie-color" style="background:#f6a300;"></span>Regular: 4,9%</div>
        </div>
      </div>

      

      <h4>Documentación declarada entre personas con ingreso irregular</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Documentación declarada entre personas con ingreso irregular">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 66.9%, #f6a300 66.9% 89.6%, #ff3d12 89.6% 96.5%, #7a8791 96.5% 98.6%, #1097ad 98.6% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>C.I.: 66,9%</div><div><span class="pie-color" style="background:#f6a300;"></span>Ningún documento: 22,7%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Carta de denuncia: 6,9%</div><div><span class="pie-color" style="background:#7a8791;"></span>Residencia de otro país: 2,1%</div><div><span class="pie-color" style="background:#1097ad;"></span>Pasaporte: 1,4%</div>
        </div>
      </div>

      
      <p>Base: 1.297 personas. La irregularidad no equivale necesariamente a ausencia de identidad documental, aunque 295 personas sin documentación requieren atención prioritaria.</p>

      <h4>Motivo y proyecto migratorio</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Motivo y proyecto migratorio">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 83.7%, #f6a300 83.7% 93.1%, #ff3d12 93.1% 99.7%, #7a8791 99.7% 100.0%, #1097ad 100.0% 100.0%, #8b5cf6 100.1% 100.0%, #13a35b 100.1% 100.0%, #d946ef 100.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Tránsito a otro país: 83,7%</div><div><span class="pie-color" style="background:#f6a300;"></span>Permanencia: 9,4%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Retorno a su país: 6,6%</div><div><span class="pie-color" style="background:#7a8791;"></span>Reunificación familiar: 0,3%</div><div><span class="pie-color" style="background:#1097ad;"></span>Trabajo: 0,1%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Salud: 0,0%</div><div><span class="pie-color" style="background:#13a35b;"></span>Estudios: 0,0%</div><div><span class="pie-color" style="background:#d946ef;"></span>Mayor seguridad: 0,0%</div>
        </div>
      </div>

      
      <p>Bolivia y particularmente El Alto funcionan como nodos de tránsito, aunque una fracción modifica su proyecto y permanece, exigiendo combinar asistencia de emergencia con integración.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Protección, violencia y riesgos</h3>

      <h4>Violencia durante el viaje por parte de la población</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Violencia durante el viaje por parte de la población">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 47.4%, #f6a300 47.4% 63.2%, #ff3d12 63.2% 78.7%, #7a8791 78.7% 92.8%, #1097ad 92.8% 96.5%, #8b5cf6 96.5% 98.3%, #13a35b 98.3% 99.3%, #d946ef 99.3% 99.8%, #94a3b8 99.8% 100.0%, #111827 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Ninguna: 47,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Xenofobia: 15,8%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Discriminación: 15,5%</div><div><span class="pie-color" style="background:#7a8791;"></span>Robo: 14,1%</div><div><span class="pie-color" style="background:#1097ad;"></span>Extorsión: 3,7%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Física: 1,8%</div><div><span class="pie-color" style="background:#13a35b;"></span>Verbal: 1,0%</div><div><span class="pie-color" style="background:#d946ef;"></span>Secuestro: 0,5%</div><div><span class="pie-color" style="background:#94a3b8;"></span>Sexual: 0,2%</div><div><span class="pie-color" style="background:#111827;"></span>Económica: 0,1%</div>
        </div>
      </div>

      
      <p>717 personas (52,6%) reportaron alguna forma de violencia por parte de la población durante el viaje.</p>

      <h4>Violencia durante el viaje por parte de la familia</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Violencia durante el viaje por parte de la familia">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 98.2%, #f6a300 98.2% 98.6%, #ff3d12 98.6% 99.0%, #7a8791 99.0% 99.4%, #1097ad 99.4% 99.6%, #8b5cf6 99.6% 99.7%, #13a35b 99.7% 99.8%, #d946ef 99.8% 99.9%, #94a3b8 99.9% 100.0%, #111827 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Ninguna: 98,2%</div><div><span class="pie-color" style="background:#f6a300;"></span>Verbal: 0,4%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Física: 0,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Robo: 0,4%</div><div><span class="pie-color" style="background:#1097ad;"></span>Xenofobia: 0,2%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Sexual: 0,1%</div><div><span class="pie-color" style="background:#13a35b;"></span>Discriminación: 0,1%</div><div><span class="pie-color" style="background:#d946ef;"></span>Secuestro: 0,1%</div><div><span class="pie-color" style="background:#94a3b8;"></span>Económica: 0,1%</div><div><span class="pie-color" style="background:#111827;"></span>Extorsión: 0,0%</div>
        </div>
      </div>

      

      <h4>Violencia en Bolivia por parte de la población</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Violencia en Bolivia por parte de la población">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 84.0%, #f6a300 84.0% 91.4%, #ff3d12 91.4% 94.2%, #7a8791 94.2% 96.5%, #1097ad 96.5% 98.3%, #8b5cf6 98.3% 99.3%, #13a35b 99.3% 99.9%, #d946ef 99.9% 100.0%, #94a3b8 100.0% 100.0%, #111827 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Ninguna: 84,0%</div><div><span class="pie-color" style="background:#f6a300;"></span>Discriminación: 7,4%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Robo: 2,8%</div><div><span class="pie-color" style="background:#7a8791;"></span>Extorsión: 2,3%</div><div><span class="pie-color" style="background:#1097ad;"></span>Xenofobia: 1,8%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Verbal: 1,0%</div><div><span class="pie-color" style="background:#13a35b;"></span>Física: 0,6%</div><div><span class="pie-color" style="background:#d946ef;"></span>Secuestro: 0,1%</div><div><span class="pie-color" style="background:#94a3b8;"></span>Sexual: 0,0%</div><div><span class="pie-color" style="background:#111827;"></span>Económica: 0,0%</div>
        </div>
      </div>

      
      <p>218 personas (16,0%) señalaron algún hecho de violencia por parte de la población en Bolivia.</p>

      <h4>Violencia en Bolivia por parte de la familia</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Violencia en Bolivia por parte de la familia">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 99.4%, #f6a300 99.4% 99.7%, #ff3d12 99.7% 99.8%, #7a8791 99.8% 99.9%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Ninguna: 99,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Discriminación: 0,3%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Xenofobia: 0,1%</div><div><span class="pie-color" style="background:#7a8791;"></span>Extorsión: 0,1%</div>
        </div>
      </div>

      
      <p>Aunque los registros son reducidos, este tipo de violencia puede estar subregistrado; conviene mantener canales seguros de identificación y acompañamiento.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Redes de apoyo y asistencia humanitaria</h3>

      <h4>Ayuda recibida durante el viaje</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Ayuda recibida durante el viaje">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 67.3%, #f6a300 67.3% 98.2%, #ff3d12 98.2% 99.7%, #7a8791 99.7% 100.0%, #1097ad 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Alguna institución: 67,3%</div><div><span class="pie-color" style="background:#f6a300;"></span>Ninguna: 30,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Población: 1,5%</div><div><span class="pie-color" style="background:#7a8791;"></span>Familia y amigos: 0,3%</div><div><span class="pie-color" style="background:#1097ad;"></span>Embajada: 0,0%</div>
        </div>
      </div>

      

      <h4>Tipo de ayuda durante el viaje</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Tipo de ayuda durante el viaje">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 45.7%, #f6a300 45.7% 84.6%, #ff3d12 84.6% 90.9%, #7a8791 90.9% 96.8%, #1097ad 96.8% 99.1%, #8b5cf6 99.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Alimentación: 45,7%</div><div><span class="pie-color" style="background:#f6a300;"></span>Ninguna: 38,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Hospedaje: 6,3%</div><div><span class="pie-color" style="background:#7a8791;"></span>Otro tipo: 5,9%</div><div><span class="pie-color" style="background:#1097ad;"></span>Ropa: 2,3%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Atención médica: 0,9%</div>
        </div>
      </div>

      

      <h4>Ayuda recibida en Bolivia</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Ayuda recibida en Bolivia">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 54.3%, #f6a300 54.3% 96.5%, #ff3d12 96.5% 99.9%, #7a8791 99.9% 100.0%, #1097ad 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Alguna institución: 54,3%</div><div><span class="pie-color" style="background:#f6a300;"></span>Ninguna: 42,2%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Población: 3,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Embajada: 0,1%</div><div><span class="pie-color" style="background:#1097ad;"></span>Familia y amigos: 0,1%</div>
        </div>
      </div>

      

      <h4>Tipo de ayuda brindada en Bolivia</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Tipo de ayuda brindada en Bolivia">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 44.7%, #f6a300 44.7% 84.8%, #ff3d12 84.8% 92.2%, #7a8791 92.2% 95.4%, #1097ad 95.4% 98.4%, #8b5cf6 98.4% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Ninguna: 44,7%</div><div><span class="pie-color" style="background:#f6a300;"></span>Hospedaje: 40,1%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Alimentación: 7,4%</div><div><span class="pie-color" style="background:#7a8791;"></span>Otro tipo: 3,2%</div><div><span class="pie-color" style="background:#1097ad;"></span>Ropa: 3,0%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Atención médica: 1,6%</div>
        </div>
      </div>

      
      <p>La alta presencia de apoyo institucional demuestra que las organizaciones humanitarias constituyen una red de protección decisiva.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Habitabilidad y salud</h3>

      <h4>Condición de habitabilidad</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Condición de habitabilidad">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 70.2%, #f6a300 70.2% 79.1%, #ff3d12 79.1% 86.1%, #7a8791 86.1% 92.5%, #1097ad 92.5% 96.1%, #8b5cf6 96.1% 98.1%, #13a35b 98.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Situación de calle: 70,2%</div><div><span class="pie-color" style="background:#f6a300;"></span>Albergue o refugio: 8,9%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Hospedaje individual: 7,0%</div><div><span class="pie-color" style="background:#7a8791;"></span>Alquiler individual: 6,4%</div><div><span class="pie-color" style="background:#1097ad;"></span>Hospedaje en grupo: 3,6%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Otro: 2,0%</div><div><span class="pie-color" style="background:#13a35b;"></span>Alquiler grupal: 1,9%</div>
        </div>
      </div>

      
      <p>La situación de calle es la expresión más crítica del perfil habitacional y amplifica riesgos de violencia, enfermedad, inseguridad alimentaria y pérdida de documentación.</p>

      <h4>Presencia de enfermedad</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Presencia de enfermedad">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 32.0%, #f6a300 32.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Sí: 32,0%</div><div><span class="pie-color" style="background:#f6a300;"></span>No: 68,0%</div>
        </div>
      </div>

      

      <h4>Antecedente de COVID-19</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Antecedente de COVID-19">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 3.2%, #f6a300 3.2% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Sí: 3,2%</div><div><span class="pie-color" style="background:#f6a300;"></span>No: 96,8%</div>
        </div>
      </div>

      
      <p>La baja cifra puede reflejar ausencia de diagnóstico, dificultades de acceso a pruebas o subregistro y debe interpretarse con cautela.</p>

      <h4>Conocimiento de personas con COVID-19</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Conocimiento de personas con COVID-19">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 4.3%, #f6a300 4.3% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Sí: 4,3%</div><div><span class="pie-color" style="background:#f6a300;"></span>No: 95,7%</div>
        </div>
      </div>

      

      <h4>Medidas de prevención</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Medidas de prevención">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 87.5%, #f6a300 87.5% 99.0%, #ff3d12 99.0% 99.8%, #7a8791 99.8% 100.0%, #1097ad 100.0% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Otras medidas: 87,5%</div><div><span class="pie-color" style="background:#f6a300;"></span>Solo barbijo: 11,5%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Gel o alcohol: 0,8%</div><div><span class="pie-color" style="background:#7a8791;"></span>Lavado de manos: 0,2%</div><div><span class="pie-color" style="background:#1097ad;"></span>Distanciamiento social: 0,0%</div>
        </div>
      </div>

      
      <p>La amplitud de la categoría “otras medidas” limita una interpretación precisa; se recomienda desagregarla en futuros registros.</p>
    </div>

    <div class="stats-popup-section">
      <h3>Atención social e institucional</h3>

      <h4>Atenciones sociales registradas</h4>
      
      <p>El volumen de seguimientos, superior al número de atenciones iniciales, evidencia que una parte importante de los casos requiere intervención continuada. Las categorías representan registros de servicio, pueden superponerse y no deben sumarse como personas únicas.</p>

      <h4>Atención y seguimiento legal</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Atención y seguimiento legal">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 56.2%, #f6a300 56.2% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Atención legal: 56,2%</div><div><span class="pie-color" style="background:#f6a300;"></span>Seguimiento legal: 43,8%</div>
        </div>
      </div>

      
      <p>Total operativo: 761 actuaciones jurídicas.</p>

      <h4>Lugar de atención</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Lugar de atención">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 91.4%, #f6a300 91.4% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>El Alto: 91,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>La Paz: 8,6%</div>
        </div>
      </div>

      
      <p>Total: 1.482 registros de atención. Pueden existir múltiples intervenciones para una misma persona.</p>

      <h4>Estado migratorio de las personas atendidas legalmente</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Estado migratorio de las personas atendidas legalmente">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 69.4%, #f6a300 69.4% 87.6%, #ff3d12 87.6% 94.8%, #7a8791 94.8% 99.9%, #1097ad 99.9% 99.9%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Irregular: 69,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Regular: 18,2%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Nacido en Bolivia: 7,2%</div><div><span class="pie-color" style="background:#7a8791;"></span>Solicitante de refugio: 5,1%</div><div><span class="pie-color" style="background:#1097ad;"></span>Refugiada/o: 0,0%</div>
        </div>
      </div>

      

      <h4>Tipo de atención legal</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Tipo de atención legal">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 98.4%, #f6a300 98.4% 99.8%, #ff3d12 99.8% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Orientación legal: 98,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Acompañamiento y asesoramiento: 1,4%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Representación legal: 0,2%</div>
        </div>
      </div>

      

      <h4>Solicitudes y trámites jurídicos</h4>
      <div class="pie-chart-block" aria-label="Gráfico circular de Solicitudes y trámites jurídicos">
        <div class="pie-chart" style="background:conic-gradient(#0b6b9a 0.0% 66.4%, #f6a300 66.4% 75.7%, #ff3d12 75.7% 80.8%, #7a8791 80.8% 85.5%, #1097ad 85.5% 89.5%, #8b5cf6 89.5% 92.5%, #13a35b 92.5% 95.3%, #d946ef 95.3% 98.1%, #94a3b8 98.1% 100.0%);"></div>
        <div class="pie-legend">
          <div><span class="pie-color" style="background:#0b6b9a;"></span>Otros: 66,4%</div><div><span class="pie-color" style="background:#f6a300;"></span>Permanencia temp. familia: 9,3%</div><div><span class="pie-color" style="background:#ff3d12;"></span>Permanencia temp. trabajo: 5,1%</div><div><span class="pie-color" style="background:#7a8791;"></span>Duplicado C.I.: 4,7%</div><div><span class="pie-color" style="background:#1097ad;"></span>Solicitud refugio: 4,0%</div><div><span class="pie-color" style="background:#8b5cf6;"></span>Trámites consulado: 3,0%</div><div><span class="pie-color" style="background:#13a35b;"></span>Cert. nacimiento: 2,8%</div><div><span class="pie-color" style="background:#d946ef;"></span>Condonación multas: 2,8%</div><div><span class="pie-color" style="background:#94a3b8;"></span>Otros específicos: 1,9%</div>
        </div>
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