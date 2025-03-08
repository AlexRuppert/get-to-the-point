import '@dotenvx/dotenvx/config'
import { parseCompletion, startCompletion } from './ai'
import { readInputJson, writeErrors, writeResults } from './utils'
import * as _ from 'radashi'
const CLUSTER_SIZE = 10
const system1 = `
I want to create cards for a taboo game. It is multi language supporting english, german and chinese. cards are stored as a compact JSON like

[{"word":{"en":"Drinking Coffee","de":"Kaffee trinken","zh":"喝咖啡","pinyin":"hē kā fēi"},"difficulty":1,"category":"items","forbidden":[{"en":"Cup","de":"Tasse","zh":"杯子","pinyin":"bēi zi"},{"en":"Caffeine","de":"Koffein","zh":"咖啡因","pinyin":"kā fēi yīn"},{"en":"Brew","de":"Bräu","zh":"冲泡","pinyin":"chōng pào"},{"en":"Mug","de":"Becher","zh":"马克杯","pinyin":"mǎ kè bēi"},{"en":"Espresso","de":"Espresso","zh":"浓缩咖啡","pinyin":"nóng suō kā fēi"},{"en":"Beans","de":"Bohnen","zh":"咖啡豆","pinyin":"kā fēi dòu"},{"en":"Barista","de":"Barista","zh":"咖啡师","pinyin":"kā fēi shī"},{"en":"Hot","de":"Heiß","zh":"热","pinyin":"rè"}]}]

the relevant rules of the game: a player has to describe a word on the card to his team members without mentioning the word or parts of the word.
for each word there are 6-10 forbidden words that may not be used when explaining the main target word.
the player must get creative finding the right descriptions while avoiding forbidden words. forbidden words are ususually synonyms or words often used in context of the card word.

I will give you a list of words for which to generate the translations and forbidden words.
try to find good forbidden words that make describing the target word difficult.
start with the most obvious essential forbidden words.
remember that sub-words or sub-parts of the target word cannot be used in the game anyways, so you can skip those in the forbidden words list.

give me a full card inlcuding 6 to 10 forbidden words for every word in this list of the category "items". output as JSON.
`

const userString = (data) => `the words are: 
${data}
`

const transform = (dataArray: any[]) => {
  return dataArray?.map((d) => d?.cards).flat()
}
const doAi = async (data) => {
  let parsedCompletion

  try {
    const asString = JSON.stringify(data, null, 2)
    const completion = await startCompletion({
      systemMessage: system1,
      userMessage: userString(asString)
    })
    parsedCompletion = parseCompletion(completion)
  } catch (err) {
    throw data
  }

  return JSON.parse(parsedCompletion)
}
async function main() {
  const data = await readInputJson()
  let dataBlocks = _.cluster(data, CLUSTER_SIZE)
  console.log(`${data.length} -> ${dataBlocks.length} * ${CLUSTER_SIZE}`)
  try {
    const [err, processedBlocks] = await _.tryit(_.parallel)(10, dataBlocks, doAi)
    await writeErrors(err)
    await writeResults(transform(processedBlocks ?? []))
    console.log(`Results: ${processedBlocks?.length}`)
  } catch (error) {}
}

main()
