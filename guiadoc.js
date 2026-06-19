document.addEventListener("DOMContentLoaded", () => {
  const abrirBtn = document.getElementById("abrirGuia");
  const modal = document.getElementById("pdfViewerModal");
  const frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfViewerTitle");
  const downloadBtn = document.getElementById("pdfDownloadBtn");
  const closeBtn = document.getElementById("pdfCloseBtn");

  const documento = {
    titulo: "GUÍA",
    pdf: "pdf/nuevaguia.pdf"
  };

  let pdfAbierto = false;
  let bloqueoHistorial = false;

  function abrirPDF() {
    if (!modal || !frame || !title || !downloadBtn) return;

    title.textContent = documento.titulo;
frame.src = `${documento.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=Fit`;    
downloadBtn.href = documento.pdf;

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

  abrirBtn?.addEventListener("click", abrirPDF);

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
    document.body.style.overflow = "";
  }

  menuToggle?.addEventListener("click", abrirMenuMobile);
  mobileClose?.addEventListener("click", cerrarMenuMobile);
  mobileOverlay?.addEventListener("click", cerrarMenuMobile);

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", cerrarMenuMobile);
  });
});