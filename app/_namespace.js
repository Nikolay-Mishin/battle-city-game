// Если не хотите привязываться к какому-то фреймворку, для реализации пространства имен можно написать нечто вроде этого:

var namespace = new Object(); // someRootNamespace

// someRootNamespace.provide
namespace.set = function (object_name) {
    var objects = object_name.split('.');

    var object = window;
    for (var i = 0; i < objects.length; i++) {
        if (0 == i && !window[objects[i]])
            window[objects[i]] = new Object();
        else if (i > 0 && !object[objects[i]])
            object[objects[i]] = new Object();

        object = object[objects[i]];
    }
}

// После выполнения данных строк, в любом месте js-файлов можно писать
// someRootNamespace.provide('SomeCompany.SomeBigNamespace.SomeBigSubnamespace');