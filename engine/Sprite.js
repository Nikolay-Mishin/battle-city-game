; (function () {
    'use strict'

    /*
     * занимается непосредственно отрисовкой графики (только отрисовкой отдельного конкретного изображения)
     * отвечает за отрисовку отдельного изображения (или его участка)
     */

    class Sprite extends GameEngine.DisplayObject {
        constructor (texture, args = {}) {
            super(args) // метод super вызывает родительский конструктор (доступ к родителю идет через super - super.funA())

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

            // если не передана ширина, устанавливаем значение из фрейма
            if (args.width === undefined) {
                this.width = this.frame.width
            }

            // если не передана высота, устанавливаем значение из фрейма
            if (args.height === undefined) {
                this.height = this.frame.height
            }

            this.update = args.update || (() => { }) // задаем значение для метода update()
        }

        // отрисовывает спрайт на основе установленных свойств
        draw(canvas, context) {
            context.save() // сохраняем текущее состояние контекста
            context.translate(this.x, this.y) // переназначает начало системы координат
            context.rotate(-this.rotation) // поворачивает объект (против часовой стролки)
            context.scale(this.scaleX, this.scaleY) // масштабирует объект
            // ширину и высоту не умножаем на масштаб, тк scale используется в момент отрисовки спрайта

            // отрисовываем спрайт
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                // абсолютные координаты для отрисовки указывает без учета смещения (translate)
                this.absoluteX - this.x,
                this.absoluteY - this.y,
                this.width,
                this.height
            )

            context.restore() // восстанавливаем контекст
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