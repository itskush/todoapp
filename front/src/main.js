import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

library.add(faEllipsisV,faPlusSquare,faMinusSquare)

Vue.use(Buefy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
