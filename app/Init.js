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

		set Project(project) {
			this.project = project
			return project
		}

		get Core () {
			return this.core
		}

		set Core(core) {
			this.core = core
			return core
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
					this.projectSetting = json[0].projectSetting
					this.settings = json[0].settings
					this.namespace = `${this.projectSetting.name}.${this.projectSetting.namespace}`
					this.settings = json[0].settings
					this.namespace = `${this.projectSetting.name}.${this.projectSetting.namespace}`
					console.log('=> Project namespace initiolized')
					console.log(this.namespace)
					this.showContent() // показываем контент и скрываем прелоадер
				})
			Promise.all([promise]) // выполняем все промисы
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