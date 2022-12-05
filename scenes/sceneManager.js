const { SceneManager } = require(`@vk-io/scenes`);
const { itemTypeKeyboard } = require("../keyboards/countPriceKeyboards");
const userScenes = require("./userScenes");
const adminScenes = require('./adminScenes')

const sceneManager = new SceneManager()

sceneManager.addScenes(userScenes)
sceneManager.addScenes(adminScenes)

module.exports = sceneManager