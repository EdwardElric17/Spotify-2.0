const mainBlock = document.querySelector('.main');
const arrowNext = document.querySelector('.header__arrows-next');
const arrowBack = document.querySelector('.header__arrows-back');

arrowNext.addEventListener('click', nextColor);
arrowBack.addEventListener('click', backColor);

const colors = ['#3333A3', '#abc100', '#A34284', '#6EA6EA', '#B3B3B3'];
let currentIndex = 0;

function nextColor() {
    currentIndex = (currentIndex + 1) % colors.length;
    mainBlock.style.background = `linear-gradient(${colors[currentIndex]}, #121212, #121212)`;
}

function backColor() {
    currentIndex = (currentIndex - 1 + colors.length) % colors.length;
    mainBlock.style.background = `linear-gradient(${colors[currentIndex]}, #121212, #121212)`;
}