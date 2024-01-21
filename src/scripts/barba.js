import barba from '@barba/core';
import { gsap } from "gsap";
import imagesLoaded from 'imagesloaded';
import { Fancybox } from '@fancyapps/ui';

var header = document.querySelector(".header");
var menu = document.querySelector(".menu");
var gridwrapper = document.querySelector(".gridwrapper");
var body = document.querySelector("body");
var html = document.documentElement;
var preloader = document.querySelector(".preloader");
var descriptionbox = document.querySelector(".descriptionbox");
var footer = document.querySelector('.footer');
var descriptionicon = document.querySelector('.descriptioniconCSS');
var text = document.querySelector('.descriptiontext');  
var allcontent = document.querySelector('.allcontent');
var desiconmobile = document.querySelector('.descriptioniconCSS.mobile');
var desboxmobile = document.querySelector('.descriptionbox.mobile');
var menumobile = document.querySelector('.hamburgerbutton');
var mobiletext = document.querySelector('.descriptiontext.mobile');
const menuItems = document.querySelectorAll('.menu a');
var hamburger = document.querySelector(".hamburgerbutton");

function preloaderanimation(data){
    setTimeout(function() {
      gsap.set(preloader, {autoAlpha: 1});
    }, 20); // 500ms delay
  
    imagesLoaded(data.next.container, function (instance) {
      gsap.to(preloader,{autoAlpha: 0});
    });
};

function headeradjustment(data) {
    if (data.next.namespace === 'masonry' || 
    data.next.namespace === 'architecture'|| 
    data.next.namespace === 'blank'
    
    ) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
}   




function fancyboxOpening(data) {
  if(data.next.container.querySelectorAll("[data-fancybox]") !== null) {
    let timer;
    window.addEventListener('popstate', function() {
      // console.log("popstat");
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
            timer = setTimeout(function() {
              history.back(); // go back after a delay if no popstate event has occurred
            }, 25); 
        },
      },

    });
  }
}





if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}











barba.init({
preventRunning: true,
debug: true,
   
transitions: [
  {
    name: 'fade-once',
      async once(data) {  
        fancyboxOpening(data);
        if (data.next.namespace === "blank") {
          Fancybox.fromSelector('[data-fancybox]', {
          });
        }

        // gsap.set(preloader,{autoAlpha: 1});
  
        await imagesLoaded( allcontent, 
            function (instance) {
            gsap.to(allcontent, 
              {autoAlpha: 1, 
                duration: 0.3,
              });
            gsap.to(preloader,{autoAlpha: 0});
        }); 
  
      },
  },
  
  
  {
    name: "onlyfades",
    to: { namespace: ["home", "alternate", "masonry", "architecture", "travel", 
    "blank"
  ] },




  // //PRELOAD
    before(data) {
        headeradjustment(data)
        
        preloaderanimation(data);
      
        
    },
    
    beforeLeave(data) {
        // console.log(data);
        console.log(window.scrollY);
        if (data.trigger === 'back') {
            console.log("bak");
        }

        if (data.current.namespace === "blank") {
          Fancybox.close();
        }
        if(data.trigger === 'forward' && data.next.namespace === "blank") {
          console.log("toblank");
          const lastslide = localStorage.getItem("closedFBindex");
          Fancybox.fromSelector('[data-fancybox]', {
            startIndex: lastslide,
          });
        }

        
        
    },

  //LEAVE
      async leave(data) {
      if (data.current.namespace !== "blank") {
        await gsap.to(data.current.container, {
          autoAlpha: 0,
          duration: 0.25,
        });
        fancyboxOpening(data);
        data.current.container.remove();
      }
    },

  // ENTER
    async enter(data) {
      // if (data.current.namespace !== "blank") {
        gsap.set(data.next.container, 
          {opacity: 0});
        
        await imagesLoaded( data.next.container, 
          function (instance) {
          gsap.to(data.next.container, 
            {opacity: 1, 
            });
          }); 
      // }
    }
},



]
});

