const {Keyboard} = require('vk-io')

const startKeyboard = Keyboard.builder()
	.textButton({
		label: 'О Нас🙋🏼‍♀️',
		payload: {
			command: '/about-us'
		}
	}).row()
	.textButton({
		label: 'Что такое POIZON?',
		payload: {
			command: '/what-is-poizon'
		},
	})
    .row()
	.textButton({
		label: 'Как скачать POIZON?',
		payload: {
			command: '/how-to-download'
		},
		color: Keyboard.POSITIVE_COLOR
	}).row()
	.textButton({
		label: 'Как заказать?🤔',
		payload: {
			command: '/how-to-order'
		},
		color: Keyboard.POSITIVE_COLOR
	})
    .row()
    .textButton({
		label: 'Связаться с Менеджером',
		payload: {
			command: '/contact-manager'
		},
		color: Keyboard.POSITIVE_COLOR
	}).row()
    .textButton({
		label: 'Рассчитать стоимость',
		payload: {
			command: '/calculate-price'
		},
		color: Keyboard.POSITIVE_COLOR
	}).inline();

module.exports = startKeyboard