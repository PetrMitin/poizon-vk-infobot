const { HearManager } = require('@vk-io/hear')
const startKeyboard = require('../keyboards/startKeyboard')
const goBackButtonKeyboard = require('../keyboards/goBackButtonKeyboard')
const { addUser } = require('../utils/adminFunctions')

const bot = new HearManager()

bot.hear(new RegExp('/start'), (message) => {
    addUser(message.senderId)
    return message.send({
        message: `Доброго времени суток! 🙋🏼‍♂️\n
        ~ Обращаем ваше внимание, что все заказы оформляются 24/7 ✅\n
        ~ Здесь вы можете получить подробную информацию и связаться с Менеджером, который ответит на любой ваш вопрос!`,
        keyboard: startKeyboard
    })
})

bot.hear(new RegExp('О Нас🙋🏼‍♀️'), async (message) => {
    if (message.isOutbox) return
    return message.send(
        {
            message: `📲 Наша команда доставляет одежду с официального Китайского магазина “POIZON”. Но с 20 ноября появилась возможность заказывать «определенный» товар со склада POIZON в Москве. Доставки до 6 дней и без завышения цен.
            \n~ В Китае любой бренд в разы дешевле, чем в России. В “POIZON” есть абсолютно любой бренд и СТРОГО оригинал! Весь товар проходит легит-чек ✅
            \nКакую роль играем мы? 🤔
            \n~ Конечно же, из Китая Вы не сможете заказать, оплатить товар и доставить в Россию. Мы сотрудничаем с Китайцем, который оформляет и высылает товар в Москву. А из Москвы мы уже высылаем вам в любые города.`,
            keyboard: goBackButtonKeyboard
        }
    )
})

bot.hear(new RegExp('Что такое POIZON?'), async (message) => {
    if (message.isOutbox) return
    return message.send(
        {
            message: ` • POIZON - магазин в Китае 🏬
            \n • Там есть ВСЁ / Одежда, гаджеты, машины и т. д.
            \n • Любой товар на POIZONE - строго оригинал, всё проходит legit-check!✅`,
            keyboard: goBackButtonKeyboard
        }
    )
})

bot.hear(new RegExp('Как скачать POIZON?'), async (message) => {
    if (message.isOutbox) return
    return message.send(
        {
            message: `Скачать POIZON 👇🏼
            \nДля IOS - https://apps.apple.com/app/id1012871328
            \nДля Android - https://m.pc6.com/s/286696 
            \n⚙️Если не работает ссылка на Android или IOS, то воспользуйтесь данной - https://h5.poizon.com/ 
            \nТакже определенный товар можно заказать с нашего склада в Москве! Доставка до 6 дней. Посмотреть каталог можно тут: 👇🏼
            \nСсылка на Таблицу (https://docs.google.com/spreadsheets/d/19Kw-baS5UPDUn9gIf4MiREFdKO7Kj4vb/edit?usp=drivesdk&ouid=108323939403696325031&rtpof=true&sd=true )
            \n📲 Возникнут вопросы - пишите в лс группы`,
            keyboard: goBackButtonKeyboard
        }
    )
})

bot.hear(new RegExp('Как заказать?'), async (message) => {
    if (message.isOutbox) return
    return message.send(
        {
            message: `🚚 Алгоритм Ваших действий для заказа товара:
            \n1. Клиент выбирает на POIZONE товар (или со склада в Москве)
            \n2. Клиент копирует ссылку на товар или делает скриншот
            \n3. Клиент присылает информацию Менеджеру (ссылка на @pzmanager)
            \n4. Менеджер (ссылка на @pzmanager) рассчитывает стоимость товара  (также клиент может перепроверить точность, рассчитав самостоятельно в этом боте)
            \n5. Клиент оплачивает товар с доставкой до Москвы (от Москвы в другой город оплата происходит после прибытия в Москву)
            \n6. По прибытию товара в Москву, клиент оплачивает доставку до нужной точки.
            \n7. Клиент принимает товар и оставляет отзыв)`,
            keyboard: goBackButtonKeyboard
        }
    )
})

bot.hear(new RegExp('Связаться с Менеджером'), async (message) => {
    if (message.isOutbox) return
    return message.send(
        {
            message: `📲 Напишите сообщение сюда, менеджер скоро ответит `
        }
    )
})

bot.hear(new RegExp('Рассчитать стоимость'), async (message) => {
    return await message.scene.enter('count-price')
})

bot.hear(/^Назад$/, (message) => {
    if (message.isOutbox) return
    return message.send({
        message: '/start'
    })
})

module.exports = bot 