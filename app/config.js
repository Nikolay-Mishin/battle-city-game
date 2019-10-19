init.setConfig('app/config.json')
console.log(init.namespace)

new Namespace() // регистрируем пространство имен BattleCityGame.GameEngine в объекте window
const { GameEngine } = BattleCityGame // выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)