// ���� �� ������ ������������� � ������-�� ����������, ��� ���������� ������������ ���� ����� �������� ����� ����� �����:

var namespace = new Object(); // someRootNamespace

// someRootNamespace.provide
namespace.set = function (object_name, object_value) {
    // object_name - ��� ������������ ���� ('SomeCompany.SomeBigNamespace.SomeBigSubnamespace')
    // object_value - �������� ��� ��������� �������� ������������ ���� (SomeBigSubnamespace)
    var objects = object_name.split('.'); // ����������� ������ � ������ �� ����������� ('.')

    var object = window; // ������� ������ (�� ��������� - window) - ��� �������� ���� ������� ������� ������������ ����
    for (var i = 0; i < objects.length; i++) {
        // ��������� ��������� �������� ('SomeCompany') - ���� � ������� window ��� ������ ��������, ������� ���
        // 'SomeCompany' in 'window'
        if (i == 0 && !window[objects[i]])
            window[objects[i]] = new Object();
        // ��������� ��������� �������� �� ������������� - 'SomeBigNamespace' in 'SomeCompany'
        else if (i > 0 && !object[objects[i]])
            object[objects[i]] = new Object();

        // ���� ��� ��������� �������� ������������ ���� (SomeBigSubnamespace), ����������� ��� ���������� ��������
        if (i == objects.length - 1) object[objects[i]] = object_value 

        object = object[objects[i]]; // �������������� � ������� ������ ������� �������� ������� (window => SomeCompany)
    }
}

// ����� ���������� ������ �����, � ����� ����� js-������ ����� ������
// namespace.set('SomeCompany.SomeBigNamespace.SomeBigSubnamespace', object_value);
// SomeCompany.SomeBigNamespace.SomeBigSubnamespace = object_value