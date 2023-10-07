const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const ul = document.querySelector('ul');
const clearAll = document.querySelector('.clear-all')
const form = document.querySelector('form');



form.addEventListener('submit', e => {
    e.preventDefault()

    if(!input.value) {
        input.style.placeholder = 'asdssdsd'
        return
    }

    const li = document.createElement('li');

    const inputText = document.createElement('input');
    inputText.classList.add('input-text')
    inputText.value = input.value;
    inputText.setAttribute('readonly', 'readonly');
    li.appendChild(inputText)
    
    ul.appendChild(li);

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn')
    li.appendChild(deleteBtn);


    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn')
    li.appendChild(editBtn);



    deleteBtn.addEventListener('click', () => {
        li.remove()
    });


    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'Edit'){
            inputText.removeAttribute('readonly');
            inputText.focus();
            editBtn.textContent = 'Save';
            editBtn.style.backgroundColor = 'green';
        }else{
            inputText.setAttribute('readonly', 'readonly');
            editBtn.textContent = 'Edit';
            editBtn.style.backgroundColor = 'rgb(43, 177, 122)';
        }
    })


    document.querySelector('input').value = '';
    input.blur();


    li.addEventListener('dblclick', ()=>{

        inputText.style.textDecoration === 'none' ? inputText.style.textDecoration = 'line-through' : inputText.style.textDecoration = 'none';

    })


    if (ul.firstChild) clearAll.style.opacity = 1;
})



clearAll.addEventListener('click', () => {
    while (ul.firstChild) {
         ul.removeChild(ul.firstChild);
         if (!ul.firstChild) clearAll.style.opacity = 0;
  }
})









// const form = document.querySelector('form');
// const input = document.querySelector('input');
// const ul = document.querySelector('ul');
// const clearAll = document.querySelector('.clear-all');

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   if (!input.value) return;

//   const li = document.createElement('li');
//   li.textContent = input.value;
//   ul.appendChild(li);

//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Delete';
//   deleteBtn.classList.add('delete-btn');
//   li.appendChild(deleteBtn);

//   deleteBtn.addEventListener('click', () => {
//     li.remove();
//   });

//   input.value = '';
//   input.blur();
// });

// clearAll.addEventListener('click', () => {
//   while (ul.firstChild) {
//     ul.removeChild(ul.firstChild);
//   }
// });