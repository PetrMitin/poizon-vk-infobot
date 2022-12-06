const { HearManager } = require('@vk-io/hear')
const {adminPannelKeyboard, adminAdminychKeyboard, formulasTypeKeyboard} = require('../keyboards/adminKeyboards')
const {isAdmin} = require('../utils/utils')

const adminBot = new HearManager()

//start

adminBot.hear(new RegExp('/pzadmin'), async (context) => {
    if (!isAdmin(context.senderId)) return
    if (context.isOutbox) return
    return context.send('Чё надо?', {
        keyboard: adminPannelKeyboard
    })
})

//Administrate admins

adminBot.hear(new RegExp('Управлять админами'), async (context) => {
    if (!isAdmin(context.senderId)) return
    if (context.isOutbox) return
    return await context.send('Чё надо по админам?', {
        keyboard: adminAdminychKeyboard
    })
})

adminBot.hear(new RegExp('Добавить админа'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('add-admin')
})

adminBot.hear(new RegExp('Удалить админа'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('delete-admin')
})

adminBot.hear(new RegExp('Просмотреть админов'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('list-admins')
})

//Administrate formulas

adminBot.hear(new RegExp('Формулы'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('edit-formulas')
})

//administrate yuan
adminBot.hear(new RegExp('Выставить курс юаня'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('set-yuan')
})


//Send notifications

adminBot.hear(new RegExp('Уведомление'), async (context) => {
    if (!isAdmin(context.senderId)) return
    return await context.scene.enter('send-notifications')
})

module.exports = adminBot