const { SceneManager } = require(`@vk-io/scenes`);
const userScenes = require("./userScenes");
const adminScenes = require('./adminScenes')

const sceneManager = new SceneManager()

sceneManager.addScenes(userScenes)
sceneManager.addScenes(adminScenes)

module.exports = sceneManager