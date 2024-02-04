import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";
import { Fancybox } from "@fancyapps/ui";


// function test() {

//   const options = {
//     root: null,
//     rootMargin: '0px 0px 200px 0px',
//     threshold: 0.5,
//   }
  
//   const images = Array.from(document.querySelectorAll('img[src]'));
//   const windowHeight = window.innerHeight;

//   function initialImageLoad() {
//     images.forEach(image => {
//       const imagePosition = image.getBoundingClientRect().top;
//       if (imagePosition > windowHeight) { 
//         console.log("outsideview");
//         image.loading = "lazy";
//         image.decoding = "async";
//         image.style.opacity = 0;
//         // gsap.set(image, {opacity: 0});
//       }
//     });
//   }
  
//   initialImageLoad();

//   function imageLazyLoad() {
//     if (images.length) {
//       if ('IntersectionObserver' in window) {
//         setupIntersectionObserver();
//       } 
//       else {
//         loadImages();
//       }
//     }
//   }

//   function setupIntersectionObserver() {
//     const observer = new IntersectionObserver(onIntersection, options);
//     images.forEach(image => observer.observe(image));
//   }

//   function onIntersection(entries, observer) {
//     entries.forEach((entry) => {
//       if (entry.intersectionRatio >= 0.5) {
//         observer.unobserve(entry.target);
//         loadImage(entry.target);
//       }
//     });
//   }

//   function loadImages() {
//     images.forEach(loadImage);
//   }

//   function loadImage(image) {
//     if (image.complete) {
//       image.style.opacity = 1;
//     } else {
//       image.onload = function() {
//         image.style.opacity = 1;
//         console.log("REMOVEDHIDE");
//       }
//     }
//   }
  
//   imageLazyLoad();
// };

function test() {
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
        image.loading = "lazy";
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

var preloader = document.querySelector(".preloader");
const allcontent = document.querySelector(".allcontent");
const header = document.querySelector('.header');

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

//FANCYBOX
function fancyboxinstance() {
  if(document.querySelectorAll("[data-fancybox]") !== null) {
  
    let timer;
      window.addEventListener('popstate', function() {
        clearTimeout(timer); 
      });

    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      Images: {
        protected: true,
        zoom: false,
      },
      Toolbar: {
        display: {
          left: ["none"],
          right: ["close"],
        },
      },
      placeFocusBack: false,
      Thumbs: false,  
      showClass: "fadeonly",
      hideClass: "fadeoutonly",
      on: {
        "init": (fb) => { 
            console.log("init");
        },

        "close": (fb) => {
            console.log("close");  
            const indexonclose = fb.getSlide().index;
            localStorage.setItem("closedFBindex", indexonclose);
            gsap.to('.header', { autoAlpha: 1 });
            timer = setTimeout(function() {
              history.back(); // go back after a delay if no popstate event has occurred
            }, 5); 
        },
      },

    });
  }
}

//FANCYBOX HISTORY
function fancyboxOpening(visit) {
  if(visit.from.url.includes('gallery')) {
    Fancybox.close();
    visit.animation.animate = false;
  }

  if(visit.to.url.includes('gallery') && visit.history.direction === 'forwards') {
    const lastslide = localStorage.getItem("closedFBindex");
    visit.animation.animate = false;
    Fancybox.fromSelector('[data-fancybox]', {
      startIndex: lastslide,
    });
  }

  fancyboxinstance(); 
}



window.addEventListener('pageshow', (event) => {
  if (event.persisted && window.location.href.includes("gallery")) {
    Fancybox.fromSelector('[data-fancybox]', {
    });
  }
});


//ONCE DOMCONTENT
document.addEventListener('DOMContentLoaded', () => {
  fancyboxinstance();
  
  imagesLoaded(allcontent, function (instance) {
    gsap.to(preloaderOnce, {autoAlpha: 0});
    preloaderOnce.style.display = "none";
    gsap.to('.allcontent', { autoAlpha: 1 });
    
    if (window.location.href.includes("gallery")) {
      Fancybox.fromSelector('[data-fancybox]', {
      });
    }
    test();
  });
});

let preloaderTimeout;

swup.hooks.on('content:replace', (visit) => {

  if (
    visit.to.url.includes('life-drawing')||
    visit.to.url.includes('school')
  ) {
    test();
  }
 
});

//VISIT START
swup.hooks.on('visit:start', async (visit) => {
 
  
  fancyboxOpening(visit);
  if (window.scrollY > 30 && !visit.from.url.includes('gallery')) {
    gsap.set('.header', { autoAlpha: 0, duration: 0.15 });
  }
  if (
    visit.to.url.includes('life-drawing')||
    visit.to.url.includes('school')||
    visit.to.url.includes('architecture')||
    visit.to.url.includes('travel')
  ) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  };

  if(visit.to.url.includes('gallery')) {
    scrollposition = window.scrollY;
  }
  // else {
  //   // window.scrollTo(0,0);
  // };

  // if(!visit.from.url.includes('gallery')) {
    preloaderTimeout = setTimeout(() => {
      gsap.to(preloader, { autoAlpha: 1, duration: 0.125 });
    }, 300); 
  // };
  

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





swup.hooks.on('visit:end', async (visit) => {
  
  if(visit.from.url.includes('gallery')) {
   window.scrollTo(0, scrollposition);

   gsap.set('.gridwrapper', { autoAlpha: 0 })
    await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
      clearTimeout(preloaderTimeout);
      gsap.to(preloader, { autoAlpha: 0 });
      gsap.to('.gridwrapper', { autoAlpha: 1 });
      
    });
  }
  if(visit.to.url.includes('gallery')) {
    window.scrollTo(0, scrollposition);
   }
  
});

