
var factory = new ShapeFactory(100, "red")

factory.makeSquare() // new red square created with 100px on a side
factory.makeSquare() // new red square created with 100px on a side
factory.makeTrinagle() // new red triangle created with 100px on a side
factory.makeCircle() // new red circle created with radius 50px
factory.makeTrinagle() // new red triangle created with 100px on a side 

// Test constructor
// var obj0 = new Singleton()
// console.log('obj0', obj0);

// Create and get object
let obj1 = Singleton.instance;
let obj2 = Singleton.instance;

obj1.foo = 456;
console.log('obj2', obj2);
console.log('obj1 === obj2', obj1 === obj2);