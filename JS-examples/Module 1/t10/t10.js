'use strict';
const target = document.querySelector('#target');
console.log(target);

const numOfDice = prompt('Enter number of dice');

const sumOfDice = +prompt('Enter sum');

let count = 0;
for (let i = 0; i < 10000; i++) {
  let sum = 0;
  for (let j = 0; j < numOfDice; j++) {
    const dice = Math.floor(Math.random() * 6) + 1;
    sum = sum + dice;
  }
  //   console.log('Sum of dice', sum);
  //   console.log(sumOfDice);
  if (sum === sumOfDice) {
    count++;
  }
}
// console.log(count);
const probability = (count / 100).toFixed(2);

const html = `
<b>Number of dice:</b> ${numOfDice}
<br>
Probability of ${sumOfDice} is ${probability}%
`;

target.innerHTML = html;
