export interface routeMetaType {
  title?: string
  icon?: string
  parent?: string
  noCache?: boolean
  affix?: boolean
  componentPath?: string
}
export interface routeType {
  component: any
  componentPath?: string
  path: string
  fullPath?: string
  redirect?: string
  query?: object
  meta?: routeMetaType
  children?: routeType[]
  name: string
  isLayout?: boolean
}

export interface userInfoType {
  username: string
  password: string
}
