"use strict";

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navListsWrapper = document.querySelector(".nav__lists");
const navLists = document.querySelectorAll(".nav__list");
const ham = document.querySelector(".hamburger");
const hamOverlay = document.querySelector(".ham__overlay");
const hero = document.querySelector(".hero");

//My Hamburger template
// requirements:
// 1. nav list (ul) contaier
// 3. an overlay empty div in html body as direct child el.

/////////////////////////////////////////////////////////////////////////
// hamburger function

// ham state tracker
let hamMenuOut = false;

const hamFunc = function (navListContnr, overlay) {
  // hamburger functionality
  const initHam = function () {
    // initiate hamburgerMenu
    navListContnr.classList.add("nav__toggle");
  };

  const terminateHam = function () {
    // terminate hamburgerMenu
    navListContnr.classList.remove("nav__toggle");
    overlay.style.display = "none";
  };

  // const removeOverlay = function () {
  //   overlay.style.display = "none";
  // };

  ham.addEventListener("click", () => {
    // checking for Hamburger state to initiate or terminate

    if (!hamMenuOut) {
      initHam(navListContnr);
      // display overlay
      overlay.style.display = "block";
    } else {
      terminateHam(navListContnr);
    }
    // overlay functionality
    // terminate ham if user clicks on overlay & set hamMenuOut to false & remove overlay
    overlay.addEventListener("click", () => {
      terminateHam(navListContnr);

      // set hamMenuOut to false
      hamMenuOut = false;
    });

    // set hamburger back to default (terminate condition)
    hamMenuOut = !hamMenuOut;

    // console.log(hamMenuOut);
  });

  return { terminateHam, initHam };
};

let { terminateHam, removeOverlay, initHam } = hamFunc(
  navListsWrapper,
  hamOverlay
);

// console.log(hamMenuOut);

////////////////////////////////////////////////////////////////////
// scroll page into view on navLink click functionality
const navScrollerFunc = function (e) {
  console.log(e);
  e.preventDefault();
  terminateHam();

  ///////😢😢😢😢
  hamMenuOut = false;
  console.log(hamMenuOut);

  const ListclickTarget = e.target.closest(".nav__link");
  if (!ListclickTarget) return;
  const id = ListclickTarget.getAttribute("href");
  console.log(id);
  document
    .querySelector(`#${id}`)
    .scrollIntoView({ behavior: "smooth", block: "start" });
};

navLists.forEach((li) => li.addEventListener("click", navScrollerFunc));

///////////////////////////////////////////////////////////////////////
// sticky nav functionality
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const navSticky = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
      style.style.marginTop = navHeight;
    } else {
      nav.classList.remove("sticky");
      style.style.marginTop = 0;
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
).observe(header);
