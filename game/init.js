const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)
const { Container, Loader, Renderer, Sprite } = GameEngine // записываем свойство Loader (класс) объекта GameEngine в константу

const loader = new Loader // создаем экземпляр класса Loader

let container = null
let sprites = [] // значение по умолчанию для переменной спрайта

const renderer = new Renderer({
    width: 500,
    height: 500,
    background: 'gray',

    update(timestamp) {
        if (sprites.length < 1) return

        // container.rotation = timestamp / 1000

        for (const sprite of sprites) {
            sprite.update(timestamp)
            // sprite.rotation = 0
        }
    }
})