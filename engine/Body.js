;(function () {
    'use strict'

    /*
     * ���� ������� - Collider
     * �������� �� ����������� (������������) 2 ��������
     */

    class Body extends GameEngine.Sprite {
        constructor (texture, args = {}) {

        }
    }

    // window.GameEngine = window.GameEngine || {}
    // window.GameEngine.Body = Body
    // ������������ ������������ ���� BattleCityGame.GameEngine.Sprite � ������� window
    namespace.set('BattleCityGame.GameEngine.Body', Body) // ������������ ����� Body � ������� GameEngine
    // BattleCityGame.GameEngine.Body = Body // ������������ ����� Sprite � ������� GameEngine
})();