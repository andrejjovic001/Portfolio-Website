'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');



///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///////////////////////////////////////
// Implementing Smooth Scrolling
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)',window.pageXOffset, window.pageYOffset);
  document.documentElement.clientHeight, document.documentElement.clientWidth
  console.log('height/width viewport', );

  // Scrolling
  // window.scrollTo( // Current position + current scroll
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  // ); // Na ovaj nacin skrolujemo na sekciju koju smo odabrali kada kliknemo dugme

  // window.scrollTo({  // Stari nacin da se manuelno napravi skrolovanje
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  

  section1.scrollIntoView({behavior: 'smooth'});  // Najbolji i najjednostavniji nacin
})



///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener( 'click', function(e) {
//     e.preventDefault();
    
//     const id = this.getAttribute('href');
    
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// });


// 1. Add event listenr to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})

// U gorenjem kodu prolazimo kroz sve elemente klase .nav__link i za svaki element posebno pravimo funkciju i to je ok ako radimo sa malo elemenata ali ako radimo sa vise
// to nije dobra praksa, umjesto toga u donjem kodu pravimo jednu funkciju na parent elementu .nav__links i pomocu e.target utvrdjujemo na koji element smo kliknuli
// i tu se funkcija izvrsava zbog bubblinga



// Tabbed component
tabsContainer.addEventListener('click', (e) => {
 

  const clicked = e.target.closest('.operations__tab'); // Zato sto kada kliknemo na npr. 02 ne dobijemo button nego span a sa metodom closest je to poravljeno

  // Guard clause - ako je uslov false onda prekini izvrsavanje i sve poslije if uslova se nece izvrsiti
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); // Na ovaj nacin se dobijaju data elementi 

});



// Menu fade animation
const handleHover = function(e){
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibilings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}


// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));  // 0.5 je zapravo rijec this i this koristimo za opacity
nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', (e) => {  // Kada stavimo strelici na neki link, svi drugi linkovi trebaju da smanje vidljivost
//   handleHover(e, 0.5);  // Radimo ovako zato da bi mogli staviti argumente u funkciju, jer bi e bilo nepostojece u suprotnom

// nav.addEventListener('mouseout', (e) => {  // Kada sklonimo strelicu sa linka da se vrati u pocetno stanje
//   handleHover(e, 1);
// });



// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   console.log(initialCoords.top);  // Kolika je vidljivost stranice od vrha vidljivog mjesta do dna vidljivog mjesta

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// });



// Sticky navigation: Intersection Observe API

/*
const obsCallback = function(entries, observer) { // Ova callback funkcija ce biti pozvana svaki put kada target element (section1)  presjece root element na treshold-u koji smo definisali
  entries.forEach(entry => {
    console.log(entry);
  })
};

const obsOptions = {
  root: null,
  treshold: [0, 0.2],
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/ 

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function(entries) {
  const [entry] = entries  // Ovako se dobija prvi element od entries, lekcija destructing arrays isto kao const entry = entries[0];
  //console.log(entry);

  // Ako je isIntersecting = false tj. ako ne sjece header, ako totalno izadjemo iz headera onda dodaj stickyNav, u suprotonom izbrisi 
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, { // options mozemo uraditi direktno ovdje
  root: null,
  threshold: 0, // Kada je 0% headera vidljivo da se dobije sticky navigacija, tj, kada izadjemo poptouno iz header sekcije
  rootMargin: `-${navHeight}px`  // Da se navigacija pjavi na 10px izlaska iz headera
}); 

headerObserver.observe(header);




// Reveal sections - pojvaljivanje sekcije (animacije)
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  // Ako ne sjece sekciju samo prekini, dok ako sjece sekciju na 0.15 kao sto smo odredili onda izbrisi klasu section--hidden i ucitaj sekciju
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); // Kada dodjemo do te odredjene sekcije da se izbrise klasa, da se ne bi odjednom ucitale sve sekcije

  observer.unobserve(entry.target); // Kada se sve sekcije pojave da se ne izvrsava vise

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,  // Da se sekcija ne pojavi odma nakon sto dodjemo do nje vec kad malo udjemo
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});




// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]'); // Da izaberemo samo slike koje imaju atribut data-src

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src; // Da se zamjeni src lose slike sa data-src koja sadrzi dobru sliku

  // Ovo nije dobro raditi na ovaj nacin, zato sto se zamjene src-a desava iza scene i ako je inernet los to moze potrajati, a ovo ce odma obrisati blury klasu i vidjecemo onu losiju sliku dok se proces ne zavrsi
  // entry.target.classList.remove('lazy-img'); 

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');  // Na ovaj nacin ce se klasa blury izbrisati onda kada se u pozadini zavrsi zamjena src-a losije za bolju sliku
  });

  observer.unobserve(entry.target);

}


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});


imgTargets.forEach(img => {
  imgObserver.observe(img);
});

 

// ** SLIDER **
const slider = function() {

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const slider = document.querySelector('.slider')


  // -- FUNCTIONS --
  // Fukncija koja kreira tacke za listanje slika
  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `
        <button class="dots__dot" data-slide="${i}"></button>
      `);
    })
  };



  // Funkcija koja obiljezava tacku u zavisnosti od slajda
  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }



  // Funkcija koja postavlja slajdove na njihova mjesta
  const goToSlide = function(slide){
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`
    });
  }



  // Next slide - pomjeramo svaki slajd za -100%, pa je sada pravi slajd -100, drugi 0, treci 100...
  const nextSlide = function(){
    if (curSlide === maxSlide - 1){
      curSlide = 0;
    }else{
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }



  // Previous slide - ako je curSlide = 0 onda vrati na zadnji slajd
  const prevSlide = function() {
    if(curSlide === 0){
      curSlide = maxSlide - 1;
    }else{
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function(){
    goToSlide(0); // Da odmah raspodijeli slike, prva slika na 0% druga na 100%, pa 200% itd.
    createDots();
    activateDot(0); // Da odma bude obojena prva tacka a ne tek nakon sto prelistamo
  };

  init();



  // Slider Events Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 37){
      prevSlide();
    }else{
      e.keyCode === 39 && nextSlide();
    }
  });


  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset; // Object destructing
      goToSlide(slide);
      activateDot(slide);
    };
  });
};

slider();




/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// LECTURES

/*
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));


// ---- Creating and inserting elements --- 
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved funcionality and analystic.';

message.innerHTML = 'We use cookies for improved funcionality and analystic. <button class="btn btn--close-cookie">Got it!</button>';

// prepend dodaje uvijek element kao first child tj na pocetku 
header.prepend(message);  // Sluzi za stavljanje napraljenog elementa u html

header.append(message)  // append dodaje element kao last child
//header.append(message.cloneNode(true)); // U ovom slucaju kopira element i stavlja ga na kraju, sto znaci da ce element biti i na kraju i na pocetku

// header.before(message); // Stavlja element prije parent elementa
// header.after(message);  // Stavlja element poslije parent elementa


// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();  // Veoma se cesto koristi
  //message.parentElement.removeChild(message); // Moze i ovako ali ovo je stari nacin
});




// ---- Styles ----
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 9
30 + 'px';

// Na ovaj nacin mijenjamo vrijednosti varijabli iz css-a
document.documentElement.style.setProperty('--color-primary', 'orangered');


// ---- Attributes ----
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.designer);  // undefined, zato sto designer nije standarni property u html-u kao sto su src, alt, class, id..

console.log(logo.getAttribute('designer'));  // Na ovaj nacin mozemo dobiti atribut koji nije po defaultu u html-u

logo.alt = 'Beautiful logo';  // Ovako mozemo mijenjati sadrzaj propertija

logo.setAttribute('company', 'Bankist'); // Dodavanje novih atributa

console.log(logo.getAttribute('src'));  // Za dobijanje atributa


const link = document.querySelector('.nav__link--btn');

console.log(link.href);  // Ovo je apsolutni URL, sto znaci da dobijamo orginalnu putanju - http://127.0.0.1:5500/#
console.log(link.getAttribute('href')); // A ovo je relativni URL - dobijamo #


// Data attributes - specijalna vrsta elementata koja krece sa rijecju data npr. data-version = '3.0';
console.log(logo.dataset.versionNumber);


// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use !!!
logo.className = 'jonas'



// ---- Types of Events and Event Handlers ----
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', (e) => {  // Radi kao css hover, kada predjemo misem preko h1 izvrsi se event
//   alert('addEventListener');
// });

// h1.onmouseenter = function(e) { // Za svaki properti u addEventListeneru postoji zasebni properti
//   alert('onmoursenter');
// };


const alertH1 = function(e) {
  alert('addEventListener');

  //h1.removeEventListener('mouseenter', alertH1);  // Na ovaj nacin mozemo obrisati event nakon sto ga izvrsimo prvi put
}

h1.addEventListener('mouseenter', alertH1);

// Postavljamo da se sam event obrise nakon 5 sekundi
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);




// Event Propagation in Practice
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// const navColor = document.querySelector('.nav__link');

// Kod arrow funkcije ne moze se koristiti rijec this, jer kod nje se ne odnosi na taj element vec na globalni element window
document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  console.log(e.currentTarget === this);  // e.curentTarget i this su isto

  // Stop propagation
  //  e.stopPropagation();  // Ovo znaci da se event nece izvrsiti na ostalim elementima
});


document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target); // e.targer je taj element koji je kliknut
});


document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('NAv', e.target);
});




// ---- DOM Traversing ----
const h1 = document.querySelector('h1');

// Going downwords: selecting child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);   // Na ovaj nacind dobijamo sve izmedju h1 elementa komentare, tekstove...
console.log(h1.children);    // Ova nam daje samo html dokumente
console.log(h1.firstElementChild);  // Prvi child element
console.log(h1.lastElementChild);   // Zadnji child element

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';


// Going upwards: selecting parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'yellow';  // Radi kao querySelector ali samo parent elemente



// Going sideways: sibilings
console.log(h1.previousElementSibling); // null zato sto nema prije njega ni jedan element prije h1
console.log(h1.nextElementSibling);  // h4 element zato sto je prvi

console.log(h1.previousSibling); // #text - ovo nije tako vazno
console.log(h1.nextSibling);  // #text

console.log(h1.parentElement.children); // Dobijamo sve sibilings elemente
[...h1.parentElement.children].forEach(el => {
  if(el !== h1) el.style.transform = 'scale(0.5)';
})
*/



