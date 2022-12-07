const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '..', '.env')
})
const {VK} = require('vk-io')
const { SessionManager } = require(`@vk-io/session`);
const sceneManager = require(path.resolve(__dirname, '..', 'scenes', 'sceneManager.js'))
const bot = require(path.resolve(__dirname, 'bot.js'))
const adminBot = require(path.resolve(__dirname, 'adminBot.js'))

const token = process.env.VK_API_TOKEN
const vkInstance = new VK({
    token,
    apiLimit: 3,
    apiMode: 'sequential'
})

const sessionManager = new SessionManager()

vkInstance.updates.on(`message_new`, (message, next) => {
    console.log(message);
    if (message.peerType === 'group' || message.peerType === 'chat') return
    return next()
});
vkInstance.updates.on(`message_new`, sessionManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middlewareIntercept);
vkInstance.updates.on('message_new', adminBot.middleware)
vkInstance.updates.on('message_new', bot.middleware)

module.exports = vkInstance