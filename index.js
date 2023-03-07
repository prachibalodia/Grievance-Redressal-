"use strict";

////////////////////////////////////////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
//////////////////////////////////////////////////////////
const openModal = function (e) {
e.preventDefault();
modal.classList.remove("hidden");
overlay.classList.remove("hidden");
};
const closeModal = function () {
modal.classList.add("hidden");
overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener(`click`, openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
if (e.key === "Escape" && !modal.classList.contains("hidden")) {
closeModal();
}
});
///////////////////////////////////////////////////////////
// For button (learn More)(smooth)
btnScrollTo.addEventListener(`click`, function (e) {
const s1coords = section1.getBoundingClientRect();
section1.scrollIntoView({ behavior: `smooth` });
});
///////////////////////////////////////////////////////////
// Page Navigation
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
e.preventDefault();
// Matching Strategy
if (e.target.classList.contains(`nav__link`)) {
const id = e.target.getAttribute(`href`);
document.querySelector(id).scrollIntoView({ behavior: `smooth` });
}
});
///////////////////////////////////////////////////////////
// Tabbed Component
tabsContainer.addEventListener(`click`, function (e) {
const clicked = e.target.closest(`.operations__tab`);
// Gaurd Clause
if (!clicked) return;
// Activate tab
tabsContent.forEach((c) => c.classList.remove(`operations__content--active`));
tabs.forEach((t) => t.classList.remove(`operations__tab--active`));
clicked.classList.add(`operations__tab--active`);
// Activate content Area
document
.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add(`operations__content--active`);
});
/////////////////////////////////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
if (e.target.classList.contains(`nav__link`)) {
const link = e.target;
const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
const logo = link.closest(`.nav`).querySelector(`img`);
siblings.forEach((el) => {
if (el !== link) el.style.opacity = this;
});
logo.style.opacity = this;
}
};
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));
/////////////////////////////////////////////////////////////////
// Sticky navigation -- intersection observer API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
const [entry] = entries;
if (!entry.isIntersecting) nav.classList.add(`sticky`);
else nav.classList.remove(`sticky`);
};
const header = document.querySelector(`.header`);
const headerOberver = new IntersectionObserver(stickyNav, {
root: null,
threshold: [0, 0],
rootMargin: `${-navHeight}px`,
});
headerOberver.observe(header);
//////////////////////////////////////////////////////////////
// Reveal section
const allSections = document.querySelectorAll(`.section`);
const revealSection = function (entries, observer) {
const [entry] = entries;
if (!entry.isIntersecting) return;
entry.target.classList.remove(`section--hidden`);
sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
root: null,
threshold: 0.15,
});
allSections.forEach(function (section) {
sectionObserver.observe(section);
section.classList.add(`section--hidden`);
});
//////////////////////////////////////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll(`img[data-src]`);
const loadImg = function (entries, observer) {
const [entry] = entries;
if (!entry.isIntersecting) return;
// Replace src with data-src
entry.target.src = entry.target.dataset.src;
entry.target.addEventListener(`load`, function () {
entry.target.classList.remove(`lazy-img`);
});
imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
root: null,
threshold: 0,
rootMargin: `200px`,
});
imgTargets.forEach((img) => imgObserver.observe(img));
///////////////////////////////////////////////////////////////
// Slider
const slides = document.querySelectorAll(`.slide`);
const btnLeft = document.querySelector(`.slider__btn--left`);
const btnRight = document.querySelector(`.slider__btn--right`);
let curSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
slides.forEach(
(s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
);
};
goToSlide(0);
const nextSlide = function () {
if (curSlide === maxSlide - 1) {
curSlide = 0;
} else {
curSlide++;
}
goToSlide(curSlide);
};
const prevSlide = function () {
if (curSlide === 0) {
curSlide = maxSlide - 1;
} else {
curSlide--;
}
goToSlide(curSlide);
};
btnRight.addEventListener(`click`, nextSlide);
btnLeft.addEventListener(`click`, prevSlide);
document.addEventListener(`keydown`, function (e) {
if (e.key === `ArrowLeft`) prevSlide();
e.key === `ArrowRight` && nextSlide();
});
///////////////////////////////////////////////////////////
document.addEventListener(`DOMContentLoaded`, function (e) {
console.log(e);
});
