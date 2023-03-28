export function formatExpDate(event: any, expirationDate: string) {
  const code = event.keyCode
  const allowedKeys = [8]
  if (allowedKeys.indexOf(code) !== -1) {
    return
  }
  const numericInput = expirationDate.replace(/\D/g, '')
  expirationDate = `${numericInput.slice(0, 2)}/${numericInput.slice(2, 4)}`

  return expirationDate
}
