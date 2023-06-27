import Vue from 'vue'
import Screenfull from 'screenfull'
import type { DefineComponent } from 'vue'

declare namespace FullscreenVue3 {
  export interface InstallationOptions {
    name?: string
  }

  export function install(app: typeof Vue, options?: InstallationOptions): void
}

export declare const screenfull: typeof Screenfull


export declare const component: DefineComponent<{}, {}, any>

export default FullscreenVue3

declare module "vue/types/vue" {
  interface Vue {
  }
}