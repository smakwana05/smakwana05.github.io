import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import imagesLoaded from 'imagesloaded';
import { gsap } from "gsap";



const images = (document.querySelectorAll('img'));
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
    ]
  });
  

swup.hooks.replace('animation:out:await', async () => {
   await gsap.to('.transition-fade', { autoAlpha: 0, duration: 0.25 });
});
  
 swup.hooks.replace('animation:in:await', async () => {
  gsap.set('.transition-fade', { autoAlpha: 0 })

  await imagesLoaded(document.querySelector('.gridwrapper'), function(instance) {
    console.log('imageslode');
    gsap.to('.transition-fade', { autoAlpha: 1 });
  });
},{priority: -100});




  
  // swup.hooks.on('page:view', async (swupcontainer) => {
  //   await checkAllImagesLoaded(swupcontainer);
  // });


  