;(function () {
    'use strict'

    // ��������� ��� �������� ������������ �������� (��������)
    // extends - ������������ ������
    // Container ����������� �� GameEngine.DisplayObject

    class Container extends GameEngine.DisplayObject {
        constructor (args = {}) {
            super(args) // ����� super �������� ������������ ����������� (������ � �������� ���� ����� super - super.funA())
            this.displayObjects = [] // ��������� �������� ���������� (������� ���������� �� ������ - �������)
        }

        // ��������� ������ � ��������� (���� ������ ������� ��� ��� � ������)
        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject) // ��������� ������������ ������ � ��������
                displayObject.setParent(this) // 
            }
        }

        // ������� ������ �� ���������� (���� ����� ������ ���������� � ������)
        remove (displayObject) {
            if (this.displayObjects.includes(displayObject)) {
                const index = this.displayObjects.indexOf(displayObject) // �������� ������ ������� ������� � ����������
                this.displayObjects.splice(index, 1) // ������� �� ���������� 1 ������, ������� � ���������� �������
                displayObject.setParent(null) // ������������� �������� � null
            }
        }

        // ������������ ��� ������� �� ����������
        draw (canvas, context) {
            // ��������� ������������� ���������� ����������� ��� ���� displayObject
            context.save() // ��������� ������� ��������� ���������
            context.translate(this.x, this.y) // ������������� ������ ������� ���������
            context.rotate(-this.rotation) // ������������ ������
            context.scale(this.scaleX, this.scaleY) // ������������ ������

            // ��� ������� ������� �������� ����� draw() ��� ��������� �������
            // ��� ������� displayObject ����������� ������������� �������������� ��������� ������������� ��� ������� �������
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }

            context.restore() // ��������������� ��������
        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Container = Container
    // ������������ ������������ ���� BattleCityGame.GameEngine.Container � ������� window
    namespace.set('BattleCityGame.GameEngine.Container', Container) // ������������ ����� Container � ������� GameEngine
    // BattleCityGame.GameEngine.Container = Container // ������������ ����� Container � ������� GameEngine
})();