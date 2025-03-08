import fs from 'fs/promises'
import path from 'path'
import * as _ from 'radashi'
export async function createDirectory(dirPath) {
  return fs.mkdir(dirPath, { recursive: true })
}

const TEMP_DIR = './temp'
const IN_DIR = path.join(TEMP_DIR, 'in')
const OUT_DIR = path.join(TEMP_DIR, 'out')

function replaceErrors(key, value) {
  if (value instanceof Error) {
    var error = {}

    Object.getOwnPropertyNames(value).forEach(function (propName) {
      error[propName] = value[propName]
    })
    //@ts-ignore
    return error
  }

  return value
}

function stringifyError(error: Error | undefined) {
  return JSON.stringify(error, replaceErrors)
}

export async function createTemp() {
  await createDirectory(IN_DIR)
  await createDirectory(OUT_DIR)
}

export async function readInputJson() {
  let data: any[] = []
  try {
    data = JSON.parse(await fs.readFile(path.join(IN_DIR, 'in.json'), 'utf8'))
  } catch (e) {
    console.error(e)
  }
  return data
}

export async function writeErrors(errors) {
  if (!errors) return
  const data = stringifyError(errors)
  return fs.writeFile(path.join(OUT_DIR, 'errors.json'), data)
}

export async function writeResults(results) {
  const data = JSON.stringify(results, null, 2)
  return fs.writeFile(path.join(OUT_DIR, 'results.json'), data)
}
async function init() {
  await createTemp()
}

await init()
