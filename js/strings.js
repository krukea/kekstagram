/* eslint-disable no-console */
/* eslint-disable radix */
/*Функция для проверки длины строки.
 Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
 если строка меньше или равна указанной длине, и false, если строка длиннее.
 Эта функция нам пригодится для валидации формы. Примеры использования функции:
 */

const checkLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
console.log(checkLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkLength('проверяемая строка', 10)); // false

/*Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. */

const isPalyndrome = (string) => {
  string = string.trim().replaceAll(' ', '').toLowerCase();

  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }

  return string === newString;
};
// Строка является палиндромом
console.log(isPalyndrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalyndrome('ДовОд')); // true
// Это не палиндром
console.log(isPalyndrome('Кекс')); // false

// Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!
// Это палиндром
console.log(isPalyndrome('Лёша на полке клопа нашёл ')); // true

/*Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого
положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.
Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:*/

const getNumbers = (string) => {
  string = string.toString();

  let numbers = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i]))) {
      numbers += string[i];
    }
  }

  return parseInt(numbers);
};

console.log(getNumbers('2023 год')); // 2023
console.log(getNumbers('ECMAScript 2022')); // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007')); // 7
console.log(getNumbers('а я томат')); // NaN

console.log(getNumbers(2023)); // 2023
console.log(getNumbers(-1)); // 1
console.log(getNumbers(1.5)); // 15
