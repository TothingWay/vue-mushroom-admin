import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// svg icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// see https://cn.vitejs.dev/config/server-options.html#server-host
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true, // 设置服务启动端口号
    port: 9527, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }, // 别名：设置 `@` 指向 `src` 目录
    ],
    extensions: ['.mjs', '.js', '.json'],
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),

    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      resolvers: [
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true, // <-- this
      },
    }),

    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),

    Icons({
      autoInstall: true,
    }),

    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  build: {
    // 指定生成静态资源的存放路径
    assetsDir: 'static',
    // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    reportCompressedSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
  },
})
