const {Keyboard} = require('vk-io')

const adminPannelKeyboard = Keyboard.builder()
    .textButton(
        {
            label: 'Управлять админами',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/admin-adminych'
            }
        }
    ).row()
    .textButton(
        {
            label: 'Формулы',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/formulas'
            }
        }
    ).row()
    .textButton(
        {
            label: 'Выставить курс юаня',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/set-yuan'
            }
        }
    ).row()
    .textButton(
        {
            label: 'Уведомление',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/notification'
            }
        }
    ).inline()

const adminAdminychKeyboard = Keyboard.builder()
    .textButton(
        {
            label: 'Добавить админа',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/add-admin'
            }
        }
    ).row()
    .textButton(
        {
            label: 'Удалить админа',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/delete-admin'
            }
        }
    ).row()
    .textButton(
        {
            label: 'Просмотреть админов',
            color: Keyboard.SECONDARY_COLOR,
            payload: {
                command: '/list-admins'
            }
        }
    ).inline()

const formulasTypeKeyboard = Keyboard.builder()
    .textButton({
        label: 'Редактировать формулы Мск/POIZON',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'delivery-formulas'
        }
    }).row()
    .textButton({
        label: 'Редактировать формулы типов товара',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'item-types-formulas'
        }
    }).inline()

const deliveryTypesFormulasKeyboard = Keyboard.builder()
    .textButton({
        label: 'Редактировать формулу Мск',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'moscow-delivery'
        }
    }).row()
    .textButton({
        label: 'Редактировать формулу POIZON',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'poizon-delivery'
        }
    }).inline()

const itemTypesKeyboard = Keyboard.builder()
    .textButton({
        label: 'Редактировать Кроссовки',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'sneakers'
        }
    }).row()
    .textButton({
        label: 'Редактировать Пуховики, кофты',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'bombers'
        }
    }).row()
    .textButton({
        label: 'Редактировать Футболки, шорты',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'tshirts'
        }
    }).row()
    .textButton({
        label: 'Редачить Шапки, снуды, перчатки, носки',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'socks'
        }
    }).row()
    .textButton({
        label: 'Редактировать Прочие товары',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            type: 'other-stuff'
        }
    }).inline()

const yesOrNoKeyboard = Keyboard.builder()
    .textButton({
        label: 'Да, рассылаем',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            command: '/confirm-send'
        }
    }).row()
    .textButton({
        label: 'Нет, не рассылаем',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            command: '/cancel-send'
        }
    }).inline()

module.exports = {
    adminPannelKeyboard, 
    adminAdminychKeyboard, 
    formulasTypeKeyboard, 
    deliveryTypesFormulasKeyboard, 
    itemTypesKeyboard,
    yesOrNoKeyboard
}