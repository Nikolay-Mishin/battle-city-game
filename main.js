const img = 'static/img'
const data = 'static/data'

const { Loader } = GameEngine // записываем свойство Loader (класс) объекта GameEngine в константу

const loader = new Loader // создаем экземпл€р класса Loader

// загружаем изображени€ - добавл€ем изображение в очередь на загрузку
loader.addImage('bunny', `${img}/bunny.jpeg`)
loader.addImage('tank', `${img}/favicon-full.png`)

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
    Loader.mergeJson(jsons.users, jsons.tanks, 'tankId', 'tankInfo')

    // выводим в консоль загруженные ресурсы
    console.log('Images')
    console.log(images)
    console.log('Data')
    console.log(jsons)

    document.body.append(images['tank']) // выводим фон
})

// Loader.loadImage('static/bunny.jpeg').then(image => {
//     console.log(image)
//     document.body.append(image)
// })