;(function () {
    'use strict'

    /*
     * ��������� ����� ���� (����, �������, ��������� ���)
     * ����� - ����������� ���������
     */

    class Scene {
        constructor (args = {}) {

        }

        /*
            autoStart - ��������� ����� ������������� ��� ���
            �� ��������� false

            loading, update � init �������������� �� ������ ������������
            bind(this) - �������� ��� ������� � ��������� �������� (this - ��������� ������� ������)
            ��� bind this �� �������� �� ������ args ��� ����������� ���������� ���������� ������

            loading - �������� �� �������� ��������
            init - �������������� (������� �������) �������

            parent - ��������� �� Game
            this.add - �������� ����� ��������� � ��������� ������
            delete ������� �������� �� �������
        */

    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Sprite = Sprite
    // ������������ ������������ ���� BattleCityGame.GameEngine.Sprite � ������� window
    namespace.set('BattleCityGame.GameEngine.Scene', Scene) // ������������ ����� Sprite � ������� GameEngine
    // BattleCityGame.GameEngine.Sprite = Sprite // ������������ ����� Sprite � ������� GameEngine
})();