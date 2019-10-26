'use strict'

console.log('=> "game/index.js"')
console.log(GameEngine)

const DEBUG_MODE = false

const game = new Game({
	el: document.body,
	width: 650,
	height: 650,
	background: 'black',
	scenes: [
		new Intro({ autoStart: false }),
		new Party({ autoStart: true })
	]
})