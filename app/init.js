const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)
const { Body, Game, Scene, Point, Line, Container } = GameEngine

let container = null
let sprites = [] // хранилище спрайтов