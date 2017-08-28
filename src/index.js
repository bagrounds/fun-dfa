/**
 *
 * @module fun-dfa
 */
;(function () {
  'use strict'

  /* imports */
  var array = require('fun-array')
  var fn = require('fun-function')
  var object = require('fun-object')
  var guard = require('guarded')
  var type = require('fun-type')

  var api = {
    accept: accept,
    transition: transition
  }

  var is2dArrayOfNum = type.isArrayOf(type.isArrayOf(type.isNumber))

  var guards = {
    accept: guard(
      type.isTuple([
        is2dArrayOfNum,
        type.isArrayOf(type.isNumber),
        type.isArrayOf(type.isNumber)
      ]),
      type.isBoolean
    ),
    transition: guard(
      type.isTuple([is2dArrayOfNum, type.isNumber, type.isNumber]),
      type.isNumber
    )
  }

  /* exports */
  module.exports = object.map(fn.curry, object.ap(guards, api))

  /**
   * The transition table encodes a dfa as follows:
   * - states = 0..Qn
   * - input alphabet = 0..An
   * - start state = 0
   *
   * table[currentState][inputSymbol] = nextState
   *
   * @function module:fun-dfa.accept
   *
   * @param {Array<Array<Number>>} table - of state transitions
   * @param {Array<Number>} accept - states
   * @param {Array<Number>} input - sequence
   *
   * @return {Boolean} if the dfa accepts input
   */
  function accept (table, accept, input) {
    return array.contains(
      array.fold(fn.curry(transition)(table), 0, input),
      accept
    )
  }

  /**
   *
   * @function module:fun-dfa.transition
   *
   * @param {Array<Array<Number>>} table - of state transitions
   * @param {Number} q - current state
   * @param {Number} a - current symbol
   *
   * @return {Number} next state
   */
  function transition (table, q, a) {
    return table[q][a]
  }
})()

