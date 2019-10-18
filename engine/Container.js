; (function () {
    'use strict'

    // Контейнер для хранения отображаемых объектов (спрайтов)
    // extends - наследование класса
    // Container наследуется от GameEngine.DisplayObject

    class Container extends GameEngine.DisplayObject {
        constructor(args = {}) {
            super(args) // метод super вызывает родительский конструктор (доступ к родителю идет через super - super.funA())
            this.displayObjects = [] // хранилище объектов контейнера (которые отображены на экране - спрайты)
        }

        // добавляет объект в контейнер (если такого объекта еще нет в списке)
        add(displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject) // добавляем отображаемый объект в свойство
                displayObject.setParent(this) // в качестве родителя объекта устанавливаем данный контейнер
            }
        }

        // удаляет объект из контейнера (если такой объект существует в списке)
        remove(displayObject) {
            if (this.displayObjects.includes(displayObject)) {
                const index = this.displayObjects.indexOf(displayObject) // получаем индекс данного объекта в контейнере
                this.displayObjects.splice(index, 1) // удаляем из контейнера 1 объект, начиная с найденного индекса
                displayObject.setParent(null) // удаляем родятеля
            }
        }

        // отрисовывает все объекты из контейнера
        draw(canvas, context) {
            // параметры трансформации контейнера применяются для всех displayObject
            context.save() // сохраняем текущее состояние контекста
            context.translate(this.x, this.y) // переназначает начало системы координат
            context.rotate(this.rotation) // поворачивает объект (по часовой стрелке)
            context.scale(this.scaleX, this.scaleY) // масштабирует объект

            // для каждого объекта вызываем метод draw() для отрисовки спрайта
            // для каждого displayObject применяются дополнительно индивидуальные параметры трансформации для данного объекта
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }

            context.restore() // восстанавливаем контекст
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Container = Container
    // регистрируем пространство имен BattleCityGame.GameEngine.Container в объекте window
    namespace.set('BattleCityGame.GameEngine.Container', Container) // регистрируем класс Container в объекте GameEngine
    // BattleCityGame.GameEngine.Container = Container // регистрируем класс Container в объекте GameEngine
})();