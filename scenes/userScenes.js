const { StepScene } = require(`@vk-io/scenes`);
const { poizonOrMscKeyboard, itemTypeKeyboard } = require("../keyboards/countPriceKeyboards");
const {countTotalItemPrice} = require('../utils/utils')

const userScenes = [
    new StepScene('count-price', [
        async (context) => {
            if (context.scene.step.firstTime) {
                return context.send('📲 Вы рассчитываете стоимость товара с POIZONA или нашего Московского склада?', {
                    keyboard: poizonOrMscKeyboard
                })
            } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
                return
            }
            console.log(context);
            const deliveryLocation = context.messagePayload.type
            context.scene.state.deliveryLocation = deliveryLocation
            return await context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime) {
                return await context.send('⬇️ Выберите тип товара ⬇️', {
                    keyboard: itemTypeKeyboard
                })
            } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
                return
            }
            const itemType = context.messagePayload?.type || context.messagePayload?.command || '/back-to-start'
            if (itemType === '/back-to-start') {
                await context.scene.leave()
                return context.send('/start')
            }
            context.scene.state.itemType = itemType
            return await context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime) {
                return context.send(`📲 Напишите цену товара в Юанях (¥), если вы выбираете товар с POIZONA 
                ИЛИ 
                📲 Напишите цену товара в Рублях (₽), если вы выбираете товар с нашего склада в Москве`)
            } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
                return
            }
            console.log(context);
            if (context.isOutbox) return
            const price = parseInt(context.text)
            context.scene.state.price = price
            return await context.scene.step.next()
        },
        async (context) => {
            if (!context.scene.step.firstTime || context.isOutbox) {
                return context.scene.leave()
            }
            const {deliveryLocation, itemType, price} = context.scene.state
            const totalPrice = countTotalItemPrice(deliveryLocation, itemType, price)
            await context.send(`📲 Итоговая сумма оплаты с доставкой до Москвы: ${totalPrice}₽
            Обращаем ваше внимание: итоговая цена может меняться в зависимости от деталей доставки и самого заказа.
            Все подробности уточняйте у менеджера!`)
            return context.scene.leave()
        }
    ])
]

module.exports = userScenes