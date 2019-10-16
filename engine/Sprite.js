;(function () {
    'use strict'

    /*
     * ���������� ��������������� ���������� ������� (������ ���������� ���������� ����������� �����������)
     * �������� �� ��������� ���������� ����������� (��� ��� �������)
     */

    class Sprite {
        constructor (texture, args = {}) {
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

            // ���������� ����� ��������� �������
            this.x = args.x || 0
            this.y = args.y || 0
            // ����� ������� - ����� ��� ���������������� ������� ������������ canvas - % ��������� � ������� �������
            this.anchorX = args.anchorX || 0
            this.anchorY = args.anchorY || 0
            // ������ � ������ �������
            this.width = args.width || this.frame.width
            this.height = args.height || this.frame.height

            // ���� ������� �������, ������������� ���
            if (args.scale !== undefined) {
                this.setScale(args.scale)
            }

            this.update = args.update || (() => { }) // ������ �������� ��� ������ update()
        }

        // ������������� ������� ������� �� X � Y (� ������� ��������)
        setScale (value) {
            this.scaleX = value
            this.scaleY = value
        }

        // absoluteX,Y - ���������� ����������, ������������ ������� �������������� ������ (� ������ ��������� ����� - anchor)
        // ������ � ������ - ������ �������� ������, ������� ����� ��������� � ���� ������

        // ������ - ����������� �� ���� �������� (��� ��������� � ����)
        get absoluteX () {
            return this.x - this.anchorX * this.width
        }

        // ������ - ������������, ����� �� ��� �������� ������
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
            return value
        }
        
        get absoluteY () {
            return this.y - this.anchorY * this.height
        }
        
        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
            return value
        }

        // scaleX,Y - ������� ������� �� X � Y

        get scaleX () {
            return this.width / this.frame.width
        }

        set scaleX (value) {
            this.width = this.frame.width * value
            return value
        }

        get scaleY () {
            return this.height / this.frame.height
        }

        set scaleY (value) {
            this.height = this.frame.height * value
            return value
        }

        // ������������ ������ �� ������ ������������� �������
        draw (canvas, context) {
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                this.absoluteX,
                this.absoluteY,
                this.width,
                this.height
            )
        }

        update (timestamp) {
            this.update(timestamp) // �������� ����� ����������
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