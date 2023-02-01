import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import eslint from "vite-plugin-eslint";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    eslint(),
    vitePluginImp({
    optimize: true,
    libList: [
      {
        libName: 'antd',
        libDirectory: 'es',
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  }),],
  resolve:{
    alias:{
      '@': path.resolve( __dirname ,'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
      },
    },
  },
})
