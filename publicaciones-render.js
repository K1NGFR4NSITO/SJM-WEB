document.addEventListener("DOMContentLoaded", () => {

  const publicacionesSeccion = publicaciones.filter(
    item => item.seccion === SECCION_ACTUAL
  );

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

  function normalizar(texto = "") {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function obtenerFiltradas() {

    const busqueda = normalizar(searchInput?.value || "");
    const anio = yearFilter?.value || "todos";
    const categoria = categoryFilter?.value || "todas";

    return publicacionesSeccion.filter(nota => {

      const coincideBusqueda =
        normalizar(nota.titulo).includes(busqueda) ||
        normalizar(nota.resumen).includes(busqueda);

      const coincideAnio =
        anio === "todos" ||
        nota.anio === anio;

      const coincideCategoria =
        categoria === "todas" ||
        nota.categoria === categoria;

      return coincideBusqueda &&
             coincideAnio &&
             coincideCategoria;
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

    if (!nota) {
      notaPrincipal.innerHTML = "";
      return;
    }

    notaPrincipal.innerHTML = `
      <a href="${nota.pdf}"
         data-pdf="${nota.pdf}"
         data-title="${nota.titulo}">

        <div class="nota-principal-media">
          <img
            src="${nota.imagen}"
            alt="${nota.titulo}"
            class="nota-principal-img"
            loading="lazy">
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

      </a>
    `;
  }

  function renderNotasSecundarias(notas) {

    notasSecundarias.innerHTML = notas
      .slice(1, 4)
      .map(nota => `
        <article class="nota-side">

          <a href="${nota.pdf}"
             data-pdf="${nota.pdf}"
             data-title="${nota.titulo}">

            <div class="nota-side-img">
              <img
                src="${nota.imagen}"
                alt="${nota.titulo}"
                loading="lazy">
            </div>

            <div class="nota-side-content">

              ${crearBadge(nota)}

              <span class="nota-fecha">
                <i class="fa-regular fa-calendar"></i>
                ${nota.fecha}
              </span>

              <h3>${nota.titulo}</h3>

              <p>${nota.resumen}</p>

            </div>

          </a>

        </article>
      `)
      .join("");
  }

  function renderArchivo(notas) {

    archivoGrid.innerHTML = notas
      .map(nota => `
        <article class="archivo-card">

          <a href="${nota.pdf}"
             data-pdf="${nota.pdf}"
             data-title="${nota.titulo}">

            <div class="archivo-img-wrap">

              <img
                src="${nota.imagen}"
                alt="${nota.titulo}"
                loading="lazy">

            </div>

            <div class="archivo-card-body">

              ${crearBadge(nota)}

              <span class="nota-fecha">
                <i class="fa-regular fa-calendar"></i>
                ${nota.fecha}
              </span>

              <h3>${nota.titulo}</h3>

              <p>${nota.resumen}</p>

            </div>

          </a>

        </article>
      `)
      .join("");
  }

  function actualizarContador(total) {

    resultCounter.textContent =
      total === 1
        ? "1 publicación encontrada"
        : `${total} publicaciones encontradas`;
  }

  function render() {

    const filtradas = obtenerFiltradas();

    renderNotaPrincipal(filtradas[0]);
    renderNotasSecundarias(filtradas);
    renderArchivo(filtradas);

    actualizarContador(filtradas.length);

    if (emptyState) {
      emptyState.classList.toggle(
        "active",
        filtradas.length === 0
      );
    }
  }

  function abrirPDF(url, tituloPDF) {

  const pdfAjustado = `${url}#zoom=page-fit&view=Fit`;

  frame.src = pdfAjustado;
  title.textContent = tituloPDF;
  downloadBtn.href = url;

  modal.classList.add("active");

  document.body.classList.add("pdf-open");

  pdfAbierto = true;
}

  function cerrarPDF() {

    modal.classList.remove("active");

    document.body.classList.remove("pdf-open");

    setTimeout(() => {
      frame.src = "";
    }, 150);

    pdfAbierto = false;
  }

  document.addEventListener("click", (e) => {

    const link = e.target.closest("a[data-pdf]");

    if (!link) return;

    e.preventDefault();

    abrirPDF(
      link.dataset.pdf,
      link.dataset.title
    );
  });

  closeBtn?.addEventListener("click", cerrarPDF);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pdfAbierto) {
      cerrarPDF();
    }
  });

  searchInput?.addEventListener("input", render);
  yearFilter?.addEventListener("change", render);
  categoryFilter?.addEventListener("change", render);

  resetFilters?.addEventListener("click", () => {

    if (searchInput) searchInput.value = "";
    if (yearFilter) yearFilter.value = "todos";
    if (categoryFilter) categoryFilter.value = "todas";

    render();
  });

  render();
});