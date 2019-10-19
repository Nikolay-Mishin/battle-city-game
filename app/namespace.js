const Namespace = (function () {
	'use strict'

	// класс задания пространств имен
	// Если не хотите привязываться к какому-то фреймворку, для реализации пространства имен можно написать нечто вроде этого

	class Namespace {
		constructor(object_name, object_value = new Object()) {
			// object_name - имя пространства имен ('SomeCompany.SomeBigNamespace.SomeBigSubnamespace')
			// object_value - значение для конечного свойства пространства имен (SomeBigSubnamespace)
			var objects = object_name.split('.') // преобразуем строку в массив по разделителю ('.')

			var object = window; // базовый объект (по умолчанию - window) - для перебора всех свойств объекта пространства имен
			for (var i = 0; i < objects.length; i++) {
				// проверяем начальное свойство ('SomeCompany') - если в объекте window нет такого свойства, создаем его
				// 'SomeCompany' in 'window'
				if (!window[objects[i]])
					window[objects[i]] = new Object()
				// проверяем остальные свойства на существование - 'SomeBigNamespace' in 'SomeCompany'
				else if (!object[objects[i]])
					object[objects[i]] = new Object()

				// если это последнее свойство пространства имен (SomeBigSubnamespace), присваиваем ему переданное значение
				if (i == objects.length - 1) object[objects[i]] = object_value

				object = object[objects[i]] // перезаписываем в базовый объект текущее свойство объекта (window => SomeCompany)
				console.log(object.name)
			}
		}
	}

	return Namespace

	// После выполнения данных строк, в любом месте js-файлов можно писать
	// new Namespace('SomeCompany.SomeBigNamespace.SomeBigSubnamespace', object_value);
	// SomeCompany.SomeBigNamespace.SomeBigSubnamespace = object_value

	// если объект GameEngine инициализирован (существует) берем его значение, иначе создаем пустой объект (инициализируем)
	// window.GameEngine = window.GameEngine || {} // регистрируем объект GameEngine в объекте window
	// регистрируем пространство имен BattleCityGame.GameEngine.Loader в объекте window
	// GameEngine.Loader = Loader // регистрируем класс Loader в объекте GameEngine
})();