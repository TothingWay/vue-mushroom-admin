declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_BASE_API: string
  VITE_MENU_MODE: 'vertical' | 'horizontal' | 'horizontalSplit'
  VITE_SHOW_LOGO: '1' | '0'
  VITE_TAGS_VIEW: '1' | '0'
  VITE_TITLE: string
  VITE_TAGS_VIEW_STYLE: 'bread' | 'border' | 'card'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
