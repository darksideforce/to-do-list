import { createApp } from 'vue'
import App from './App.vue'
import { SvgIconPlugin } from "./components/svgIcon/index";
import "virtual:svg-icons-register";
import './style.css'

// `nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
// import './demos/ipc'
// createApp(App).use(SvgIconPlugin).mount("#app");
createApp(App)
  .use(SvgIconPlugin)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
