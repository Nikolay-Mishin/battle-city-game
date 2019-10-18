;(function () {
    'use strict'

    /*
     * отдельные сцены игры (меню, уровень, результат боя)
     * сцена - расширенный контейнер
     */

    class Scene {
        constructor (args = {}) {

        }

        /*
            autoStart - запускать сцену автоматически или нет
            по умолчанию false

            loading, update и init переопределяем на уровне конструктора
            bind(this) - копирует код функции и подменяет контекст (this - экземпляр данного класса)
            без bind this бы ссылался на объект args при определении параметров экземпляра класса

            loading - отвечает за загрузку ресурсов
            init - инициализирует (создает объекты) ресурсы

            parent - ссылается на Game
            this.add - вызываем метод контейнер и добавляем объект
            delete удаляет свойство из объекта
        */

    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Sprite = Sprite
    // регистрируем пространство имен BattleCityGame.GameEngine.Sprite в объекте window
    namespace.set('BattleCityGame.GameEngine.Scene', Scene) // регистрируем класс Sprite в объекте GameEngine
    // BattleCityGame.GameEngine.Sprite = Sprite // регистрируем класс Sprite в объекте GameEngine
})();