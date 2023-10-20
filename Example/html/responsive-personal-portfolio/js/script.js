// Change Background Header

function scrollHeader() {
  const header = document.querySelector(".header");

  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

// Services Modal
const modalViews = document.querySelectorAll(".services-modal"),
  modalBtn = document.querySelectorAll(".services-btn"),
  modalClose = document.querySelectorAll(".services-modal-close");

let modal = (modalClick) => {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtn.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

// Mixitup Filter Portfolio
const mixerPortfolio = mixitup(".work-container", {
  selectors: {
    target: ".work-card",
  },
  animation: {
    duration: 300,
  },
});

// Work Active Link
const linkWork = document.querySelectorAll(".work-item");
const activeWork = (event) => {
  linkWork.forEach((item) => item.classList.remove("active-work"));
  event.srcElement.classList.add("active-work");
};

// function activeWork() {
//   linkWork.forEach((item) => item.classList.remove("active-work"));
//   this.classList.add("active-work");
// }

linkWork.forEach((item) => item.addEventListener("click", activeWork));

// Swiper
const swiperTestimonial = new Swiper(".testimonial-container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

// Scroll Sections active link
const sections = document.querySelectorAll("section[id");
const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionID = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionID + "]")
        .classList.add("active-link");
    } else
      document
        .querySelector(".nav-menu a[href*=" + sectionID + "]")
        .classList.remove("active-link");
  });
};

window.addEventListener("scroll", scrollActive);

// Light and Dark Theme
const themeBTN = document.querySelector("#btn-theme");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () => {
  themeBTN.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeBTN.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeBTN.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeBTN.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1200,
  delay: 300,
  reset: true,
});

sr.reveal(".home-data");
sr.reveal(".home-handle", { delay: 400 });
sr.reveal(".home-social, .home-scroll", { delay: 600, origin: "" });
