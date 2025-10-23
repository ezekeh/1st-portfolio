function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const profile = document.querySelector("#profile");
const desktopNav = document.querySelector("#desktop-nav");
const hamburgerNav = document.querySelector("#hamburger-nav");
const sliderContainer = document.querySelector(".about-containers");
const slides = document.querySelectorAll(".slide");
const rightBtn = document.querySelector(".slider__btn--right");
const leftBtn = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");

const displayHeader = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    hamburgerNav.classList.add("fixPosition");
    desktopNav.classList.add("fixPosition");
  } else {
    hamburgerNav.classList.remove("fixPosition");
    desktopNav.classList.remove("fixPosition");
  }
};

new IntersectionObserver(displayHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${hamburgerNav.getBoundingClientRect().height}px`,
}).observe(profile);

// I want that when i scroll to section1(about) I will make the header fixed
// hamburgerNav.style.display = "none";
let currSlide = 0;
const start = 0;
const end = slides.length - 1;

const displaySlide = function (currSlide) {
  slides.forEach((each, i) => {
    each.style.transform = `translateX(${(i - currSlide) * 100}%)`;
  });
};

const displaydots = function () {
  slides.forEach((each, i) => {
    const dit = dotContainer.insertAdjacentHTML(
      "beforeend",
      `<div class='dot' data-slide="${i}"></div>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll(".dot").forEach((each) => {
    each.classList.remove("activate");
  });

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("activate");
};

const moveRight = function () {
  if (currSlide === end) currSlide = 0;
  else currSlide++;
  displaySlide(currSlide);
  activateDot(currSlide);
};

const moveLeft = function () {
  if (currSlide === 0) currSlide = end;
  else currSlide--;
  displaySlide(currSlide);
  activateDot(currSlide);
};

// initialize all
const init = function () {
  displaySlide(0);
  displaydots();
  activateDot(0);
};
init();
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowLeft") moveLeft();
});
rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

dotContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dot")) return;
  currSlide = e.target.dataset.slide;
  console.log(currSlide);
  displaySlide(currSlide);
  activateDot(currSlide);
});

console.log(document.querySelectorAll(".dot[data-slide='1']"));
