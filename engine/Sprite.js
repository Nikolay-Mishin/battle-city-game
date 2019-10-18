;(function () {
    'use strict'

    /*
     * занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
     * отвечает за отрисовку отдельного изображения (или его участка)
     */

    class Sprite {
        constructor (texture, args = {}) {
            this.texture = texture // переданное изображение (спрайт)

            const frame = args.frame || {} // участок изображения, который требуется отрисовать (по умолчанию весь спрайт)

            // определяем параметры фрейма
            this.frame = {
                // координаты точки начала отрисовываемого участка
                x: frame.x || 0,
                y: frame.y || 0,
                // ширина и высота отрисовываемой области
                width: frame.width || texture.width,
                height: frame.height || texture.height
            }

            // координаты точки отрисовки спрайта
            this.x = args.x || 0
            this.y = args.y || 0
            // якорь спрайта - точка для позиционирования спрайта относительно canvas - % отношение к размеру спрайта
            this.anchorX = args.anchorX || 0
            this.anchorY = args.anchorY || 0
            // ширина и высота спрайта
            this.width = args.width || this.frame.width
            this.height = args.height || this.frame.height

            // если передан масштаб, устанавливаем его
            if (args.scale !== undefined) {
                this.setScale(args.scale)
            }

            this.update = args.update || (() => { }) // задаем значение для метода update()
        }

        // устанавливает масштаб спрайта по X и Y (с помощью сеттеров)
        setScale (value) {
            this.scaleX = value
            this.scaleY = value
        }

        // absoluteX,Y - абсолютные координаты, относительно которых отрисовывается спрайт (с учетом координат якоря - anchor)
        // геттер и сеттер - псевдо свойства класса, которые могут выступать в роли метода

        // геттер - вычисляемое на лету свойство (при обращении к нему)
        get absoluteX () {
            return this.x - this.anchorX * this.width
        }

        // сеттер - используется, когда мы это значение задаем
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
            return value
        }
        
        get absoluteY () {
            return this.y - this.anchorY * this.height
        }
        
        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
            return value
        }

        // scaleX,Y - масштаб спрайта по X и Y

        get scaleX () {
            return this.width / this.frame.width
        }

        set scaleX (value) {
            this.width = this.frame.width * value
            return value
        }

        get scaleY () {
            return this.height / this.frame.height
        }

        set scaleY (value) {
            this.height = this.frame.height * value
            return value
        }

        // отрисовывает спрайт на основе установленных свойств
        draw (canvas, context) {
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                this.absoluteX,
                this.absoluteY,
                this.width,
                this.height
            )
        }

        update (timestamp) {
            this.update(timestamp) // вызываем метод обновления
        }

        // изменяет параметры созданного спрайт
        // если не хотим менять значения данного свойства, не передаем его
        /* 
         { 
            absolutePos: { x: 50, y: 100},
            frame: { x: 100, y: 100, w: 200, h: 200 } 
         }
         */
        // { absolutePos: { x: 50, y: null } } // дефолтное значение для свойства, передаем свойство null
        // { absolutePos: null } // дефолтные значения для всего блока, передаем null в свойство блока
        changeSprite(args = {}) {
            // absoluteX,Y - абсолютные координаты, относительно которых отрисовывается спрайт
            // устанавливаем значения для свойств блока 'absolutePos' либо оставляем без изменения
            if (args.absolutePos && Object.keys(args.absolutePos).length > 0) {
                // если свойство не передано, оставляем значение без изменения
                // если свойство передано, берем его значение (если null, устанавливаем дефолтное значение)
                this.absoluteX = !args.absolutePos.hasOwnProperty('x') ? this.absoluteX : (args.absolutePos.x || 0)
                this.absoluteY = !args.absolutePos.hasOwnProperty('y') ? this.absoluteY : (args.absolutePos.y || 0)
            }
            // устанавливаем дефолтные значения для блока 'absolutePos'
            else if (args.hasOwnProperty('absolutePos') && args.absolutePos == null) {
                this.absoluteX = 0
                this.absoluteY = 0
            }

            // своства спрайта
            // устанавливаем значения для свойств блока 'sprite' либо оставляем без изменения
            if (args.sprite && Object.keys(args.sprite).length > 0) {
                // координаты начала отрисовки спрайта
                this.x = !args.sprite.hasOwnProperty('x') ? this.x : (args.sprite.x || 100)
                this.y = !args.sprite.hasOwnProperty('y') ? this.y : (args.sprite.y || 300)
                // ширина и высота спрайта
                this.width = !args.sprite.hasOwnProperty('w') ? this.width : (args.sprite.width || 100)
                this.height = !args.sprite.hasOwnProperty('h') ? this.height : (args.sprite.height || 100)
            }
            // устанавливаем дефолтные значения для блока 'sprite'
            else if (args.hasOwnProperty('sprite') && args.sprite == null) {
                this.x = 100
                this.y = 300
                this.width = 100
                this.height = 100
            }

            // отдельный участок изображения, который необходимо отрисовать
            // устанавливаем значения для свойств блока 'frame' либо оставляем без изменения
            if (args.frame && Object.keys(args.frame).length > 0) {
                this.frame.x = !args.frame.hasOwnProperty('x') ? this.frame.x : (args.frame.x || 278)
                this.frame.y = !args.frame.hasOwnProperty('y') ? this.frame.y : (args.frame.y || 250)
                this.frame.width = !args.frame.hasOwnProperty('w') ? this.frame.width : (args.frame.width || 200)
                this.frame.height = !args.frame.hasOwnProperty('h') ? this.frame.height : (args.frame.height || 170)
            }
            // устанавливаем дефолтные значения для блока 'frame'
            else if (args.hasOwnProperty('frame') && args.frame == null) {
                this.frame.x = 278
                this.frame.y = 250
                this.frame.width = 200
                this.frame.height = 170
            }
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Sprite = Sprite
    // регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
    namespace.set('BattleCityGame.GameEngine.Sprite', Sprite) // регистрируем класс Sprite в объекте GameEngine
    // BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();