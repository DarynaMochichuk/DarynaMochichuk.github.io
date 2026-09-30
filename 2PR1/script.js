// 1. Фільтрація та пошук у масиві об'єктів

const products = [
  { name: 'Ноутбук', category: 'Електроніка', price: 25000, inStock: 5 },
  { name: 'Мишка', category: 'Електроніка', price: 800, inStock: 0 },
  { name: 'Клавіатура', category: 'Електроніка', price: 1500, inStock: 12 },
  { name: 'Навушники', category: 'Електроніка', price: 2000, inStock: 0 }
];

// Повертає масив товарів, у яких inStock > 0
function getAvailableProducts(productsList) {
  return productsList.filter(product => product.inStock > 0);
}

// Повертає об'єкт товару за назвою або повідомлення "Товар не знайдено"
function findProductByName(productsList, productName) {
  const foundProduct = productsList.find(
    product => product.name.toLowerCase() === productName.toLowerCase()
  );
  return foundProduct || "Товар не знайдено";
}

// Перевірка 1 завдання
console.log('Завдання 1');
console.log('В наявності:', getAvailableProducts(products));
console.log('Пошук "Мишка":', findProductByName(products, 'Мишка'));
console.log('Пошук "Монітор":', findProductByName(products, 'Монітор'));

// 2. Групування та сортування масиву об'єктів
const students = [
  { name: 'Олена', age: 18, grade: 10, group: 'ПІ-23-02' },
  { name: 'Максим', age: 17, grade: 11, group: 'ПІ-23-05' },
  { name: 'Ілля', age: 19, grade: 7, group: 'ПІ-23-02' },
  { name: 'Анна', age: 18, grade: 8, group: 'ПІ-23-05' }
];

// Групує студентів за назвами груп
function groupBy(studentsList) {
  return studentsList.reduce((acc, student) => {
    if (!acc[student.group]) {
      acc[student.group] = [];
    }
    acc[student.group].push(student);
    return acc;
  }, {});
}

// Повертає новий масив, відсортований за оцінками (за спаданням)
function sortStudentsByGrade(studentsList) {
  return [...studentsList].sort((a, b) => b.grade - a.grade);
}

// Перевірка 2 завдання
console.log('\nЗавдання 2');
console.log('Групування:', groupBy(students));
console.log('Сортування за оцінкою:', sortStudentsByGrade(students));

// 3. Статистичний аналіз даних з масиву об'єктів
const employees = [
  { name: 'Андрій', position: 'Developer', salary: 45000, years: 3 },
  { name: 'Марія', position: 'Designer', salary: 38000, years: 5 },
  { name: 'Олег', position: 'Project Manager', salary: 55000, years: 7 },
  { name: 'Ірина', position: 'QA', salary: 32000, years: 2 }
];

// Обчислює середню зарплату всіх працівників
function getAverageSalary(employeesList) {
  if (employeesList.length === 0) return 0;
  const totalSalary = employeesList.reduce((sum, emp) => sum + emp.salary, 0);
  return totalSalary / employeesList.length;
}

// Повертає працівника з найбільшим досвідом роботи
function findMostExperiencedEmployee(employeesList) {
  return employeesList.reduce((mostExperienced, emp) => {
    return (emp.years > mostExperienced.years) ? emp : mostExperienced;
  });
}

// Перевірка 3 завдання
console.log('\nЗавдання 3');
console.log('Середня зарплата:', getAverageSalary(employees));
console.log('Найдосвідченіший працівник:', findMostExperiencedEmployee(employees));

// 4. Обробка та аналіз даних про книги
const books = [
  { title: 'Кобзар', author: 'Тарас Шевченко', year: 1840, rating: 4.9, isRead: true },
  { title: 'Тіні забутих предків', author: 'Михайло Коцюбинський', year: 1911, rating: 4.5, isRead: false },
  { title: 'Захар Беркут', author: 'Іван Франко', year: 1883, rating: 4.8, isRead: true },
  { title: 'Украдене щастя', author: 'Іван Франко', year: 1890, rating: 4.2, isRead: false },
  { title: 'Місто', author: 'Валеріян Підмогильний', year: 1928, rating: 3.9, isRead: false }
];

// Повертає масив назв непрочитаних книг
function getUnreadBooks(booksList) {
  return booksList
    .reduce((acc, book) => {
      if (!book.isRead) {
        acc.push(book.title);
      }
      return acc;
    }, []);
}

// Повертає книги автора, відсортовані за роком видання (за зростанням)
function getBooksByAuthor(booksList, authorName) {
  return booksList
    .filter(book => book.author.toLowerCase() === authorName.toLowerCase())
    .sort((a, b) => a.year - b.year);
}

// Повертає книги з рейтингом > 4, відсортовані за рейтингом (за спаданням)
function getTopRatedBooks(booksList) {
  return booksList
    .filter(book => book.rating > 4)
    .sort((a, b) => b.rating - a.rating);
}

// Перевірка 4 завдання
console.log('\nЗавдання 4');
console.log('Непрочитані книги:', getUnreadBooks(books));
console.log('Книги Франка:', getBooksByAuthor(books, 'Іван Франко'));
console.log('Топ книги (рейтинг > 4):', getTopRatedBooks(books));

// 5. Фільтрація та маніпуляція вкладених об'єктів

const orders = [
  {
    orderId: 1,
    customer: { name: 'Олександр', email: 'alex@example.com' },
    items: [{ name: 'Телефон', price: 15000 }],
    total: 15000
  },
  {
    orderId: 2,
    customer: { name: 'Софія', email: 'sofia@example.com' },
    items: [{ name: 'Чохол', price: 500 }],
    total: 500
  },
  {
    orderId: 3,
    customer: { name: 'Олександр', email: 'alex@example.com' },
    items: [{ name: 'Зарядний пристрій', price: 1000 }],
    total: 1000
  }
];

// Повертає загальну суму, яку витратив клієнт
function getTotalSpentByCustomer(ordersList, customerName) {
  return ordersList
    .filter(order => order.customer.name.toLowerCase() === customerName.toLowerCase())
    .reduce((sum, order) => sum + order.total, 0);
}

// Перевірка 5 завдання
console.log('\nЗавдання 5');
console.log('Витрачено Олександр:', getTotalSpentByCustomer(orders, 'Олександр'));

// 6. Об'єднання та оптимізація даних у масиві
const catalogProducts = [
  { productId: 101, name: 'Кава', price: 250 },
  { productId: 102, name: 'Чай', price: 120 },
  { productId: 103, name: 'Печиво', price: 80 }
];

const purchases = [
  { purchaseId: 1, productId: 101, quantity: 3 },
  { purchaseId: 2, productId: 102, quantity: 5 },
  { purchaseId: 3, productId: 101, quantity: 2 },
  { purchaseId: 4, productId: 103, quantity: 10 }
];

// Повертає об'єкт: { "Назва товару": Загальний_дохід }
function getTotalSales(productsList, purchasesList) {
  return purchasesList.reduce((acc, purchase) => {
    const product = productsList.find(p => p.productId === purchase.productId);
    if (product) {
      const revenue = product.price * purchase.quantity;
      acc[product.name] = (acc[product.name] || 0) + revenue;
    }
    return acc;
  }, {});
}

// Перевірка 6 завдання
console.log('\nЗавдання 6');
console.log('Загальні продажі за товарами:', getTotalSales(catalogProducts, purchases));