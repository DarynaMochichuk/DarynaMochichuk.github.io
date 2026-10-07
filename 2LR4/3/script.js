// Завдання 1: Робота з об'єктами
let game = {
  title: "The Witcher 3: Wild Hunt",
  platform: "PC",
  genre: "RPG",
  year: 2015,
  isRead: true, // чи пройдено (логіка згідно завдання)
  
  // Метод для виведення інформації про гру
  gameInfo() {
    console.log(`Назва: ${this.title}, Платформа: ${this.platform}, Жанр: ${this.genre}, Рік виходу: ${this.year}, Пройдено: ${this.isRead ? "Так" : "Ні"}`);
  },

  // Додаткове завдання 2.1: Метод markAsRead для зміни статусу на true
  markAsRead() {
    this.isRead = true;
  }
};

// Виклик методу та перевірка зміни властивості isRead
game.gameInfo();
game.isRead = !game.isRead;
game.gameInfo();
game.markAsRead(); // Повертаємо у статус пройдено


// Завдання 2: Робота з масивами та об'єктами
let gameLibrary = [
  { title: "The Witcher 3: Wild Hunt", platform: "PC", genre: "RPG", year: 2015, isRead: true },
  { title: "Cyberpunk 2077", platform: "PS5", genre: "Action RPG", year: 2020, isRead: false },
  { title: "Hades", platform: "PC", genre: "Roguelike", year: 2020, isRead: true }
];

// Функція displayLibrary для виведення всіх ігор
function displayLibrary() {
  gameLibrary.forEach(g => {
    console.log(`Назва: ${g.title}, Платформа: ${g.platform}, Жанр: ${g.genre}, Рік виходу: ${g.year}, Пройдено: ${g.isRead ? "Так" : "Ні"}`);
  });
}

// Додавання нової гри за допомогою push()
gameLibrary.push({ title: "Grand Theft Auto V", platform: "PC", genre: "Action-Adventure", year: 2013, isRead: false });
displayLibrary();


// Завдання 3: Робота з методами масивів
// 1. Сортування за роком виходу в порядку зростання
gameLibrary.sort((a, b) => a.year - b.year);
console.log("Відсортовані відеоігри за роком виходу:", gameLibrary);

// 2. Фільтрація непрочитаних (непройдених) ігор
let unreadGames = gameLibrary.filter(g => !g.isRead);
console.log("Непройденості відеоігри:", unreadGames);

// 3. Пошук гри за жанром або платформю (наприклад, пошук гри на платформі "PS5")
let ps5Game = gameLibrary.find(g => g.platform === "PS5");
console.log("Гра на платформі PS5:", ps5Game);


// Завдання 4: Взаємодія з користувачем
function addGameToLibrary() {
  let title = prompt("Введіть назву відеоігри:");
  let platform = prompt("Введіть платформу (наприклад, PC, PS5, Xbox):");
  let genre = prompt("Введіть жанр гри:");
  let year = +prompt("Введіть рік виходу гри:");
  let isRead = confirm("Чи пройдено гру?");

  gameLibrary.push({ title, platform, genre, year, isRead });
  displayLibrary();
}

// Виклик функції додавання через взаємодію з користувачем
// addGameToLibrary();


// Додаткове завдання 2.2: Функція calculateAverageYear для обчислення середнього року виходу
function calculateAverageYear() {
  if (gameLibrary.length === 0) return 0;
  let totalYear = gameLibrary.reduce((sum, g) => sum + g.year, 0);
  return totalYear / gameLibrary.length;
}

console.log("Середній рік виходу відеоігор у бібліотеці:", calculateAverageYear());