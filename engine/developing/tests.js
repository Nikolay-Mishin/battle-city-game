
var factory = new ShapeFactory(100, "red")

factory.makeSquare() // new red square created with 100px on a side
factory.makeSquare() // new red square created with 100px on a side
factory.makeTrinagle() // new red triangle created with 100px on a side
factory.makeCircle() // new red circle created with radius 50px
factory.makeTrinagle() // new red triangle created with 100px on a side 

// Test constructor
try { var obj0 = new Singleton() } catch (c) { console.log(c) }
console.log('obj0', obj0);

// Create and get object
let obj1 = Singleton.instance;
let obj2 = Singleton.instance;

console.log(obj2.foo === 123);
obj1.foo = 456;
console.log('obj2', obj2);
console.log('obj1 === obj2', obj1 === obj2);

var obj3 = new Singleton()
//try { var obj3 = new Singleton() } catch (c) { console.log(c) }
console.log('obj3', obj3);