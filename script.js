document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // NAVBAR RESPONSIVE
  // =========================
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });

  // =========================
  // SLIDER INFINITO
  // =========================
  function setupSlider(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const wrapper = track.closest(".slider-wrapper");
    const prevBtn = wrapper.querySelector(".prev");
    const nextBtn = wrapper.querySelector(".next");
    const cards = track.querySelectorAll(".slide-card");

    if (!cards.length) return;

    let currentIndex = 0;

    function getGap() {
      const styles = window.getComputedStyle(track);
      return parseInt(styles.columnGap || styles.gap || 24, 10);
    }

    function getCardWidth() {
      const card = cards[0];
      return card.offsetWidth + getGap();
    }

    function moveSlider() {
      const scrollAmount = currentIndex * getCardWidth();
      track.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex >= cards.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        moveSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex <= 0) {
          currentIndex = cards.length - 1;
        } else {
          currentIndex--;
        }
        moveSlider();
      });
    }

    window.addEventListener("resize", () => {
      moveSlider();
    });
  }

  setupSlider("galeriaTrack");
  setupSlider("instalacionesTrack");

  // =========================
  // LIGHTBOX
  // =========================
  const images = document.querySelectorAll(".lightbox-trigger");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  if (images.length && lightbox && lightboxImg && closeBtn) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      document.body.style.overflow = "";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        document.body.style.overflow = "";
      }
    });
  }
});