const img = 'static/img'
const data = 'static/data'

const { Loader } = GameEngine // ���������� �������� Loader (�����) ������� GameEngine � ���������

const loader = new Loader // ������� ��������� ������ Loader

// ��������� ����������� - ��������� ����������� � ������� �� ��������
loader.addImage('tank', `${img}/favicon-full.png`)
loader.addImage('bunny', `${img}/bunny.jpeg`)

// ��������� ������ (json �����) - ��������� json ���� � ������� �� ��������
loader.addJson('persons', `${data}/persons.json`)
loader.addJson('users', `${data}/user/users.json`)
loader.addJson('tanks', `${data}/game/tanks.json`)

// �������� ����� ��� �������� ������ �� ������������������ �������
loader.load(() => {
    console.log('Resources loaded')

    const images = loader.resources.images // ����������� �����������
    const jsons = loader.resources.jsons // ����������� ������ (json �����)

    // ��������� ������ �� tanks � users.tankInfo �� ������������ ����� users.tankId � tanks.id
    Loader.joinJson(jsons.users, jsons.tanks, 'tankId', 'tankInfo')

    // ������� � ������� ����������� �������
    console.log('Images')
    console.log(images)
    console.log('Data')
    console.log(jsons)

    document.body.append(images['tank']) // ������� ���

    // ������� ���-���� ��� ������ �������� ��������
    let div = document.createElement('div')
    document.body.append(div)
    div.setAttribute('class', 'wrapper')

    // ��������� �������� � ���� �������
    for (const image in images) {
        div.append(images[image])
    }
})

// Loader.loadImage('static/bunny.jpeg').then(image => {
//     console.log(image)
//     document.body.append(image)
// })