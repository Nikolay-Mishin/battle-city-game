const init = (function () {
	'use strict'

	// класс инициализации
	// служит для инициализации конфигурационных файлов проекта и задания пространств имен

	class Init extends Waiter {
		constructor() {
			super() // наследуем конструктор родителя

			// объекты настроек устанавливаемые из файла конфигурации
			this.projectSettings = null
			this.settings = null

			// объект проекта и ядра приложения
			this.project = null
			this.core = null
			this.namespace = null // глобальное пространство имен
		}

		get Project () {
			return this.project
		}

		set Project (value) {
			this.project = this.project
		}

		get Core () {
			return this.core
		}

		set Core (value) {
			this.core = this.core
		}

		get Namespace () {
			return this.namespace
		}

		set Namespace (value) {
			this.namespace = this.namespace
		}

		setConfig(address, callback) {
			this.showPreloader() // показываем прелоадер и скрываем контент
			/*
			this.wait(() => Init.getConfig(address))
				.then(json => {
					this.projectSetting = json[0].projectSetting
					this.settings = json[0].settings
					this.showContent() // показываем контент и скрываем прелоадер
				})
			*/
			const promise = Init.
				getConfig(address)
				.then(json => {
					for (const prop of Object.keys(json[0])) {
						this[prop] = json[0][prop]
					}
					this.project = window[`${this.projectSettings.name}`]
					this.core = this.Project[`${this.projectSettings.namespace}`]
					this.namespace = `${this.projectSettings.name}.${this.projectSettings.namespace}`
					console.log('=> Project namespace initiolized')
					new Namespace() // регистрируем пространство имен BattleCityGame.GameEngine в объекте window
					this.showContent() // показываем контент и скрываем прелоадер
				})
			Promise.all([promise]).then(callback) // выполняем все промисы
		}

		static getConfig(address) {
			return new Promise((resolve, reject) => {
				// отправляем ajax-запрос и получаем json-файл
				// fetch - аналог ajax, который возвращает Promise
				fetch(address)
					.then(result => result.json()) // интерпретируем result как json
					.then(result => resolve(result)) // подписываемся на результат получения данных (файла)
					.catch(err => reject(err)) // отлавливаем ошибки (catch - подписываемся на ошибки)
			})
		}
	}

	return new Init()
})();