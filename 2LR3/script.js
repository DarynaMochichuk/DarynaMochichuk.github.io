
// 4–6 БАЛІВ
console.log("Рівень 4-6/n");

// Завдання 1: Формування повного імені та привітання
function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function showGreeting(fullName, age) {
    console.log(`Hello, ${fullName}! You are ${age} years old.`);
}

const fName = prompt("Введіть ваше ім'я (Рівень 4-6):", "John");
const lName = prompt("Введіть ваше прізвище:", "Smith");
const userAge = prompt("Введіть ваш вік:", "20");

const fullNameResult = getFullName(fName, lName);
showGreeting(fullNameResult, userAge);


// Завдання 2: Оцінювання успішності студента
function getStudentInfo() {
    const name = prompt("Введіть ім'я студента:", "John");
    const score = Number(prompt("Введіть бал студента (0–12):", "8"));
    return { name, score };
}

function checkGrade(score) {
    if (score >= 10 && score <= 12) return "Excellent";
    if (score >= 7 && score <= 9) return "Good";
    if (score >= 4 && score <= 6) return "Satisfactory";
    return "Fail";
}

function showStudentResult(name, grade) {
    console.log(`Student: ${name} | Grade: ${grade}`);
    alert(`Student: ${name}\nGrade: ${grade}`);
}

const student = getStudentInfo();
const studentGrade = checkGrade(student.score);
showStudentResult(student.name, studentGrade);


// Завдання 3: Калькулятор чайових
function calculateTip(amount, percent = 10) {
    return (amount * percent) / 100;
}

function showTipResult(amount, tip) {
    const total = amount + tip;
    console.log(`Bill: ${amount} грн, Tip: ${tip} грн, Total: ${total} грн`);
    alert(`Bill: ${amount} грн\nTip (10%): ${tip} грн\nTotal: ${total} грн`);
}

const billAmount = Number(prompt("Введіть загальну суму рахунку (грн):", "450"));
const tipAmount = calculateTip(billAmount);
showTipResult(billAmount, tipAmount);


//7–9 БАЛІВ
console.log("Рівень 7-9/n");

// Завдання 1: Таймер із колбеком
function startGreetingTimer(message, seconds, callback) {
    setTimeout(() => {
        console.log(message);
        callback();
    }, seconds * 1000);
}

// Виклик із використанням стрілкової функції як колбека
startGreetingTimer("Час очікування завершився!", 2, () => {
    alert('Time is up!');
});


// Завдання 2: Універсальний калькулятор
function calculate(a, b, operation) {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Помилка: ділення на нуль';
        default: return 'Invalid operation';
    }
}

function runCalculator() {
    const a = Number(prompt("Калькулятор - введіть перше число:"));
    const b = Number(prompt("Калькулятор - введіть друге число:"));
    const operation = prompt("Введіть операцію (+, -, *, /):");
    
    const result = calculate(a, b, operation);
    console.log(`Результат обчислення: ${result}`);
    alert(`Результат: ${result}`);
}

runCalculator();


// Завдання 3: Лічильник на замиканнях (Closures)
function createClickCounter() {
    let count = 0; // Приватна змінна завдяки замиканню
    return function() {
        count++;
        console.log(`Замикання - поточне значення лічильника: ${count}`);
        return count;
    };
}

const counter = createClickCounter();
counter(); // 1
counter(); // 2
counter(); // 3

//10–12 


console.log("Рівень 10-12/n");

// Завдання 1: Генератор випадкових чисел (для HTML кнопки)
function* randomGenerator(min, max) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const minLimit = Number(prompt("Генератор чисел - введіть min:", "1")) || 1;
const maxLimit = Number(prompt("Генератор чисел - введіть max:", "100")) || 100;

const rng = randomGenerator(minLimit, maxLimit);
const btnNext = document.getElementById('next');
const output = document.getElementById('out');

if (btnNext && output) {
    btnNext.addEventListener('click', () => {
        output.innerText = `Випадкове число: ${rng.next().value}`;
    });
}


// Завдання 2: Проєкт «Генератор паролів» (через next з аргументом)
function* passwordGenerator() {
    let password = "";
    while (true) {
        const char = yield password;
        if (char === 'done' || char === null) {
            return password;
        }
        password += char;
    }
}


//розкоментувати для перевірки роботи через prompt:
/*
const pwdGen = passwordGenerator();
pwdGen.next(); // Ініціалізація
let inputSymbol;
let finalPwd;
do {
    inputSymbol = prompt("Генератор паролів: введіть символ (або 'done' для завершення):");
    finalPwd = pwdGen.next(inputSymbol);
} while (inputSymbol !== 'done' && inputSymbol !== null);
alert(`Ваш готовий пароль: ${finalPwd.value}`);
*/



// Завдання 3: Проєкт «Генератор діалогів» (Чат-бот)
function* chatBot() {
    const name = yield "Hi! What is your name?";
    const mood = yield `Nice to meet you, ${name}! How are you?`;
    yield "Goodbye!";
}


// розкоментувати для запуску діалогу
/*
const bot = chatBot();
let step = bot.next();
while (!step.done) {
    const answer = prompt(step.value);
    if (answer === null) break;
    step = bot.next(answer);
}
alert("Діалог завершено.");
*/


// Завдання 4: Втрата контексту методом та її вирішення
const userNameObj = prompt("Введіть ім'я для об'єкта this:", "Дарина") || "Гість";

const userObj = {
    name: userNameObj,
    say() {
        alert(`Hello, ${this.name}`);
    }
};

const btnHello = document.getElementById('hello');

if (btnHello) {
    // Вирішення проблеми втрати контексту за допомогою стрілкової функції-обгортки
    btnHello.addEventListener('click', () => {
        userObj.say();
    });
}