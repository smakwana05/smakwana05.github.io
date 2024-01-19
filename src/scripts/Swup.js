import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";


var preloader = document.querySelector(".preloader");
const allcontent = document.querySelector(".allcontent");
const images = document.querySelectorAll('img');
const header = document.querySelector('.header');
var swupcontainer = document.querySelectorAll('#swup');


const swup = new Swup({
    animateHistoryBrowsing: true,
    containers: ["#swup"],
    timeout: 7000,
    plugins: [
      new SwupHeadPlugin(),
      new SwupScriptsPlugin(),
      new SwupPreloadPlugin(),
      new SwupA11yPlugin(),
      // new SwupDebugPlugin(),
    ]
  });

// gsap.to(preloader, {autoAlpha: 1, duration: 0.25, delay: 0.35 });   
// gsap.set(preloader, {autoAlpha: 1});

document.addEventListener('DOMContentLoaded', () => {
  // gsap.to(preloader, {autoAlpha: 0});
  // preloader.classList.add('hidden');
  allcontent.style.opacity = "1"
});

swup.hooks.on('visit:start', (visit) => {
  if (
    visit.to.url.includes('life-drawing')||
    visit.to.url.includes('school')||
    visit.to.url.includes('architecture')||
    visit.to.url.includes('travel')
  ) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

let preloaderTimeout;



swup.hooks.replace('animation:out:await', async () => {
   await gsap.to('.gridwrapper', { opacity: 0, duration: 0.25 });
});

swup.hooks.replace('animation:in:await', async () => {
  gsap.set('.gridwrapper', { opacity: 0 })

  // preloaderTimeout = setTimeout(() => {
  //   gsap.to(preloader, { autoAlpha: 1, duration: 0.1 });
  // }, 40); 

  await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
    clearTimeout(preloaderTimeout);
    gsap.to('.gridwrapper', { opacity: 1 });
  });
},{priority: -100});



// swup.hooks.on('animation:in:end', async () => {
//   await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
//     gsap.to(preloader, { autoAlpha: 0 });
//   });
// });



// swup.hooks.on('animation:out:start', async () => {
//   preloaderTimeout = setTimeout(() => {
//     gsap.to(preloader, { autoAlpha: 1, duration: 0.05 });
//   }, ); // Replace YOUR_DELAY with the delay you want in milliseconds
// });







// document.addEventListener('swup:animation:out:start', ({ detail: { visit } }) => {
//   // setTimeout(() => {
//     gsap.to(preloader, {autoAlpha: 1});
//   // }, 20);
//   // preloader.classList.remove('hidden')
// });

// document.addEventListener('swup:animation:in:end', ({ detail: { visit } }) => {
//   imagesLoaded(allcontent, function (instance) {
//     // preloader.classList.add('hidden')
//     gsap.to(preloader,{autoAlpha: 0});
//   });
// });



// swup.hooks.before('animation:out:start', () => {
//   // {gsap.to(preloader, {autoAlpha: 1, duration: 0.25 }) }  
//   preloaderTimeout = setTimeout(() => {
//     gsap.to(preloader, {autoAlpha: 1, duration: 0.25});
//   }, 260);
// });











// swup.hooks.before('animation:out:start', () => {
//   setTimeout(function() {gsap.to(preloader, {autoAlpha: 1, duration: 0.25 }) }, 10);  
// });

// swup.hooks.on('visit:end',  () => {
//    gsap.to(preloader, {autoAlpha: 0, duration: 0.05});
// });

  
  // swup.hooks.on('page:view', async (swupcontainer) => {
  //   await checkAllImagesLoaded(swupcontainer);
  // });


  