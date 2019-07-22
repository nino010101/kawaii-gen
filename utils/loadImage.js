/**
 * promiseベースのイメージロード関数
 * @param {*} src imageのPath
 */
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = e => reject(e)
    img.src = src
  })
}

export default loadImage
