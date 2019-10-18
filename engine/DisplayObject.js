;(function () {
    'use strict'

    // �������� �� ��������� ��������, ������� ����� �������������� (����� ������ - ������, animationSprite, container...)

    class DisplayObject {
        constructor(args = {}) {
            // ���������� ����� ��������� �������
            this.x = args.x || 0
            this.y = args.y || 0

            // ������ � ������ �������
            this.width = args.width || 0
            this.height = args.height || 0

            // ������� ������� (� ��������)
            this.rotation = args.rotation || 0

            // ����� ������� - ����� ��� ���������������� ������� ������������ canvas - % ��������� � ������� �������
            this.anchorX = args.anchorX || 0
            this.anchorY = args.anchorY || 0

            // �������
            this.scaleX = args.scaleX || 1
            this.scaleY = args.scaleY || 1

            this.parent = null

            // ���� ������� �������, ������������� ���
            if (args.scale !== undefined) {
                this.setScale(args.scale)
            }
        }
        
        // ������ � ������ - ������ �������� ������, ������� ����� ��������� � ���� ������
        // ������ ��� ������� � ������� ���� ����� ����� ������������
        // get (������) - ����������� �� ���� �������� (��� ��������� � ����)
        // set (������) - ������������, ����� �� ��� �������� ������

        // absoluteX,Y - ���������� ����������, ������������ ������� �������������� ������ (� ������ ��������� ����� - anchor)
        // ��� ��������� ���������� ��������� �� �������� �� �������, �� scale ������������ � ������ ��������� �������
        
        get absoluteX() {
            return this.x - this.anchorX * this.width
        }
        
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
            return value
        }
        
        get absoluteY() {
            return this.y - this.anchorY * this.height
        }
        
        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
            return value
        }

        // ������������� ������� ������� �� X � Y
        setScale (scale) {
            this.scaleX = scale
            this.scaleY = scale
        }

        // ������������� �������� �������� �������
        setParent(parent) {
            // ���� �������� ��� ������������, ������� ���
            if (this.parent) {
                this.parent.remove(this)
            }

            // ���� ��������, �������, ��������� ��� � ��������� � ���������� � ��������
            if (parent) {
                parent.add(this)
                this.parent = parent
            }
        }

        draw() { }

        /*
        // scaleX,Y - ������� ������� �� X � Y

        get scaleX() {
            return this.width / this.frame.width
        }

        set scaleX(value) {
            this.width = this.frame.width * value
            return value
        }

        get scaleY() {
            return this.height / this.frame.height
        }

        set scaleY(value) {
            this.height = this.frame.height * value
            return value
        }
        */
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.DisplayObject = DisplayObject
})();