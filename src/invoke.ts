import { resolve } from 'path'

import { AzureFunction, Context } from '@azure/functions'

interface Request {
  body?: any
  headers?: any
  query?: any
}

export default async (name: string, request: Request = {}) => {
  const path = resolve('src', name)

  const func: AzureFunction = await require(path).default

  // @ts-ignore
  const context: Context = {
    res: {}
  }

  await func(context, request)

  const {
    res: { body, status }
  } = context

  return {
    body,
    status
  }
}
