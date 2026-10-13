// ==============================
// DOM ЕЛЕМЕНТИ
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

// Варіант 10: додаткові елементи керування
const borderColorInput = document.querySelector('#border-color');
const borderStyleSelect = document.querySelector('#border-style');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');
const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');
const scrollTopButton = document.querySelector('#scroll-top');

// ==============================
// TABS (Завдання 1, 2, 3, 4, 14)
// ==============================
function hideTabs() {
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });
  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });
}

function showTab(tabName) {
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  const activeContent = document.querySelector(`[data-content="${tabName}"]`);

  if (activeTab) activeTab.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

// Завдання 14: Делегування подій на контейнері вкладок
tabsContainer.addEventListener('click', function (event) {
  if (!event.target.classList.contains('tab')) {
    return;
  }

  // Завдання 4: Аналіз об'єкта event
  console.log('Event Type:', event.type);
  console.log('Event Target:', event.target);
  console.log('Event CurrentTarget:', event.currentTarget);

  const tabName = event.target.dataset.tab;
  hideTabs();
  showTab(tabName);
});

// ==============================
// CSS GENERATION & PREVIEW (Завдання 5, 7, 8, 9)
// ==============================
function generateCSS() {
  // 1. Border Radius
  const topLeftRadius = topLeft.value;
  const topRightRadius = topRight.value;
  const bottomRightRadius = bottomRight.value;
  const bottomLeftRadius = bottomLeft.value;

  const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;
  preview.style.borderRadius = radius;

  // Оновлення текстових підписів
  topLeftValue.textContent = `${topLeftRadius} px`;
  topRightValue.textContent = `${topRightRadius} px`;
  bottomRightValue.textContent = `${bottomRightRadius} px`;
  bottomLeftValue.textContent = `${bottomLeftRadius} px`;

  // 2. Варіант 10: Border Color та Border Style
  const color = borderColorInput ? borderColorInput.value : '#000000';
  const style = borderStyleSelect ? borderStyleSelect.value : 'solid';

  preview.style.borderColor = color;
  preview.style.borderStyle = style;

  // Формування підсумкового CSS-коду
  cssCode.value = `border-radius: ${radius};\nborder-color: ${color};\nborder-style: ${style};`;
}

// Завдання 6 та 9: Підключення обробників подій input / change
topLeft.addEventListener('input', generateCSS);
topRight.addEventListener('input', generateCSS);
bottomRight.addEventListener('input', generateCSS);
bottomLeft.addEventListener('input', generateCSS);

if (borderColorInput) {
  borderColorInput.addEventListener('input', generateCSS);
}

if (borderStyleSelect) {
  borderStyleSelect.addEventListener('change', generateCSS);
}

// ==============================
// COPY CSS (Завдання 13)
// ==============================
function copyCSS() {
  navigator.clipboard.writeText(cssCode.value).then(function () {
    copyMessage.textContent = 'CSS-код скопійовано';
    setTimeout(function () {
      copyMessage.textContent = '';
    }, 3000);
  });
}

copyButton.addEventListener('click', copyCSS);

// ==============================
// FORM VALIDATION & SUBMIT (Завдання 10, 11)
// ==============================
presetName.addEventListener('focus', function () {
  presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
  presetName.classList.remove('focused');
  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
  } else {
    presetName.classList.remove('error');
    presetError.textContent = '';
  }
});

function handlePresetSubmit(event) {
  event.preventDefault(); // Скасування стандартного відправлення форми

  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
    return;
  }

  console.log(`Пресет: ${presetName.value.trim()}`);
  console.log(cssCode.value);
}

presetForm.addEventListener('submit', handlePresetSubmit);

// ==============================
// KEYBOARD EVENTS (Завдання 12)
// ==============================
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;

    generateCSS();
  }
}

document.addEventListener('keydown', handleKeyDown);

// ==============================
// EVENT PROPAGATION (Завдання 15)
// ==============================
preview.addEventListener('click', function () {
  console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
  event.stopPropagation(); // Припиняємо поширення події до preview
  console.log('Button click');
});

// ==============================
// MOUSE EVENTS & COORDINATES (Завдання 16, 17)
// ==============================
preview.addEventListener('mouseover', function () {
  preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
  preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
  coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
  console.log('pageX:', event.pageX, 'pageY:', event.pageY);
});

// ==============================
// SCROLL EVENTS (Завдання 18, 19)
// ==============================
function handleScroll() {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Ініціалізація початкового стану
generateCSS();