;(function () {
    'use strict'

    // Контейнер для хранения отображаемых объектов (спрайтов)

    class Container {
        constructor () {
            this.displayObjects = [] // хранилище объектов контейнера (которые отображены на экране - спрайты)
        }

        // добавляет объект в контейнер (если такого объекта еще нет в списке)
        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject)
            }
        }

        remove () {}

        // отрисовывает все объекты из контейнера
        draw (canvas, context) {
            // для каждого объекта вызываем метод draw() для отрисовки спрайта
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Container = Container
    // регистрируем пространство имен BattleCityGame.GameEngine.Container в объекте window
    namespace.set('BattleCityGame.GameEngine.Container', Container) // регистрируем класс Container в объекте GameEngine
    // BattleCityGame.GameEngine.Container = Container // регистрируем класс Container в объекте GameEngine
})();