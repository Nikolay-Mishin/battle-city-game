const Namespace = (function () {
	'use strict'

	// класс задания пространств имен
	// Если не хотите привязываться к какому-то фреймворку, для реализации пространства имен можно написать нечто вроде этого

	class Namespace extends Singleton {
		static init

		constructor (object_value = new Object(), object_namespace = '') {
			super()
			this.init = this.init || Namespace.init
			this.set(object_value, object_namespace)
		}

		set (object_value = new Object(), object_namespace = '') {
			// object_value - значение для конечного свойства пространства имен (SomeBigSubnamespace)
			// object_name - имя пространства имен ('SomeCompany.SomeBigNamespace.SomeBigSubnamespace')

			let object_name = this.init
			// если передано значение для подпространства имен объекта (класса), добавляем его имя к имени пространства имен
			// object_name = Game | 'BattleCityGame.GameEngine' => 'BattleCityGame.GameEngine.Game'
			if (object_namespace) {
				object_name += '.' + object_namespace
			}
			// если передано значение для объекта (класс), добавляем его имя к имени пространства имен
			// object_value = Scene | 'BattleCityGame.GameEngine' => 'BattleCityGame.GameEngine.Scene'
			// object_name = Game | 'BattleCityGame.GameEngine.Game' => 'BattleCityGame.GameEngine.Game.Scene'
			if (object_value.name) {
				object_name += '.' + object_value.name
			}
			console.log(object_name)

			let objects = object_name.split('.') // преобразуем строку в массив по разделителю ('.')

			let parent = window; // базовый объект (родитель) - для перебора всех свойств объекта пространства имен
			for (let object of objects) {
				// проверяем свойство в родительском объекте - 'SomeCompany' in window
				if (!parent[object]) {
					parent[object] = new Object()
				}

				// если это последнее свойство пространства имен (SomeBigSubnamespace), присваиваем ему переданное значение
				if (object === object_value.name) parent[object] = object_value

				parent = parent[object] // перезаписываем в родителя текущий объект (window => 'SomeCompany')
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