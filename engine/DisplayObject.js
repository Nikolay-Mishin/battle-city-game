;(function () {
    'use strict'

    // Отвечает за отдельную сущность, которая будет отрисовываться (любой объект - спрайт, animationSprite, container...)

    class DisplayObject {
        constructor(args = {}) {
            // координаты точки отрисовки спрайта
            this.x = args.x || 0
            this.y = args.y || 0

            // ширина и высота спрайта
            this.width = args.width || 0
            this.height = args.height || 0

            // повород объкута (в радианах)
            this.rotation = args.rotation || 0

            // якорь спрайта - точка для позиционирования спрайта относительно canvas - % отношение к размеру спрайта
            this.anchorX = args.anchorX || 0
            this.anchorY = args.anchorY || 0

            // масштаб
            this.scaleX = args.scaleX || 1
            this.scaleY = args.scaleY || 1

            this.parent = null

            // если передан масштаб, устанавливаем его
            if (args.scale !== undefined) {
                this.setScale(args.scale)
            }
        }
        
        // геттер и сеттер - псевдо свойства класса, которые могут выступать в роли метода
        // обычно все геттеры и сеттеры идут сразу после конструктора
        // get (геттер) - вычисляемое на лету свойство (при обращении к нему)
        // set (сеттер) - используется, когда мы это значение задаем

        // absoluteX,Y - абсолютные координаты, относительно которых отрисовывается спрайт (с учетом координат якоря - anchor)
        // при получении абсолютных координат не умножаем на масштаб, тк scale используется в момент отрисовки спрайта
        
        get absoluteX() {
            return this.x - this.anchorX * this.width
        }
        
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
            return value
        }
        
        get absoluteY() {
            return this.y - this.anchorY * this.height
        }
        
        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
            return value
        }

        // устанавливает масштаб спрайта по X и Y
        setScale (scale) {
            this.scaleX = scale
            this.scaleY = scale
        }

        // устанавливает родителя текущего объекта
        setParent(parent) {
            // если родитель уже присутствует, удаляем его
            if (this.parent) {
                this.parent.remove(this)
            }

            // если родитель, передан, добавляем его в контейнер и записываем в свойство
            if (parent) {
                parent.add(this)
                this.parent = parent
            }
        }

        draw() { }

        /*
        // scaleX,Y - масштаб спрайта по X и Y

        get scaleX() {
            return this.width / this.frame.width
        }

        set scaleX(value) {
            this.width = this.frame.width * value
            return value
        }

        get scaleY() {
            return this.height / this.frame.height
        }

        set scaleY(value) {
            this.height = this.frame.height * value
            return value
        }
        */
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.DisplayObject = DisplayObject
})();