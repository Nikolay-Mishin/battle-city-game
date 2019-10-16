const { GameEngine } = BattleCityGame // ��������� �������� GameEngine �� ������� BattleCityGame
const { Container, Loader, Renderer, Sprite } = GameEngine // ���������� �������� Loader (�����) ������� GameEngine � ���������

const loader = new Loader // ������� ��������� ������ Loader

let sprites = [] // �������� �� ��������� ��� ���������� �������

const renderer = new Renderer({
    width: 500,
    height: 500,
    background: 'gray',

    update(timestamp) {
        if (!sprites) return
        for (const sprite of sprites) {
            sprite.update(timestamp)
        }
        
    }
})