/*
// 1.
const juliasDogs =  [3, 5, 2, 12, 7]; 
const katesDogs = [4, 1, 15, 8, 3];

const checkDogs = function(dogsJulia, dogsKate){
    const copyJulia = dogsJulia.slice();
    copyJulia.splice(0, 1);
    copyJulia.splice(-2);

    const allDogs = dogsJulia.concat(dogsKate);

    console.log(allDogs);
    
    allDogs.forEach((dog, i) => {
        if (dog >= 3){
            console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
        }else{
            console.log(`Dog number ${i+1} is still a puppy`);
        }
    });
}

checkDogs(juliasDogs, katesDogs);



// 2.
const calcAverageHumanAge = function(ages){
    const humanAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    
    console.log(humanAge);

    const lessThan18 = humanAge.filter(age => age >= 18);
    console.log(lessThan18);

    // const averageOfAges = lessThan18.reduce((acc, age) => acc + age, 0) / lessThan18.length

    const averageOfAges = lessThan18.reduce(function(acc, age, i, arr){
        return acc + age / arr.length
    }, 0) 

    console.log(averageOfAges);
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);



// 3.
const calcAverageHumanAge = ages => 
    ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0)




console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/



//--- 4. ----

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1)
dogs.forEach(dog => {
    dog.recommendedFood = Number(((dog.weight ** 0.75 * 28)).toFixed());
    
})



// 2)
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'))

console.log(`Sarah dog eat ${sarahDog.curFood > sarahDog.recommendedFood ? 'too much' : 'too litle'}`);


// 3)
const ownersEatTooMuch = dogs
            .filter(dog => dog.curFood > dog.recommendedFood)
            .map(dog => dog.owners)
            .flat()



const ownersEatTooLittle = dogs
            .filter(dog => dog.curFood < dog.recommendedFood)
            .map(dog => dog.owners)
            .flat()

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);


// 4)
console.log(`${ownersEatTooMuch.join(' and ')} eat too much`);



// 5)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));


// 6)
console.log(dogs.some(dog => (dog.curFood > (dog.recommendedFood * 0.90)) && dog.curFood < (dog.recommendedFood * 1.10) ));


// 7)
const okeyAmount = dogs.filter(dog => (dog.curFood > (dog.recommendedFood * 0.90)) && dog.curFood < (dog.recommendedFood * 1.10))
console.log(okeyAmount);


// 8)
// const dogss = [...dogs];
const dogsCopy = dogs.slice()
            .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsCopy);

console.log(NaN === NaN);
console.log(NaN == NaN);