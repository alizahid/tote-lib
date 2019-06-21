# `tote-lib`

`tote-lib` is a helper library for [Tote](https://github.com/alizahid/tote).

## API

`tote-lib` exports three items.

### `Func`

`Func` is the class you use to setup your function. It includes several helper methods.

#### Example

```
// import dependencies
import { Func, joi } from 'tote-lib'

// create your function
class Hello extends Func {
  // define your schema
  schema = {
    // query parameters
    query: joi.object({
      number: joi.number()
    })
  }

  // define your function here
  invoke() {
    // get query params
    const {
      query: { number = 5 }
    } = this.request

    // return object
    return {
      hello: 'world',
      result: number * 2
    }
  }
}

// bootstrap and export
export default Func.bootstrap(Hello)
```

#### Options

| Name             | Type       | Description                                                                         |
| ---------------- | ---------- | ----------------------------------------------------------------------------------- |
| `context`        | `Object`   | Azure Function execution context                                                    |
| `request`        | `Object`   | Request object. Contains `body`, `headers`, and `query` objects with any parameters |
| `status<number>` | `Function` | Set the HTTP status code                                                            |
| `send<object>`   | `Function` | Set the JSON body                                                                   |
| `_validate`      | `Function` | Internal method for schema validation                                               |

##### Usage

**`request`**

Get input parameters.

```
// get parameters
const {
  body: { foo },
  query: { name }
} = this.request

// use them
```

**`status`**

```
this.status(404)
```

**`send`**

You can just return the object from your function. But you can also use `send`.

```
this.send({
  foo: 'bar'
})
```

### `joi`

Look at [Joi docs](https://github.com/hapijs/joi).

### `invoke`

`invoke` is a helper for invoking functions when writing your tests.

#### Parameters

| Name      | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `name`    | `string` | Function name, should correspond to a directory                              |
| `request` | `Object` | Optional. Request object, may contain `body`, `headers`, and `query` objects |

#### Usage

```
invoke('hello', {
  headers: {
    authorization: 'Bearer ...'
  },
  query: {
    name: 'Ali'
  }
})
```
