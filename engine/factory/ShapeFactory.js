// import Shapes from './Shapes.js';

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

// export default ShapeFactory;