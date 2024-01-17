import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import imagesLoaded from 'imagesloaded';


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
  












// swup.hooks.on('content:replace', async () => {
//   document.querySelector('.gridwrapper').style.opacity = 0;
//     // await testing();
//     // await imagesLoaded( document.querySelector('.gridwrapper'), function( instance ) {
//     //   console.log('all images are loaded');
//     // });
//  });

//  swup.hooks.on('content:replace', async () => {

//     await imagesLoaded( document.querySelectorAll('.gridwrapper'), function( instance ) {
//       // document.querySelector('.gridwrapper').style.opacity = 1;
//       console.log('all images are loaded');
//     });
//  });

  // async function checkAllImagesLoaded() {
  //   if (swupcontainer !== null) {
  //     const images = document.querySelectorAll('img[loading="eager"]');
  //     const promises = Array.from(images).map(image => {
  //       return new Promise((resolve, reject) => {
  //         if (image.complete) {
  //           resolve();
  //         } else {
  //           image.addEventListener('load', resolve);
  //           image.addEventListener('error', reject);
  //         }
  //       });
  //     });
  
  //     try {
  //       await Promise.all(promises);
  //       console.log('All images loaded within the container');
  //     } catch (error) {
  //       console.error('An image failed to load');
  //     }
  //   } 
  //   else {
  //     console.error('Invalid container element');
  //   }
  // }
  
  // swup.hooks.on('page:view', async (swupcontainer) => {
  //   await checkAllImagesLoaded(swupcontainer);
  // });


  
  // function testing() {
  //   if (document.querySelectorAll('img[loading="eager"]') !== null) {
  //     const images = document.querySelectorAll('img[loading="eager"]');
  //     const arrayimg = Array.from(images);
  //     console.log(arrayimg);

  //   }

  // }



