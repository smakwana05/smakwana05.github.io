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