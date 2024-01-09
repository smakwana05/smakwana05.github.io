import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import imagesLoaded from 'imagesloaded';


const header = document.querySelector('header');
const fb = Fancybox.getInstance();


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

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});



function fancyboxOpening(visit) {
    if(visit.to.url.includes('blog')) {
      Fancybox.close();
    }

    if(visit.from.url.includes('blog') && visit.history.direction === 'forwards') {
      const lastslide = localStorage.getItem("closedFBindex");
      
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


document.addEventListener('swup:visit:start', ({ detail: { visit } }) => {
  // console.log('Going to', visit.to.url);
  fancyboxOpening(visit);
  
});

document.addEventListener('DOMContentLoaded', () => {

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


swup.hooks.on('visit:start', (visit) => {
    console.log('New page loaded:', visit.to.url);
    // navlinks.blur();

    if (visit.to.url.includes("about")) {
        console.log("aboutpage");
        header.classList.add('bigheader');
    }
    else {header.classList.remove('bigheader');}
},
{priority:-100}
);


swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('popstate, direction=', visit.history.direction);
  }

}); 

