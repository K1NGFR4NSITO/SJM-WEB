const publicaciones = [
  {
    titulo: "Acompañar en movimiento: aprendizajes que transforman la mirada sobre migración",
    fecha: "16 abril 2026",
    anio: "2026",
    resumen: "En esta nueva edición de “El Canto del Tordo”, se propone una reflexión que trasciende la descripción de acciones para situarse en el terreno del aprendizaje institucional y la comprensión crítica de la movilidad humana.",
    imagen: "canto.jpeg",
    pdf: "pdf/ElCantoDelTordo-Edicion-2.pdf",
    categoria: "Reflexión"
  },
  {
    titulo: "SJM Bolivia impulsa espacios de hospitalidad e integración",
    fecha: "10 abril 2026",
    anio: "2026",
    resumen: "Resumen de acciones institucionales orientadas al acompañamiento, acogida y fortalecimiento comunitario.",
    imagen: "img/notas/nota2.jpg",
    pdf: "pdf/notas/nota2.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "Encuentro intercultural fortalece redes de apoyo a población migrante",
    fecha: "03 abril 2025",
    anio: "2025",
    resumen: "Actividad orientada al diálogo, la convivencia y la construcción de vínculos entre comunidades.",
    imagen: "img/notas/nota3.jpg",
    pdf: "pdf/notas/nota3.pdf",
    categoria: "Boletín"
  },
  {
    titulo: "Jornada informativa sobre derechos y regularización migratoria",
    fecha: "28 marzo 2024",
    anio: "2024",
    resumen: "Espacio de orientación para resolver dudas frecuentes y acercar información útil a población en movilidad.",
    imagen: "img/notas/nota4.jpg",
    pdf: "pdf/notas/nota4.pdf",
    categoria: "Nota informativa"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const notaPrincipal = document.getElementById("notaPrincipal");
  const notasSecundarias = document.getElementById("notasSecundarias");
  const archivoGrid = document.getElementById("archivoGrid");
  const emptyState = document.getElementById("emptyState");
  const resultCounter = document.getElementById("resultCounter");

  const searchInput = document.getElementById("searchInput");
  const yearFilter = document.getElementById("yearFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const resetFilters = document.getElementById("resetFilters");

  const modal = document.getElementById("pdfViewerModal");
  const frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfViewerTitle");
  const downloadBtn = document.getElementById("pdfDownloadBtn");
  const closeBtn = document.getElementById("pdfCloseBtn");

  let pdfAbierto = false;
  let bloqueoHistorial = false;

  function textoSeguro(texto = "") {
    return String(texto).trim();
  }

  function normalizarTexto(texto = "") {
    return texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function crearImagen(src, alt, clase = "") {
    return `
      <img
        src="${src}"
        alt="${textoSeguro(alt)}"
        class="${clase}"
        loading="lazy"
      >
    `;
  }

  function crearLinkPDF(nota, contenido) {
    return `
      <a
        href="${nota.pdf}"
        data-pdf="${nota.pdf}"
        data-title="${textoSeguro(nota.titulo)}"
        aria-label="Abrir publicación: ${textoSeguro(nota.titulo)}"
      >
        ${contenido}
      </a>
    `;
  }

  function obtenerPublicacionesFiltradas() {
    const busqueda = normalizarTexto(searchInput?.value || "");
    const anioSeleccionado = yearFilter?.value || "todos";
    const categoriaSeleccionada = categoryFilter?.value || "todas";

    return publicaciones.filter((nota) => {
      const coincideBusqueda =
        normalizarTexto(nota.titulo).includes(busqueda) ||
        normalizarTexto(nota.resumen).includes(busqueda) ||
        normalizarTexto(nota.categoria).includes(busqueda) ||
        normalizarTexto(nota.fecha).includes(busqueda);

      const coincideAnio =
        anioSeleccionado === "todos" || nota.anio === anioSeleccionado;

      const coincideCategoria =
        categoriaSeleccionada === "todas" ||
        nota.categoria === categoriaSeleccionada;

      return coincideBusqueda && coincideAnio && coincideCategoria;
    });
  }

  function crearBadge(nota) {
    return `
      <div class="nota-meta-row">
        <span class="nota-badge">${nota.categoria}</span>
        <span class="nota-year">${nota.anio}</span>
      </div>
    `;
  }

  function renderNotaPrincipal(nota) {
    if (!notaPrincipal) return;

    if (!nota) {
      notaPrincipal.innerHTML = "";
      return;
    }

    notaPrincipal.innerHTML = crearLinkPDF(nota, `
      <div class="nota-principal-media">
        ${crearImagen(nota.imagen, nota.titulo, "nota-principal-img")}
      </div>

      <div class="nota-principal-body">
        ${crearBadge(nota)}

        <span class="nota-fecha">
          <i class="fa-regular fa-calendar"></i>
          ${nota.fecha}
        </span>

        <h2>${nota.titulo}</h2>

        <p>${nota.resumen}</p>

        <span class="nota-link">
          Leer publicación
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    `);
  }

  function renderNotasSecundarias(notas) {
    if (!notasSecundarias) return;

    notasSecundarias.innerHTML = notas.slice(1, 4).map((nota, index) => `
      <article class="nota-side" style="--delay:${index * 0.08}s">
        ${crearLinkPDF(nota, `
          <div class="nota-side-img">
            ${crearImagen(nota.imagen, nota.titulo)}
          </div>

          <div class="nota-side-content">
            ${crearBadge(nota)}

            <span class="nota-fecha">
              <i class="fa-regular fa-calendar"></i>
              ${nota.fecha}
            </span>

            <h3>${nota.titulo}</h3>

            <p>${nota.resumen}</p>

            <span class="mini-link">
              Ver nota <i class="fa-solid fa-angle-right"></i>
            </span>
          </div>
        `)}
      </article>
    `).join("");
  }

  function renderArchivo(notas) {
    if (!archivoGrid) return;

    archivoGrid.innerHTML = notas.map((nota, index) => `
      <article class="archivo-card" style="--delay:${index * 0.07}s">
        ${crearLinkPDF(nota, `
          <div class="archivo-img-wrap">
            ${crearImagen(nota.imagen, nota.titulo)}
          </div>

          <div class="archivo-card-body">
            ${crearBadge(nota)}

            <span class="nota-fecha">
              <i class="fa-regular fa-calendar"></i>
              ${nota.fecha}
            </span>

            <h3>${nota.titulo}</h3>

            <p>${nota.resumen}</p>

            <span class="nota-link">
              Abrir PDF <i class="fa-solid fa-file-pdf"></i>
            </span>
          </div>
        `)}
      </article>
    `).join("");
  }

  function actualizarContador(total) {
    if (!resultCounter) return;

    if (total === 1) {
      resultCounter.textContent = "1 publicación encontrada";
      return;
    }

    resultCounter.textContent = `${total} publicaciones encontradas`;
  }

  function renderPublicaciones() {
    const filtradas = obtenerPublicacionesFiltradas();

    renderNotaPrincipal(filtradas[0]);
    renderNotasSecundarias(filtradas);
    renderArchivo(filtradas);
    actualizarContador(filtradas.length);

    if (emptyState) {
      emptyState.classList.toggle("active", filtradas.length === 0);
    }
  }

  function abrirPDF(pdfUrl, pdfTitulo) {
  if (!modal || !frame || !title || !downloadBtn) return;

  title.textContent = pdfTitulo || "Publicación";

  const separador = pdfUrl.includes("#") ? "" : "#";
  frame.src = `${pdfUrl}${separador}zoom=page-fit&view=FitH`;

  downloadBtn.href = pdfUrl;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("pdf-open");

  pdfAbierto = true;
  bloqueoHistorial = true;

  history.pushState({ visorPDF: true }, "", window.location.href);

  setTimeout(() => {
    bloqueoHistorial = false;
  }, 150);
}

  function cerrarPDF(desdeHistorial = false) {
    if (!modal || !frame || !pdfAbierto) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pdf-open");

    setTimeout(() => {
      frame.src = "";
    }, 200);

    pdfAbierto = false;

    if (!desdeHistorial && history.state?.visorPDF) {
      history.back();
    }
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-pdf]");
    if (!link) return;

    e.preventDefault();

    abrirPDF(
      link.dataset.pdf,
      link.dataset.title || "Publicación"
    );
  });

  closeBtn?.addEventListener("click", () => {
    cerrarPDF(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pdfAbierto) {
      cerrarPDF(false);
    }
  });

  window.addEventListener("popstate", () => {
    if (bloqueoHistorial) return;

    if (pdfAbierto) {
      cerrarPDF(true);
    }
  });

  searchInput?.addEventListener("input", renderPublicaciones);
  yearFilter?.addEventListener("change", renderPublicaciones);
  categoryFilter?.addEventListener("change", renderPublicaciones);

  resetFilters?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (yearFilter) yearFilter.value = "todos";
    if (categoryFilter) categoryFilter.value = "todas";

    renderPublicaciones();
  });

  renderPublicaciones();
});