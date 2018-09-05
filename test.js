const tape = require('tape')
const toRadixTree = require('./')

tape('basic', function (t) {
  const tree1 = toRadixTree([
    'hello world'
  ])

  t.same(tree1, { prefix: 'hello world', children: null, value: 'hello world' })

  const tree2 = toRadixTree([
    'hello world',
    'hello verden'
  ])

  t.same(tree2, {
    prefix: 'hello ',
    children: [
      { prefix: 'verden', children: null, value: 'hello verden' },
      { prefix: 'world', children: null, value: 'hello world' }
    ],
    value: null
  })

  const tree3 = toRadixTree([
    'hello world',
    'hello verden',
    'hello'
  ])

  t.same(tree3, {
    prefix: 'hello',
    children: [
      { prefix: '', children: null, value: 'hello' },
      {
        prefix: ' ',
        children: [
          { prefix: 'verden', children: null, value: 'hello verden' },
          { prefix: 'world', children: null, value: 'hello world' }
        ],
        value: null
      }
    ],
    value: null
  })

  t.end()
})

tape('non strings', function (t) {
  const tree = toRadixTree([
    'hello world',
    [ 'hello ', world ]
  ])

  t.same(tree, {
    prefix: 'hello ',
    children: [
      { prefix: 'world', children: null, value: 'hello world' },
      { prefix: [ world ], children: null, value: [ 'hello ', world ] }
    ],
    value: null
  })

  t.end()

  function world () {}
})
