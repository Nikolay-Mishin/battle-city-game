;(function () {
    'use strict'

    class Loader {
        constructor() {
            // ������� �� �������� - ������ ������, ������� ������ ���� ��������� ������� load()
            this.loadOrder = {
                images: [],
                jsons: []
            }

            // ��������� �������� - ������ �������, ����������� ����� load() �� ������� ��������
            this.resources = {
                images: [],
                jsons: []
            }
        }

        // ��������� ����������� � ������� �� ��������
        addImage (name, src) {
            this.loadOrder.images.push({ name, src })
        }

        // ��������� json ���� � ������� �� ��������
        addJson (name, address) {
            this.loadOrder.jsons.push({ name, address })
        }

        // ��������� ������ �� ������� �������� (loadOrder) � ��������� �� � ��������� �������� (resources)
        // ����� �������� �������� �������� callback-������� ���������� � �������� ���������
        load (callback) {
            const promises = [] // ������ ��� �������� ���� ��������

            // ������������ ��� ����������� �� ������� ��������
            for (const imageData of this.loadOrder.images) {
                // ���������������� ������� - ����� �� ���������� � ��������� �������, ����� �� ����������� � ����������
                const { name, src } = imageData // �������� name, src �������� ����������� ���������� � ��������������� ����������

                // � ������� ������ ���������� ��������� ���������� ������ �������� ����������� (return new Promise())
                // then - ����������� �� ��������� ���������� ������� ������� � ��������� callback-�������
                const promise = Loader
                    .loadImage(src) // ��������� ������� ����������� �� ���������� ����
                    // ��������� callback-������� ����� �������� �������� ����������� � ������������� �� resolve()
                    .then(image => {
                        // image - �������� �� resolve() (��, ��� �������� � resolve() ����� �������� � then())
                        // ���������� � ������ ����������� � ��������� ��������, ���������� ����������� � ������ � �������� �������
                        this.resources.images[name] = image

                        // ������� ����������� ������ �� ������� �� ��������
                        if (this.loadOrder.images.includes(imageData)) {
                            const index = this.loadOrder.images.indexOf(imageData) // �������� ������ �������� �����������
                            this.loadOrder.images.splice(index, 1) // ������� 1 ������� ������� ������� � ���������� �������
                        }
                    })

                promises.push(promise) // ��������� ���������� ������ � ������ ���� ��������
            }

            // ������������ ��� json ����� �� ������� ��������
            for (const jsonData of this.loadOrder.jsons) {
                const { name, address } = jsonData

                const promise = Loader
                    .loadJson(address)
                    .then(json => {
                        this.resources.jsons[name] = json
                        
                        if (this.loadOrder.jsons.includes(jsonData)) {
                            const index = this.loadOrder.jsons.indexOf(jsonData)
                            this.loadOrder.jsons.splice(index, 1)
                        }
                    })

                promises.push(promise)
            }

            // ��������� ��� ������� � ����������� �� ��������� ���������� (resolve() - ��������� callback-�������)
            Promise.all(promises).then(callback)
        }

        // ��������� ����������
        static loadImage(src) {
            // ���������� ������
            // ������ - ��� �������, ������� ��������� �������� ������ � ����������� ����� (����� ����� �� ���������� - ajax � ��)
            // resolve - ���������� ��� ������ (����� ������ ������� �������� - �������� �����, �����������)
            // reject - ���������� � ������ ������
            return new Promise((resolve, reject) => {
                // ���� � ������ ����� ��������� ������, �� �� �� ������������ � ����� catch
                try {
                    const image = new Image // ��������� ����������� � ������� ������ Image
                    image.onload = () => resolve(image) // ������ ���������� �� ������� �������� �����������
                    image.src = src // � �������� src ��������� ����, ������ ��������� ������� �����������
                }
                
                catch (err) {
                    reject(err) // ���������� ������
                }
            })
        }

        // ��������� json
        static loadJson (address) {
            return new Promise((resolve, reject) => {
                // ���������� ajax-������ � �������� json-����
                // fetch - ������ ajax, ������� ���������� Promise
                fetch(address)
                    .then(result => result.json()) // �������������� result ��� json
                    .then(result => resolve(result)) // ������������� �� ��������� ��������� ������ (�����)
                    .catch(err => reject(err)) // ����������� ������ (catch - ������������� �� ������)
            })
        }

        // ������� json ������ - ��������� tanks.json � tankInfo (users.json)
        static joinJson(jsonTo, jsonFrom, propertyMerge, propertyTo) {
            // �������� �� ���� ��������� �����, � ������� ��������� ������ (users)
            for (const itemTo of jsonTo) {
                // ���� � �����, � ������� ��������� ������ ��� �������� gameData, ������� ���
                itemTo.gameData = itemTo.gameData || {}
                // ��������� ����, �� �������� ��������� ������ (tanks), �� ��������������� ����� id
                // return tanks.id = users.gameData.tankId
                // ���������� ���� ������ � 1 ��������� ��������� (tank � ��������� id), ���� ������ ������ (length = 0)
                let itemFrom = jsonFrom.filter(function (item) {
                    return item.id == itemTo.gameData[propertyMerge]
                });
                // � �������� propertyTo ������� gameData (users.gameData.tankInfo) ��������� ���������� ������
                // ���� ���������� ������, ��� ������ �����������
                itemTo.gameData[propertyTo] = itemFrom.length > 0 ? itemFrom : 'Data not available'
                /* for (const itemFrom of jsonFrom) {
                    if (itemTo.gameData[propertyMerge] == itemFrom.id) {
                        itemTo.gameData[propertyTo] = itemFrom
                        break
                    }
                } */
            }
        }
    }

    // ���� ������ GameEngine ��������������� (����������) ����� ��� ��������, ����� ������� ������ ������ (��������������)
    namespace.set('BattleCityGame.GameEngine'); // ������������ ������ GameEngine � ������� window
    const { GameEngine } = BattleCityGame // ��������� �������� GameEngine �� ������� BattleCityGame
    GameEngine.Loader = Loader // ������������ ����� Loader � ������� GameEngine
    // window.GameEngine = window.GameEngine || {} // ������������ ������ GameEngine � ������� window
    // GameEngine.Loader = Loader // ������������ ����� Loader � ������� GameEngine
})();