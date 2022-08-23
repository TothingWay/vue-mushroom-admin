export interface routeMetaType {
  title?: string
  icon?: string
  parent?: string
  noCache?: boolean
  affix?: boolean
}
export interface routeType {
  component: any
  componentPath?: string
  path: string
  redirect?: string
  query?: object
  meta?: routeMetaType
  children?: routeType[]
  name: string
}

export interface userInfoType {
  username: string
  password: string
}
