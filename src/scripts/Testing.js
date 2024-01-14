const options = {
    root: null,
    rootMargin: '0px 0px 300px 0px',
    threshold: 0.5,
  }

function test() {
  
    function initialImageLoad() {
      const images = Array.from(document.querySelectorAll('img[src]'));
      const windowHeight = window.innerHeight;
  
      // console.log(windowHeight);
      console.log(images);
    
  
      images.forEach(image => {
        // Get the top position of the image relative to the viewport
        const imagePosition = image.getBoundingClientRect().top;
        // console.log(imagePosition);
        if (imagePosition > windowHeight) { 
          console.log(image.src);
          image.setAttribute('data-src', image.src);
        //   console.log("this is outside view");
          // console.log(image.src);
          // If the image is below the fold, change src to data-src
  
          // image.removeAttribute('src');
        }
      });
  
    }
    
    initialImageLoad();
  
    function imageLazyLoad() {
      const images = Array.from(document.querySelectorAll('img[data-src]'));
  
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
      image.setAttribute('src', image.getAttribute('data-src'));
      image.onload = () => {
        image.removeAttribute('data-src');
        // msnry.layout();
      }
    }
    imageLazyLoad();
};

document.addEventListener("DOMContentLoaded", (event) => {
  test();
})