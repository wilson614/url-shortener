function codeGenerator () {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const collection = letters.split('')
  let code = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    code += collection[index]
  }
  return code
}

module.exports = codeGenerator
