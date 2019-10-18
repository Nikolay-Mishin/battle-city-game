;(function () {
    'use strict'

    /*
     * отдельные сцены игры (меню, уровень, результат бо€)
     * сцена - расширенный контейнер
     */

    class Scene {
        constructor (args = {}) {

        }

        /*
            autoStart - запускать сцену автоматически или нет
            по умолчанию false

            loading, update и init переопредел€ем на уровне конструктора
            bind(this) - копирует код функции и подмен€ет контекст (this - экземпл€р данного класса)
            без bind this бы ссылалс€ на объект args при определении параметров экземпл€ра класса

            loading - отвечает за загрузку ресурсов
            init - инициализирует (создает объекты) ресурсы

            parent - ссылаетс€ на Game
            this.add - вызываем метод контейнер и добавл€ем объект
            delete удал€ет свойство из объекта
        */

    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Sprite = Sprite
    // регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
    namespace.set('BattleCityGame.GameEngine.Scene', Scene) // регистрируем класс Sprite в объекте GameEngine
    // BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();