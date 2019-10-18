;(function () {
    'use strict'

    /*
     * тело спрайта - Collider
     * отвечает за пересечение (столкновение) 2 объектов
     */

    class Body extends GameEngine.Sprite {
        constructor (texture, args = {}) {

        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Body = Body
    // регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
    namespace.set('BattleCityGame.GameEngine.Body', Body) // регистрируем класс Body в объекте GameEngine
    // BattleCityGame.GameEngine.Body = Body // регистрируем класс Sprite в объекте GameEngine
})();