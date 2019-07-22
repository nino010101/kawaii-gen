/**
 * ObjectにKeyがあるかどうかチェックする
 * @param {*} obj 対象のオブジェクト
 * @param {*} keys キーの配列
 */
const hasKeys = (obj, keys) => {
  return !keys.find(key => (!Object.prototype.hasOwnProperty.call(obj, key)))
}

export default hasKeys
