import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hq from 'alias-hq'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: hq.get('rollup')
  },
  plugins: [react()],
})
