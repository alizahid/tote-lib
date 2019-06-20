import get from 'lodash.get'
import * as joi from '@hapi/joi'
import { Context, HttpRequest } from '@azure/functions'

interface Constructable {
  new (context: Context, request: HttpRequest)
}

export default class Func {
  context: Context
  request: {
    body: any
    headers: any
    query: any
  }
  schema?: any

  constructor(context: Context, request: HttpRequest) {
    this.context = context

    this.request = {
      body: get(request, 'body', {}),
      headers: get(request, 'headers', {}),
      query: get(request, 'query', {})
    }
  }

  status(status: number) {
    this.context.res.status = status

    return this
  }

  send(body: object) {
    this.context.res.body = body
    this.context.res.headers = {
      'content-type': 'application/json'
    }

    return this
  }

  invoke(): object | void {}

  validate() {
    const {
      schema,
      request: { body, query }
    } = this

    const request: any = {}

    if (schema.body) {
      request.body = body
    }

    if (schema.query) {
      request.query = query
    }

    const { error } = joi.validate(request, schema)

    if (error) {
      throw error
    }
  }

  static bootstrap(Func: Constructable) {
    return async (context: Context, request: HttpRequest) => {
      const func: Func = new Func(context, request)

      try {
        if (func.schema) {
          func.validate()
        }

        const body = await func.invoke()

        if (body) {
          func.send(body)
        } else {
          func.status(204)
        }
      } catch (error) {
        const { details, message, name, status = 500 } = error

        if (name === 'ValidationError') {
          func.status(400).send({
            data: details.map(({ message }) => message),
            error: 'validation_error'
          })

          return
        }

        func.status(status).send({
          error: message
        })
      }
    }
  }
}
