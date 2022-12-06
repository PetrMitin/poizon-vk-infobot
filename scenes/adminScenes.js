const { StepScene } = require(`@vk-io/scenes`);
const { isAdmin } = require("../utils/utils");
const { addNewAdmin, deleteAdmin, getAllAdmins, sendNotifications, editFormula, setYuan } = require('../utils/adminFunctions');
const { formulasTypeKeyboard, deliveryTypesFormulasKeyboard, itemTypesKeyboard, yesOrNoKeyboard } = require("../keyboards/adminKeyboards");

const addAdminScene = new StepScene('add-admin', [
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи id нового админа')
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const newAdminId = parseInt(context.text)
        console.log(newAdminId);
        addNewAdmin(newAdminId)
        await context.send('Новый админ добавлен, мои поздравления')
        return await context.scene.leave() 
    }
])

const deleteAdminScene = new StepScene('delete-admin', [
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи id админа для экзекуции')
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const adminId = parseInt(context.text)
        deleteAdmin(adminId)
        await context.send('Админ стёрт с лица БД, мои поздравления')
        return await context.scene.leave() 
    }
])

const listAdminsScene = new StepScene('list-admins', [
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        const admins = getAllAdmins()
        let messageString = 'Все админы: \n'
        admins.forEach(adminId => {
            messageString += `https://vk.com/id${adminId} \n`
        })
        await context.send(messageString)
        return await context.scene.leave()
    }
])

const editFormulasScene =  new StepScene('edit-formulas', [
    //start
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Какой раздел формул ты хочешь отредачить, мой шаловливый админ?', {
                keyboard: formulasTypeKeyboard
            })
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const formulaType = context.messagePayload.type === 'item-types-formulas' ? 'item-types' : 'delivery-location'
        context.scene.state.formulaType = formulaType
        return await context.scene.step.next()
    },

    //delivery-formulas or item-types-formulas
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        console.log(context);
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Выбери формулу, которую хочешь отредачить', {
                keyboard: context.scene.state.formulaType === 'item-types' 
                                                                ? itemTypesKeyboard 
                                                                : deliveryTypesFormulasKeyboard
            })
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const specificFormula = context.messagePayload.type
        context.scene.state.specificFormula = specificFormula
        console.log(context);
        return await context.scene.step.next()
    }, 

    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи коэффициент, на который умножается исходный цена (если есть только фиксированная прибавка к стоимости, введи 1)')
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const k = parseFloat(context.text)
        context.scene.state.k = k
        return await context.scene.step.next()
    }, 
    
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи фиксированную прибавку к стоимости в рублях (если нет прибавки, введи 0)')
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const b = parseFloat(context.text)
        context.scene.state.b = b
        return await context.scene.step.next()
    },

    async (context) => {
        if (!context.scene.step.firstTime) {
            return context.scene.leave()
        }
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        const {formulaType, specificFormula, k, b} = context.scene.state
        editFormula(formulaType, specificFormula, k, b)
        await context.send('Формула отредактирована, мои поздравления')
        return await context.scene.leave()
    }
])

const setYuanScene = new StepScene('set-yuan', [
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи новый курс юаня')
        } else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const newYuan = parseFloat(context.text)
        setYuan(newYuan)
        await context.send('Новый курс установлен, мои поздравления')
        return await context.scene.leave()
    }
])

const sendNotificationsScene = new StepScene('send-notifications', [
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        console.log(context);
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи текст рассылки')
        }  else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const notificationText = context.text
        console.log(notificationText);
        context.scene.state.notificationText = notificationText
        return context.scene.step.next()
        
    }, 
    async (context) => {
        if (!isAdmin(context.senderId)) return await context.scene.leave()
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Рассылаем?', {
                keyboard: yesOrNoKeyboard
            })
        }  else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const notificationConfirmation = context.messagePayload.command === '/confirm-send'
        if (!notificationConfirmation) {
            await context.send('Отменяем')
            return await context.scene.leave()
        }
        return context.scene.step.next()
    },
    async (context) => {
        if (context.scene.step.firstTime) {
            const notificationText = context.scene.state.notificationText
            await sendNotifications(notificationText)
        }
        return await context.scene.leave()
    }
])

const adminScenes = [
    addAdminScene,
    deleteAdminScene,
    listAdminsScene,
    editFormulasScene,
    setYuanScene,
    sendNotificationsScene
]

module.exports = adminScenes