import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupJsPlugin from '@swup/js-plugin';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";
import PhotoSwipeLightbox from 'photoswipe/lightbox';


let timer;
var preloader = document.querySelector(".preloader");
const allcontent = document.querySelector(".allcontent");
const header = document.querySelector('.header');
let preloaderTimeout;
var preloaderOnce = document.querySelector(".preloader-onceload");
let scrollposition = 0;


//PSWP SVGS
const leftArrowSVGString = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="lightboxArrowSvg" viewBox="0 0 100 100">
          <path d="M69.7 5 21.4 50 70 95" class="ArrowSvgPath"/>
</svg>
`;
const rightArrowSVGString = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="lightboxArrowSvgright" viewBox="0 0 100 100">
          <path d="M69.7 5 21.4 50 70 95" class="ArrowSvgPath"/>
</svg>
`;
const closeSVGString = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="lightboxCloseSvg" viewBox="0 0 100 100">

      <path d="m11.9 11.9 76.2 76.2M88.1 11.9 11.9 88.1" class="CloseSvgPath"/>

</svg>
`;
const loadSVGString = `
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="pswp__icn" viewBox="0 0 100 100">
      <path d="M50 90c-22.1 0-40-17.9-40-40" style="fill:none;stroke:#000;stroke-width:8; stroke-linecap:square;stroke-miterlimit:10"/>
</svg>
`;  

//UPDATE MENU STATE
function updateMenuState() {
  const path = window.location.pathname;
  const menuItems = document.querySelectorAll('a');
  menuItems.forEach(item => item.classList.remove('active'));

  menuItems.forEach(item => {
    if (path.includes(item.getAttribute('data-page'))) {
      item.classList.add('active');
    }
  });
}


//LIGHTBOX & PSWP
const lightbox = new PhotoSwipeLightbox({
  gallery: '.columns.test',
  children: 'button > a',
  zoom: false,
  counter: false,
  preload: [1, 3],
  showHideAnimationType: 'fade',
  bgOpacity: 1,
  preloaderDelay: 300,
  returnFocus: false,
  initialZoomLevel: (zoomLevelObject) => {
    if (isPhonePortrait()) {
      return zoomLevelObject.fit - 0.02;
    } else {
      return zoomLevelObject.fit - 0.1;
    }
  },
  pswpModule: () => import('photoswipe'),
  arrowPrevSVG: leftArrowSVGString,
  arrowNextSVG: rightArrowSVGString,
  closeSVG: closeSVGString,
  preloaderSVG: loadSVGString,

});


let isLightboxOpen = false;
let popstateFired = false;

lightbox.on('beforeOpen', () => {
  isLightboxOpen = true;
  
  console.log('beforeOpen');
  console.log(isLightboxOpen);
})

lightbox.on('close', () => {
  const indexonclose = pswp.currIndex;
  localStorage.setItem("closedFBindex", indexonclose);
  isLightboxOpen = false;
  
  console.log('close');
  console.log(isLightboxOpen);
  if (!popstateFired) {
    history.back();
  }
  popstateFired = false; 
  document.activeElement.blur();
});


//UPDATE DARK MODE
function updateDarkMode() {
  // Check local storage for dark mode setting
  var isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Apply the setting to the root element
  document.documentElement.classList.toggle('dark-mode', isDarkMode);

  // Update the toggle state
  var toggle = document.querySelector('#darkModeToggleFooter');
  var togglemobile = document.querySelector('#darkModeToggleMobile');

  // Check each toggle individually
  if (toggle !== null) {
    toggle.checked = isDarkMode;

    // Listen for changes in the toggle state
    toggle.addEventListener('change', function(event) {
      var isDarkMode = event.target.checked;
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
    });
  }

  if (togglemobile !== null) {
    togglemobile.checked = isDarkMode;

    // Listen for changes in the toggle state
    togglemobile.addEventListener('change', function(event) {
      var isDarkMode = event.target.checked;
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
    });
  }
}


//SWUP FUNCTIONS & ANIMATIONS
async function outAnimation() {
  await gsap.to('#swup', { opacity: 0, duration: 0.3 });
  // preloaderTimeout = setTimeout(() => gsap.to(preloader, { autoAlpha: 1}), 300);
  
}

async function inAnimationIL() {
  // clearTimeout(preloaderTimeout);
  preloaderTimeout = setTimeout(() => gsap.to(preloader, { autoAlpha: 1}), 300);
  gsap.set('#swup', { opacity: 0 });
  await imagesLoaded('#swup', () => {
    console.log("ImagesloadedTriggered");
    
    clearTimeout(preloaderTimeout);
    gsap.to(preloader, {autoAlpha: 0});
    gsap.fromTo('#swup', { opacity: 0 }, { opacity: 1, duration: 0.5});
    
  });
}

async function inAnimationGal() {
  preloaderTimeout = setTimeout(() => gsap.to(preloader, { autoAlpha: 1 }), 800);
  gsap.set('#swup', { opacity: 0 });
  await imagesLoaded('#swup', () => {
    console.log("ImagesloadedTriggered");
    clearTimeout(preloaderTimeout);
    gsap.to(preloader, { autoAlpha: 0 });
    gsap.fromTo('#swup', { opacity: 0 }, { opacity: 1 });
  });
}

function mainInitFunctions() {
  updateDarkMode();
  updateMenuState();
  intersectionSetup();
  PhotoswipeInit();  
}


//SWUP
const swup = new Swup({
  animateHistoryBrowsing: true,
  containers: ["#swup"],
  timeout: 5000,
  plugins: [
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupPreloadPlugin(),
    new SwupA11yPlugin(),
    // new SwupDebugPlugin(),
    new SwupJsPlugin({ animations: [  
      {
        from: ['/art-design/life-drawing-gallery', '/art-design/school-gallery'],
        to: '(.*)',
        out: (done) => {
          swup.visit.scroll.reset = false;
          done();
        },
        in: async (done) => {
          // window.scrollTo(0, scrollposition);
          mainInitFunctions();
          await inAnimationGal();
        }
      },
      {
        from: '(.*)',
        to: ['/art-design/life-drawing-gallery', '/art-design/school-gallery'],
        out: (done) => {
          // scrollposition = window.scrollY;
          // console.log(swup.visit);
          swup.visit.scroll.reset = false;
          if(swup.visit.history.direction === 'forwards') {
                const lastslide = localStorage.getItem("closedFBindex");
                lightbox.loadAndOpen(Number(lastslide));
              }
          done();
        },
        in: (done) => {
          mainInitFunctions();
          done();
        },
        // out: async () => {
          // mainInitFunctions();
          // await gsap.to('#swup', { opacity: 0, duration: 0.1 });
          // const lastslide = localStorage.getItem("closedFBindex");
          // lightbox.loadAndOpen(Number(lastslide));
        // },
        // in: async () => {
        //   await gsap.fromTo('#swup', { opacity: 0 }, { opacity: 1, duration: 0.1});
        // }
      },

      // {
      //   to: '(.*)',
      //   from: ['/art-design/life-drawing-gallery', '/art-design/school-gallery'],
      //   out: () => {
      //     swup.visit.animation.animate = false;
      //   },
      //   in: () => {
      //     swup.visit.animation.animate = false;
      //     mainInitFunctions();
      //   }
      // },
      
      // {
      //   from: '(.*)',
      //   to: ['/art-design/life-drawing-gallery', '/art-design/school-gallery'],
      //   out: () => {
      //     swup.visit.animation.animate = false;
      //     gsap.set('#swup', { opacity: 1 });
      //     const lastslide = localStorage.getItem("closedFBindex");
      //     lightbox.loadAndOpen(Number(lastslide));
      //   },
      //   in: () => {
      //     swup.visit.animation.animate = false;
      //     gsap.set('#swup', { opacity: 1 });
      //     // mainInitFunctions();
      //     // await inAnimationIL();
      //   }
      // },

      
      {
        from: ['/art-design/life-drawing', '/art-design/school', '/architecture', '/art-design/graphics-illustration'],
        to: ['/', '/art-design'], 
        out: async () => {
          if (window.scrollY > 30 ) {gsap.set('.header', { autoAlpha: 0, duration: 0.3 });}
          header.classList.remove("shrink");
          mainInitFunctions();
          await outAnimation();
          
        },
        in: async () => {
          gsap.to('.header', { autoAlpha: 1 });
          mainInitFunctions();
          await inAnimationIL();
         
        }
      },
      {
        from: '(.*)',
        to: ['/art-design/life-drawing', '/art-design/school', '/architecture', '/art-design/graphics-illustration'],
        out: async () => {
          header.classList.add("shrink");
          mainInitFunctions();
          await outAnimation();
        },
        in: async () => {
          mainInitFunctions();
          await inAnimationIL();
        }
      },
      {
        from: '(.*)',
        to: '(.*)',
        out: async () => {
          
            mainInitFunctions();
            await outAnimation();
        },
        in: async () => {
            mainInitFunctions();
            await inAnimationIL();
        }
      }

    ]}),
  
  ]
});



window.addEventListener('popstate', function(event) {
  console.log(swup.visit  );
  if (isLightboxOpen) { 
      popstateFired = true;
      lightbox.pswp.close();
  }
});

function isPhonePortrait() {
  return window.matchMedia('(max-width: 600px) and (orientation: portrait)').matches;
}

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

if (document.readyState === 'complete') {
  updateMenuState();
} else {
  document.addEventListener('DOMContentLoaded', () => updateMenuState());
};


document.addEventListener('DOMContentLoaded', async () => {
  updateDarkMode();
  PhotoswipeInit();
  imagesLoaded(allcontent, function (instance) {
        if (window.location.href.includes("gallery")) {
          lightbox.loadAndOpen(0);
        };
        gsap.to(preloaderOnce, {autoAlpha: 0});
        preloaderOnce.style.display = "none";
        gsap.to('.allcontent', { autoAlpha: 1 });
        gsap.set(preloader, { autoAlpha: 0 });
        intersectionSetup(); 
  });
});


swup.hooks.on('visit:start', (data, visit) => {
  // console.log(data.scroll.reset);
  
  // console.log(visit);
});

// //ONCE DOMCONTENT
// document.addEventListener('DOMContentLoaded', () => {
// //  activemenustate();
// // console.log(window.location.pathname);
//   // updateMenuState();
//   updateDarkMode();
//   PhotoswipeInit();
//   imagesLoaded(allcontent, function (instance) {
//     if (window.location.href.includes("gallery")) {
//       lightbox.loadAndOpen(0);
//     }
//     gsap.to(preloaderOnce, {autoAlpha: 0});
//     preloaderOnce.style.display = "none";
//     gsap.to('.allcontent', { autoAlpha: 1 });
//     intersectionSetup(); 
//   });
// });

// //CONTENT REPLACE
// swup.hooks.on('content:replace', async (visit) => {
  
//   updateDarkMode();
//   if (
//     visit.to.url.includes('life-drawing')||
//     visit.to.url.includes('school')
//   ) {
//     intersectionSetup();
//     PhotoswipeInit();
//   }
// });

// swup.hooks.before('visit:start', (visit) => {
//     if(visit.from.url.includes('gallery')) {
//     console.log(lightbox);
//     lightbox.pswp.close();
//   }
// })

// //VISIT START
// swup.hooks.on('visit:start', async (visit) => {
 
//   const headerShrinkUrl = ['life-drawing', 'school', 'architecture', 'travel'];
//   const galleryIncluded = visit.from.url.includes('gallery') || visit.to.url.includes('gallery');
//   // activemenustate(visit);
//   console.log(visit);
//   if(visit.to.url.includes('gallery') && visit.history.direction === 'forwards') {
//     const lastslide = localStorage.getItem("closedFBindex");
//     lightbox.loadAndOpen(Number(lastslide));
//   }

//   if (window.scrollY > 30 && !visit.from.url.includes('gallery')) {
//     gsap.set('.header', { autoAlpha: 0, duration: 0.15 });
//   }

//   if (headerShrinkUrl.some(url => visit.to.url.includes(url))) {
//     header.classList.add("shrink");
//   } else {
//     header.classList.remove("shrink");
//   }

//   if(visit.to.url.includes('gallery')) {
//     scrollposition = window.scrollY;
//   }

//   // if(visit.from.url.includes('gallery')) {
//   //   console.log(lightbox);
//   //   lightbox.pswp.close();
//   // }

//   const delay = galleryIncluded ? 800 : 300;
//   preloaderTimeout = setTimeout(() => {
//     gsap.to(preloader, { autoAlpha: 1, duration: 0.125 });
//   }, delay);

// }, {priority: 100});


// //ANIMATION OUT AWAIT
// swup.hooks.replace('animation:out:await', async (visit) => {
//     updateMenuState();
//    await gsap.to('.gridwrapper', { autoAlpha: 0, duration: 0.25 });
// });


// //ANIMATION IN AWAIT
// swup.hooks.replace('animation:in:await', async (visit) => {
//   updateMenuState();
//   if(visit.from.url.includes('gallery')) {
//     window.scrollTo(0, scrollposition);
//   };
//   if(visit.to.url.includes('gallery')) {
//     window.scrollTo(0, scrollposition);
//   };
//   gsap.set('.gridwrapper', { opacity: 0 })
//   await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
//     clearTimeout(preloaderTimeout);
//     gsap.to(preloader, { autoAlpha: 0 });
//     gsap.to('.gridwrapper', { opacity: 1 });
//     gsap.to('.header', { autoAlpha: 1 });
//   });
// },{priority: -100});


// //PAGE VIEW
// // swup.hooks.on('page:view', () => updateMenuState());


// //VISIT END
// swup.hooks.on('visit:end', async (visit) => {
  
//   // if(visit.from.url.includes('gallery')) {
 
//   //  gsap.set('.gridwrapper', { autoAlpha: 0 })
//   //   await imagesLoaded(document.querySelector('.gridwrapper'), function() {
//   //     clearTimeout(preloaderTimeout);
//   //     gsap.to(preloader, { autoAlpha: 0 });
//   //     gsap.to('.gridwrapper', { autoAlpha: 1 });
      
//   //   });
//   // }

// });

