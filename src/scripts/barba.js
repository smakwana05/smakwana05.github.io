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


//INTERSECTIONOBSERVER
const options = {
  root: null,
  rootMargin: '0px 0px 200px 0px',
  threshold: 0.5,
}

function test() {

  function initialImageLoad() {
    const images = Array.from(document.querySelectorAll('img[src]'));
    const windowHeight = window.innerHeight;
    images.forEach(image => {
      const imagePosition = image.getBoundingClientRect().top;
      if (imagePosition > windowHeight) { 
        console.log("outsideview");
        image.classList.add("hide");
        image.loading = "lazy";
        // image.decoding = "async";
      }
    });

  }
  
  initialImageLoad();

  function imageLazyLoad() {
    const images = Array.from(document.querySelectorAll('img[src]'));

    if (images.length) {
      if ('IntersectionObserver' in window) {
        setupIntersectionObserver(images);
      } else {
        loadImages(images);
      }
    }
  }

  function setupIntersectionObserver(images) {
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

  function loadImages(images) {
    images.forEach(loadImage);
  }

  function loadImage(image) {
    image.classList.remove("hide");
    console.log("REMOVEDHIDE");
  }
  imageLazyLoad();
};




function preloaderanimation(data) {
    setTimeout(function() {
      gsap.set(preloader, {autoAlpha: 1});
    }, 50); // 500ms delay
  
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
          
   
          // data.next.container.querySelector('.container').style.height = "calc(100dvh - 118px)";
          gsap.to(allcontent, 
            {autoAlpha: 1, 
              duration: 1,
            });
          gsap.to(preloader,{autoAlpha: 0});
      }); 
     
    },
  },
  
  
  {
    name: "onlyfades",
    to: { namespace: ["home", "alternate", "masonry", "architecture", "travel", "blank" ]},

   //PRELOAD
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
        gsap.set(data.next.container, 
          {opacity: 0});
        
        await imagesLoaded( data.next.container, 
          function (instance) {
          gsap.to(data.next.container, 
            {opacity: 1, 
            });
          }); 
    }
},


]
});

barba.hooks.once((data) => {
  console.log(data);
    if (data.current.namespace !== "") {
      test();
    };
});

barba.hooks.enter((data) => {
  if (data.next.namespace === "masonry") {
    test();
  };
});

