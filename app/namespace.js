// Если не хотите привязываться к какому-то фреймворку, для реализации пространства имен можно написать нечто вроде этого:

var namespace = new Object(); // someRootNamespace

// someRootNamespace.provide
namespace.set = function (object_name, object_value) {
    // object_name - имя пространства имен ('SomeCompany.SomeBigNamespace.SomeBigSubnamespace')
    // object_value - значение для конечного свойства пространства имен (SomeBigSubnamespace)
    var objects = object_name.split('.'); // преобразуем строку в массив по разделителю ('.')

    var object = window; // базовый объект (по умолчанию - window) - для перебора всех свойств объекта пространства имен
    for (var i = 0; i < objects.length; i++) {
        // проверяем начальное свойство ('SomeCompany') - если в объекте window нет такого свойства, создаем его
        // 'SomeCompany' in 'window'
        if (i == 0 && !window[objects[i]])
            window[objects[i]] = new Object();
        // проверяем остальные свойства на существование - 'SomeBigNamespace' in 'SomeCompany'
        else if (i > 0 && !object[objects[i]])
            object[objects[i]] = new Object();

        // если это последнее свойство пространства имен (SomeBigSubnamespace), присваиваем ему переданное значение
        if (i == objects.length - 1) object[objects[i]] = object_value 

        object = object[objects[i]]; // перезаписываем в базовый объект текущее свойство объекта (window => SomeCompany)
    }
}

// После выполнения данных строк, в любом месте js-файлов можно писать
// namespace.set('SomeCompany.SomeBigNamespace.SomeBigSubnamespace', object_value);
// SomeCompany.SomeBigNamespace.SomeBigSubnamespace = object_value