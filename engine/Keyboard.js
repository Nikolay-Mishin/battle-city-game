;(function () {
	'use strict'

	const keys = Symbol() // имя защищенного свойства объекта конфигурации

	// отвечает за отработку событий при нажатии клавиш

	class Keyboard {
		constructor () {
			// состояние нажатия по умолчанию
			this.arrowUp = false
			this.arrowDown = false
			this.arrowLeft = false
			this.arrowRight = false
			this.space = false
			this.enter = false
		}

		// геттер установленных клавиш
		get keys () {
			return this[keys]
		}

		// сеттер установленных клавиш
		set keys (events) {
			this[keys] = this[keys] || {}
			const actions = Object.keys(events)
			for (const action of actions) {
				this[keys][events[action]] = action // {key: action}
			}
		}

		// инициализирует клавиатуру
		init (events) {
			// events - объект действий клавиатуры (формируется из настроек)

			this.keys = events // устанавливаем клавиши на основе объекта действий
			console.log(events)
			console.log(this.keys)

			// событие нажатия клавиши
			this.addEvent('keydown')
			this.addEvent('keyup', false)
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
			console.log('Ctrl + Z: ' + ctrl_Z)

			let key = event.key
			if (/^[a-z\d]$/i.test(key)) {
				console.log('Letter or number typed: ' + key)
			}

			let phoneNumber = (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
				key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace'
			console.log('PhoneNumber: ' + phoneNumber)
		}

		// добавляет событие нажатия клавиши
		addEvent (event, isPress = true) {
			const keyboard = this // keyboard - instance (экземпляр класса клавиатуры)

			document.body.addEventListener(event, function (event) {
				// event.preventDefault()

				if (isPress) {
					keyboard.checkKey(event)
				}

				// event.code - код клавиши
				switch (event.code) {
					case "ArrowUp":
						keyboard.arrowUp = isPress
						break

					case "ArrowDown":
						keyboard.arrowDown = isPress
						break

					case "ArrowRight":
						keyboard.arrowRight = isPress
						break

					case "ArrowLeft":
						keyboard.arrowLeft = isPress
						break

					case "Space":
						keyboard.space = isPress
						break
					case "Enter":
						keyboard.enter = isPress
						break
				}
			})
		}
	}
	
	namespace.set(Keyboard) // регистрируем класс Keyboard
})();