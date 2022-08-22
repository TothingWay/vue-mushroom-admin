/**
 * @name: 深拷贝
 * @param {Object | Array} 深拷贝的对象
 * @param {string[]} 忽略要拷贝的key 数组
 * @return source
 */
export function deepClone(source: any, ignore: string[] = []) {
  if (!source && typeof source !== 'object') {
    throw new Error('deepClone: error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (!ignore.includes(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys], ignore)
      } else {
        targetObj[keys] = source[keys]
      }
    }
  })
  return targetObj
}
