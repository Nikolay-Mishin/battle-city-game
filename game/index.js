'use strict'

// выгружаем свойства из объекта GameEngine (деструктуризация)
const { Game, Scene, Body, Controller, Point, Line } = GameEngine
const { MainController } = Controller

console.log('=> "game/main.js"')
console.log(GameEngine)

/*
 * Повторить код урока. Добиться чтобы код работал так же как.
 * Написать 3 сцены:
 * Стартовая сцена, приветствующая пользователя и предлагающая сыграть в игру. При нажатии на space 1-й сцена завершается и начинается 2-я сцена.
 * Во второй сцене сделать персонажа и управление этим персонажем на стрелочках. Персонажу нужно пройти от верхнего левого угла в нижний правый. После прохождения 2-я сцена завершается и начинается 3-я.
 * Поздравляет пользователя с прохождением игры
 * Доп задание: написать класс Mouse. Добавить экземпляр класса в game на стадии конструктора. Добавить метод в container, который позволяет получить массив спрайтов, находящихся под мышкой.
 * */

// объект сцены
const helloScene = new Scene({
	name: 'mainScene',
	autoStart: true,
	// параметры контейнера (применяются глобально ко всей сцене и ее объектам)
	x: 100,
	y: 200,
	scale: 0.6,

	// метод загрузки ресурсов
	loading(loader) {
		// загружаем изображения - добавляем изображение в очередь на загрузку
		loader.addImage('bunny', `${img}/bunny.jpeg`)
		loader.addImage('tank', `${img}/tank.png`)
		// загружаем данные (json файлы) - добавляем json файл в очередь на загрузку
		loader.addJson('persons', `${data}/persons.json`)

		loader.addJson('users', `${data}/user/users.json`)
		loader.addJson('tanks', `${data}/game/tanks.json`)
	},

	// метод инициализации сцены - создаем объекты загруженных ресурсов
	init() {
		const loader = this.parent.loader

		// получаем изображение - ссылаемся на свойство loader родителя (Game)
		const bunnyTexture = loader.getImage('bunny')
		const tankTexture = loader.getImage('tank')

		// порядок отрисовки совпадает с порядком добавления в контейнер

		// создаем спрайт и его тело
		this.sceneObjects.bunny1 = new BunnyController(bunnyTexture, {
			scale: 0.25,
			anchorX: 0.5,
			anchorY: 0.5,
			// координаты спрайта - 1/2 от размеров канваса (устанавливаем по-середине)
			x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			debug: true, // отображаем тело спрайта
			// тело спрайта
			body: {
				x: 0,
				y: 0.5,
				width: 1,
				height: 0.5
			}
		})
		
		this.add(this.sceneObjects.bunny1) // добавляем спрайт в контейнер
		
		this.sceneObjects.tank1 = new Body(tankTexture, {
			scale: 0.1,
			anchorX: 0.2,
			anchorY: 0.2,
			x: 100,
			y: 100
		})

		this.add(this.sceneObjects.tank1)
		
		this.sceneObjects.tank2 = new Body(tankTexture, {
			scale: 0.2,
			anchorX: 0.65,
			anchorY: 0.65,
			x: this.parent.renderer.canvas.width,
			y: this.parent.renderer.canvas.height,
		})

		this.add(this.sceneObjects.tank2)

		this.sceneObjects.bunny2 = new Body(bunnyTexture, {
			scale: 0.15,
			anchorX: 0.5,
			anchorY: 0.5,
			// координаты спрайта - 1/2 от размеров канваса (устанавливаем по-середине)
			x: this.parent.renderer.canvas.width / 2,
			y: 100,
			debug: true, // отображаем тело спрайта
			// тело спрайта
			body: {
				x: 0.15,
				y: 0.35,
				width: 0.5,
				height: 0.3
			}
		})

		this.add(this.sceneObjects.bunny2)

		// выгружаем данные из tanks в users.tankInfo по соответствию полей users.tankId и tanks.id
		loader.joinJson('users', 'tanks', 'tankId', 'tankInfo')
		// output for TankInfo loaded
		let usersTankInfo = []
		for (const user of loader.getJson('users')) {
			usersTankInfo.push(user.gameData.tankInfo)
		}
		console.log('=> TankInfo loaded in users.gameData from tanks')
		console.log(usersTankInfo)
	},

	// метод обновления состояния спрайта
	update (timestamp) {
		const { keyboard } = this.parent // в качестве объекта клавиатуры записываем объект событий нажатия клавиш
		const { events } = keyboard // в качестве объекта клавиатуры записываем объект событий нажатия клавиш

		this.eventControllers(timestamp)

		this.sceneObjects.tank1.rotation = timestamp / 1000

		this.sceneObjects.tank2.x = this.parent.renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200)

		this.sceneObjects.bunny2.x = this.parent.renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200)
		this.sceneObjects.bunny2.frame.x = this.sceneObjects.bunny2.texture.width / 4 + 200 * Math.cos(timestamp / 200)
		this.sceneObjects.bunny2.frame.y = this.sceneObjects.bunny2.texture.height / 3 + 200 * Math.sin(timestamp / 200)

		game.changeScene(['beginScene'], events.enter) // меняем сцену по нажатию Enter
	}
})

const beginScene = new Scene({
	name: 'beginScene',
	autoStart: false,

	loading(loader) {
		loader.addImage('start', 'static/start.jpg')
	},

	init() {
		const startButtonTexture = this.parent.loader.getImage('start')

		this.start = new Body(startButtonTexture, {
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			width: this.parent.renderer.canvas.width,
			height: this.parent.renderer.canvas.height,
			debug: false,
		})
		this.add(this.start)
	},

	update() {
		const { keyboard } = this.parent
		if (keyboard.space) {
			game.addScene(tankScene)
			game.finishScene(beginScene)
			game.startScene(tankScene)
		}
	}

})

const finalScene = new Scene({
	name: 'finalScene',
	autoStart: false,

	loading(loader) {
		loader.addImage('final', 'static/final.jpg')
	},

	init() {
		const finalTexture = this.parent.loader.getImage('final')

		this.final = new Body(finalTexture, {
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			width: this.parent.renderer.canvas.width,
			height: this.parent.renderer.canvas.height,
			debug: false,
		})
		this.add(this.final)
	}

})

const tankScene = new Scene({
	name: 'tankScene',
	autoStart: false,

	loading(loader) {
		loader.addImage('tank', 'static/tank.jpg')
		loader.addImage('bonus', 'static/bonus.jpg')
		loader.addImage('wall', 'static/wall.jpg')
	},

	init() {
		const tankTexture = this.parent.loader.getImage('tank')

		this.tank = new Body(tankTexture, {
			scale: 1,
			anchorX: 0.5,
			anchorY: 0.5,
			x: 25,
			y: 25,
			// width: this.parent.renderer.canvas.width,
			// height: this.parent.renderer.canvas.height,
			debug: false,
			body: {
				x: 0,
				y: 0,
				width: 1,
				height: 1
			}

		})
		this.add(this.tank)

		const bonusTexture = this.parent.loader.getImage('bonus')

		this.bonus = new Body(bonusTexture, {
			scale: 1,
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width - 30,
			y: this.parent.renderer.canvas.height - 30,

		})
		this.add(this.bonus)

		const wallPosition = [
			{ x: 50, y: 300 },
			{ x: 100, y: 100 },
			{ x: 100, y: 150 },
			{ x: 100, y: 200 },
			{ x: 100, y: 300 },
			{ x: 100, y: 350 },
			{ x: 100, y: 450 },
			{ x: 150, y: 100 },
			{ x: 150, y: 350 },
			{ x: 150, y: 450 },
			{ x: 200, y: 200 },
			{ x: 200, y: 250 },
			{ x: 200, y: 350 },
			{ x: 200, y: 450 },
			{ x: 250, y: 50 },
			{ x: 250, y: 100 },
			{ x: 250, y: 150 },
			{ x: 250, y: 200 },
			{ x: 250, y: 450 },
			{ x: 300, y: 200 },
			{ x: 300, y: 300 },
			{ x: 300, y: 350 },
			{ x: 300, y: 400 },
			{ x: 300, y: 450 },
			{ x: 350, y: 100 },
			{ x: 350, y: 300 },
			{ x: 400, y: 100 },
			{ x: 400, y: 150 },
			{ x: 400, y: 200 },
			{ x: 400, y: 300 },
			{ x: 400, y: 400 },
			{ x: 400, y: 450 },
			{ x: 400, y: 500 }
		]

		for (let i = 0; i < wallPosition.length; i++) {
			addWall(wallPosition[i].x - 22, wallPosition[i].y - 25, this)
		}

		function addWall(xPosition, yPosition, scene) {
			const wallTexture = scene.parent.loader.getImage('wall')

			scene.wall = new Body(wallTexture, {
				scale: 1,
				anchorX: 0.5,
				anchorY: 0.5,
				x: xPosition,
				y: yPosition,
				// width: this.parent.renderer.canvas.width,
				// height: this.parent.renderer.canvas.height,
				debug: false,
				body: {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				}

			})
			scene.add(scene.wall)
		}
	},

	update() {
		const myTank = this.displayObjects[0]

		const { keyboard } = this.parent
		let moveRight = true
		let moveLeft = true
		let moveUp = true
		let moveDown = true

		for (let i = 1; i < this.displayObjects.length; i++) {
			const compareRight = (this.displayObjects[i].x > myTank.x && Math.abs(this.displayObjects[i].x - myTank.x) < 50 && Math.abs(this.displayObjects[i].y - myTank.y) < 49)
			const compareDown = (this.displayObjects[i].y > myTank.y && Math.abs(this.displayObjects[i].y - myTank.y) < 50 && Math.abs(this.displayObjects[i].x - myTank.x) < 49)
			const compareLeft = (this.displayObjects[i].x < myTank.x && Math.abs(myTank.x - this.displayObjects[i].x) < 50 && Math.abs(myTank.y - this.displayObjects[i].y) < 49)
			const compareup = (this.displayObjects[i].y < myTank.y && Math.abs(myTank.y - this.displayObjects[i].y) < 50 && Math.abs(myTank.x - this.displayObjects[i].x) < 49)
			if (compareRight) {
				moveRight = false
			}
			if (compareDown) {
				moveDown = false
			}
			if (compareLeft) {
				moveLeft = false
			}
			if (compareup) {
				moveUp = false
			}

		}

		if (keyboard.arrowUp) {
			this.tank.rotation = Math.PI * 3 / 2
			if (moveUp && this.tank.y - this.tank.height / 2 > 0) {
				this.tank.y -= 1
			}
		}

		else if (keyboard.arrowDown) {
			this.tank.rotation = Math.PI / 2
			if (moveDown && this.tank.y + this.tank.height / 2 < this.parent.renderer.canvas.height) {
				this.tank.y += 1
			}
		}

		else if (keyboard.arrowRight) {
			this.tank.rotation = 0
			if (moveRight && this.tank.x + this.tank.width / 2 < this.parent.renderer.canvas.width) {
				this.tank.x += 1
			}
		}

		else if (keyboard.arrowLeft) {
			this.tank.rotation = Math.PI
			if (moveLeft && this.tank.x - this.tank.width / 2 > 0) {
				this.tank.x -= 1
			}
		}

		if (this.tank.x > this.parent.renderer.canvas.width - 80 && this.tank.y > this.parent.renderer.canvas.height - 80) {
			game.addScene(finalScene)
			game.finishScene(tankScene)
			game.startScene(finalScene)
		}

	}



})

// объект игры
const game = new Game({
	el: document.getElementById('game'), // объект, в который мы встраиваем канвас
	// параметры для инициализации канваса
	// передаем ширину и высоту для задания размера канваса
	width: 500,
	height: 500,
	background: 'green',
	// список сцен игры
	scenes: [helloScene, beginScene]
})