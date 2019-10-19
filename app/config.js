// создаем константы для более удобного обращения к путям файлов
const data = 'static/data'
const img = 'static/img'

let promise = new Promise((resolve, reject) => {
	// отправляем ajax-запрос и получаем json-файл
	// fetch - аналог ajax, который возвращает Promise
	fetch('app/config.json')
		.then(result => result.json()) // интерпретируем result как json
		.then(result => resolve(result)) // подписываемся на результат получения данных (файла)
		.catch(err => reject(err)) // отлавливаем ошибки (catch - подписываемся на ошибки)
})

var config = {}
promise.then((result) => {
	config = result
	console.log(config)
})
console.log(config)

namespace.set('BattleCityGame.GameEngine') // регистрируем пространство имен BattleCityGame в объекте window
const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)