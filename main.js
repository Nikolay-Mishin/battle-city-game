const img = 'static/img'
const data = 'static/data'

const { Loader } = GameEngine // записываем свойство Loader (класс) объекта GameEngine в константу

const loader = new Loader // создаем экземпл€р класса Loader

// загружаем изображени€ - добавл€ем изображение в очередь на загрузку
loader.addImage('tank', `${img}/favicon-full.png`)
loader.addImage('bunny', `${img}/bunny.jpeg`)

// загружаем данные (json файлы) - добавл€ем json файл в очередь на загрузку
loader.addJson('persons', `${data}/persons.json`)
loader.addJson('users', `${data}/user/users.json`)
loader.addJson('tanks', `${data}/game/tanks.json`)

// вызываем метод дл€ загрузки данных из зарегистрированной очереди
loader.load(() => {
    console.log('Resources loaded')

    const images = loader.resources.images // загруженные изображени€
    const jsons = loader.resources.jsons // загруженные данные (json файлы)

    // выгружаем данные из tanks в users.tankInfo по соответствию полей users.tankId и tanks.id
    Loader.joinJson(jsons.users, jsons.tanks, 'tankId', 'tankInfo')

    // выводим в консоль загруженные ресурсы
    console.log('Images')
    console.log(images)
    console.log('Data')
    console.log(jsons)

    document.body.append(images['tank']) // выводим фон

    // создаем див-блок дл€ вывода галереии картинок
    let div = document.createElement('div')
    document.body.append(div)
    div.setAttribute('class', 'wrapper')

    // добавл€ем картинки в блок галереи
    for (const image in images) {
        div.append(images[image])
    }
})

// Loader.loadImage('static/bunny.jpeg').then(image => {
//     console.log(image)
//     document.body.append(image)
// })