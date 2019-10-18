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
    const container = new Container() // объект контейнера
    renderer.stage.add(container) // добавляем объект контейнера в свойство Рендера

    // создаем спрайт
    let sprite1 = new Sprite(loader.getImage('bunny'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // изменяем параметры созданного спрайта
        update (timestamp) {
            sprite1.changeSprite({
                absolutePos: null,
                sprite: {
                    x: renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200),
                    // y: renderer.canvas.height / 2 + 200 * Math.sin(timestamp / 200)
                },
                frame: {
                    // x: sprite.texture.width / 2 + 200 * Math.cos(timestamp / 200),
                    // y: sprite.texture.height / 2 + 200 * Math.sin(timestamp / 200)
                }
            })
        }
    })
    sprites.push(sprite1) // добавляем спрайт в массив для отрисовки
    container.add(sprite1) // добавляем спрайт в контейнер

    let sprite2 = new Sprite(loader.getImage('tank'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // изменяем параметры созданного спрайта
        update(timestamp) {
            sprite2.changeSprite({
                absolutePos: null,
                sprite: {
                    // x: renderer.canvas.width / 2 + 200 * Math.cos(timestamp / 200),
                    y: renderer.canvas.height / 2 + 200 * Math.sin(timestamp / 200)
                },
                frame: {
                    // x: sprite.texture.width / 2 + 200 * Math.cos(timestamp / 200),
                    // y: sprite.texture.height / 2 + 200 * Math.sin(timestamp / 200)
                }
            })
        }
    })
    sprites.push(sprite2) // добавляем спрайт в массив для отрисовки
    container.add(sprite2) // добавляем спрайт в контейнер

    let sprite3 = new Sprite(loader.getImage('bunny'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // изменяем параметры созданного спрайта
        update(timestamp) {
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
        }
    })
    sprites.push(sprite3) // добавляем спрайт в массив для отрисовки
    container.add(sprite3) // добавляем спрайт в контейнер
    
    console.log(renderer.displayObjects) // выводим список отрисовываемых объектов

    // outputResources() // выводим загруженные ресурсы
})

// изменяет параметры созданного спрайт
// если не хотим менять значения данного свойства, не передаем его
/* 
 { 
    absolutePos: { x: 50, y: 100},
    frame: { x: 100, y: 100, w: 200, h: 200 } 
 }
 */
// { absolutePos: { x: 50, y: null } } // дефолтное значение для свойства, передаем свойство null
// { absolutePos: null } // дефолтные значения для всего блока, передаем null в свойство блока
function changeSprite(sprite, args = {}) {
    // absoluteX,Y - абсолютные координаты, относительно которых отрисовывается спрайт
    // устанавливаем значения для свойств блока 'absolutePos' либо оставляем без изменения
    if (args.absolutePos && Object.keys(args.absolutePos).length > 0) {
        // если свойство не передано, оставляем значение без изменения
        // если свойство передано, берем его значение (если null, устанавливаем дефолтное значение)
        sprite.absoluteX = !args.absolutePos.hasOwnProperty('x') ? sprite.absoluteX : (args.absolutePos.x || 0)
        sprite.absoluteY = !args.absolutePos.hasOwnProperty('y') ? sprite.absoluteY : (args.absolutePos.y || 0)
    }
    // устанавливаем дефолтные значения для блока 'absolutePos'
    else if (args.hasOwnProperty('absolutePos') && args.absolutePos == null) {
        sprite.absoluteX = 0
        sprite.absoluteY = 0
    }

    // своства спрайта
    // устанавливаем значения для свойств блока 'sprite' либо оставляем без изменения
    if (args.sprite && Object.keys(args.sprite).length > 0) {
        // координаты начала отрисовки спрайта
        sprite.x = !args.sprite.hasOwnProperty('x') ? sprite.x : (args.sprite.x || 100)
        sprite.y = !args.sprite.hasOwnProperty('y') ? sprite.y : (args.sprite.y || 300)
        // ширина и высота спрайта
        sprite.width = !args.sprite.hasOwnProperty('w') ? sprite.width : (args.sprite.width || 100)
        sprite.height = !args.sprite.hasOwnProperty('h') ? sprite.height : (args.sprite.height || 100)
    }
    // устанавливаем дефолтные значения для блока 'sprite'
    else if (args.hasOwnProperty('sprite') && args.sprite == null) {
        sprite.x = 100
        sprite.y = 300
        sprite.width = 100
        sprite.height = 100
    }

    // отдельный участок изображения, который необходимо отрисовать
    // устанавливаем значения для свойств блока 'frame' либо оставляем без изменения
    if (args.frame && Object.keys(args.frame).length > 0) {
        sprite.frame.x = !args.frame.hasOwnProperty('x') ? sprite.frame.x : (args.frame.x || 278)
        sprite.frame.y = !args.frame.hasOwnProperty('y') ? sprite.frame.y : (args.frame.y || 250)
        sprite.frame.width = !args.frame.hasOwnProperty('w') ? sprite.frame.width : (args.frame.width || 200)
        sprite.frame.height = !args.frame.hasOwnProperty('h') ? sprite.frame.height : (args.frame.height || 170)
    }
    // устанавливаем дефолтные значения для блока 'frame'
    else if (args.hasOwnProperty('frame') && args.frame == null) {
        sprite.frame.x = 278
        sprite.frame.y = 250
        sprite.frame.width = 200
        sprite.frame.height = 170
    }
}

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
