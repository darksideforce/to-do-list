import { createApp } from 'vue'


import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import 'default-passive-events'
import { createPinia } from 'pinia'

import App from './App.vue'
import { SvgIconPlugin } from "./components/svgIcon/index";
import "virtual:svg-icons-register";
import '@/assets/styles/variable.less'
import directives from './directive/index.js'

const pinia = createPinia()
// `nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
// import './demos/ipc'
// createApp(App).use(SvgIconPlugin).mount("#app");
createApp(App)
  .use(SvgIconPlugin)
  .use(directives)
  .use(pinia)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  .directive('',{})
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  
