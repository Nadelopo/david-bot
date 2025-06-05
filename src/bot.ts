import { Bot } from 'grammy'
import 'dotenv/config'

if (!process.env.BOT_TOKEN || !process.env.CHANNEL_ID) {
  throw new Error('BOT_TOKEN and CHANNEL_ID must be set')
}

const CHANNEL_ID = Number(process.env.CHANNEL_ID)

const bot = new Bot(process.env.BOT_TOKEN!)

bot.command('start', (ctx) => ctx.reply('Привет! Я david - бот 🤖'))

const regex = /раз[ьъ]?[её]б\w*/iu

bot.on('message:text', (ctx, next) => {
  if (ctx.message.sender_chat?.id === CHANNEL_ID) {
    return next()
  }

  const message = ctx.message.text.toLowerCase()
  if (regex.test(message)) {
    ctx.react('🔥')
  } else {
    ctx.react('💩')
  }
  next()
})

bot.on('message', (ctx) => {
  const msg = ctx.message
  if (msg.sender_chat?.id === CHANNEL_ID) {
    ctx.reply('Бля, разъеб!', { reply_to_message_id: msg.message_id })
  }
})

bot.start()
