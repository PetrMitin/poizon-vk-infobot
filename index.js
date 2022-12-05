require('dotenv').config()
const vkInstance = require('./VKApiBots/VKApi')

const start = async () => {
    console.log(`VK Bot is listening to your events`)
    await vkInstance.updates.startPolling()
}

start()