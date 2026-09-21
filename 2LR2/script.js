
// Завдання 1
const userName = prompt("Введіть ваше ім'я:");
alert(`Hello, ${userName}! Welcome to JavaScript`);

// Завдання 2
const currentYear = new Date().getFullYear();
const age = prompt("Введіть ваш вік:");
const birthYear = currentYear - Number(age);
alert(`You were born in ${birthYear}`);

// Завдання 3
const firstName = prompt("Введіть ім'я:");
const lastName = prompt("Введіть прізвище:");

// Вивід через + (конкатенація)
console.log("Your full name is " + firstName + " " + lastName);

// Вивід через шаблонний рядок
console.log(`Your full name is ${firstName} ${lastName}`);


// Завдання 1
const globalUserName = "Дарина"; // Глобальна змінна

if (true) {
  const globalUserName = prompt("Введіть нове ім'я для змінної в if:"); 
  console.log("Змінна всередині блоку if:", globalUserName);
}

console.log("Глобальна змінна поза блоком if:", globalUserName);

// Завдання 2
const name79 = prompt("Введіть ім'я:");
const age79 = prompt("Введіть вік:");

const isContinue = confirm(`Hello, ${name79}! Your age is ${age79}. Continue?`);
if (isContinue) {
  alert("Welcome!");
} else {
  alert("Goodbye!");
}

// Завдання 3
const numberInput = prompt("Введіть число для перевірки на парність:");
if (Number(numberInput) % 2 === 0) {
  alert("Number is even");
} else {
  alert("Number is odd");
}

// Завдання 1
function calculate() {
  let result = "Значення у функції (область функції)";

  if (true) {
    let result = "Значення в блоці if (блочна область)";
    console.log("Всередині if:", result);
  }

  console.log("Поза if у функції:", result);
}
calculate();

// Завдання 2
const myJournalNumber = 10; 
const secretNumber = myJournalNumber % 10;

const userGuess = prompt("Загадайте число від 0 до 9:");
if (Number(userGuess) === secretNumber) {
  alert("Correct!");
} else {
  alert("Wrong!");
}

// Завдання 3
const name1012 = prompt("Введіть ім'я:");
const num1 = prompt("Введіть перше число:");
const num2 = prompt("Введіть друге число:");

const sum = Number(num1) + Number(num2);

// Конкатенація через оператор +
console.log("Hello, " + name1012 + "! The sum of " + num1 + " and " + num2 + " is " + sum);