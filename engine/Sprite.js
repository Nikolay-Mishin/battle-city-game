; (function () {
    'use strict'

    /*
     * ���������� ��������������� ���������� ������� (������ ���������� ���������� ����������� �����������)
     * �������� �� ��������� ���������� ����������� (��� ��� �������)
     */

    class Sprite extends GameEngine.DisplayObject {
        constructor (texture, args = {}) {
            super(args) // ����� super �������� ������������ ����������� (������ � �������� ���� ����� super - super.funA())

            this.texture = texture // ���������� ����������� (������)

            const frame = args.frame || {} // ������� �����������, ������� ��������� ���������� (�� ��������� ���� ������)
            // ���������� ��������� ������
            this.frame = {
                // ���������� ����� ������ ��������������� �������
                x: frame.x || 0,
                y: frame.y || 0,
                // ������ � ������ �������������� �������
                width: frame.width || texture.width,
                height: frame.height || texture.height
            }

            // ���� �� �������� ������, ������������� �������� �� ������
            if (args.width === undefined) {
                this.width = this.frame.width
            }

            // ���� �� �������� ������, ������������� �������� �� ������
            if (args.height === undefined) {
                this.height = this.frame.height
            }

            this.update = args.update || (() => { }) // ������ �������� ��� ������ update()
        }

        // ������������ ������ �� ������ ������������� �������
        draw(canvas, context) {
            context.save() // ��������� ������� ��������� ���������
            context.translate(this.x, this.y) // ������������� ������ ������� ���������
            context.rotate(-this.rotation) // ������������ ������ (������ ������� �������)
            context.scale(this.scaleX, this.scaleY) // ������������ ������
            // ������ � ������ �� �������� �� �������, �� scale ������������ � ������ ��������� �������

            // ������������ ������
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                // ���������� ���������� ��� ��������� ��������� ��� ����� �������� (translate)
                this.absoluteX - this.x,
                this.absoluteY - this.y,
                this.width,
                this.height
            )

            context.restore() // ��������������� ��������
        }

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
        changeSprite(args = {}) {
            // absoluteX,Y - ���������� ����������, ������������ ������� �������������� ������
            // ������������� �������� ��� ������� ����� 'absolutePos' ���� ��������� ��� ���������
            if (args.absolutePos && Object.keys(args.absolutePos).length > 0) {
                // ���� �������� �� ��������, ��������� �������� ��� ���������
                // ���� �������� ��������, ����� ��� �������� (���� null, ������������� ��������� ��������)
                this.absoluteX = !args.absolutePos.hasOwnProperty('x') ? this.absoluteX : (args.absolutePos.x || 0)
                this.absoluteY = !args.absolutePos.hasOwnProperty('y') ? this.absoluteY : (args.absolutePos.y || 0)
            }
            // ������������� ��������� �������� ��� ����� 'absolutePos'
            else if (args.hasOwnProperty('absolutePos') && args.absolutePos == null) {
                this.absoluteX = 0
                this.absoluteY = 0
            }

            // ������� �������
            // ������������� �������� ��� ������� ����� 'sprite' ���� ��������� ��� ���������
            if (args.sprite && Object.keys(args.sprite).length > 0) {
                // ���������� ������ ��������� �������
                this.x = !args.sprite.hasOwnProperty('x') ? this.x : (args.sprite.x || 100)
                this.y = !args.sprite.hasOwnProperty('y') ? this.y : (args.sprite.y || 300)
                // ������ � ������ �������
                this.width = !args.sprite.hasOwnProperty('w') ? this.width : (args.sprite.width || 100)
                this.height = !args.sprite.hasOwnProperty('h') ? this.height : (args.sprite.height || 100)
            }
            // ������������� ��������� �������� ��� ����� 'sprite'
            else if (args.hasOwnProperty('sprite') && args.sprite == null) {
                this.x = 100
                this.y = 300
                this.width = 100
                this.height = 100
            }

            // ��������� ������� �����������, ������� ���������� ����������
            // ������������� �������� ��� ������� ����� 'frame' ���� ��������� ��� ���������
            if (args.frame && Object.keys(args.frame).length > 0) {
                this.frame.x = !args.frame.hasOwnProperty('x') ? this.frame.x : (args.frame.x || 278)
                this.frame.y = !args.frame.hasOwnProperty('y') ? this.frame.y : (args.frame.y || 250)
                this.frame.width = !args.frame.hasOwnProperty('w') ? this.frame.width : (args.frame.width || 200)
                this.frame.height = !args.frame.hasOwnProperty('h') ? this.frame.height : (args.frame.height || 170)
            }
            // ������������� ��������� �������� ��� ����� 'frame'
            else if (args.hasOwnProperty('frame') && args.frame == null) {
                this.frame.x = 278
                this.frame.y = 250
                this.frame.width = 200
                this.frame.height = 170
            }
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Sprite = Sprite
    // ������������ ������������ ���� BattleCityGame.GameEngine.Sprite � ������� window
    namespace.set('BattleCityGame.GameEngine.Sprite', Sprite) // ������������ ����� Sprite � ������� GameEngine
    // BattleCityGame.GameEngine.Sprite = Sprite // ������������ ����� Sprite � ������� GameEngine
})();