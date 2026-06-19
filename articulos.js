const publicaciones = [
  {
    titulo: "No habrá segunda vuelta en La Paz: justicia niega tutela de amparo a Yahuasi",
    fecha: "16 abril 2026",
    resumen: "Nota informativa sobre el desarrollo judicial y político del proceso en La Paz, con énfasis en sus implicaciones públicas e institucionales.",
    imagen: "img/notas/nota1.jpg",
    pdf: "pdf/ElCantoDelTordo-Edicion-2.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "SJM Bolivia impulsa espacios de hospitalidad e integración",
    fecha: "10 abril 2026",
    resumen: "Resumen de acciones institucionales orientadas al acompañamiento, acogida y fortalecimiento comunitario.",
    imagen: "img/notas/nota2.jpg",
    pdf: "pdf/notas/nota2.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "Encuentro intercultural fortalece redes de apoyo a población migrante",
    fecha: "03 abril 2026",
    resumen: "Actividad orientada al diálogo, la convivencia y la construcción de vínculos entre comunidades.",
    imagen: "img/notas/nota3.jpg",
    pdf: "pdf/notas/nota3.pdf",
    categoria: "Nota informativa"
  },
  {
    titulo: "Jornada informativa sobre derechos y regularización migratoria",
    fecha: "28 marzo 2026",
    resumen: "Espacio de orientación para resolver dudas frecuentes y acercar información útil a población en movilidad.",
    imagen: "img/notas/nota4.jpg",
    pdf: "pdf/notas/nota4.pdf",
    categoria: "Nota informativa"
  }
];

const notaPrincipal = document.getElementById("notaPrincipal");
const notasSecundarias = document.getElementById("notasSecundarias");
const archivoGrid = document.getElementById("archivoGrid");

function renderPublicaciones() {
  if (!publicaciones.length) return;

  const ultima = publicaciones[0];
  const anteriores = publicaciones.slice(1);

  notaPrincipal.innerHTML = `
    <a href="${ultima.pdf}" target="_blank">
      <img src="${ultima.imagen}" alt="${ultima.titulo}" class="nota-principal-img">
      <div class="nota-principal-body">
        <span class="nota-etiqueta">${ultima.categoria}</span>
        <span class="nota-fecha">${ultima.fecha}</span>
        <h2>${ultima.titulo}</h2>
        <p>${ultima.resumen}</p>
        <span class="nota-link">
          Ver PDF <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>
      </div>
    </a>
  `;

  notasSecundarias.innerHTML = anteriores.map(nota => `
    <article class="nota-side">
      <a href="${nota.pdf}" target="_blank">
        <img src="${nota.imagen}" alt="${nota.titulo}">
        <div class="nota-side-content">
          <span class="nota-fecha">${nota.fecha}</span>
          <h3>${nota.titulo}</h3>
          <p>${nota.resumen}</p>
        </div>
      </a>
    </article>
  `).join("");

  archivoGrid.innerHTML = publicaciones.map(nota => `
    <article class="archivo-card">
      <a href="${nota.pdf}" target="_blank">
        <img src="${nota.imagen}" alt="${nota.titulo}">
        <div class="archivo-card-body">
          <span class="nota-fecha">${nota.fecha}</span>
          <h3>${nota.titulo}</h3>
          <p>${nota.resumen}</p>
          <span class="nota-link">
            Abrir PDF <i class="fa-solid fa-file-pdf"></i>
          </span>
        </div>
      </a>
    </article>
  `).join("");
}

renderPublicaciones();

document.addEventListener("click", function(e){
    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || !href.toLowerCase().includes(".pdf")) return;

    e.preventDefault();

    const modal = document.getElementById("pdfViewerModal");
    const frame = document.getElementById("pdfFrame");
    const title = document.getElementById("pdfViewerTitle");
    const downloadBtn = document.getElementById("pdfDownloadBtn");

    const cardTitle =
        link.querySelector("h2")?.textContent ||
        link.querySelector("h3")?.textContent ||
        link.closest(".nota-principal, .nota-side, .archivo-card")?.querySelector("h2, h3")?.textContent ||
        "Nota informativa";

    title.textContent = cardTitle;
    frame.src = href;
    downloadBtn.href = href;

    modal.classList.add("active");
    document.body.classList.add("pdf-open");
});

document.addEventListener("DOMContentLoaded", function(){
    const closeBtn = document.getElementById("pdfCloseBtn");
    const modal = document.getElementById("pdfViewerModal");
    const frame = document.getElementById("pdfFrame");

    if (closeBtn) {
        closeBtn.addEventListener("click", function(){
            modal.classList.remove("active");
            document.body.classList.remove("pdf-open");
            frame.src = "";
        });
    }
});