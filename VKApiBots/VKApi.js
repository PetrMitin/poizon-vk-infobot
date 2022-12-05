const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env')
})
const {VK} = require('vk-io')
const { SessionManager } = require(`@vk-io/session`);
const sceneManager = require('../scenes/sceneManager')
const bot = require('./bot')
const adminBot = require('./adminBot')

const token = process.env.VK_API_TOKEN
const vkInstance = new VK({
    token,
    apiLimit: 3,
    apiMode: 'sequential'
})

const sessionManager = new SessionManager()

vkInstance.updates.on(`message_new`, sessionManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middlewareIntercept);
vkInstance.updates.on('message_new', bot.middleware)
vkInstance.updates.on('message_new', adminBot.middleware)

module.exports = vkInstance