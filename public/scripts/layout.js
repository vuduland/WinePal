// if we have time we might switch the POST method used over to an ajax type dynamically generated javascript
const menuButton = document.querySelector('.menu-button');
const sideMenu = document.querySelector('.side-menu');
menuButton.addEventListener('click', () => {
  sideMenu.classList.remove('closed');
});

const closeButton = document.querySelector('.close-menu');
closeButton.addEventListener('click', () => {
  sideMenu.classList.add('closed');
});
