//*кнопки Кроссовки/Пуховики/Майки,шорты/Кофты,штаны/Шапки,снуды,перчатки,носки/ прочий товар/вернуться назад
const {Keyboard} = require('vk-io')

const poizonOrMscKeyboard = Keyboard.builder()
.textButton({
    label: 'POIZON',
    color: Keyboard.SECONDARY_COLOR,
    payload: {
        type: 'poizon-delivery'
    }
}).textButton({
    label: 'Склад',
    color: Keyboard.SECONDARY_COLOR,
    payload: {
        type: 'moscow-delivery'
    }
}).inline()

const itemTypeKeyboard = Keyboard.builder()
    .textButton({
        label: 'Кроссовки',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'sneakers'
        }
    }).row()
    .textButton({
        label: 'Пуховики, кофты',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'bombers'
        }
    }).row()
    .textButton({
        label: 'Футболки, шорты',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'tshirts'
        }
    }).row()
    .textButton({
        label: 'Шапки, снуды, перчатки, носки',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'socks'
        }
    }).row()
    .textButton({
        label: 'Прочие товары',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'other-stuff'
        }
    }).row()
    .textButton(
        {
            label: 'Назад',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/back-to-start'
            }
        }
    ).inline()

module.exports = {poizonOrMscKeyboard, itemTypeKeyboard}