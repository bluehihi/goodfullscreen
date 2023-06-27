import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    lib:{
      entry:'src/index.ts',
      name:'Goodfullscreen',
      fileName:'index'
    },
    rollupOptions:{
      output:{
        globals:{
          vue:'Vue'
        }
      },
      //不想打包进库的文件
      external: ['vue'],
    }
  }
})
