Init.setConfig('app/config.json')
console.log(Init)

new Namespace('BattleCityGame.GameEngine') // регистрируем пространство имен BattleCityGame в объекте window
const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)