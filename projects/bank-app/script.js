'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// Dispaly movements
const displayMovements = function(movements, sort = false) {

  containerMovements.innerHTML = '';


  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i){

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}e</div>
    </div>
    ` ;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // afterbegin oznacava da dodajemo html odma na pocetku elementa, a moze se dodati i na kraju i izvan elementa
    // zadnji element je na vrhu zato sto je afterend ako hocemo suprotno onda ide beforeend
    
  })
}




// Calc balance
const calcPrintBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`
};




// Calc Summary
const calcDisplaySummary = function(acc){
  const incomes = acc.movements
                  .filter(mov => mov > 0)
                  .reduce((acc, mov) => acc + mov, 0);
  
  labelSumIn.textContent = `${incomes}e` 
  
  
  const out = movements
              .filter(mov => mov < 0)
              .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}e`;
  
  
  const interes = movements
                  .filter(mov => mov > 0)
                  .map(deposit => deposit * acc.interestRate / 100)
                  .filter((int, i, arr) => {
                    //console.log(arr);
                    return int >= 1;
                  })
                  .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interes}e`;             
}





// Computing Usernames
const createUsernames = function(accs) {
  accs.forEach(function(acc){
    acc.username = acc.owner  // Kreiramo novi properti u account objektu
    .toLocaleLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
};

createUsernames(accounts);
console.log(accounts);

//console.log(createUsernames('Steven Thomas Williams')); // dobijamo incijale stw


const updateUI = function(acc){
   // Display movements
   displayMovements(acc.movements);

   // Display balance
   calcPrintBalance(acc);

   // Display summary
   calcDisplaySummary(acc);
}



//--- Event handler ---
let currentAccount;

// Login
btnLogin.addEventListener('click', function(e){
  e.preventDefault() // Da se stranica ne refresuje kada submitujemo formu
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  // Ako je objekat undefined to je kao da smo stavili undefined.pin a to ne postoji, zbog toga stavimo ? da prvo provjeri da li objekat postoji i da ne izbacuje gresku, to se zove optional chaning
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}`
    containerApp.style.opacity = 1 ;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // Metoda da polje PIN izgubi fokus

    // Update UI
    updateUI(currentAccount);

  }

})


// Loan - zajam
btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){ // Bar jedna vrijednost mora biti veca od 10% od iznosa koji upisemo

    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';

})



// Implementing Transfers
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.username ===  inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (reciverAcc && amount > 0 && currentAccount.balance >= amount && reciverAcc.username !== currentAccount.username){
    console.log('Transfer valid');
  

  // Doing the transfer
   currentAccount.movements.push(-amount);  // Dodati negativan broj jer ovaj acc salje pare
   reciverAcc.movements.push(amount);


  // Update UI
   updateUI(currentAccount);
  }
})



// The findIndex Method
btnClose.addEventListener('click', function(e){
  e.preventDefault();

  const confirmUser = inputCloseUsername.value;
  const confirmPin = Number(inputClosePin.value);

  if (currentAccount.username === confirmUser && currentAccount.pin === confirmPin){

    // Trazimo indeks od ulogovanog accounta u nizu accounts
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = '';

})


// Sort
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;

})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];




/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*
// ---- Simple Array Methods ----

// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));  // Slice uzima elemnte od indeksa 2 pa nadelje i pravi novi niz
console.log(arr.slice(2, 4)); // Prvi parametar je ukljucen a drugi nije ['c', 'd'];
console.log(arr.slice(-2));  // Krece unazad ['e', 'd'];
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // ['b', 'c'];

console.log(arr.slice());  // Na ovaj nacin mozemo napraviti kopiju niza
console.log([...arr]);    // I na ovaj nacin mozemo napraviti kopiju
console.log(arr);  // Ova metoda NE deformise niz, i on je uvijek isti kao na pocetku


// SPLICE - radi istu stvar kao i slice ali razlika je u tome sto ova metoda mijenja orginalni niz nako sto je izvrsimo
console.log(arr.splice(2));
arr.splice(-1);    // Na ovaj nacin brisemo zadnji element jer metoda kreira novi niz koji sadrzi samo jedan elemetn (zadnji) i orginalni niz ostaje bez tog elementa
arr.splice(1, 2);  // Prvi parametar oznacava indeks isto kao i kod slice a drugi oznacava broj elemenata koji ce se obrisati
console.log(arr);   // Metoda deformise niz i vise nije kao orginal


// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse()); // Reverse okrece niz od zadnjeg do prvog elemnta
console.log(arr2);  // Takodje i ova metoda deformise niz tj. niz vise nije kao orginal


// CONCAT - kopira jedan niz u drugi tj. spaja ih
const letters =  arr.concat(arr2);  // !!! Ne mijenja orginalni niz
console.log(letters);
console.log([...arr, arr2]); // Ovo je nacin koji smo radili prije za spajanje dva niza


// JOIN - pravi string od elemenata niza
console.log(letters.join('-'));  // Kao parametar stavljamo sta ce biti izmedju elementa a moze biti i prazno



// ---- The new at Method ----
const arr = [23, 11, 64];

console.log(arr[0]);
console.log(arr.at(0)); // Ista stvar kao i gore, element na indeksu 0

// dobijanje zadnjeg elemtna niza
console.log(arr[arr.length - 1]); // Zadnji element
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));  // Najlaksi nacin 

console.log('jonas'.at(0));
console.log('jonas'.at(-1)); // Takodje radi i na stringovima




// ---- Looping Arrays: forEach ----
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()){
  if (movement > 0){
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }else{
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}


console.log('---- FOREACH ----');

// Kod forEach petlje prvi argument je element a drugi argument je indeks
movements.forEach(function(movement, i, arr) {
  if (movement > 0){
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }else{
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
})


// movements.forEach((movement, i, arr) => {
//   if (movement > 0){
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   }else{
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// })

//!! ! Razlika izmedju forEach i obicne petlje je u tome sto se forEach ne moze prekinuti kao obicna petlja sa break i continue




// ----  forEach With Maps and Sets ----

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});


// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// Setovi nemaju key odnosno nemaju indekse kao nizovi i zbog toga je ovdje value i key isto
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})



// ---- Map method ----
const eurToUsd = 1.1;

// Map metoda radi slicno kao forEach ali ona kreira novi niz sa novim vrijednostima
const movementsUSD = movements.map(function(mov){
  return (mov * eurToUsd).toFixed(2);
});


// Isti primjer sa Arrow funkcijom, najcistiji kod
const movementsUSDarrow = movements.map(mov => mov * eurToUsd);


console.log(movements);
console.log(movementsUSDarrow);


const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);
// Ovo je isti primjer ali pomocu obicne for petlje, gdje vidimo da prvo moramo kreirati niz
// dok ko Map metode to se radi automatski


// Kod Arrow funkcije ne moramo da pisemo rijec return vec to samo znaci return
const movementsDescriptions = movements.map((mov, i) =>
   `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
)

console.log(movementsDescriptions);




// ---- Filter method ---- radi kao i map metoda i sluzi za filtriranje niza
const deposits = movements.filter(function (mov) {
  return mov > 0;
})

console.log(deposits);  // Samo pozitivne vrijednosti


const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);  // Samo negativne vrijednosti



// ---- Reduce method ---- sluzi za vracanje jedne vrijednosti kao npr. suma
// Prvi el je accumulator, drugi element, treci indeks
const balance =  movements.reduce(function(acc, cur, i, arr) {

  console.log(`Iteration number ${i+1}: ${acc}`);
  return acc + cur;

}, 0) // Od koje vrijednosti krecemo sabirati, to je accumulator
// acc je kao suma i u svakoj iteraciji se dodaje nova vrijednost kao npr. acc += cur



// Arrow fukcija
const balance2 = movements.reduce((acc, mov) => acc + mov, 10);
console.log(balance2);



// Ovo je isti nacin samo sa for petljom
let sum = 0;
for (const mov of movements) sum += mov;
console.log(balance);


// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov;  
}, movements[0]);

console.log(max);




// ---- The Magic of Chaining Methods ----
const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
          .filter(mov => mov > 0)
          .map(mov => mov * eurToUsd)
          .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);




// ---- Find Method ---- ne vraca novi niz vec prvi element koji ispunjava uslov
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);

// Find i Filter su slicni ali razlika je u tome sto filter vraca niz a find vraca samo prvi element


console.log(accounts);

// Nacin da iz niza u kome su svi accounti dobijemo account koji zelimo
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


// for (const acc of accounts){  // Isti nacin pomocu for petlje
//   if (acc.owner === 'Jessica Davis'){
//     console.log(acc);
//   }
// }



// Some method - mora jedan element ispuniti uslov
console.log(movements);
// I ova metoda vraca ture ili false ali razlika je jer ova provjerava jednakost a some moze bilo kakav uslov da provjeri
console.log(movements.includes(-130));

// Provjerava da li postoji i jedna vrijenost iznad 0 i vraca true ili false
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

console.log(movements.some(mov => mov === -130)); // Isto kao i sa include metodom



// Every method - svaki element mora ispuniti uslov
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true, svi el veci od 0


// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));



// Flat method - array metoda
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());  // Sve elemente stavlja u jedan niz

// const newArr = [];
// arr.forEach(ar => {  // Pomocu for petlje, dosta komplikovanije
//   if (typeof ar === 'object'){
//     ar.forEach(a => newArr.push(a));  
//   }else{
//     newArr.push(ar);
//   }
// })
// console.log(newArr);


const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // flat metoda ide jedan po jedan level, nece sve elemente odma staviti u jedan niz kad imamo vise ugnjezdenih nizova
console.log(arrDeep.flat(2)); // 2 znaci da idemo 2 levela dublje i na taj nacin mozemo odrediti koliko levela zelimo da izvadimo iz niza

// flat
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance);    


// flatMap method - odjednom uradi map i flat metode
const overalBalance2 = accounts
    .flatMap(acc => acc.movements)  // flatMap metod ide samo jedan level dublje, ako ocemo vise levela onda koristimo zasebno metodu flat()
    .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance2); 


// Sort method - deformise orginalni array nakon izvrsavanja metode
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
//console.log(movements.sort()); // sort() metoda sortira po stringu, tj. pretvara sve u string i tako soritra i zbog toga dobijemo cudne rezulate kod soritranja brojeva


// return < 0, A, B (keep oreder)
// return > 0, B, A (switch order)
console.log(movements);

// movements.sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (a < b)  
//     return -1;
// });

movements.sort((a, b) => a - b);

console.log(movements);



// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);  // Kreiranje novo niza koji velicine 7 mijesta
console.log(x);

// x.fill(1);
x.fill(1, 3, 5) // Popuni niz sa jediniciama od treceg do petog indeksa (peti se ne ukljucuje)
console.log(x);

arr.fill(23, 4, 6); // Upisi 23 od pozicije 4 do pozicije sest (sest se ne ukljucuje)
console.log(arr);


// Array.from
const y = Array.from({length: 7}, () => 1); // I ovako mozemo kreirati niz, velicina niza 7, i pupuni sa jedinicama
console.log(y);

// Ako nam prvi argument ne treba samo stavimo donju crtu
const z = Array.from({length: 7}, (_, i) => i + 1); // Pravi niz od indeksa od 1 do 7
console.log(z);

const diceRolls = Array.from({length: 100}, () => Math.trunc(Math.random() * 6) + 1)
console.log(diceRolls);




labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('e', ''))
  ); // Array.from automatski koristi funkciju map kao drugi argument
 
    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    console.log(movementsUI2.map(el => el.textContent.replace('e', '')));
})




// ---- PRACTICE ----
// 1.
const bankDespositSum = accounts
          .flatMap(acc => acc.movements)
          .filter(mov => mov > 0)
          .reduce((acc, mov) => acc + mov, 0)


console.log(bankDespositSum);


// 2.
// const numDeposits1000 = accounts
//           .flatMap(acc => acc.movements)
//           .filter(mov => mov >= 1000).length;


const numDeposits1000 = accounts
          .flatMap(acc => acc.movements)
          .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0)

console.log(numDeposits1000);       



// 3.
const { deposit, withdrawals } = accounts // Nacin da pomocu reduce metode dobijemo objekat, do sad smo dobijali samo broj
          .flatMap(acc => acc.movements)
          .reduce((acc, mov) => {

              // mov > 0 ? acc.deposit += mov : acc.withdrawals += mov;
              acc[mov > 0 ? 'deposit' : 'withdrawals'] += mov;

              return acc;

          }, {deposit: 0, withdrawals: 0})

console.log(deposit, withdrawals);          

console.log(account1['owner']);  // Moze i ovako a moze i account1.owner


// 4.
// const capitalizate = function(title){
   
//   const captTxt = title
//         .toLocaleLowerCase()
//         .split(' ')
//         .map(txt => txt.length > 1 ? txt[0].toUpperCase() + txt.slice(1) : txt) 
//         .join(' ')

//   console.log(captTxt); 
      
// }

// capitalizate('THIS is a one string');


const convertTitleCase = function(title){
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);


  const titleCase = title
          .toLocaleLowerCase()
          .split(' ')
          .map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
          .join(' ');

          console.log(capitalize(titleCase));
}

convertTitleCase('and this is a long and TITLE but not too long or bad')
*/



const balance =  movements.reduce(function(acc, cur, i, arr) {

  console.log(`Iteration number ${i+1}: ${acc}`);
  return acc + cur;

}, 0) // Od koje vrijednosti krecemo sabirati, to je accumulator