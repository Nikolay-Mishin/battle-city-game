;(function () {
	'use strict'
	
	// отвечает за обработку отрисовываемой графики (занимается обработкой самой графики в целом)
	// отвечает за то, чтобы у нас был canvas (область для отрисовки графики)
	// обеспечивает возможность отрисовки графики с помощью Sprite

	class Renderer {
		constructor (args = {}) {
			this.canvas = document.createElement('canvas') // создаем DOM-элемент канвас (область отрисовки графики)
			this.context = this.canvas.getContext('2d') // задаем контекст нашего канваса
			
			this.background = args.background || 'black' // устанавливаем цвет фона канваса
			// устанавливаем ширину и высоту канваса
			this.canvas.width = args.width || 50
			this.canvas.height = args.height || 50
			this.update = args.update || (() => {}) // задаем значение для метода update()

			this.stage = new GameEngine.Container() // контейнер класса Рендер (экземпляр объекта)
		}

		/*
		// геттер для получения списка отрисовываемых объектов
		get displayObjects () {
			// возвращает список отрисовываемых объектов на основе контейнера Рендера
			return _getDisplayObjects(this.stage)

			// внутренняя функция метода - изолирует данныую функцию от доступа извне
			function _getDisplayObjects(container, result = []) {
				// проходим по всем объектам в контейнере
				for (const displayObject of container.displayObjects) {
					// ищем объекты не являющиеся контейнером
					// если текущий объект является экземпляром класса Container
					// тогда рекурсивно вызываем функцию и передаем в нее текущий объект и массив с отрисовываемыми объектами
					if (displayObject instanceof GameEngine.Container) {
						_getDisplayObjects(displayObject, result)
					}
					// иначе в массив с результатами добавляем текущий объект
					else {
						result.push(displayObject)
					}
				}

				return result
			}
		}
		*/

		// очищает область canvas
		clear () {
			this.context.fillStyle = this.background // задаем цвет области
			this.context.beginPath() // мотод для начала отрисовки канваса
			this.context.rect(0, 0, this.canvas.width, this.canvas.height) // задаем квадратную область
			this.context.fill() // очищаем содержимое области
		}
	}

	new Namespace('BattleCityGame.GameEngine.Renderer', Renderer) // регистрируем класс Renderer
})();