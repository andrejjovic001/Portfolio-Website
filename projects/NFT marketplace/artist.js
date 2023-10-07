'use strict'


const navBar = document.querySelector('.nav__links');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.nav-close');

const buttons = document.querySelectorAll('.sort-by');
const gridContainer = document.querySelector('.grid-cards');
const buttonsContainer = document.querySelector('.buttons-container');
// const gridItems = Array.from(document.querySelectorAll('.grid-item'));
const gridItems = document.querySelectorAll('.grid-item');



// Responsive navigation
let isOpen = false;
const toggleMenu = function() {
    if (!isOpen) navBar.style.left = '0';
    else navBar.style.left = '-1500px'
    isOpen = !isOpen;
}


menuBtn.addEventListener('click', toggleMenu);




// Grid items
buttonsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.sort-by');
    if (!clicked) return


    buttons.forEach(btn => btn.classList.remove('active'));
    clicked.classList.add('active');

    const category = clicked.getAttribute('data-category');

    gridItems.forEach(item => {
        item.style.opacity = 0;

        setTimeout(() => {
            item.style.display = 'none';
        }, 515)
    });

    gridItems.forEach(item => {
        if (item.getAttribute('data-category') === category) {
            setTimeout(() => {
                item.style.display = 'block'; 
            }, 515);

            setTimeout(() => {
                item.style.opacity = 1;
            }, 720)

        }

    });

});



// buttons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         buttons.forEach(btn => btn.classList.remove('active'));

//         const clicked = e.target.closest('.sort-by')
//         clicked.classList.add('active');

//         gridContainer.innerHTML = '';

//         const shuffledItems = changeOrder(gridItems);

//         shuffledItems.forEach(item => {
//             gridContainer.appendChild(item)
//         })


//     })
// });


// const changeOrder = function(array) {
//     const copyArray = array.slice();
//     for (let i = copyArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
//     }
//     return copyArray;
// }



