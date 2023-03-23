'use strict';

//Coding Challenge 1

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// console.log('Assignment starts');

// const checkDogs = function (sample1, sample2) {
//   const _dogsJulia = sample1.slice(1, 4);
//   const Full_data = _dogsJulia.concat(sample2);
//   console.log(Full_data);

//   Full_data.forEach(function (age, i) {
//     const type = age > 3 ? 'adult' : 'puppy';
//     if (age > 3) {
//       console.log(`Dog number ${i + 1} is an ${type}, and is ${age} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy🐶`);
//     }
//   });
// };

// checkDogs(dogsJulia, dogsKate);

//------------------------coding challenge 2------------------------//
let age = [5, 2, 4, 1, 15, 8, 3];
let age1 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function (dogAge) {
  console.log(dogAge);
  let humanAge = 0;
  const Humanage_arr = dogAge.map(
    _age => (humanAge = _age <= 2 ? 2 * _age : 16 + _age * 4)
  );
  const adultDog = Humanage_arr.filter(age => age >= 18);
  const avgage = adultDog.reduce((sum, temp) => sum + temp) / adultDog.length;
  console.log(avgage);
};

const calcAverageHumanAge1 = function (dogAge) {
  console.log(dogAge);
  let humanAge = 0;
  // const Humanage_arr =
  //   dogAge
  //     .map(_age => (humanAge = _age <= 2 ? 2 * _age : 16 + _age * 4))
  //     .filter(age => age >= 18)
  //     .reduce((sum, temp) => sum + temp) / adultDog.length;
  // console.log(avgage);

  const Human_arr = dogAge
    .map(_age => (humanAge = _age <= 2 ? 2 * _age : 16 + _age * 4))
    .filter(age => age >= 18)
    .reduce(function (sum, temp, i, arr) {
      console.log(`${sum} + ${temp} / ${arr.length}`);
      return sum + temp / arr.length;
    }, 0);
  console.log(Human_arr);
};

calcAverageHumanAge1(age1);
calcAverageHumanAge(age1);
