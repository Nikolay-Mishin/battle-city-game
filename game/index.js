document.body.append(renderer.canvas) // добавляем на страницу канвас, созданные с помощью класса Рендер

// загружаем изображения - добавляем изображение в очередь на загрузку
loader.addImage('tank', `${img}/favicon-full.png`)
loader.addImage('bunny', `${img}/bunny.jpeg`)

// загружаем данные (json файлы) - добавляем json файл в очередь на загрузку
loader.addJson('persons', `${data}/persons.json`)
loader.addJson('users', `${data}/user/users.json`)
loader.addJson('tanks', `${data}/game/tanks.json`)

// вызываем метод для загрузки данных из зарегистрированной очереди
loader.load(() => {
	container = new Container() // объект контейнера
	renderer.stage.add(container) // добавляем объект контейнера в свойство Рендера
	
	container.x = 100
	container.y = 100
	// container.rotation = Math.PI / 4 // поворачиваем по часовой стрелке на пол круга
	// container.anchorX = 0.5
	// container.anchorY = 0.5
	// container.width = renderer.canvas.width
	// container.height = renderer.canvas.height

	createSprites() // создаем спрайты
	// outputResources() // выводим загруженные ресурсы
})

/*
	game
	el - объект, в который мы встраиваем канвас
	передаем ширину и высоту для задания размера канваса
	init - this.add - порядок отрисовки совпадает с порядком добавления в контейнер
	beforeDestroy - вызывается перед удалением сцены и удаляем все объекты, созданные сценой
*/

// создаем спрайты
function createSprites () {
	// создаем спрайт
	let sprite1 = new Sprite(loader.getImage('bunny'), {
		x: 100,
		y: 100,
		// rotation: Math.PI / 2,
		scale: 0.25,
		anchorX: 0.5,
		anchorY: 0.5,
		update(timestamp) {
			this.rotation = timestamp / 1000
		}
	})
	sprites.push(sprite1) // добавляем спрайт в массив для отрисовки
	container.add(sprite1) // добавляем спрайт в контейнер

	let sprite2 = new Sprite(loader.getImage('bunny'), {
		x: 400,
		y: 100,
		// rotation: Math.PI / 2,
		scale: 0.25,
		anchorX: 0.5,
		anchorY: 0.5
	})
	sprites.push(sprite2) // добавляем спрайт в массив для отрисовки
	container.add(sprite2) // добавляем спрайт в контейнер

	let sprite3 = new Sprite(loader.getImage('tank'), {
		scale: 0.15,
		anchorX: 0.5,
		anchorY: 0.5
		// изменяем параметры созданного спрайта
		/*update(timestamp) {
			sprite3.changeSprite({
				absolutePos: null,
				sprite: {
					x: renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200),
					y: renderer.canvas.height / 2 + 200 * Math.sin(timestamp / 200)
				},
				frame: {
					x: sprite3.texture.width / 2 + 200 * Math.cos(timestamp / 200),
					y: sprite3.texture.height / 2 + 200 * Math.sin(timestamp / 200)
				}
			})
		}*/
	})
	sprites.push(sprite3) // добавляем спрайт в массив для отрисовки
	container.add(sprite3) // добавляем спрайт в контейнер

	console.log(renderer.displayObjects) // выводим список отрисовываемых объектов
}

// выводим ресурсы
function outputResources () {
	console.log(window)
	console.log('Resources loaded')

	const images = loader.resources.images // загруженные изображения
	const jsons = loader.resources.jsons // загруженные данные (json файлы)

	// выгружаем данные из tanks в users.tankInfo по соответствию полей users.tankId и tanks.id
	Loader.joinJson(jsons.users, jsons.tanks, 'tankId', 'tankInfo')
	// output for TankInfo loaded
	let usersTankInfo = []
	for (const user of jsons.users) {
		usersTankInfo.push(user.gameData.tankInfo)
	}
	console.log('TankInfo loaded in users.gameData from tanks')
	console.log(usersTankInfo)

	// выводим в консоль загруженные ресурсы
	console.log('Images')
	console.log(images)
	console.log('Data')
	console.log(jsons)

	document.body.append(images['tank']) // выводим фон

	// создаем див-блок для вывода галереии картинок
	let div = document.createElement('div')
	document.body.append(div)
	div.setAttribute('class', 'wrapper')

	// добавляем картинки в блок галереи
	for (const image in images) {
		div.append(images[image])
	}
}

// Loader.loadImage('static/bunny.jpeg').then(image => {
//     console.log(image)
//     document.body.append(image)
// })
