declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_MENU_MODE: string
  readonly VITE_SHOW_LOGO: '1' | '0'
  readonly VITE_TAGS_VIEW: '1' | '0'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
