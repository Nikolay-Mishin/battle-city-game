﻿# battle-city-game
## git-site: https://nikolay-mishin.github.io/battle-city-game/

## Тип данных Symbol
* https://learn.javascript.ru/symbol

### Символы

##### «Символ» представляет собой уникальный идентификатор.
##### Создаются новые символы с помощью функции Symbol():

```javascript
// Создаём новый символ - id
let id = Symbol();
```

##### При создании символу можно дать описание (также называемое имя), в основном использующееся для отладки кода:

```javascript
// Создаём символ id с описанием (именем) "id"
let id = Symbol("id");
```

##### Символы гарантированно уникальны. Даже если мы создадим множество символов с одинаковым описанием,
это всё равно будут разные символы. Описание – это просто метка, которая ни на что не влияет.
##### Например, вот два символа с одинаковым описанием – но они не равны:

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

### «Скрытые» свойства

* Символы позволяют создавать «скрытые» свойства объектов, к которым нельзя нечаянно обратиться и
перезаписать их из других частей программы.
* Например, мы работаем с объектами user, которые принадлежат стороннему коду. Мы хотим добавить к ним идентификаторы.

Используем для этого символьный ключ:

```javascript
let user = {
	name: "Вася"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // мы можем получить доступ к данным по ключу-символу
```

Почему же лучше использовать Symbol("id"), а не строку "id"?

Так как объект user принадлежит стороннему коду, и этот код также работает с ним, то нам не следует добавлять к нему какие-либо поля. Это небезопасно. Но к символу сложно нечаянно обратиться, сторонний код вряд ли его вообще увидит, и, скорее всего, добавление поля к объекту не вызовет никаких проблем.

Кроме того, предположим, что другой скрипт для каких-то своих целей хочет записать собственный идентификатор в объект user. Этот скрипт может быть какой-то JavaScript-библиотекой, абсолютно не связанной с нашим скриптом.

Сторонний код может создать для этого свой символ Symbol("id"):

```javascript
// ...
let id = Symbol("id");

user[id] = "Их идентификатор";
```

Конфликта между их и нашим идентификатором не будет, так как символы всегда уникальны, даже если их имена совпадают.

А вот если бы мы использовали строку "id" вместо символа, то тогда был бы конфликт:

```javascript
 let user = { name: "Вася" };

// Объявляем в нашем скрипте свойство "id"
user.id = "Наш идентификатор";

// ...другой скрипт тоже хочет свой идентификатор...

user.id = "Их идентификатор"
// Ой! Свойство перезаписано сторонней библиотекой!
```

### Символы в литеральном объекте

Если мы хотим использовать символ при литеральном объявлении объекта {...}, его необходимо заключить в квадратные скобки.

Вот так:

```javascript
let id = Symbol("id");

let user = {
  name: "Вася",
  [id]: 123 // просто "id: 123" не сработает
};
```

Это вызвано тем, что нам нужно использовать значение переменной id в качестве ключа, а не строку «id».

### Символы игнорируются циклом for…in
Свойства, чьи ключи – символы, не перебираются циклом for..in.

Например:

```javascript
let id = Symbol("id");
let user = {
	name: "Вася",
	age: 30,
	[id]: 123
};
```

for (let key in user) alert(key); // name, age (свойства с ключом-символом нет среди перечисленных)

// хотя прямой доступ по символу работает
alert( "Напрямую: " + user[id] );
Это – часть общего принципа «сокрытия символьных свойств». Если другая библиотека или скрипт будут работать с нашим объектом, то при переборе они не получат ненароком наше символьное свойство. Object.keys(user) также игнорирует символы.

А вот Object.assign, в отличие от цикла for..in, копирует и строковые, и символьные свойства:

```javascript
let id = Symbol("id");
let user = {
	[id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Здесь нет никакого парадокса или противоречия. Так и задумано. Идея заключается в том, что, когда мы клонируем или объединяем объекты, мы обычно хотим скопировать все свойства (включая такие свойства с ключами-символами, как, например, id в примере выше).

### Глобальные символы

```javascript
/*
Итак, как мы видели, обычно все символы уникальны, даже если их имена совпадают.
Но иногда мы наоборот хотим, чтобы символы с одинаковыми именами были одной сущностью.
Например, разные части нашего приложения хотят получить доступ к символу "id", подразумевая именно одно и то же свойство.

Для этого существует глобальный реестр символов.
Мы можем создавать в нём символы и обращаться к ним позже.
При каждом обращении нам гарантированно будет возвращаться один и тот же символ.

Для чтения (или, при отсутствии, создания) символа из реестра используется вызов Symbol.for(key).

Он проверяет глобальный реестр и, при наличии в нём символа с именем key, возвращает его.
Иначе же создаётся новый символ Symbol(key) и записывается в реестр под ключом key.

Например:
*/

// читаем символ из глобального реестра и записываем его в переменную
let id = Symbol.for("id"); // если символа не существует, он будет создан

// читаем его снова в другую переменную (возможно, из другого места кода)
let idAgain = Symbol.for("id");

// проверяем -- это один и тот же символ
alert( id === idAgain ); // true

/*
Символы, содержащиеся в реестре, называются глобальными символами.
Если вам нужен символ, доступный везде в коде – используйте глобальные символы.
*/
```