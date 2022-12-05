const { StepScene } = require(`@vk-io/scenes`);
const { poizonOrMscKeyboard, itemTypeKeyboard } = require("../keyboards/countPriceKeyboards");
const {countTotalItemPrice} = require('../utils/utils')

const userScenes = [
    new StepScene('count-price', [
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                return await context.send('📲 Вы рассчитываете стоимость товара с POIZONA или нашего Московского склада?', {
                    keyboard: poizonOrMscKeyboard
                })
            }
            console.log(context);
            const deliveryLocation = context.messagePayload.type
            context.scene.state.deliveryLocation = deliveryLocation
            return await context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                return await context.send('⬇️ Выберите тип товара ⬇️', {
                    keyboard: itemTypeKeyboard
                })
            }
            const itemType = context.messagePayload.type
            context.scene.state.itemType = itemType
            return await context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                return await context.send(`📲 Напишите цену товара в Юанях (¥), если вы выбираете товар с POIZONA 
                ИЛИ 
                📲 Напишите цену товара в Рублях (₽), если вы выбираете товар с нашего склада в Москве`)
            }
            console.log(context);
            if (context.isOutbox) return
            const price = parseInt(context.text)
            context.scene.state.price = price
            return await context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                const {deliveryLocation, itemType, price} = context.scene.state
                const totalPrice = countTotalItemPrice(deliveryLocation, itemType, price)
                console.log(totalPrice);
                return await context.send(`📲 Итоговая сумма оплаты с доставкой до Москвы: ${totalPrice}₽
                Обращаем ваше внимание: итоговая цена может меняться в зависимости от деталей доставки и самого заказа.
                Все подробности уточняйте у менеджера!`)
            } 
            return await context.scene.leave()
        }
    ])
]

module.exports = userScenes