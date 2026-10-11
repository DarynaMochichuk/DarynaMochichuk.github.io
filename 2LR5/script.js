document.addEventListener("DOMContentLoaded", () => {
    initTask1();
    initTask2();
    initTask3();
    
    // Завдання 4: Ротатор фотографій
    const imagesArray = [
        { 
            path: 'фото1.webp', 
            title: 'Елегантна сукня', 
            description: 'Вечірня шовкова сукня міді' 
        },
        { 
            path: 'фото2.avif', 
            title: 'Діловий костюм', 
            description: 'Жіночий брючний костюм оверсайз' 
        },
        { 
            path: 'фото3.webp', 
            title: 'Осіннє пальто', 
            description: 'Класичне кашемірове пальто бежевого кольору' 
        }
    ];
    
    initPhotoRotator('rotator', imagesArray);

    // Завдання 5: Капча з 2 цифр
    initCaptcha(2);
});

// 1
function initTask1() {
    const fahrenheitInput = document.getElementById('fahrenheit');
    const celsiusInput = document.getElementById('celsius');

    fahrenheitInput.addEventListener('input', () => {
        if (fahrenheitInput.value === '') {
            celsiusInput.value = '';
            return;
        }
        const f = parseFloat(fahrenheitInput.value);
        const c = (5 / 9) * (f - 32);
        celsiusInput.value = c.toFixed(2);
    });

    celsiusInput.addEventListener('input', () => {
        if (celsiusInput.value === '') {
            fahrenheitInput.value = '';
            return;
        }
        const c = parseFloat(celsiusInput.value);
        const f = (c * 9 / 5) + 32;
        fahrenheitInput.value = f.toFixed(2);
    });
}

//2 
function initTask2() {
    let num1, num2, correctAnswer;
    let totalAttempts = 0;
    let correctAttempts = 0;

    const scoreEl = document.getElementById('score-task2');
    const questionEl = document.getElementById('question-task2');
    const answerInput = document.getElementById('answer-task2');
    const checkBtn = document.getElementById('check-btn-task2');
    const nextBtn = document.getElementById('next-btn-task2');
    const resultEl = document.getElementById('result-task2');

    function generateQuestion() {
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        correctAnswer = num1 * num2;
        questionEl.textContent = `${num1} × ${num2} =`;
        answerInput.value = '';
        resultEl.textContent = '';
        checkBtn.disabled = false;
    }

    function updateScore() {
        const percent = totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100);
        scoreEl.textContent = `Загальний рахунок ${percent}% (${correctAttempts} правильних відповідей з ${totalAttempts})`;
    }

    checkBtn.addEventListener('click', () => {
        const userAnswer = parseInt(answerInput.value, 10);
        if (isNaN(userAnswer)) return;

        totalAttempts++;
        if (userAnswer === correctAnswer) {
            correctAttempts++;
            resultEl.style.color = 'green';
            resultEl.textContent = 'Правильно!';
        } else {
            resultEl.style.color = 'red';
            resultEl.textContent = `Помилка, правильна відповідь «${correctAnswer}»`;
        }
        updateScore();
        checkBtn.disabled = true;
    });

    nextBtn.addEventListener('click', generateQuestion);
    generateQuestion();
}

//3
function initTask3() {
    let num1, num2, correctAnswer;
    let totalAttempts = 0;
    let correctAttempts = 0;

    const scoreEl = document.getElementById('score-task3');
    const questionEl = document.getElementById('question-task3');
    const optionsContainer = document.getElementById('options-task3');
    const nextBtn = document.getElementById('next-btn-task3');
    const resultEl = document.getElementById('result-task3');

    function generateQuestion() {
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        correctAnswer = num1 * num2;
        questionEl.textContent = `${num1} × ${num2} =`;
        resultEl.textContent = '';
        optionsContainer.innerHTML = '';

        // Генерація варіантів відповіді
        let options = new Set([correctAnswer]);
        while (options.size < 4) {
            let fakeAnswer = (Math.floor(Math.random() * 9) + 1) * (Math.floor(Math.random() * 9) + 1);
            options.add(fakeAnswer);
        }

        // Перемішування варіантів
        let shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(opt => {
            const label = document.createElement('label');
            label.style.display = 'block';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'task3_option';
            radio.value = opt;

            radio.addEventListener('change', () => {
                const radios = document.querySelectorAll('input[name="task3_option"]');
                radios.forEach(r => r.disabled = true);

                totalAttempts++;
                if (parseInt(radio.value, 10) === correctAnswer) {
                    correctAttempts++;
                    resultEl.style.color = 'green';
                    resultEl.textContent = 'Правильно!';
                } else {
                    resultEl.style.color = 'red';
                    resultEl.textContent = `Помилка, правильна відповідь «${correctAnswer}»`;
                }
                updateScore();
            });

            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${opt}`));
            optionsContainer.appendChild(label);
        });
    }

    function updateScore() {
        const percent = totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100);
        scoreEl.textContent = `Загальний рахунок ${percent}% (${correctAttempts} правильних відповідей з ${totalAttempts})`;
    }

    nextBtn.addEventListener('click', generateQuestion);
    generateQuestion();
}

//4 
function initPhotoRotator(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    if (!container || !imagesArray.length) return;

    let currentIndex = 0;

    // Створення елементів за допомогою document.createElement
    const headerDiv = document.createElement('div');
    headerDiv.className = 'rotator-header';

    const mainDiv = document.createElement('div');
    mainDiv.className = 'rotator-main';

    const prevBtn = document.createElement('span');
    prevBtn.className = 'rotator-nav';
    prevBtn.textContent = 'Назад';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'rotator-img-container';

    const imgEl = document.createElement('img');
    imgContainer.appendChild(imgEl);

    const nextBtn = document.createElement('span');
    nextBtn.className = 'rotator-nav';
    nextBtn.textContent = 'Вперед';

    mainDiv.appendChild(prevBtn);
    mainDiv.appendChild(imgContainer);
    mainDiv.appendChild(nextBtn);

    const footerDiv = document.createElement('div');
    footerDiv.className = 'rotator-footer';

    const titleEl = document.createElement('div');
    titleEl.style.fontWeight = 'bold';
    const descEl = document.createElement('div');

    footerDiv.appendChild(titleEl);
    footerDiv.appendChild(descEl);

    container.appendChild(headerDiv);
    container.appendChild(mainDiv);
    container.appendChild(footerDiv);

    function updateRotator() {
        const currentImg = imagesArray[currentIndex];
        headerDiv.textContent = `Фотографія ${currentIndex + 1} з ${imagesArray.length}`;
        imgEl.src = currentImg.path;
        titleEl.textContent = currentImg.title;
        descEl.textContent = currentImg.description;

        // Приховування/відображення кнопок «Назад» та «Вперед»
        if (currentIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentIndex === imagesArray.length - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateRotator();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < imagesArray.length - 1) {
            currentIndex++;
            updateRotator();
        }
    });

    updateRotator();
}

// 5
function initCaptcha(digitsCount) {
    const container = document.getElementById('captcha-container');
    const inputEl = document.getElementById('captcha-input');
    const resultEl = document.getElementById('captcha-result');

    // Матриці піксельних цифр 3х5
    const digitPatterns = {
        '0': [1,1,1, 1,0,1, 1,0,1, 1,0,1, 1,1,1],
        '1': [0,1,0, 1,1,0, 0,1,0, 0,1,0, 1,1,1],
        '2': [1,1,1, 0,0,1, 1,1,1, 1,0,0, 1,1,1],
        '3': [1,1,1, 0,0,1, 1,1,1, 0,0,1, 1,1,1],
        '4': [1,0,1, 1,0,1, 1,1,1, 0,0,1, 0,0,1],
        '5': [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
        '6': [1,1,1, 1,0,0, 1,1,1, 1,0,1, 1,1,1],
        '7': [1,1,1, 0,0,1, 0,1,0, 0,1,0, 0,1,0],
        '8': [1,1,1, 1,0,1, 1,1,1, 1,0,1, 1,1,1],
        '9': [1,1,1, 1,0,1, 1,1,1, 0,0,1, 1,1,1]
    };

    let generatedCode = '';

    function generateCaptcha() {
        container.innerHTML = '';
        generatedCode = '';

        const captchaBox = document.createElement('div');
        captchaBox.className = 'captcha-box';

        for (let i = 0; i < digitsCount; i++) {
            const randomDigit = Math.floor(Math.random() * 10).toString();
            generatedCode += randomDigit;

            const digitDiv = document.createElement('div');
            digitDiv.className = 'pixel-digit';

            const pattern = digitPatterns[randomDigit];
            pattern.forEach(val => {
                const span = document.createElement('span');
                if (val === 1) span.className = 'on';
                digitDiv.appendChild(span);
            });

            captchaBox.appendChild(digitDiv);
        }

        container.appendChild(captchaBox);
        inputEl.value = '';
        resultEl.textContent = '';
    }

    inputEl.addEventListener('input', () => {
        const val = inputEl.value.trim();
        if (val.length === digitsCount) {
            if (val === generatedCode) {
                resultEl.style.color = 'green';
                resultEl.textContent = 'Правильно!';
            } else {
                resultEl.style.color = 'red';
                resultEl.textContent = 'Помилка';
            }
        } else {
            resultEl.textContent = '';
        }
    });

    generateCaptcha();
}