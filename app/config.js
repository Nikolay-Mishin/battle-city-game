init.setConfig('app/config.json')

console.log(init.namespace)
console.log('=> Scripts initiolize start')

new Namespace() // регистрируем пространство имен BattleCityGame.GameEngine в объекте window
// выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)
const { GameEngine } = BattleCityGame
// const GameEngine = window[init.namespace] // задаем алиас для пространства имен проекта (BattleCityGame.GameEngine)