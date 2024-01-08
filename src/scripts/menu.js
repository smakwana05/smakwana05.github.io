import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
const header = document.querySelector('header');
var navlinks = document.querySelectorAll('a');


document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
});

addEventListener("popstate", (event) => {
    console.log("popostateevent");
    console.log(event.state?.source);
   });
   

    const swup = new Swup({
      animateHistoryBrowsing: true,
      containers: ["#swup"],
      plugins: [
        new SwupHeadPlugin(),
        new SwupScriptsPlugin(),
        new SwupPreloadPlugin(),
      ]
    });

swup.hooks.on('visit:start', (visit) => {
    console.log('New page loaded:', visit.to.url);
    // navlinks.blur();
    

    if (visit.to.url.includes("about")) {
        console.log("aboutpage");
        header.classList.add('bigheader');
    }
    else {header.classList.remove('bigheader');}
},
{priority:-100}
);

