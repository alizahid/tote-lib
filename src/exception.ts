export default class Exception extends Error {
  message: string
  status: number

  constructor(message = 'unknown_error', status = 500) {
    super(message)

    this.name = 'Exception'

    this.message = message
    this.status = status
  }
}
