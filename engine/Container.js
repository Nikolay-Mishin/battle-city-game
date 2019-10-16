;(function () {
    'use strict'

    // ��������� ��� �������� ������������ �������� (��������)

    class Container {
        constructor () {
            this.displayObjects = [] // ��������� �������� ���������� (������� ���������� �� ������ - �������)
        }

        // ��������� ������ � ��������� (���� ������ ������� ��� ��� � ������)
        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject)
            }
        }

        remove () {}

        // ������������ ��� ������� �� ����������
        draw (canvas, context) {
            // ��� ������� ������� �������� ����� draw() ��� ��������� �������
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Container = Container
    // ������������ ������������ ���� BattleCityGame.GameEngine.Container � ������� window
    namespace.set('BattleCityGame.GameEngine.Container', Container) // ������������ ����� Container � ������� GameEngine
    // BattleCityGame.GameEngine.Container = Container // ������������ ����� Container � ������� GameEngine
})();