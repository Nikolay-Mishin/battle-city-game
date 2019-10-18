const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)
const { Container, Loader, Renderer, Sprite } = GameEngine // записываем свойство Loader (класс) объекта GameEngine в константу

const loader = new Loader // создаем экземпляр класса Loader

let container = null
let sprites = [] // значение по умолчанию для переменной спрайта

let sprite1 = null
let sprite2 = null

const renderer = new Renderer({
    width: 500,
    height: 500,
    background: 'gray',

    update(timestamp) {
        if (sprites.length < 1) return

        container.rotation = timestamp / 1000
        sprite1.rotation = timestamp / 1000
        sprite2.rotation = -timestamp / 1000
        // sprite.rotation = 0

        for (const sprite of sprites) {
            sprite.update(timestamp)
        }
        
    }
})