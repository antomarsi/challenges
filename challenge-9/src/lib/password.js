export const PASS_ENUM = {
  USE_UPPERCASE: 1,
  USE_NUMERIC: 2,
  USE_SYMBOL: 4
}
export const generatePassword = (bitwise, size) => {
  if (size < 4 || size > 32) throw new Error('Tamanho deve ser entre 4 e 32')

  let characters = 'abcdefghijklmnopqrstuvwxyz'

  if (bitwise & PASS_ENUM.USE_UPPERCASE)
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  if (bitwise & PASS_ENUM.USE_NUMERIC) characters += '0123456789'

  if (bitwise & PASS_ENUM.USE_SYMBOL) characters += '!@#$%^&*()<>,.?/[]{}-=_+|/'

  const charactersMax = characters.length - 1
  let password = ""
  for (let index = 0; index < size; index++) {
    password += characters[getRandomInt(0, charactersMax)] 
  }

  return password
}

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
