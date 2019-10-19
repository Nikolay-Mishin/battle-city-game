const Waiter = (function () {
	'use strict'

	// класс ожидания
	// ждет выполнения полученной callback-функции, после чего продолжает выполнение последующего кода

	class Waiter {
		// асинхронный метод, ожидающий выполнения callback-функции
		async wait(callback) {
			return await callback()
		}

		// плавно отображаем прелоадер (fadeIn = 300) и скрываем товары (call-back функция)
		showPreloader(duration = 0) {
			$('.preloader').fadeIn(duration, function () {
				$('#game').hide();
			});
		}

		// плавно скрываем прелоадер (fadeOut = 'slow') с задержкой (delay = 500) и отображаем товары (call-back функция)
		showContent(delay = 500, duration = 'slow') {
			// duration = 'fast' и 'slow' - 200 и 600 милисекунд
			$('.preloader').delay(delay).fadeOut(duration, function () {
				$('#game').fadeIn();
			});
		}
	}

	console.log(Waiter)

	return new Waiter()
})();