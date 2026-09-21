// ==========================================
// РІВЕНЬ 4–6 БАЛІВ
// ==========================================

// 1. Виведення вітання після діалогового вікна[cite: 1]
alert('Ласкаво просимо до лабораторної роботи! Натисніть OK.');
const pGreeting = document.createElement('p');
pGreeting.textContent = 'Hello, Дарина Мочічук!';
document.body.prepend(pGreeting); // Додаємо на самий початок

// 2. Визначення натиснутої кнопки в confirm()[cite: 1]
const confirmResult = confirm('Натисніть "OK" або "Відміна" для перевірки confirm()');
const pConfirm = document.createElement('p');
if (confirmResult) {
    pConfirm.textContent = 'Результат confirm(): Ви натиснули кнопку "ОК" (true).';
} else {
    pConfirm.textContent = 'Результат confirm(): Ви натиснули кнопку "Відміна" (false).';
}
document.getElementById('level1-results').appendChild(pConfirm);

// 3. Таблиця множення для останньої цифри номера у журналі (0)[cite: 1]
const number = 0; 
const multContainer = document.createElement('div');
multContainer.innerHTML = `<h4>Таблиця множення для останньої цифри номера (0):</h4>`;
for (let i = 1; i <= 10; i++) {
    const p = document.createElement('p');
    p.textContent = `${number} * ${i} = ${number * i}`;
    multContainer.appendChild(p);
}
document.getElementById('level1-results').appendChild(multContainer);



// ==========================================
// РІВЕНЬ 7–9 БАЛІВ
// ==========================================
const level2Div = document.getElementById('level2-results');

// 1. Перевірка номера у журналі на парність (10)[cite: 1]
function checkEvenOdd(num) {
    const p = document.createElement('p');
    p.textContent = `Номер у журналі (${num}): `;
    if (num % 2 === 0) {
        p.innerHTML += '<strong style="color: green;">Парне</strong>';
    } else {
        p.innerHTML += '<strong style="color: red;">Непарне</strong>';
    }
    level2Div.appendChild(p);
}
checkEvenOdd(10);

// 2. Генерація пароля на основі імені та номера[cite: 1]
function generatePassword(name, number) {
    const prefix = name.slice(0, 3); // "Дар"
    const code = number * 2;         // 10 * 2 = 20
    const password = `${prefix}${code}`;
    
    const div = document.createElement('div');
    div.innerHTML = `<strong>Згенерований пароль:</strong> ${password}`;
    level2Div.appendChild(div);
}
generatePassword('Дарина', 10);

// 3. Обчислення середньої оцінки та виведення у динамічний div із id="10"[cite: 1]
const grade1 = parseFloat(prompt('Введіть першу оцінку:')) || 0;
const grade2 = parseFloat(prompt('Введіть другу оцінку:')) || 0;
const grade3 = parseFloat(prompt('Введіть третю оцінку:')) || 0;

const average = (grade1 + grade2 + grade3) / 3;

const targetDiv = document.createElement('div');
targetDiv.id = '10'; // ID дорівнює номеру у журналі
targetDiv.style.marginTop = '10px';
targetDiv.innerHTML = `<strong>Середня оцінка :</strong> ${average.toFixed(2)}`;
level2Div.appendChild(targetDiv);

// 4. Введення кількості студентів та їх даних[cite: 1]
const count = parseInt(prompt('Введіть кількість студентів групи:')) || 0;
if (count > 0) {
    const studentsContainer = document.createElement('div');
    studentsContainer.innerHTML = `<h4>Список студентів (${count}):</h4>`;
    for (let i = 0; i < count; i++) {
        const fullName = prompt(`Введіть прізвище та ім'я студента ${i + 1}:`);
        if (fullName) {
            const p = document.createElement('p');
            p.textContent = `Студент ${i + 1}: ${fullName}`;
            studentsContainer.appendChild(p);
        }
    }
    level2Div.appendChild(studentsContainer);
}

// ==========================================
// РІВЕНЬ 10–12 БАЛІВ
// ==========================================

// 1. Список ul із літерами імені з alert при наведенні[cite: 1]
const nameLetters = ['Д', 'а', 'р', 'и', 'н', 'а'];
const ul = document.getElementById('name-list');

nameLetters.forEach(letter => {
    const li = document.createElement('li');
    li.textContent = letter;
    li.style.cursor = 'pointer';
    li.style.margin = '5px 0';
    
    li.addEventListener('mouseenter', () => {
        alert(`Це літера ${letter}`);
    });
    
    ul.appendChild(li);
});

// 3. Інтерактивна кнопка створення/очищення блоків прізвища ("Мочічук")[cite: 1]
const btn = document.getElementById('toggleBtn');
const container = document.getElementById('letters');
const surnameLetters = ['М', 'о', 'ч', 'і', 'ч', 'у', 'к'];
let isDisplayed = false;

btn.addEventListener('click', () => {
    if (!isDisplayed) {
        container.innerHTML = ''; // Очищення контейнера
        
        surnameLetters.forEach(letter => {
            const box = document.createElement('div');
            box.textContent = letter;
            box.className = 'letter-box';
            
            box.addEventListener('mouseenter', () => {
                alert(`Це літера [${letter}]`);
            });
            
            container.appendChild(box);
        });
        
        btn.textContent = 'Очистити блоки';
        isDisplayed = true;
    } else {
        container.innerHTML = '';
        btn.textContent = 'Показати блоки';
        isDisplayed = false;
    }
});