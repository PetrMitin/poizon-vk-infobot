const fs = require('fs')
const path = require('path')
const {admins, managerId} = require('../data/admins.json')
const formulasData = require('../data/formulas.json')
let yuan = formulasData.yuan
const deliveryLocation = formulasData['delivery-location']
const itemTypes = formulasData['item-types']
const users = require('../data/users.json').users
const {VK} = require('vk-io')

const token = process.env.VK_API_TOKEN
const vkInstance = new VK({
    token,
    apiLimit: 3,
    apiMode: 'sequential'
})

const sendNotifications = async (notificationText) => {
    const usersArr = [...users]
    console.log(usersArr);
    return await vkInstance.api.messages.send({
        peer_ids: usersArr,
        random_id: 0,
        message: notificationText
    })
}

const saveAdmins = () => {
    fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'admins.json'), JSON.stringify({managerId, admins: [...(new Set(admins))]}))
}

const saveFormulas = () => {
    fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'formulas.json'), JSON.stringify({yuan, "delivery-location": deliveryLocation, "item-types": itemTypes}))
}

const saveUsers = () => {
    fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), JSON.stringify({users: [...(new Set(users))]}))
}

const addNewAdmin = (newAdminId) => {
    admins.push(newAdminId)
    console.log(admins);
    saveAdmins()
}

const deleteAdmin = (adminId) => {
    const idxToDelete = admins.indexOf(adminId)
    if (idxToDelete === -1) return 
    admins.splice(idxToDelete, 1)
    saveAdmins()
}

const getAllAdmins = () => admins

const editFormula = (formulaType, typeSection, k, b) => {
    console.log(formulaType, typeSection, k, b);
    if (formulaType === 'delivery-location') {
        deliveryLocation[typeSection] = {k, b}
    } else if (formulaType === 'item-types') {
        itemTypes[typeSection] = {k, b}
    } else {
        return
    }
    saveFormulas()
}

const setYuan = (newYuan) => {
    yuan = newYuan
    saveFormulas()
}

const addUser = (userId) => {
    users.push(userId)
    saveUsers()
}

module.exports = {
    addNewAdmin,
    deleteAdmin,
    getAllAdmins,
    editFormula,
    setYuan,
    addUser,
    sendNotifications
}