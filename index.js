module.exports = buildTree

function buildTree (strings) {
  strings = strings.map(normalize).sort(sort)
  if (!strings.length) return { match: [], next: null, value: null }
  return buildTreeRecursive(strings, 0, 0)
}

function buildTreeRecursive (strings, start, parent) {
  if (!strings.length) return { match: [], next: null, value: null }

  var i = 0
  var first = strings[i]

  if (strings.length === 1) return { prefix: first.match.slice(parent), children: null, value: first.value }

  const node = {
    prefix: first.match.slice(parent, start),
    children: [],
    value: null
  }

  while (i < strings.length) {
    const j = i
    first = strings[i++]
    var min = first.match.length
    for (; i < strings.length; i++) {
      const next = similar(first.match, strings[i].match, start)
      if (next === start) break
      min = Math.min(next, min)
    }
    node.children.push(buildTreeRecursive(strings.slice(j, i), min, start))
  }

  if (node.children.length === 1) return node.children[0]
  return node
}

function toMatch (val) {
  if (isString(val)) return val
  if (Array.isArray(val)) return val
  return val.match
}

function normalize (value) {
  const str = toMatch(value)

  if (isString(str)) return { match: str, value }

  const res = []
  for (var i = 0; i < str.length; i++) {
    if (isString(str[i])) normalizeString(str[i], res)
    else res.push(str[i])
  }
  return { match: res, value }
}

function normalizeString (str, res) {
  for (var i = 0; i < str.length; i++) {
    res.push(str[i])
  }
}

function similar (a, b, i) {
  const len = Math.min(a.length, b.length)
  for (; i < len; i++) {
    if (a[i] !== b[i]) return i
  }
  return len
}

function isString (s) {
  return typeof s === 'string'
}

function sort (a, b) {
  const len = Math.min(a.match.length, b.match.length)

  for (var i = 0; i < len; i++) {
    const ai = a.match[i]
    const bi = b.match[i]
    if (!isString(ai) && !isString(bi)) continue
    if (!isString(ai)) return 1
    if (!isString(bi)) return -1
    if (ai < bi) return -1
    if (ai > bi) return 1
  }

  return a.match.length - b.match.length
}
