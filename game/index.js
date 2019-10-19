// объект сцены
const mainScene = new Scene({
	name: 'mainScene',
	autoStart: true,

	// метод загрузки ресурсов
	loading (loader) {
		// загружаем изображения - добавляем изображение в очередь на загрузку
		loader.addImage('bunny', `${img}/bunny.jpeg`)
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

		// создаем спрайт и его тело
		this.bunny = new Body(bunnyTexture, {
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
			},
			// метод обновления состояния спрайта
			update(timestamp) {
				// this.rotation = timestamp / 1000
			}
		})

		// добавляем спрайт в контейнер
		this.add(this.bunny) // порядок отрисовки совпадает с порядком добавления в контейнер

		// выгружаем данные из tanks в users.tankInfo по соответствию полей users.tankId и tanks.id
		loader.joinJson(loader.getJson("users"), loader.getJson("tanks"), 'tankId', 'tankInfo')
		// output for TankInfo loaded
		let usersTankInfo = []
		for (const user of loader.getJson("users")) {
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

		// для каждого объекта на сцене вызываем метод обновления состояния
		for (const sprite of this.stage) {
			sprite.update(timestamp)
		}
	}
})

// объект игры
const game = new Game({
	el: document.body, // объект, в который мы встраиваем канвас
	// параметры для инициализации канваса
	// передаем ширину и высоту для задания размера канваса
	width: 500,
	height: 500,
	background: 'green',
	// список сцен игры
	scenes: [mainScene]
})