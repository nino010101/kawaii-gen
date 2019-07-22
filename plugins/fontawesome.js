import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faMinus)

Vue.component('fa-icon', FontAwesomeIcon)
