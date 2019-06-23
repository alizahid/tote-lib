# tote-lib

`tote-lib` is a helper library for [Tote](https://github.com/alizahid/tote).

## API

`tote-lib` exports four items.

1. [Func](#func)
2. [Exception](#exception)
3. [invoke](#invoke)
4. [joi](#joi)

---

### `Func`

`Func` is the class you use to setup your function. It includes several helper methods.

#### Example

```javascript
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

##### Usage

**`schema`**

Schema is optional, and you should only add it if you want to use Joi validation.

**`invoke`**

You need to override this method with your function implementation and return an `object` or `void` from it. In the latter case, `Func` will set the HTTP status code to `204`.

**`request`**

Get input parameters.

```javascript
// get parameters
const {
  body: { foo },
  query: { name }
} = this.request

// use them
```

**`status`**

```javascript
this.status(404)
```

**`send`**

You can just return the object from your function. But you can also use `send`.

```javascript
this.send({
  foo: 'bar'
})
```

---

### `Exception`

`Exception` extends `Error` and lets you throw sensible errors from your functions.

#### Parameters

| Name      | Type     | Description          | Default         |
| --------- | -------- | -------------------- | --------------- |
| `message` | `string` | Error message or key | `unknown_error` |
| `status`  | `number` | HTTP status code     | `500`           |

#### Usage

```javascript
throw new Exception('Email required', 400)
```

---

### `invoke`

`invoke` is a helper for invoking functions when writing your tests.

#### Parameters

| Name      | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `name`    | `string` | Function name, should correspond to a directory                              |
| `request` | `Object` | Optional. Request object, may contain `body`, `headers`, and `query` objects |

#### Usage

```javascript
invoke('hello', {
  headers: {
    authorization: 'Bearer ...'
  },
  query: {
    name: 'Ali'
  }
})
```

---

### `joi`

Take a look at the [Joi docs](https://github.com/hapijs/joi).
