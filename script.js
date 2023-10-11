'use strict'


// Responsive navbar
const navbar = document.querySelector('.nav__links');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.nav-close');



let isOpen = false;
const toggleMenu = function() {

    if (!isOpen){
        navbar.style.right = '0';
        // document.body.style.overflow = 'hidden';
    } else  {
        navbar.style.right = '1000px'
        // document.body.style.overflow = 'auto';
    };

    isOpen = !isOpen;

    menuBtn.classList.toggle('fa-xmark');
}

menuBtn.addEventListener('click', toggleMenu);



navbar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('nav__link')) return;
    toggleMenu();
})





// Sticky nav and scollUp button
const homeSection = document.querySelector('.home--section');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const scrollUpBtn = document.querySelector('.scrollUp');

const stickyNavAndScrollUp = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting){
        nav.classList.add('sticky');
        scrollUpBtn.classList.add('showScroll');
    } 
    else {
        nav.classList.remove('sticky');
        scrollUpBtn.classList.remove('showScroll');
    }
}

const headerObserver = new IntersectionObserver(stickyNavAndScrollUp, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})


headerObserver.observe(homeSection);






// Add or remove active class on nav item
function scrollActive(){
    const scrollY = window.pageYOffset   // Broj piksela od vrha stranice do trenutnog polozaja skrola

    allSections.forEach(section =>{
        const sectionHeight = section.offsetHeight;  // Visina sekcije
        const sectionTop = section.offsetTop - 40;
 
        const sectionId = section.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(`.nav__link[href="#${sectionId}"]`).classList.add('active')
        }else{
            document.querySelector(`.nav__link[href="#${sectionId}"]`).classList.remove('active')
        }
    })
}

window.addEventListener('scroll', scrollActive);







// Skills rotate animation
const skillsContainer = document.querySelector('.skills');
const skillsIcons = document.querySelectorAll('.icon');


/* ?????????
let rotationDeg = 0;
let width = window.getComputedStyle(skillsContainer).width;
let height = window.getComputedStyle(skillsContainer).height;


const rotateSkills = function() {


    skillsContainer.style.height = `${width}`
    skillsContainer.style.width = `${height}`

    const temp = height;
    height = width;
    width = temp;

    rotationDeg -= 90;
    skillsContainer.style.transform = `rotate(${rotationDeg}deg)`;
}

setInterval(rotateSkills, 6000);
*/


let rotationDeg = 0;

const rotateSkills = function() {
    rotationDeg -= 90;
    skillsContainer.style.transform = `rotate(${rotationDeg}deg)`;
}

setInterval(rotateSkills, 4000);


let iconsDeg = 0;
const rotateIcons = function() {
    iconsDeg += 90;
    skillsIcons.forEach(icon => {
        icon.style.transform = `rotate(${iconsDeg}deg)`;
    })
};

setInterval(rotateIcons, 4000);









// Modal window
const servicesContainer = document.querySelector('.services-grid');
const overlay = document.querySelector('.overlay');
const modals = document.querySelectorAll('.modal-window');


modals.forEach(modal => {
    modal.classList.add('hidden')
})


servicesContainer.addEventListener('click', (e) => {
    const servicesBtn = e.target.closest('.services-btn');
   
    if(!servicesBtn) return;

    const btnAttribute = servicesBtn.getAttribute('data-category');
    
    modals.forEach(modal => {
        if (btnAttribute === modal.getAttribute('data-category')) {
            modal.classList.remove('hidden')
            overlay.classList.remove('hidden');

            modal.addEventListener('click', (e) => {
                const closeModal = e.target.closest('.close-btn');
                if(!closeModal) return;

                modal.classList.add('hidden')
                overlay.classList.add('hidden');
            });

            overlay.addEventListener('click', () => {
                modal.classList.add('hidden');
                overlay.classList.add('hidden');
            })
        }
    });


});





// Slider
const slider = document.querySelector('.testimonial-slider');
const slideItems = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dotsContainer = document.querySelector('.dots');


let curSlide = 0;
const maxLength = slideItems.length - 1;


const createDots = function() {
    slideItems.forEach((_, i) => {
        dotsContainer.innerHTML += `<button class="single-dot" data-slide="${i}" data-num="aa">`;
    });
};



const activeDot = function(slide) {
    document.querySelectorAll('.single-dot').forEach(dot => {
        dot.classList.remove('active-dot');
    })

    document.querySelector(`.single-dot[data-slide="${slide}"]`).classList.add('active-dot');
}



const goToSlide = function(slide) {
    slideItems.forEach((item, i) => {
        item.style.transform = `translateX(${(i - slide) * 105}%)`;
    })
};





const nextSlide = function(slide) {
    curSlide === maxLength ? curSlide = 0 : curSlide++;

    goToSlide(curSlide);
    activeDot(curSlide);
};


const prevSlide = function(slide) {
    
    curSlide === 0 ? curSlide = maxLength : curSlide--;

    goToSlide(curSlide);
    activeDot(curSlide);
};


const init = function() {
    goToSlide(0);
    createDots();
    activeDot(0);
};

init();



rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);

dotsContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('single-dot')){

    const {slide} = e.target.dataset;
    
    goToSlide(slide);
    activeDot(slide);
    }
});


document.addEventListener('keydown', (e) => {
    if (e.keyCode === 39) {
        nextSlide();
    }

    if (e.keyCode === 37) {
        prevSlide();
    }

})



// Slider for mobile
let touchStartX;
let touchEndX;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}



function handleTouchEnd() {
    if (touchStartX - touchEndX > 50) {
        changeSlide('next');
    } 
    if (touchStartX - touchEndX < -50) {
        changeSlide('prev');
    }
}



function changeSlide(direction) {
    if (direction === 'next') {
        nextSlide();
    }
    else if (direction === 'prev') {
        prevSlide();
    }
}



slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);







// Blinking line animation
const blinkLine = document.querySelector('.blinkingLine');
const blinkAnimation = function() {
    if (blinkLine.style.opacity === '1') {
        blinkLine.style.opacity = '0'
    }else {
        blinkLine.style.opacity = '1';
    }
}




// Animated text
const textEl1 = document.querySelector('.span-text1');
const splitedText1 = textEl1.textContent.split('');
textEl1.innerHTML = '';

const textEl2 = document.querySelector('.span-text2');
const splitedText2 = textEl2.textContent.split('');
textEl2.innerHTML = '';



const spanLetters = function(textEl, splitedText) {
    splitedText.forEach(el => {
        if (el === ' ') el = '&nbsp';

        textEl.innerHTML += `<span class="single-span">${el}</span>`;
    })
}


spanLetters(textEl1, splitedText1);
spanLetters(textEl2, splitedText2);


const allSpans = document.querySelectorAll('.single-span');

let k = 0;

const interval = setInterval(() => {

    allSpans[k].classList.add('spanMove');

    k++;

    if (k === allSpans.length) {
        clearInterval(interval);
        blinkAnimation()
        setInterval(blinkAnimation, 450);
    }

}, 70)





// Reveal sections
const allSections = document.querySelectorAll('.all--section');


const revealSections = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target); 
}


const sectionObserver = new IntersectionObserver(revealSections, {
    root: null,
    threshold: 0.2,
});


allSections.forEach(section => {
    sectionObserver.observe(section);
})





// Animations
const home_h2_text = document.querySelector('.introduc h2');
const home_h1_text = document.querySelector('.introduc h1');
const homeBtn = document.querySelector('.home-btn');
const socialMedia = document.querySelector('.social-media');
const skills = document.querySelector('.skills');


document.addEventListener('DOMContentLoaded', () => {
    nav.classList.add('nav-animation');
    home_h2_text.classList.add('h2-animation');
    home_h1_text.classList.add('h1-animation');
    homeBtn.classList.add('home-btn-animation');
    socialMedia.classList.add('social-media-animation');
    skills.classList.add('skills-animation');
})





// Scroll Up button
const scrollUp = function () {

}




// Dark mode
const moonIcon = document.querySelector('.bx-moon');

moonIcon.addEventListener('click', () => {
    moonIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
})






// Download CV
const downloadCV = document.querySelector('.about-btn');
const cvFile = 'Andrej Jović-CV.pdf'; 


downloadCV.addEventListener('click', () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = cvFile;
    downloadLink.download = cvFile; 

    downloadLink.click();
});