import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

let timer;
var preloader = document.querySelector(".preloader");
const allcontent = document.querySelector(".allcontent");
const header = document.querySelector('.header');
let preloaderTimeout;
var preloaderOnce = document.querySelector(".preloader-onceload");
let scrollposition = 0;

//SWUP
const swup = new Swup({
  animateHistoryBrowsing: true,
  containers: ["#swup"],
  timeout: 7000,
  plugins: [
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupPreloadPlugin(),
    new SwupA11yPlugin(),
  ]
});

//LIGHTBOX
const lightbox = new PhotoSwipeLightbox({
  gallery: '.columns.test',
  children: 'button > a',
  zoom: false,
  counter: false,
  preload: [1, 3],
  showHideAnimationType: 'fade',
  bgOpacity: 1,
  preloaderDelay: 300,
  initialZoomLevel: 0.45,
  pswpModule: () => import('photoswipe')
});

lightbox.on('close', () => {
  const indexonclose = pswp.currIndex;
  localStorage.setItem("closedFBindex", indexonclose);
  console.log("close");
  timer = setTimeout(function() {
    history.back(); // go back after a delay if no popstate event has occurred
  }, 5);   
});


window.addEventListener('popstate', function() {
  clearTimeout(timer); 
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted && window.location.href.includes("gallery")) {
    const lastslide = localStorage.getItem("closedFBindex");
    lightbox.loadAndOpen(Number(lastslide));
  }
});

function PhotoswipeInit() {
  const imageLinks = document.querySelectorAll('.columns.test button > a');  
  imagesLoaded(document.querySelector('.gridwrapper'), function() {
    imageLinks.forEach(link => {
    const img = link.querySelector('img');
    link.setAttribute('data-pswp-width', img.naturalWidth);
    link.setAttribute('data-pswp-height', img.naturalHeight);
    });
  });
  lightbox.init();
}


//INTERSECTION
function intersectionSetup() {
  const options = {
    root: null,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.5,
  };

  const images = Array.from(document.querySelectorAll('img[src]'));
  const windowHeight = window.innerHeight;

  function initialImageLoad() {
    images.forEach(image => {
      const imagePosition = image.getBoundingClientRect().top;
      if (imagePosition > windowHeight) { 
        console.log("outsideview");
        // image.loading = "lazy";
        image.decoding = "async";
        image.style.opacity = 0;
      }
    });
  }

  initialImageLoad();

  function imageLazyLoad() {
    if (images.length) {
      if ('IntersectionObserver' in window) {
        setupIntersectionObserver();
      } else {
        loadImages();
      }
    }
  }

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(onIntersection, options);
    images.forEach(image => observer.observe(image));
  }

  function onIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        observer.unobserve(entry.target);
        loadImage(entry.target);
      }
    });
  }

  function loadImages() {
    images.forEach(loadImage);
  }

  function loadImage(image) {
    if (image.complete) {
      image.style.opacity = 1;
    } else {
      image.onload = () => {
        image.style.opacity = 1;
        console.log("REMOVEDHIDE");
      };
    }
  }

  imageLazyLoad();
}


//ONCE DOMCONTENT
document.addEventListener('DOMContentLoaded', () => {
  PhotoswipeInit();
  imagesLoaded(allcontent, function (instance) {
    if (window.location.href.includes("gallery")) {
      lightbox.loadAndOpen(0);
    }
    gsap.to(preloaderOnce, {autoAlpha: 0});
    preloaderOnce.style.display = "none";
    gsap.to('.allcontent', { autoAlpha: 1 });
    intersectionSetup(); 
  });
});

//CONTENT REPLACE
swup.hooks.on('content:replace', async (visit) => {
  if (
    visit.to.url.includes('life-drawing')||
    visit.to.url.includes('school')
  ) {
    intersectionSetup();
    PhotoswipeInit();
  }
});


//VISIT START
// swup.hooks.on('visit:start', async (visit) => {
//   if(visit.to.url.includes('gallery') && visit.history.direction === 'forwards') {
//       const lastslide = localStorage.getItem("closedFBindex");
//       lightbox.loadAndOpen(Number(lastslide));
//   }
//   if (window.scrollY > 30 && !visit.from.url.includes('gallery')) {
//     gsap.set('.header', { autoAlpha: 0, duration: 0.15 });
//   }
//   if (
//     visit.to.url.includes('life-drawing')||
//     visit.to.url.includes('school')||
//     visit.to.url.includes('architecture')||
//     visit.to.url.includes('travel')
//   ) {
//     header.classList.add("shrink");
//   } else {
//     header.classList.remove("shrink");
//   };

//   if(visit.to.url.includes('gallery')) {
//     scrollposition = window.scrollY;
//   }
//   if(visit.from.url.includes('gallery')) {
//     lightbox.pswp.close();
//   }


//   if(visit.from.url.includes('gallery')||visit.to.url.includes('gallery')) {
//     preloaderTimeout = setTimeout(() => {
//       gsap.to(preloader, { autoAlpha: 1, duration: 0.125 });
//     }, 800); 
//   } else {

//     preloaderTimeout = setTimeout(() => {
//       gsap.to(preloader, { autoAlpha: 1, duration: 0.125 });
//     }, 300); 

//   }

// }, {priority: 100});

swup.hooks.on('visit:start', async (visit) => {
  const headerShrinkUrl = ['life-drawing', 'school', 'architecture', 'travel'];
  const galleryIncluded = visit.from.url.includes('gallery') || visit.to.url.includes('gallery');

  if(visit.to.url.includes('gallery') && visit.history.direction === 'forwards') {
    const lastslide = localStorage.getItem("closedFBindex");
    lightbox.loadAndOpen(Number(lastslide));
  }

  if (window.scrollY > 30 && !visit.from.url.includes('gallery')) {
    gsap.set('.header', { autoAlpha: 0, duration: 0.15 });
  }

  if (headerShrinkUrl.some(url => visit.to.url.includes(url))) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }

  if(visit.to.url.includes('gallery')) {
    scrollposition = window.scrollY;
  }

  if(visit.from.url.includes('gallery')) {
    lightbox.pswp.close();
  }

  const delay = galleryIncluded ? 800 : 300;
  preloaderTimeout = setTimeout(() => {
    gsap.to(preloader, { autoAlpha: 1, duration: 0.125 });
  }, delay);

}, {priority: 100});


//ANIMATION OUT AWAIT
swup.hooks.replace('animation:out:await', async () => {
   await gsap.to('.gridwrapper', { autoAlpha: 0, duration: 0.25 });
});


//ANIMATION IN AWAIT
swup.hooks.replace('animation:in:await', async () => {
  gsap.set('.gridwrapper', { opacity: 0 })
  await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
    clearTimeout(preloaderTimeout);
    gsap.to(preloader, { autoAlpha: 0 });
    gsap.to('.gridwrapper', { opacity: 1 });
    gsap.to('.header', { autoAlpha: 1 });
  });
},{priority: -100});





//VISIT END
swup.hooks.on('visit:end', async (visit) => {
  
  if(visit.from.url.includes('gallery')) {
   window.scrollTo(0, scrollposition);
   
   gsap.set('.gridwrapper', { autoAlpha: 0 })
    await imagesLoaded(document.querySelector('.gridwrapper'), function() {
      clearTimeout(preloaderTimeout);
      gsap.to(preloader, { autoAlpha: 0 });
      gsap.to('.gridwrapper', { autoAlpha: 1 });
      
    });
  }
  if(visit.to.url.includes('gallery')) {
    window.scrollTo(0, scrollposition);
   
   }
  
});

