;(function () {
	'use strict'

	const event = Symbol()

	// отвечает за отработку событий при нажатии клавиш

	class Keyboard {
		constructor () {
			this.settings = {} // объект настроек клавиатуры
			this.events = {} // объект флагов (boolean) событий нажатия клавиш
			this.keys = {} // объект установленных клавиш

			// состояние нажатия по умолчанию
			this.arrowUp = false
			this.arrowDown = false
			this.arrowLeft = false
			this.arrowRight = false
			this.space = false
			this.enter = false
		}

		// геттер текущего действия клавиатуры (массив)
		get event () {
			return this[event]
		}

		// сеттер текущего действия клавиатуры (массив)
		set event (value) {
			this[event] = this[event] || []
			this[event] = value
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

			console.log(this.settings)
			console.log(this.events)
			console.log(this.keys)

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
						keyboard.event.push(event)
					}
					else {
						const index = keyboard.event.indexOf(event) // получаем индекс данного объекта в массиве
						this.event.splice(index, 1) // удаляем из массива 1 объект, начиная с найденного индекса
					}
					console.log('event: ' + keyboard.event)
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

			let ctrl_Z = event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)
			let key = event.key
			let phoneNumber = (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
				key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace'

			/*
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