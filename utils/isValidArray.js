/**
 * 渡された値が配列かつ配列に値が入っているかを検証する
 * @param {*} array 対象の配列
 */
const isValidArray = (array) => {
  return Array.isArray(array) && array.length > 0
}

export default isValidArray
