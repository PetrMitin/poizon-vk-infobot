const {Keyboard} = require('vk-io')

const goBackButtonKeyboard = Keyboard.builder().textButton(
    {
        label: 'Назад',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            command: '/back-to-start'
        }
    }
).inline()

module.exports = goBackButtonKeyboard