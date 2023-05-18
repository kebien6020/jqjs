// Like jq, but worse
// node -e 'with(require("./p.js")){r()}'

const fs = require('fs')

// in
const i = () => fs.readFileSync(0, 'utf8')
// out
const o = d => (console.log(d), d)
// out as json
const oj = d => console.log(JSON.stringify(d, null, 2))
// pipe
const p = (x, ...fns) => fns.reduce((acc, fn) => fn(acc), x)
// compose
const c = (...fns) => x => p(x, ...fns)
// run (in -> fns... -> out)
const r = (...fns) => p(i(), ...fns, o)
// run but output as json
const rj = (...fns) => p(i(), ...fns, oj)

const map = fn => d => d.map(fn)
const reduce = fn => init => d => d.reduce(fn, init)
const filter = fn => d => d.filter(fn)
const group_by = fn => reduce ((obj, x) => ((obj[fn(x)] ??= []).push(x), obj)) ({})
const reverse = d => [...d].reverse()
const split = sep => d => d.split(sep)
const join = sep => d => d.join(sep)
const lines = c(split ('\n'), filter(Boolean))
const unlines = join ('\n')
const first = d => d[0]
const last = d => d[d.length - 1]
const enumerate = d => d.map((o, idx) => [idx, o])
const flat = d => d.flat()

module.exports = {
	i, o, oj, c, p, r, rj,
	map, reduce, filter, group_by, reverse, split, join, lines, unlines,
	first, last, enumerate, flat
}
