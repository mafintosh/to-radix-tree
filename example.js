const toRadixTree = require('./')

const tree = toRadixTree([
  'hello',
  'world',
  'hello world'
])

require('util').inspect.defaultOptions.depth = Infinity
console.log(tree)
