import { Fancybox } from "@fancyapps/ui";

const options = {
    root: null,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.5,
  }

function test() {
  
    function initialImageLoad() {
      const images = Array.from(document.querySelectorAll('img[src]'));
      const windowHeight = window.innerHeight;
  
      // console.log(windowHeight);
      // console.log(images);
    
  
      images.forEach(image => {
        // Get the top position of the image relative to the viewport
        const imagePosition = image.getBoundingClientRect().top;
        // console.log(imagePosition);
        if (imagePosition > windowHeight) { 
          console.log("outsideview");
          image.classList.add("hide");
          // image.loading = "lazy";
          // image.decoding = "async";
          // image.setAttribute('data-src', image.src);
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
      // image.setAttribute('src', image.getAttribute('data-src'));
   
    }
    imageLazyLoad();
};

// document.addEventListener("DOMContentLoaded", (event) => {
test();
// })


