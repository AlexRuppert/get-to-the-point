import '@dotenvx/dotenvx/config'
import fs from 'fs/promises'
import OpenAI from 'openai'

//process.env.DS_MOCK = 'true'
//process.env.DEBUG = 'true'
const isDebug = process.env.DEBUG === 'true'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DS_API_KEY
})

interface Prompt {
  systemMessage: string
  userMessage: string
}

interface PromptResponse {}

function createMessages(prompt: Prompt): { role: 'system' | 'user'; content: string }[] {
  return [
    { role: 'system', content: prompt.systemMessage },
    { role: 'user', content: prompt.userMessage }
  ]
}

async function startCompletion(prompt: Prompt) {
  if (process.env.DS_MOCK == 'true')
    return { choices: [{ message: { content: 'mock' } }] } as OpenAI.Chat.Completions.ChatCompletion

  let chatOptions = {
    messages: createMessages(prompt),
    model: 'deepseek-chat',
    max_tokens: 1024,
    response_format: {
      type: 'json_object' as const
    }
  }
  return openai.chat.completions.create(chatOptions)
}

function parseCompletion(
  completion: OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null
  }
) {
  if (isDebug) console.log(completion)
  const usageString =
    (completion.usage?.prompt_tokens ?? 0) + ' + ' + (completion.usage?.completion_tokens ?? 0)
  console.log('Usage: ' + usageString + '\n')
  return completion.choices[0].message.content
}

const system1 = `
I want to create cards for a taboo game. It is multi language supporting english, german and chinese. cards are stored as JSON like

[{"word":{"en":"Drinking Coffee","de":"Kaffee trinken","zh":"喝咖啡","pinyin":"hē kā fēi"},"difficulty":1,"category":"daily activities","forbidden":[{"en":"Cup","de":"Tasse","zh":"杯子","pinyin":"bēi zi"},{"en":"Caffeine","de":"Koffein","zh":"咖啡因","pinyin":"kā fēi yīn"},{"en":"Brew","de":"Bräu","zh":"冲泡","pinyin":"chōng pào"},{"en":"Mug","de":"Becher","zh":"马克杯","pinyin":"mǎ kè bēi"},{"en":"Espresso","de":"Espresso","zh":"浓缩咖啡","pinyin":"nóng suō kā fēi"},{"en":"Beans","de":"Bohnen","zh":"咖啡豆","pinyin":"kā fēi dòu"},{"en":"Barista","de":"Barista","zh":"咖啡师","pinyin":"kā fēi shī"},{"en":"Hot","de":"Heiß","zh":"热","pinyin":"rè"}]}]

for each word there are 6-10 forbidden words that may not be used when explaining the main target word. I will give you a list of words for which to generate the translations and forbidden words. try to find good forbidden words that make describing the target word difficult. start with the most obvious essential forbidden words. remember that sub-words or sub-parts of the target word cannot be used in the game anyways, so you can skip those in the forbidden words list.

give me a full card inlcuding 6 to 10 forbidden words for every word in this list of the category "daily activities". output as JSON.
`

const user1 = `the words are:
[
  { "word": "Labeling Containers", "difficulty": 1 },
  { "word": "Sorting Recycling", "difficulty": 1 },
]
`
async function main() {
  const completion = await startCompletion({
    systemMessage: system1,
    userMessage: user1
  })
  const parsedCompletion = parseCompletion(completion)

  console.log(parsedCompletion)
}

main()
