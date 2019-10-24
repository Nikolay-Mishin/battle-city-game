const ShapeFactory = (function () {
	class ShapeFactory {
		constructor (size, color) {
			this.size = size;
			this.color = color;
		}

		makeCircle() {
			return new Shapes.Circle({ radius: this.size / 2, color: this.color })
		}

		makeSquare() {
			return new Shapes.Square({ side: this.size, color: this.color })
		}
		makeTrinagle() {
			return new Shapes.Triangle({ side: this.size, color: this.color })
		}
	}

	return ShapeFactory
})();

/**
 * Factory
 * https://habr.com/ru/post/132472/
 * Собственно, основной задачей фабрики в статически типизируемых языках является создание разных объектов с одинаковым интерфейсом, в зависимости от ситуаций, в JavaScript этак проблема так остро не стоит, так что появляется вопрос — зачем эта фабрика тут вообще нужна?
 * Все просто — помимо этой, первой, цели, у нее есть еще и вторая — фабрика может проводить какую-то первичную инициализацию объектов.
 * Например, предположим, у нас есть объекты Daddy, Mammy, и lad, создавая их с помощью фабрики мы можем просто сказать — familyfactory.createLad(); familyfactory.createDaddy(), а уж то, что они оба рыжие и 210см. роста, за нас решит фабрика — эти параметры мы не задаем.
 * Собственно, для того чтобы фабрика могла создавать какие-то объекты, для них сначала неплохо бы задать конструкторы (в этом примере объекты, к сожалению, не такие интересные как несколькими строками выше ):
 */
/*
function ShapeFactory(size, color) {
	this.size = size;
	this.color = color;
}

ShapeFactory.prototype = {
	constructor: ShapeFactory,

	makeCircle: function () { return new Shapes.Circle({ radius: this.size / 2, color: this.color }); },
	makeSquare: function () { return new Shapes.Square({ side: this.size, color: this.color }); },
	makeTrinagle: function () { return new Shapes.Triangle({ side: this.size, color: this.color }); }
}
*/