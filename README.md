[![Build Status](https://travis-ci.org/soenkekluth/object-store-state.svg?branch=master)](https://travis-ci.org/soenkekluth/object-store-state)

# object-store-state

> observable stateful object store

## Usage

```js
const store = require('object-store-state').store;
// es6
import { store } from 'object-store-state';

// create a Store instance with an initial state
const myStore = store({foo: 'bar'});

console.log(myStore.get('foo'));
//=> 'bar'

myStore.set('awesome', true);

console.log(myStore.get('awesome'));
//=> true

// Use dot-notation to access nested properties
myStore.set('bar.baz', true);

console.log(myStore.get('bar'));
//=> {baz: true}

myStore.delete('awesome');

console.log(myStore.get('awesome'));
//=> null

myStore.set('my.super.obj', {foo: 'bar'});

console.log(myStore.get('my.super.obj'));
//=> { foo: 'bar' }

myStore.subscribe('my.super.obj', function(e){
  console.log(e.type, e.value); 
  //=> my.super.obj { foo: 'hans' }
});

myStore.set('my.super.obj', {foo: 'hans'});

console.log(myStore.toJSON());
/* => {
  "foo": "bar",
  "bar": {
    "baz": true
  },
  "my": {
    "super": {
      "obj": {
        "foo": "hans"
      }
    }
  }
}
*/
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## License

MIT
