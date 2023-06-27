import { App } from 'vue'
import Fullscreen from './Fullscreen.vue'
import screenfull from 'screenfull'
import defaults from 'lodash/fp/defaults';
// 可以按需引入
export {
  screenfull,
  Fullscreen
}


//这里可以直接使用库  全局
export default {
    install (app:App,{name='fullscreen'}){
        app.component(name,defaults(Fullscreen,{name}))
    }
}