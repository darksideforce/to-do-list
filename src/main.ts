import { createApp } from 'vue'
import App from './App.vue'
import { SvgIconPlugin } from "./components/svgIcon/index";
import "virtual:svg-icons-register";
import './style.css'
import directives from './directive/index.js'

// `nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
// import './demos/ipc'
// createApp(App).use(SvgIconPlugin).mount("#app");
createApp(App)
  .use(SvgIconPlugin)
  .use(directives)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
