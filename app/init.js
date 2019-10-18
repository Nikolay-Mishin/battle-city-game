const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame
const { Container, Loader, Renderer, Sprite } = GameEngine // записываем свойство Loader (класс) объекта GameEngine в константу

const loader = new Loader // создаем экземпляр класса Loader

let sprites = [] // значение по умолчанию для переменной спрайта

const renderer = new Renderer({
    width: 500,
    height: 500,
    background: 'gray',

    update(timestamp) {
        if (!sprites) return
        for (const sprite of sprites) {
            sprite.update(timestamp)
        }
        
    }
})