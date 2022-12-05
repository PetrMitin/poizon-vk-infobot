const adminIds = require('../data/admins.json').admins
const formulasData = require('../data/formulas.json')
const yuan = formulasData.yuan
const deliveryLocations = formulasData['delivery-location']
const itemTypes = formulasData['item-types']

const isAdmin = (adminId) => {
    return adminIds.includes(adminId)
}

const countTotalItemPrice = (deliveryLocation, itemType, price) => {
    console.log(deliveryLocation, itemType, price);
    let mult = 1
    let add = 0
    if (deliveryLocation === 'poizon-delivery') {
        mult += deliveryLocations[deliveryLocation].k - 1
        add += deliveryLocations[deliveryLocation].b 
        price *= yuan
    } else if (deliveryLocation === 'moscow-delivery') {
        mult += deliveryLocations['moscow-delivery'].k - 1
        add += deliveryLocations['moscow-delivery'].b
    } else {
        return 0
    }
    mult += itemTypes[itemType].k - 1
    add += itemTypes[itemType].b
    add += 20 * yuan
    return (mult * price + add)
}

module.exports = {
    isAdmin,
    countTotalItemPrice
}