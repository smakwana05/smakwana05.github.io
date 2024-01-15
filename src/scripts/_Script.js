var main = document.querySelector(".main");
var header = document.querySelector(".header");
var menu = document.querySelector(".menu");
var sticky = header.offsetTop;
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


const pathToPageMap = {
  "/Portfolio/BasicPage_Alternate.html": [
    { page: "art", activeClass: "active" },
    { page: "lifedrawing", expandClass: "expand" },
    { page: "school", expandClass: "expand" }
  ],

  "/Portfolio/life-drawing-column.html": [
    { page: "art", activeClass: "active" },
    { page: "lifedrawing", activeClass: "activeblue", expandClass: "expand"},
    { page: "school", expandClass: "expand" },
  ],
 
  "/Portfolio/BasicPage_MasonryNew.html": [
    { page: "art", activeClass: "active" },
    { page: "school", activeClass: "activeblue", expandClass: "expand"},
    { page: "lifedrawing", expandClass: "expand"},
  ],

  "/Portfolio/BasicPage_2rows.html": [
    { page: "travel", activeClass: "active" },
  ],

  "/Portfolio/BasicPage_3plusrows.html": [
    { page: "architecture", activeClass: "active" }
  ],

  // SUBPAGE LOGIC:
 

   // "/Portfolio/life-drawing-column.html": [
  //   { page: "art", activeClass: "active" }
  // ],
};

var tl = gsap.timeline({
});


//INTERSECTIONOBSERVER
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
    // console.log(images);
  

    images.forEach(image => {
      // Get the top position of the image relative to the viewport
      const imagePosition = image.getBoundingClientRect().top;
      // console.log(imagePosition);
      if (imagePosition > windowHeight) { 
        // console.log(image.src);
        image.setAttribute('data-src', image.src);
        // console.log("this is outside view");
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
}


//UPDATE DARK MODE
function updateDarkMode(data) {
  // Check local storage for dark mode setting
  var isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Apply the setting to the root element
  document.documentElement.classList.toggle('dark-mode', isDarkMode);

  // Update the toggle state
  var toggle = data.next.container.querySelector('#darkModeToggleFooter');
  var togglemobile = document.querySelector('#darkModeToggleMobile');

  // Check each toggle individually
  if (toggle !== null) {
    toggle.checked = isDarkMode;

    // Listen for changes in the toggle state
    toggle.addEventListener('change', function(event) {
      var isDarkMode = event.target.checked;
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
    });
  }

  if (togglemobile !== null) {
    togglemobile.checked = isDarkMode;

    // Listen for changes in the toggle state
    togglemobile.addEventListener('change', function(event) {
      var isDarkMode = event.target.checked;
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
    });
  }
}

//ACTIVE MENU STATE
let activeItems = [];
function activemenustate(data) {
  const nextPath = data.next.url.path;
  const pageActiveClassPairs = pathToPageMap[nextPath];

  // Remove the active class from the currently active menu items
  activeItems.forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("activeblue");
    // item.classList.remove("expand");
    if (item.classList.contains("expand")) {
      item.classList.remove("expand");
      item.tabIndex = -1; // Set tabindex to -1 when expandClass is removed
    }
  });

  // Reset the activeItems array
  activeItems = [];

  // If there are corresponding data-page attributes, add the active class to the appropriate menu items
  if (pageActiveClassPairs) {
    pageActiveClassPairs.forEach(({ page, activeClass, expandClass }) => {
      const newActiveItems = document.querySelectorAll(`.menu a[data-page="${page}"]`);
      newActiveItems.forEach((item) => {
        if (activeClass) {
          item.classList.add(activeClass);
        }
        if (expandClass) {
          item.classList.add(expandClass);
          item.tabIndex = 0;
        }
        activeItems.push(item);
      });
    });
  }
}
// let activeItems = [];
// let expandedSubpages = [];

// function activemenustate(data) {
//   const nextPath = data.next.url.path;
//   const pageActiveClassPairs = pathToPageMap[nextPath];

//   // Remove the active and expand classes from the currently active menu items
//   activeItems.forEach((item) => {
//     item.classList.remove("active");
//     item.classList.remove("activeblue");
//   });

//   // Remove the expand class from the currently expanded subpages that are not in the new subpages list
//   expandedSubpages.forEach((subItem) => {
//     if (!pageActiveClassPairs || !pageActiveClassPairs.some(({ subpages }) => subpages && subpages.includes(subItem.getAttribute('data-page')))) {
//       subItem.classList.remove("expand");
//     }
//   });

//   // Reset the activeItems and expandedSubpages arrays
//   activeItems = [];
//   expandedSubpages = [];

//   // If there are corresponding data-page attributes, add the active class to the appropriate menu items
//   if (pageActiveClassPairs) {
//     pageActiveClassPairs.forEach(({ page, activeClass, subpages }) => {
//       const newActiveItems = document.querySelectorAll(`.menu a[data-page="${page}"]`);
//       newActiveItems.forEach((item) => {
//         item.classList.add(activeClass);
//         activeItems.push(item);
//       });

//       // If there are subpages, add the "expand" class to them
//       if (subpages) {
//         subpages.forEach((subpage) => {
//           const subpageItems = document.querySelectorAll(`.menu a[data-page="${subpage}"]`);
//           subpageItems.forEach((subItem) => {
//             subItem.classList.add("expand");
//             expandedSubpages.push(subItem);
//           });
//         });
//       }
//     });
//   }
// }

// let activeItems = [];

// function activemenustate(data) {
//   const nextPath = data.next.url.path;
//   const pageActiveClassPairs = pathToPageMap[nextPath];

//   // Remove the active class from the currently active menu items
//   activeItems.forEach((item) => {
//     item.classList.remove("active");
//     item.classList.remove("activeblue");
//     if (item.classList.contains("subpage")) {
//       item.classList.remove("expand");
//     }
//   });

//   // Reset the activeItems array
//   activeItems = [];

//   // If there are corresponding data-page attributes, add the active class to the appropriate menu items
//   if (pageActiveClassPairs) {
//     pageActiveClassPairs.forEach(({ page, activeClass, subpages }) => {
//       const newActiveItems = document.querySelectorAll(`.menu a[data-page="${page}"]`);
//       newActiveItems.forEach((item) => {
//         item.classList.add(activeClass);
//         activeItems.push(item);
//       });

//       // If there are subpages, add the "expand" class to them
//       if (subpages) {
//         subpages.forEach((subpage) => {
//           const subpageItems = document.querySelectorAll(`.menu a[data-page="${subpage}"]`);
//           subpageItems.forEach((subItem) => {
//             subItem.classList.add("expand");
//             activeItems.push(subItem);
//           });
//         });
//       }
//     });
//   }
// }

//BASIC WORKS

// let activeItems = [];

// function activemenustate(data) {
//   const nextPath = data.next.url.path;
//   const pageActiveClassPairs = pathToPageMap[nextPath];

//   // Remove the active class from the currently active menu items
//   activeItems.forEach((item) => {
//     item.classList.remove("active");
//     item.classList.remove("activeblue");
//   });

//   // Reset the activeItems array
//   activeItems = [];

//   // If there are corresponding data-page attributes, add the active class to the appropriate menu items
//   if (pageActiveClassPairs) {
//     pageActiveClassPairs.forEach(({ page, activeClass }) => {
//       const newActiveItems = document.querySelectorAll(`.menu a[data-page="${page}"]`);
//       newActiveItems.forEach((item) => {
//         item.classList.add(activeClass);
//         activeItems.push(item);
//       });
//     });
//   }
// }

// function activemenustate(data) {
//   // Find the corresponding data-page attribute and URL path as costs
// const nextPath = data.next.url.path;
// const pageActiveClassPairs = pathToPageMap[nextPath];

// // Remove the active class from all menu items
// menuItems.forEach((item) => {
//   item.classList.remove("active");
//   item.classList.remove("activeblue");
// });


// // If there are corresponding data-page attributes, add the active class to the appropriate menu items
// if (pageActiveClassPairs) {
//   pageActiveClassPairs.forEach(({ page, activeClass }) => {
//     const activeItems = document.querySelectorAll(`.menu a[data-page="${page}"]`);
//     activeItems.forEach((item) => item.classList.add(activeClass));
//   });
// }};

//SPACEBAR TOGGLE
function spacebarforIcon(data) {
  var icon = data.next.container.querySelector('.descriptioniconCSS');
  var text = data.next.container.querySelector('.descriptiontext');
  var toggle = data.next.container.querySelector('#toggle');

if (icon, text !== null ) {
  [icon, text].forEach(function(element) {
    element.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        toggle.checked = !toggle.checked;
      }
    });
  });
}
}

function updatePersistentParagraph(data, text) {
  var variabletext = data.next.container.querySelector('.descriptiontext');
  if (variabletext && text) {
    text.innerText = variabletext.innerText.trim();
  }
};
  
function preloaderanimation(data){
  setTimeout(function() {
    gsap.set(preloader, {autoAlpha: 1});
  }, 20); // 500ms delay

  imagesLoaded(data.next.container, function (instance) {
    gsap.to(preloader,{autoAlpha: 0});
  });
};


function mobilebuttons(){
   
  const button = document.querySelector(".hamburgerbutton");

  if (button !== null) {
  button.addEventListener("click", () => {
      const currentState = button.getAttribute("data-state");

      if (!currentState || currentState === "closed") {
        button.setAttribute("data-state", "opened");
        button.setAttribute("aria-expanded", "true");
        desboxmobile.classList.remove("closed");
        document.querySelector('.descriptiontext.mobile').tabIndex = 0;
        document.querySelector('.descriptioniconCSS.mobile').classList.remove("opened");
      } 
      else {
        button.setAttribute("data-state", "closed");
        button.setAttribute("aria-expanded", "false");
      }
  });
  }

  if (desiconmobile !== null) {
    desiconmobile.addEventListener("click", function clickmobile() {
      document.querySelector('.descriptionbox.mobile').classList.toggle("closed");
      document.querySelector('.descriptiontext.mobile').tabIndex = 0;
      document.querySelector('.descriptioniconCSS.mobile').classList.toggle("opened");
      closemenu();      
    });

    document.querySelector('.descriptionbox.mobile').addEventListener("click", function close() {
      document.querySelector('.descriptionbox.mobile').classList.toggle("closed");
      document.querySelector('.descriptiontext.mobile').tabIndex = -1;
      document.querySelector('.descriptioniconCSS.mobile').classList.toggle("opened");
    });
  };


  if (menumobile !== null) {
    menumobile.addEventListener("click", function clickmobile() {
      document.querySelector('.menu').classList.toggle("open");
      console.log("clickdd");
    });
  };


};



function closedescriptions() {

  const button = document.querySelector(".hamburgerbutton");
  const gohome = document.querySelector(".gohome");

  if (desiconmobile !== null) {
    desiconmobile.classList.add("hidden");
    desiconmobile.classList.remove("opened");
  }

  if (desboxmobile !== null) {
    desboxmobile.classList.remove("closed");
  }

  if (gohome !== null) {
    gohome.addEventListener("click", () => {
      document.querySelector('.menu').classList.remove("open");
      button.setAttribute("data-state", "closed");
      button.setAttribute("aria-expanded", "false");
    });
    }
};

function closemenu() {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    hamburger.setAttribute("data-state", "closed");
    hamburger.setAttribute("aria-expanded", "false");
  };
}

function homebuttonclose() {
  const button = document.querySelector(".hamburgerbutton");
  const gohome = document.querySelector(".gohome");
  if (gohome !== null) {
    gohome.addEventListener("click", () => {
      document.querySelector('.menu').classList.remove("open");
      button.setAttribute("data-state", "closed");
      button.setAttribute("aria-expanded", "false");
    });
    }
}

window.addEventListener('popstate', function() {
    // Fancybox.close();

    console.log("popstated");
    // if (window.location.href.includes('#')) {
    //   console.log("withhahs");
    //   history.replaceState({}, "", barba.history.current.url);
    // }

   

  });

  
let lastSlideIndex = 0;
let historyLength;
let isFancyboxOpen = false;
let wasFancyboxOpen = false; 

function fancybox(data) {
if (data.next.container.querySelectorAll("[data-fancybox]") !== null) {
 
    let timer;
    window.addEventListener('popstate', function() {
      clearTimeout(timer); // cancel the history.back() if a popstate event occurs
    });


Fancybox.bind("[data-fancybox]", {
Hash: false,

on: {
  "done": (fancybox, slide) => {
    // Update the last slide index whenever a new slide is revealed
    lastSlideIndex = slide.index;
  },
  "init": (fancybox) => { 
      console.log("init");
      // barba.history.add('push.html', 'barba', 'push');
  
    barba.history.add(barba.history.current.url, data.next.container.querySelectorAll("[data-fancybox]"), 'replace');
    console.log("pushstate added");
    // console.log(barba.history.current.url);
  },
  "close": (fancybox) => {
      localStorage.setItem('lastSlideIndex', lastSlideIndex);
      console.log(lastSlideIndex);

      console.log("close");
      // history.forward();

      timer = setTimeout(function() {
        history.back(); // go back after a delay if no popstate event has occurred
      }, 25); 
  },
},

// on: {
//   "init": (fancybox) => { 
//       console.log("init");
      
//       // Add a new state when Fancybox opens
//       history.pushState({fancybox: true}, "", "#images");
//       console.log("pushstate added");
//   },
//   "close": (fancybox) => {
//       console.log("close");
//       // history.back();
      
//       // Remove the state when Fancybox closes
//       if (history.state && history.state.fancybox) {
//         history.back();
//         console.log("historyback");
//       }
//   }
// },

// on: {
//   "init": (fancybox) => { 
//       console.log("init");
      
//       barba.history.add('replace.html', 'barba', 'replace');
//   },
//   "close": (fancybox) => {
//       console.log("close");
  
//       console.log(barba.history.previous);
//       barba.history.add(barba.history.previous.url, 'barba', 'replace');
//   }
// },


// on: {
//   "init": (fancybox) => { 
//       console.log("init");
      
//       // Add a new state when Fancybox opens
//       history.pushState({fancybox: true}, null, "####");
//   },
//   "close": (fancybox) => {
//       console.log("close");
//       // Remove the state when Fancybox closes
//       if (history.state && history.state.fancybox) {
//         console.log(window.location.href);
//         history.back();
//       }
//   }
// },

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
  
}); 
}
}

barba.init({
preventRunning: false,
debug: true,
timeout: 5000,
sync: false,
// prevent: ({ el }) => el.classList && el.classList.contains('fancybox'),
transitions: [

{
  name: 'self',
    enter(data) {
     
      gsap.set(data.next.container, 
        {autoAlpha: 1});
      if (document.documentElement.classList.contains("with-fancybox")) {
          console.log("closefrombarba");
          Fancybox.close();
      }
    }
},
//FADE ONCE  
{
  name: 'fade-once',
    async once(data) {
      activemenustate(data);
      updateDarkMode(data);
      spacebarforIcon(data);
      mobilebuttons();
      homebuttonclose();
      fancybox(data);

 

      gsap.set(preloader,{autoAlpha: 1});

      await imagesLoaded( allcontent, 
          function (instance) {
          gsap.to(allcontent, 
            {autoAlpha: 1, 
              duration: 0.5,
            });
          gsap.to(preloader,{autoAlpha: 0});
      }); 

    },
},

//HEADER SHRINK      
{  
  name: "headershrink",
    from: { namespace: ["page", "page-2rows", "masonry", "tmp"
  ] },
    to: { namespace: ["home", "alternate"] },

     // //PRELOAD
    before(data) {      
      preloaderanimation(data); 
      // window.scrollTo(0, 0);
      // Fancybox.close();

      // if (document.documentElement.classList.contains("with-fancybox")) {
      //   console.log("withbox");
      //     // Fancybox.close();
      //   // barba.destroy();
      // };
    },

    
    //LEAVE
    async leave(data) {
      header.classList.remove("shrink-less");
      header.classList.remove("shrink");
      closedescriptions();
      await gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 0.25,
      });
     
      data.current.container.remove();
     
    },
    
    //ENTER
    async enter(data) {
      gsap.set(data.next.container, 
        {autoAlpha: 0});
      // lightbox.close();
      await imagesLoaded( data.next.container, 
        function (instance) {
        gsap.to(data.next.container, 
          {autoAlpha: 1, 
          });
        }); 
    }
  },

//HEADER EXPAND  
  {  
    name: "headerexpand",
      to: { namespace: ["page"] },

      before(data) {      
        preloaderanimation(data); 
      },
      
      //LEAVE
      async leave(data) {

        if (header.classList.contains("shrink-less")) {
          header.classList.remove("shrink-less");
          header.classList.add("shrink");
      } else {
          header.classList.add("shrink");
      }
  
        await gsap.to(data.current.container, {
          autoAlpha: 0,
          duration: 0.25,
        });
  
        data.current.container.remove()
      },

      //ENTER
      async enter(data) {

        gsap.set(data.next.container, 
          {autoAlpha: 0});
  
        await imagesLoaded( data.next.container, 
          function (instance) {
          gsap.to(data.next.container, 
            {autoAlpha: 1, 
            });
          }); 
      },

      
  },

//PAGE 2ROWS
{  
  name: "headerexpandless",
    to: { namespace: ["page-2rows"] },
    
    before(data) {      
      preloaderanimation(data); 
    },


    //LEAVE
    async leave(data) {
      if (header.classList.contains("shrink")) {
        header.classList.remove("shrink");
        header.classList.add("shrink-less");
    } else {
        header.classList.add("shrink-less");
    }

      await gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 0.25,
      });

      data.current.container.remove();
    },

    //ENTER
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
    
},

{  
  name: "onlyfadesclose",
    to: { namespace: ["home"] },
    from: { namespace: ["alternate", "page", "page-2rows", "masonry", "tmp"] },
  // //PRELOAD
    before(data) {    
      preloaderanimation(data);
      
    },

  //LEAVE
     async leave(data) {
      closemenu();
      closedescriptions();
      if (header.classList.contains("shrink") || header.classList.contains("shrink-less")) {
        header.classList.remove("shrink");
        header.classList.remove("shrink-less");
      }
      
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


},  

//BASE FADE ONLY
{  
  name: "onlyfades",
    to: { namespace: ["home", "alternate"] },

  // //PRELOAD
    before(data) {    
      preloaderanimation(data);
      
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


},  

{
name: 'masonry',
  to: { namespace: ['masonry', "tmp"] },

  //PRELOAD
    before(data) {
      setTimeout(function(){
        header.classList.add("shrink");
      });
      closemenu();
      preloaderanimation(data);
      gsap.set(mobiletext, {autoAlpha:0});
      // Fancybox.close();
    },

  // ENTER
    async enter(data) {
      setTimeout(function(){header.classList.add("shrink");});
      fancybox(data);

      if (desiconmobile !== null) {
        desiconmobile.classList.remove("hidden");
      }

      gsap.set(data.next.container, 
          {autoAlpha: 0});

      await imagesLoaded( data.next.container, 
        function (instance) {
        gsap.to(data.next.container, 
          {autoAlpha: 1, 
          });
        gsap.to(mobiletext, {autoAlpha: 1, duration: 0.25});
        });
    },

    afterEnter(data) {
     
    },
    
    //LEAVE
    async leave(data) {
      await gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 0.25,
      });
      
      data.current.container.remove();
      
    },

    
    // afterEnter(data) {
      
    // }

  },
],

});




const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addEventListener('change', function(e) {
  console.log("matched");
});

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}


barba.hooks.leave(() => {
  // window.scrollTo(0, 0);
  // lightboxOpen();

});

barba.hooks.enter(() => {

  // window.scrollTo(0, 0);
  test();
  // lightbox.reload();
  // lightboxOpen();  
});

barba.hooks.after((data) => {
  // var text = document.querySelector('.descriptiontext.mobile');
  if (text) {
    updatePersistentParagraph(data, text);
  }
  
  window.addEventListener("resize", function () {
    // console.log("REZISDD");
    if (text) {
      updatePersistentParagraph(data, text);
    }
  });



});

barba.hooks.before((data) => {
  activemenustate(data);
  updateDarkMode(data);
  spacebarforIcon(data);

  // window.addEventListener('popstate', function(event) {
  //   if (event.state && event.state.fancybox) {
  //       Fancybox.close();
  //       barba.history.remove();
        
  //   }
  // });

  // fancybox(data); 
  // window.addEventListener('popstate', function() {
  //   if (typeof Fancybox !== 'undefined' && Fancybox.getInstance()) {
  //       Fancybox.close();
  //       console.log("popstated");
  //   }
  // });

    // // Get the current Fancybox instance
    // var instance = Fancybox.getInstance();
  
    // // If Fancybox is open, close it and prevent the Barba.js transition
    // if (instance) {
    //   console.log("FB exists");
    //   Fancybox.close();
  
    // }
 
});


barba.hooks.once((data) => {
  // var text = document.querySelector('.descriptiontext.mobile');
  if (text) {
    updatePersistentParagraph(data, text);
  }


  // window.addEventListener('hashchange', function() {
  //   Fancybox.close();
  //   // console.log(data.next.url.path);
  //   // barba.go(data.next.url.path);
  // });

});

barba.hooks.once(() => {
  test();
 
});








