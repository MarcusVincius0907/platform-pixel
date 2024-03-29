export function stringToArray(value: string) {
  return value.split(';')
}

export function arrayToString(value: string[]) {
  let newStr = ''
  value.forEach((el) => {
    if (newStr.length === 0) {
      newStr += el
    } else {
      newStr += `;${el}`
    }
  })
  return newStr
}
