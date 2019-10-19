'use strict'

console.log('=> Init start - "app/config.js"')
console.log(init)

init.setConfig('app/config.json', () => {
	console.log('=> Init finish - "app/config.js"')
	console.log(init)
	const { GameEngine } = init.Project
	console.log(GameEngine)
})

new Namespace() // регистрируем пространство имен BattleCityGame.GameEngine в объекте window
// выгружаем свойство GameEngine из объекта BattleCityGame (деструктуризация)
const { GameEngine } = BattleCityGame
// const GameEngine = window[init.namespace] // задаем алиас для пространства имен проекта (BattleCityGame.GameEngine)