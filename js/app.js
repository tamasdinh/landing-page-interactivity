/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/* Instantiating Global Variables */
const sectionList = {};

const landingContainers = document.getElementsByClassName('landing__container');

let activeSection = document.getElementsByClassName('your-active-class')[0];


/* Building Helper Functions */
const getTime = () => {
  // Just a simple fuction to get the current time in a useful format
  const dateObject = new Date();
  let hours = dateObject.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  let mins = dateObject.getMinutes();
    if (mins < 10) {
      mins = '0' + mins;
    }
  let secs = dateObject.getSeconds();
    if (secs < 10) {
      secs = '0' + secs;
    }
  return (hours + ':' + mins + ':' + secs)
}

function createNavBar () {
  // Creating navbar items based on sections present in HTML and
    // inserting local links into the list elements
  const sections = document.getElementsByTagName('section')
  for (section of sections) {
    sectionList[section.getAttribute('data-nav')] = section.getAttribute('id')
  }
  
  const scaffold = document.createDocumentFragment();
  
  for (item in sectionList) {
    // For all sections gathered, list items with inner links are generated and
      // added to the DocumentFragment
    const newElement = document.createElement('li');
    newElement.innerText = item;
    const a = document.createElement('a');
    a.setAttribute('href', '#' + sectionList[item]);
    a.textContent = item;
    newElement.appendChild(a);
    scaffold.appendChild(newElement);
  }
  
  // Identifying the navbar parent element and appending the created
    // list elements as children
  const navbarContainer = document.getElementById('navbar__list');
  navbarContainer.appendChild(scaffold);
}

const isActive = (container) => {
  // Checking whether a given container is in the viewport or not
  const boundingBox = container.children[0].getBoundingClientRect();  
  if (
    boundingBox.top >= 0 &&
    boundingBox.left >= 0 &&
    boundingBox.right <= window.innerWidth &&
    boundingBox.bottom <= window.innerHeight
    ) {
    return true;
  }
  return false;
} 

const handleActiveClassChange = function () {
  // Iterating through the landing__container elements, checking whether they are active and
    // whether they are the active element set in the HTML

    for (container of landingContainers) {
    const containerParent = container.parentElement;

    // If element is in the viewport AND it is the active element in the HTML, we skip
      // checking the other landing__container elements
    if (isActive(container) && containerParent === activeSection) {
      break
    }
    else if (isActive(container)) {
      // If the element is active but not the active class in the HTML, it is
        // designated as the active section.
      activeSection.classList.remove('your-active-class');
      containerParent.classList.add('your-active-class');
      activeSection = containerParent;
    }
  }
}


/* Execution */
console.log('App is connected at', getTime());
createNavBar();
window.addEventListener('scroll', () => handleActiveClassChange());


