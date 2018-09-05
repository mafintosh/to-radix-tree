# to-radix-tree

Convert a series of strings into a [radix tree](https://en.wikipedia.org/wiki/Radix_tree)

```
npm install to-radix-tree
```

## Usage

``` js
const toRadixTree = require('to-radix-tree')

const tree = toRadixTree([
  'hello world',
  'hello verden'
])

console.log(tree)
```

Running the above will print something like

```js
{
  prefix: 'hello ',
  children: [{
    prefix: 'world',
    value: 'hello world'
  }, {
    prefix: 'verden',
    value: 'hello verden'
  }]
}
```

## API

#### `tree = toRadixTree(array)`

Turns an array of strings into a radix tree. The tree looks like this

```
{
  prefix: 'all-children-start-with-this',
  children: [tree..],
  value: anArrayItemThatMatchAllParentPrefixes
}
```

## License

MIT
