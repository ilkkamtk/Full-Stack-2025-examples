'use strict';
const target = document.querySelector('#target');

const numOfDice = prompt('Enter number of dice');

const sumOfDice = prompt('Enter sum');

const html = `
<b>Number of dice:</b> ${numOfDice}
<br>
<b>Sum of dice: </b> ${sumOfDice}
`;

target.innerHTML = html;
