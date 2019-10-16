;(function () {
    'use strict'

    /*
     * �������� �� ��������� �������������� ������� (���������� ���������� ����� ������� � �����)
     * �������� �� ��, ����� � ��� ��� canvas (������� ��� ��������� �������)
     * ������������ ����������� ��������� ������� � ������� Sprite
     */

    class Renderer {
        constructor(args = {}) {
            this.canvas = document.createElement('canvas') // ������� DOM-������� ������ (������� ��������� �������)
            this.context = this.canvas.getContext('2d') // ������ �������� ������ �������
            
            this.background = args.background || 'black' // ������������� ���� ���� �������
            // ������������� ������ � ������ �������
            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
            this.update = args.update || (() => { }) // ������ �������� ��� ������ update()

            this.stage = new GameEngine.Container() // ��������� ������ ������ (��������� �������)

            requestAnimationFrame(timestamp => this.tick(timestamp)) // ����� ��������� ������� (����������� 60� � ���)
        }

        // ������ ��� ��������� ������ �������������� ��������
        get displayObjects () {
            // ���������� ������ �������������� �������� �� ������ ���������� �������
            return _getDisplayObjects(this.stage)

            // ���������� ������� ������ - ��������� ������� ������� �� ������� �����
            function _getDisplayObjects(container, result = []) {
                // �������� �� ���� �������� � ����������
                for (const displayObject of container.displayObjects) {
                    // ���� ������� �� ���������� �����������
                    // ���� ������� ������ �������� ����������� ������ Container
                    // ����� ���������� �������� ������� � �������� � ��� ������� ������ � ������ � ��������������� ���������
                    if (displayObject instanceof GameEngine.Container) {
                        _getDisplayObjects(displayObject, result)
                    }
                    // ����� � ������ � ������������ ��������� ������� ������
                    else {
                        result.push(displayObject)
                    }
                }

                return result
            }
        }

        // ���������� ��� ������ ���������� ������ (60� � ���)
        tick (timestamp) {
            this.update(timestamp) // �������� ����� ���������� � �������� ��� ����� (�������� ��������� - ������� ����������)
            this.clear() // ������� ������� �������
            this.render() // ������������� �������

            requestAnimationFrame(timestamp => this.tick(timestamp)) // ���������� �������� ������� tick ��� ���������� �������
        }

        // ���������� ������ ���������� canvas (������� ��� ����������� �������)
        render () {
            this.stage.draw(this.canvas, this.context) // �������� �� ���������� ����� ��������� ������������ ��������
        }

        // ������� ������� canvas
        clear () {
            this.context.fillStyle = this.background // ������ ���� �������
            this.context.beginPath() // ����� ��� ������ ��������� �������
            this.context.rect(0, 0, this.canvas.width, this.canvas.height) // ������ ���������� �������
            this.context.fill() // ������� ���������� �������
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Renderer = Renderer
    // ������������ ������������ ���� BattleCityGame.GameEngine.Renderer � ������� window
    namespace.set('BattleCityGame.GameEngine.Renderer', Renderer) // ������������ ����� Renderer � ������� GameEngine
    // BattleCityGame.GameEngine.Renderer = Renderer // ������������ ����� Renderer � ������� GameEngine
})();