document.body.append(renderer.canvas) // ��������� �� �������� ������, ��������� � ������� ������ ������

// ��������� ����������� - ��������� ����������� � ������� �� ��������
loader.addImage('tank', `${img}/favicon-full.png`)
loader.addImage('bunny', `${img}/bunny.jpeg`)

// ��������� ������ (json �����) - ��������� json ���� � ������� �� ��������
loader.addJson('persons', `${data}/persons.json`)
loader.addJson('users', `${data}/user/users.json`)
loader.addJson('tanks', `${data}/game/tanks.json`)

// �������� ����� ��� �������� ������ �� ������������������ �������
loader.load(() => {
    const container = new Container() // ������ ����������
    renderer.stage.add(container) // ��������� ������ ���������� � �������� �������

    // ������� ������
    let sprite1 = new Sprite(loader.getImage('bunny'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // �������� ��������� ���������� �������
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
    sprites.push(sprite1) // ��������� ������ � ������ ��� ���������
    container.add(sprite1) // ��������� ������ � ���������

    let sprite2 = new Sprite(loader.getImage('tank'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // �������� ��������� ���������� �������
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
    sprites.push(sprite2) // ��������� ������ � ������ ��� ���������
    container.add(sprite2) // ��������� ������ � ���������

    let sprite3 = new Sprite(loader.getImage('bunny'), {
        scale: 0.15,
        anchorX: 0.5,
        anchorY: 0.5,
        // �������� ��������� ���������� �������
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
    sprites.push(sprite3) // ��������� ������ � ������ ��� ���������
    container.add(sprite3) // ��������� ������ � ���������
    
    console.log(renderer.displayObjects) // ������� ������ �������������� ��������

    // outputResources() // ������� ����������� �������
})

// �������� ��������� ���������� ������
// ���� �� ����� ������ �������� ������� ��������, �� �������� ���
/* 
 { 
    absolutePos: { x: 50, y: 100},
    frame: { x: 100, y: 100, w: 200, h: 200 } 
 }
 */
// { absolutePos: { x: 50, y: null } } // ��������� �������� ��� ��������, �������� �������� null
// { absolutePos: null } // ��������� �������� ��� ����� �����, �������� null � �������� �����
function changeSprite(sprite, args = {}) {
    // absoluteX,Y - ���������� ����������, ������������ ������� �������������� ������
    // ������������� �������� ��� ������� ����� 'absolutePos' ���� ��������� ��� ���������
    if (args.absolutePos && Object.keys(args.absolutePos).length > 0) {
        // ���� �������� �� ��������, ��������� �������� ��� ���������
        // ���� �������� ��������, ����� ��� �������� (���� null, ������������� ��������� ��������)
        sprite.absoluteX = !args.absolutePos.hasOwnProperty('x') ? sprite.absoluteX : (args.absolutePos.x || 0)
        sprite.absoluteY = !args.absolutePos.hasOwnProperty('y') ? sprite.absoluteY : (args.absolutePos.y || 0)
    }
    // ������������� ��������� �������� ��� ����� 'absolutePos'
    else if (args.hasOwnProperty('absolutePos') && args.absolutePos == null) {
        sprite.absoluteX = 0
        sprite.absoluteY = 0
    }

    // ������� �������
    // ������������� �������� ��� ������� ����� 'sprite' ���� ��������� ��� ���������
    if (args.sprite && Object.keys(args.sprite).length > 0) {
        // ���������� ������ ��������� �������
        sprite.x = !args.sprite.hasOwnProperty('x') ? sprite.x : (args.sprite.x || 100)
        sprite.y = !args.sprite.hasOwnProperty('y') ? sprite.y : (args.sprite.y || 300)
        // ������ � ������ �������
        sprite.width = !args.sprite.hasOwnProperty('w') ? sprite.width : (args.sprite.width || 100)
        sprite.height = !args.sprite.hasOwnProperty('h') ? sprite.height : (args.sprite.height || 100)
    }
    // ������������� ��������� �������� ��� ����� 'sprite'
    else if (args.hasOwnProperty('sprite') && args.sprite == null) {
        sprite.x = 100
        sprite.y = 300
        sprite.width = 100
        sprite.height = 100
    }

    // ��������� ������� �����������, ������� ���������� ����������
    // ������������� �������� ��� ������� ����� 'frame' ���� ��������� ��� ���������
    if (args.frame && Object.keys(args.frame).length > 0) {
        sprite.frame.x = !args.frame.hasOwnProperty('x') ? sprite.frame.x : (args.frame.x || 278)
        sprite.frame.y = !args.frame.hasOwnProperty('y') ? sprite.frame.y : (args.frame.y || 250)
        sprite.frame.width = !args.frame.hasOwnProperty('w') ? sprite.frame.width : (args.frame.width || 200)
        sprite.frame.height = !args.frame.hasOwnProperty('h') ? sprite.frame.height : (args.frame.height || 170)
    }
    // ������������� ��������� �������� ��� ����� 'frame'
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

    const images = loader.resources.images // ����������� �����������
    const jsons = loader.resources.jsons // ����������� ������ (json �����)

    // ��������� ������ �� tanks � users.tankInfo �� ������������ ����� users.tankId � tanks.id
    Loader.joinJson(jsons.users, jsons.tanks, 'tankId', 'tankInfo')
    // output for TankInfo loaded
    let usersTankInfo = []
    for (const user of jsons.users) {
        usersTankInfo.push(user.gameData.tankInfo)
    }
    console.log('TankInfo loaded in users.gameData from tanks')
    console.log(usersTankInfo)

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
}

// Loader.loadImage('static/bunny.jpeg').then(image => {
//     console.log(image)
//     document.body.append(image)
// })
