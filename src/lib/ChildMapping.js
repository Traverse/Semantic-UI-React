import _ from 'lodash'
import { Children, isValidElement } from 'react'

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {object} children Element's children
 * @param {function} [iteratee] Function that will be applied to each element
 * @return {object} Mapping of key to child
 */
export const getChildMapping = (children, iteratee) => {
  const mapper = child => iteratee && isValidElement(child) ? iteratee(child) : child

  return _.keyBy(Children.map(children, mapper), 'key')
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
export function mergeChildMappings(prev = {}, next = {}) {
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key]
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextKeysPending = Object.create(null)

  let pendingKeys = []
  for (const prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys
        pendingKeys = []
      }
    } else {
      pendingKeys.push(prevKey)
    }
  }

  let i
  const childMapping = {}
  for (const nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        const pendingNextKey = nextKeysPending[nextKey][i]
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
          pendingNextKey,
        )
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey)
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i])
  }

  return childMapping
}
