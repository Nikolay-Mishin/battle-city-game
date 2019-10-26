;(function () {
	'use strict'
	
	class Loader {
		constructor () {
			// очередь на загрузку - хранит данные, которые должны быть загружены методом load()
			this.loadOrder = {
				images: [],
				jsons: [],
				sounds: []
			}

			// хранилище ресурсов - хранит ресурсы, загруженные метод load() из очереди загрузки
			this.resources = {
				images: [],
				jsons: [],
				sounds: []
			}
		}

		// добавляет изображение в очередь на загрузку
		addImage (name, src) {
			this.loadOrder.images.push({ name, src })
		}

		// добавляет json файл в очередь на загрузку
		addJson (name, address) {
			this.loadOrder.jsons.push({ name, address })
		}

		addSound(name, src) {
			this.loadOrder.sounds.push({ name, src })
		}

		// получает изображение из ресурсов по имени
		getImage (name) {
			return this.resources.images[name]
		}

		// получает json из ресурсов по имени
		getJson (name) {
			return this.resources.jsons[name]
		}

		getSound(name) {
			return this.resources.sounds[name]
		}

		// загружает данные из очереди загрузки (loadOrder) и сохраняет их в хранилище ресурсов (resources)
		// после загрузки ресурсов вызываем callback-функцию переданную в качестве аргумента
		load (callback) {
			const promises = [] // массив для хранения всех промисов

			// обрабатываем все изображения из очереди загрузки
			for (const imageData of this.loadOrder.images) {
				// деструктуризация объекта - чтобы не обращаться к свойствам объекта, сразу их вытаскиваем в переменные
				const { name, src } = imageData // свойства name, src текущего изображения записываем в соответствующие переменные

				// в текущий промис записываем результат выполнения метода загрузки изображения (return new Promise())
				// then - подписываем на результат выполнения данного промиса и выполняем callback-функцию
				const promise = Loader
					.loadImage(src) // загружаем текущее изображение из указанного пути
					// выполняем callback-функцию после успешной загрузки изображения и подписываемся на resolve()
					.then(image => {
						// image - получаем из resolve() (то, что попадает в resolve() после попадает в then())
						// записываем в массив изображений в хранилище ресурсов, полученное изображение с именем в качестве индекса
						this.resources.images[name] = image

						// удаляем загруженный ресурс из очереди на загрузку
						if (this.loadOrder.images.includes(imageData)) {
							const index = this.loadOrder.images.indexOf(imageData) // получаем индекс текущего изображения
							this.loadOrder.images.splice(index, 1) // удаляем 1 элемент массива начиная с указанного индекса
						}
					})

				promises.push(promise) // добавляем полученный промис в массив всех промисов
			}

			// обрабатываем все json файлы из очереди загрузки
			for (const jsonData of this.loadOrder.jsons) {
				const { name, address } = jsonData

				const promise = Loader
					.loadJson(address)
					.then(json => {
						this.resources.jsons[name] = json
						
						if (this.loadOrder.jsons.includes(jsonData)) {
							const index = this.loadOrder.jsons.indexOf(jsonData)
							this.loadOrder.jsons.splice(index, 1)
						}
					})

				promises.push(promise)
			}

			for (const soundData of this.loadOrder.sounds) {
				const { name, src } = soundData

				const promise = Loader
					.loadSound(src)
					.then(audio => {
						this.resources.sounds[name] = audio

						if (this.loadOrder.sounds.includes(soundData)) {
							const index = this.loadOrder.sounds.indexOf(soundData)
							this.loadOrder.sounds.splice(index, 1)
						}
					})

				promises.push(promise)
			}

			// выполняем все промисы и подписываем на результат выполнения (resolve() - выполняем callback-функцию)
			Promise.all(promises).then(callback)
		}

		// загружает избражение
		static loadImage (src) {
			// возвращаем промис
			// промис - это функция, которая позволяет обернуть логику с асинхронным кодом (нужно время на выполнение - ajax и др)
			// resolve - вызывается при успехе (когда нужный процесс завершен - получили аудио, изображение)
			// reject - вызывается в случае ошибки
			return new Promise((resolve, reject) => {
				// если в данном блоке возникает ошибка, то мы ее обрабатываем в блоке catch
				try {
					const image = new Image // загружаем изображение с помощью класса Image
					image.onload = () => resolve(image) // вешаем обработчик на событие загрузки изображения
					image.src = src // в свойство src указываем путь, откуда необхоимо скачать изображение
				}
				
				catch (err) {
					reject(err) // возвращаем ошибку
				}
			})
		}

		// загружает json
		static loadJson (address) {
			return new Promise((resolve, reject) => {
				// отправляем ajax-запрос и получаем json-файл
				// fetch - аналог ajax, который возвращает Promise
				fetch(address)
					.then(result => result.json()) // интерпретируем result как json
					.then(result => resolve(result)) // подписываемся на результат получения данных (файла)
					.catch(err => reject(err)) // отлавливаем ошибки (catch - подписываемся на ошибки)
			})
		}

		static loadSound(src) {
			return new Promise((resolve, reject) => {
				try {
					const audio = new Audio
					audio.addEventListener('canplaythrough', () => resolve(audio))
					audio.src = src
				}

				catch (error) {
					reject(error)
				}
			})
		}

		// слияние json файлов - загружает tanks.json в tankInfo (users.json)
		joinJson (jsonTo, jsonFrom, propertyMerge, propertyTo) {
			// получаем данные файлав по их именам
			jsonTo = this.getJson(jsonTo)
			jsonFrom = this.getJson(jsonFrom)

			// проходим по всем элементам файла, в который выгружаем данные (users)
			for (const itemTo of jsonTo) {
				// если в файле, в который выгружаем данные нет свойства gameData, создаем его
				itemTo.gameData = itemTo.gameData || {}
				// фильтруем файл, из которого выгружаем данные (tanks), по соответветствию полей id
				// return tanks.id = users.gameData.tankId
				// возвращаем либо массив с 1 найденным элементом (tank с указанным id), либо пустой массив (length = 0)
				let itemFrom = jsonFrom.filter(function (item) {
					return item.id == itemTo.gameData[propertyMerge]
				});
				// в свойство propertyTo объекта gameData (users.gameData.tankInfo) выгружаем полученные данные
				// либо записываем строку, что данные отсутствуют
				itemTo.gameData[propertyTo] = itemFrom.length > 0 ? itemFrom[0] : 'Data not available'
				/* for (const itemFrom of jsonFrom) {
					if (itemTo.gameData[propertyMerge] == itemFrom.id) {
						itemTo.gameData[propertyTo] = itemFrom
						break
					}
				} */
			}
		}
	}
	
	namespace.set(Loader) // регистрируем класс Loader
})();