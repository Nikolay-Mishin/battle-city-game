;(function () {
	'use strict'

	const event = Symbol()
	const stopEvent = Symbol()

	// отвечает за отработку событий при нажатии клавиш

	class Keyboard {
		constructor () {
			this.settings = {} // объект настроек клавиатуры
			this.events = {} // объект флагов (boolean) событий нажатия клавиш
			this.keys = {} // объект установленных клавиш

			// состояние нажатия по умолчанию

			const keyboard = this

			this.arrowUp = false
			this.arrowDown = false
			this.arrowLeft = false
			this.arrowRight = false
			this.space = false

			document.body.addEventListener('keydown', function (event) {
				switch (event.code) {
					case "ArrowUp":
						keyboard.arrowUp = true
						break

					case "ArrowDown":
						keyboard.arrowDown = true
						break

					case "ArrowRight":
						keyboard.arrowRight = true
						break

					case "ArrowLeft":
						keyboard.arrowLeft = true
						break

					case "Space":
						keyboard.space = true
						break
				}
			})

			document.body.addEventListener('keyup', function (event) {
				switch (event.code) {
					case "ArrowUp":
						keyboard.arrowUp = false
						break

					case "ArrowDown":
						keyboard.arrowDown = false
						break

					case "ArrowRight":
						keyboard.arrowRight = false
						break

					case "ArrowLeft":
						keyboard.arrowLeft = false
						break

					case "Space":
						keyboard.space = false
						break
				}
			})
		}

		// геттер текущего действия клавиатуры (массив)
		get event () {
			return this[event] || []
		}

		// сеттер текущего действия клавиатуры (массив)
		set event (value) {
			this[event] = this[event] || []
			this[event].push(value)
		}

		// геттер завершенного действия клавиатуры (массив)
		get stopEvent () {
			return this[stopEvent] || []
		}

		// сеттер завершенного действия клавиатуры (массив)
		set stopEvent (value) {
			if (value === null) {
				return this[stopEvent] = []
			}
			this[stopEvent] = this[stopEvent] || []
			this[stopEvent].push(value)
		}

		// инициализирует клавиатуру
		init (events) {
			// events - объект настроект клавиатуры (передается из конфигурации)

			// устанавливаем клавиши на основе объекта конфигурации
			this.settings = events // { event: key }
			
			const actions = Object.keys(events) // получаем список событий для клавиш
			for (const action of actions) {
				// устанавливаем события нажатия клавиш на основе объекта конфигурации
				this.events[action] = false // { event: false }
				// устанавливаем клавиши на основе объекта конфигурации
				this.keys[events[action]] = action // { key: event }
			}

			// событие нажатия клавиши
			this.addEvent('keydown')
			this.addEvent('keyup', false)
		}

		// добавляет событие нажатия клавиши
		addEvent (event, isPress = true) {
			const keyboard = this // keyboard - instance (экземпляр класса клавиатуры)
			
			document.body.addEventListener(event, function (event) {
				// event.preventDefault()

				if (isPress) {
					keyboard.checkKey(event)
				}
				
				if (event = keyboard.keys[event.code]) {
					keyboard.events[event] = isPress
					if (isPress) {
						// жобавляем активное событие, если такого еще нет в списке
						if (!keyboard.event.includes(event)) {
							keyboard.event = event
						}
					}
					else {
						const index = keyboard.event.indexOf(event) // получаем индекс данного объекта в массиве
						keyboard.event.splice(index, 1) // удаляем из массива 1 объект, начиная с найденного индекса
						keyboard.stopEvent = event // добавляем данное событие в список завершенных
					}
					console.log('event: ' + keyboard.event)
					console.log('stopEvent: ' + keyboard.stopEvent)
				}
			})
		}

		checkKey (event) {
			console.log(event)
			// location = 0 - клавиши без пары (a-z, 0-9, f1-f12, enter, tab, space, backspace)
			// location = 1 - левые клавиши с парой (shiftLeft, altLeft, ctrlLeft)
			// location = 2 - правые клавиши с парой (shiftRight, altRight, ctrlRight)
			// location = 3 - цифровая клавиатура (Num)
			console.log('location: ' + event.location)
			console.log('code: ' + event.code)
			console.log('key: ' + event.key)

			/*
			let ctrl_Z = event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)
			let key = event.key
			let phoneNumber = (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
				key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace'
			
			console.log('Ctrl + Z: ' + ctrl_Z)
			if (/^[a-z\d]$/i.test(key)) {
				console.log('Letter or number typed: ' + key)
			}
			console.log('PhoneNumber: ' + phoneNumber)
			*/
		}
	}
	
	namespace.set(Keyboard) // регистрируем класс Keyboard
})();