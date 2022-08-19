import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Unocss from 'unocss/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { viteMockServe } from 'vite-plugin-mock'
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
      { find: 'path', replacement: 'path-browserify' }, // 别名：设置 `@` 指向 `src` 目录
    ],
    extensions: ['.mjs', '.js', '.json'],
  },
  plugins: [
    vue(),

    AutoImport({
      // 自动导入 Vue, Vue-i18n 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-i18n', 'vue-router'],
      dts: 'src/auto-imports.d.ts',

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
      dts: 'src/components.d.ts',
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

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'src/lang/**')],
    }),

    // mock
    viteMockServe({
      // 控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    }),

    Unocss(),
  ],
  build: {
    // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    reportCompressedSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
  },
})
