import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import { Fancybox } from "@fancyapps/ui";
import imagesLoaded from 'imagesloaded';

let scrollposition = 0;
const header = document.querySelector('header');

const swup = new Swup({
  animateHistoryBrowsing: true,
  containers: ["#swup"],
  plugins: [
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupPreloadPlugin(),
    new SwupA11yPlugin(),
  ]
});

const fb = Fancybox.getInstance();


document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});

//FANCYBOX HISTORY
function fancyboxOpening(visit) {
  if(visit.from.url.includes('blank')) {
    Fancybox.close();
    visit.animation.animate = false;
  }

  if(visit.to.url.includes('blank') && visit.history.direction === 'forwards') {
    const lastslide = localStorage.getItem("closedFBindex");
    visit.animation.animate = false;
    Fancybox.fromSelector('[data-fancybox]', {
      startIndex: lastslide,
    });
  }

  if(document.querySelectorAll("[data-fancybox]") !== null) {
  
    let timer;
      window.addEventListener('popstate', function() {
        clearTimeout(timer); // cancel the history.back() if a popstate event occurs
      });

    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      
      on: {
        "init": (fb) => { 
            console.log("init");
        },

        "close": (fb) => {
            console.log("close");  
            const indexonclose = fb.getSlide().index;
            localStorage.setItem("closedFBindex", indexonclose);
            timer = setTimeout(function() {
              history.back(); // go back after a delay if no popstate event has occurred
            }, 25); 
        },
      },

    });
  }
}

// GLOBAL SWUP:VISIT:START
// document.addEventListener('swup:visit:start', ({ detail: { visit } }) => {
//   // fancyboxOpening(visit);
//   console.log(visit);
//   console.log(window.scrollY)
// });


// document.addEventListener('swup:animation:out:end', async ({ detail: { visit } }) => {

// });


// ONCE LOAD
document.addEventListener('DOMContentLoaded', async () => {
  await document.querySelector('body').classList.add("fadedin");

  if(document.querySelectorAll("[data-fancybox]") !== null) {
    let timer;
      window.addEventListener('popstate', function() {
        clearTimeout(timer); // cancel the history.back() if a popstate event occurs
      });

    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      
      on: {
        "init": (fb) => { 
            console.log("init");
        },

        "close": (fb) => {
            console.log("close");  
            const indexonclose = fb.getSlide().index;
            localStorage.setItem("closedFBindex", indexonclose);
            timer = setTimeout(function() {
              history.back(); // go back after a delay if no popstate event has occurred
            }, 25); 
        },
      },

    });
  }
});


// VISIT START -100
swup.hooks.on('visit:start', async (visit) => {

    console.log('New page loaded:', visit.to.url);

    fancyboxOpening(visit);
    if(visit.to.url.includes('blank')) {
      scrollposition = window.scrollY;
      console.log("scrollsaved");
      header.classList.add('hidden')
      visit.animation.animate = false;
    }
    else ( header.classList.remove('hidden'));

    if (visit.to.url.includes("about")) {
        console.log("aboutpage");
        header.classList.add('bigheader');
    }
    else {header.classList.remove('bigheader');}
},
{priority:-100}
);

swup.hooks.on('animation:in:start', async () => {
  await imagesLoaded(document.querySelectorAll('#swup'), function( instance ) {
    console.log('all images are loaded');
  });
});

// VISIT END
swup.hooks.on('visit:end', (visit) => {
  if(visit.from.url.includes('blank')) {
   window.scrollTo(0, scrollposition);
  }

  if(visit.to.url.includes('blank')) {
    window.scrollTo(0, scrollposition);
   }
});



// VISIT START
// swup.hooks.on('visit:start', (visit) => {
//   if (visit.history.popstate) {
//     console.log('popstate, direction=', visit.history.direction);
//   }

// }); 
