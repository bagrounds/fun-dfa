;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var scalar = require('fun-scalar')
  var array = require('fun-array')

  function natMod2Test (sequence, accept) {
    return [
      [
        [[2, 1], [2, 3], [3, 1], [3, 3]],
        [1, 2],
        sequence
      ],
      accept,
      'accept'
    ]
  }

  var equalityTests = [
    natMod2Test([0], true),
    natMod2Test([1], true),
    natMod2Test(array.repeat(2, 1), false),
    natMod2Test(array.repeat(2, 0), false),
    natMod2Test(array.sequence(scalar.mod(2), 10), true),
    natMod2Test(array.prepend(1, array.sequence(scalar.mod(2), 10)), true),
    [[[[0, 0], [1, 1]], 0, 0], 0, 'transition'],
    [[[[0, 0], [1, 1]], 0, 1], 0, 'transition'],
    [[[[0, 0], [1, 1]], 1, 0], 1, 'transition'],
    [[[[0, 0], [1, 1]], 1, 1], 1, 'transition']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  /* exports */
  module.exports = equalityTests.map(funTest.sync)
})()

