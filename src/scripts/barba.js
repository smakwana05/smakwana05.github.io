import barba from '@barba/core';
import { gsap } from "gsap";
import imagesLoaded from 'imagesloaded';

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
    data.next.namespace === 'architecture'
    
    ) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
}   

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.init({
preventRunning: true,
   
    transitions: [{
        name: "onlyfades",
        to: { namespace: ["home", "alternate", "masonry", "architecture", "travel"] },
    
      // //PRELOAD
        before(data) {
            headeradjustment(data)
            preloaderanimation(data);
        },
        
        beforeLeave(data) {
            console.log(window.scrollY);
            if (data.trigger === 'back') {
                console.log("bak");
            }
            
        },

      //LEAVE
         async leave(data) {
          
          await gsap.to(data.current.container, {
            autoAlpha: 0,
            duration: 0.25,
          });
    
          data.current.container.remove();
       
        },
    
      // ENTER
        async enter(data) {
          gsap.set(data.next.container, 
            {autoAlpha: 0});
    
          await imagesLoaded( data.next.container, 
            function (instance) {
            gsap.to(data.next.container, 
              {autoAlpha: 1, 
              });
            }); 
        }
  
    }]
  });

