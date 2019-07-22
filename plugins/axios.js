const axiosPlugin = ({ $axios, redirect }) => {
  $axios.onRequest((config) => {
    // request発行前の割り込み処理
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    // error発生時の割り込み処理などはここに
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // bad request
      redirect('/400')
    }
    if (code === 401) {
      // auth error
    }
    if (code === 500) {
      // server error
    }
  })
}

export default axiosPlugin
