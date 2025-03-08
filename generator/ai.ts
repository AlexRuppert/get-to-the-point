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

export async function startCompletion(prompt: Prompt) {
  if (process.env.DS_MOCK == 'true')
    return { choices: [{ message: { content: 'mock' } }] } as OpenAI.Chat.Completions.ChatCompletion

  let chatOptions = {
    messages: createMessages(prompt),
    model: 'deepseek-chat',
    max_tokens: 7200,
    response_format: {
      type: 'json_object' as const
    }
  }
  return openai.chat.completions.create(chatOptions)
}

export function parseCompletion(
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
