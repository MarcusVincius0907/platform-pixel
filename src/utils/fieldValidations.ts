import { regex } from './regex'

export const fieldValidations = {
  required: [(value: string) => (!!value && value.length > 0) || 'Campo é requirido'],
  email: [(value: string) => regex.email.test(value) || 'Email inválido'],
  cpf: [(value: string) => regex.cpf.test(value) || 'CPF inválido'],
  maxLength: (length: number) => [(value: string) => value.length <= length || `O limite é de ${length} caracteres`],
  number: [(value: number) => Number(value) || 'Só é permitido números'],
}
