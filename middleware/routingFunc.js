/*
 * routerが実行される度に実行前にこの処理が走る
 */
const checkAuth = ({ route, store }) => {
  if (route.path === '/') {
    return
  }
  console.log('check auth')
}

const routingFunc = ({ route, store }) => {
  checkAuth({ route, store })
}

export default routingFunc
