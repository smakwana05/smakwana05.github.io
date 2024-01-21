




// swup.hooks.on('link:self', (visit) => {
//   gsap.to(preloader, {autoAlpha: 0});
// });

// swup.hooks.on('content:replace', (visit) => {
//   imagesLoaded(document.querySelector('.gridwrapper'), function (instance) {
//     gsap.to(preloader,{autoAlpha: 0, duration: 0.25});
//   });
// });


















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


  