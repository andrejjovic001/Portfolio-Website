'use strict'


const navBar = document.querySelector('.nav__links');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.nav-close');

const numOfCreator = document.querySelectorAll('.num-of-creator');

const cardItems = document.querySelectorAll('.cards-item');

const hoursEl = document.querySelector('.hours');
const minEl = document.querySelector('.min');
const secEl = document.querySelector('.sec');

const allSections = document.querySelectorAll('.all--section');

const col1Anim = document.querySelector('.col--1');
const col2Anim = document.querySelector('.col--2');



// Responsive navigation
let isOpen = false;
const toggleMenu = function() {
    if (!isOpen) navBar.style.left = '0';
    else navBar.style.left = '-1500px'
    isOpen = !isOpen;
}


menuBtn.addEventListener('click', toggleMenu);



// Creator numbering
numOfCreator.forEach((num, i) => {
    num.textContent = `${i+1}`
    i++;
});




// Slider
const maxSlide = cardItems.length - 1;
let curItem = 0;

const slider = function(slide) {
    cardItems.forEach((item, i) => {
        item.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
};


slider(curItem);


setInterval(() => {
    if (curItem === maxSlide){
        curItem = 0;
    }else {
        curItem++;
    }
    
    slider(curItem);
}, 5000)




// Timer

let time = 7200;

const timer = function() {

    const hours =  String(Math.floor(time / 3600)).padStart(2,0);

    const min = String(Math.floor((time - (hours * 3600)) / 60)).padStart(2,0);

    const sec = String(time % 60).padStart(2,0);

    hoursEl.textContent = `${hours}`;
    minEl.textContent = `${min}`;
    secEl.textContent = `${sec}`;

    if (time === 0){
        clearInterval(interval);
    }  
    

    time--;

}


const interval = setInterval(timer, 1000);





// Reveal sections
const sectionReveal = function(entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return
    
    entry.target.classList.remove('hidden--section');

    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(sectionReveal, {
    root: null,
    threshold: 0.20,
})


allSections.forEach(section => {
    sectionObserver.observe(section);
})



// Animation
window.addEventListener('load', () => {
    col1Anim.classList.add('col--1--animation');
    col2Anim.classList.add('col--2--animation');
})
