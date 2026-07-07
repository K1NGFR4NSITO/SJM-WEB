document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pdfViewerModal");
  let frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfViewerTitle");
  const downloadBtn = document.getElementById("pdfDownloadBtn");
  const closeBtn = document.getElementById("pdfCloseBtn");

  let pdfAbierto = false;

  function abrirPDF(pdfUrl, pdfTitulo) {
    if (!modal || !frame || !title || !downloadBtn || !pdfUrl) return;

    title.textContent = pdfTitulo || "Historias de Vida";
    frame.src = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-fit&view=Fit`;
    downloadBtn.href = pdfUrl;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("pdf-open");

    pdfAbierto = true;
  }

  function cerrarPDF() {
    if (!modal || !frame || !pdfAbierto) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pdf-open");

    setTimeout(() => {
      const nuevoFrame = frame.cloneNode(false);
      nuevoFrame.src = "";
      frame.parentNode.replaceChild(nuevoFrame, frame);
      frame = nuevoFrame;
    }, 200);

    pdfAbierto = false;
  }

  document.querySelectorAll(".tomo-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      abrirPDF(btn.dataset.pdf, btn.dataset.title);
    });
  });

  closeBtn?.addEventListener("click", cerrarPDF);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pdfAbierto) {
      cerrarPDF();
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileClose = document.querySelector(".mobile-menu-close");

  function abrirMenuMobile() {
    mobileMenu?.classList.add("active");
    mobileOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarMenuMobile() {
    mobileMenu?.classList.remove("active");
    mobileOverlay?.classList.remove("active");

    if (!pdfAbierto) {
      document.body.style.overflow = "";
    }
  }

  menuToggle?.addEventListener("click", abrirMenuMobile);
  mobileClose?.addEventListener("click", cerrarMenuMobile);
  mobileOverlay?.addEventListener("click", cerrarMenuMobile);

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", cerrarMenuMobile);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarMenuMobile();
    }
  });
});