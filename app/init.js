const Init = (function () {
	'use strict'

	// класс инициализации
	// служит для инициализации конфигурационных файлов проекта и задания пространств имен

	class Init {
		constructor () {
			this.projectSetting
			this.settings
		}

		setConfig (address) {
			Waiter.showPreloader()
			Waiter.wait(() => {
				return new Promise((resolve, reject) => {
					// отправляем ajax-запрос и получаем json-файл
					// fetch - аналог ajax, который возвращает Promise
					fetch(address)
						.then(result => result.json()) // интерпретируем result как json
						.then(result => resolve(result)) // подписываемся на результат получения данных (файла)
						.catch(err => reject(err)) // отлавливаем ошибки (catch - подписываемся на ошибки)
				})
			})
				.then(json => {
					this.projectSetting = json[0].projectSetting
					this.settings = json[0].settings
					Waiter.showContent()
				})
		}
	}

	return new Init()
})();