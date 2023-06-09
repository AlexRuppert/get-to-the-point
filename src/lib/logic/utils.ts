export function clazz(classValue: string, basisClasses = '') {
  return `${basisClasses} ${classValue || ''}`.trim()
}

export function fisherYatesShuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}


export function unique(arr: Array<any>) {
  return [...new Set(arr)]
}