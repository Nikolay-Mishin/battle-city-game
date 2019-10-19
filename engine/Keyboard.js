;(function () {
	'use strict'

	// отвечает за отработку событий при нажатии клавиш

	class Keyboard {
		constructor () {
			const keyboard = this // instance (экземпляр класса клавиатуры)

			// состояние нажатия по умолчанию
			this.arrowUp = false
			this.arrowDown = false
			this.arrowLeft = false
			this.arrowRight = false
			this.space = false

			// событие нажатия клавиши
			document.body.addEventListener('keydown', function (event) {
				// event.code - код клавиши
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

			// событие отпускания клавиши
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
	}
	
	new Namespace(Keyboard) // регистрируем класс Keyboard
})();