# TS Basics & Basic Types

### Core Types

- numbers: no int or float, only numbers

- string: text values

- boolean: true or false, no truthy or falsy values

- object: any or specific types

- array:  any or specific types

- tuple: added by TS

  - pushing to a tuple is an exception

- enum: added by TS

  ---

  

- any: try to avoid when possible

- union: number | string

- literal: ‘example’ | ‘sample’

- alias: named types

- void: function with no `return` has return type of `void`

  - which is different from `return;` :: undefined

- function: (type) => type

  - but callback functions c an return sth if `cb: (number) => void`

- unknown: needs runtime type checks

- never: `throw` never returns anything

### Type Casing

primitive types in TS are all lowercase.