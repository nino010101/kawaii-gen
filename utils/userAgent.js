const ua = window.navigator.userAgent.toLowerCase()
const ver = window.navigator.appVersion.toLowerCase()

const device = () => {
  if (ua.indexOf('iphone') !== -1 || ua.indexOf('ipod') !== -1) return 'iphone' // iPhone
  else if (ua.indexOf('ipad') !== -1) return 'ipad' // iPad
  else if (ua.indexOf('android') !== -1) return 'android' // Android
  else if (ua.indexOf('windows') !== -1 && ua.indexOf('phone') !== -1) return 'windows_phone' // WindowsPhone
  else return ''
}

const browser = () => {
  if (ua.indexOf('edge') !== -1) return 'edge' // Edge
  else if (ua.indexOf('iemobile') !== -1) return 'iemobile' // ieMobile
  else if (ua.indexOf('trident/7') !== -1) return 'ie11' // ie11
  else if (ua.indexOf('msie') !== -1 && ua.indexOf('opera') === -1) {
    if (ver.indexOf('msie 6.') !== -1) return 'ie6' // ie6
    else if (ver.indexOf('msie 7.') !== -1) return 'ie7' // ie7
    else if (ver.indexOf('msie 8.') !== -1) return 'ie8' // ie8
    else if (ver.indexOf('msie 9.') !== -1) return 'ie9' // ie9
    else if (ver.indexOf('msie 10.') !== -1) return 'ie10' // ie10
  } else if (ua.indexOf('chrome') !== -1 && ua.indexOf('edge') === -1) return 'chrome' // Chrome
  else if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) return 'safari' // Safari
  else if (ua.indexOf('opera') !== -1) return 'opera' // Opera
  else if (ua.indexOf('firefox') !== -1) return 'firefox' // FIrefox
  else return 'unknown_browser'
}

export const isMobile = (ua.indexOf('mobi') !== -1 || device() === 'iphone' || (device() === 'windows_phone' && ua.indexOf('wpdesktop') === -1) || browser() === 'iemobile')
export const isIE = (browser().substr(0, 2) === 'ie' && browser() !== 'iemobile')
export const isiOS = (device() === 'iphone' || device() === 'ipad')
