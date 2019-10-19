﻿// объект сцены
const mainScene = new Scene({
	name: 'mainScene',
	autoStart: true,

	// метод загрузки ресурсов
	loading (loader) {
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
		this.bunny1 = new Body(bunnyTexture, {
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
		
		this.add(this.bunny1) // добавляем спрайт в контейнер
		
		this.tank1 = new Body(tankTexture, {
			scale: 0.1,
			anchorX: 0.2,
			anchorY: 0.2,
			x: 100,
			y: 100
		})

		this.add(this.tank1)
		
		this.tank2 = new Body(tankTexture, {
			scale: 0.2,
			anchorX: 0.65,
			anchorY: 0.65,
			x: this.parent.renderer.canvas.width,
			y: this.parent.renderer.canvas.height,
		})

		this.add(this.tank2)

		this.bunny2 = new Body(bunnyTexture, {
			scale: 0.15,
			anchorX: 0.5,
			anchorY: 0.5,
			// координаты спрайта - 1/2 от размеров канваса (устанавливаем по-середине)
			x: this.parent.renderer.canvas.width / 2,
			y: 100,
			debug: false, // отображаем тело спрайта
			// тело спрайта
			body: {
				x: 0.15,
				y: 0.35,
				width: 0.5,
				height: 0.3
			}
		})

		this.add(this.bunny2)

		// выгружаем данные из tanks в users.tankInfo по соответствию полей users.tankId и tanks.id
		loader.joinJson('users', 'tanks', 'tankId', 'tankInfo')
		// output for TankInfo loaded
		let usersTankInfo = []
		for (const user of loader.getJson('users')) {
			usersTankInfo.push(user.gameData.tankInfo)
		}
		console.log('TankInfo loaded in users.gameData from tanks')
		console.log(usersTankInfo)
	},

	// метод обновления состояния спрайта
	update (timestamp) {
		const { keyboard } = this.parent // в качестве объекта клавиатуры записываем Game

		let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200 // скорость поворота

		// обрабатываем нажатия клавиш

		if (keyboard.arrowUp) {
			this.bunny.rotation += speedRotation
		}

		if (keyboard.arrowDown) {
			this.bunny.rotation -= speedRotation
		}

		this.bunny1.rotation = timestamp / 1000

		this.tank1.rotation = timestamp / 1000

		this.tank2.x = this.parent.renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200)

		this.bunny2.x = this.parent.renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200)
		this.bunny2.frame.x = this.bunny2.texture.width / 4 + 200 * Math.cos(timestamp / 200)
		this.bunny2.frame.y = this.bunny2.texture.height / 3 + 200 * Math.sin(timestamp / 200)
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
	scenes: [mainScene]
})