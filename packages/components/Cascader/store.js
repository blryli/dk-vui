export const store = {}
export const updateCascaderOptions = (type) => {
  if (type === '' || type == null) {
    console.error('参数type不能为空')
    return
  }
  const key = String(type)
  if (!store[key]?.update) {
    console.error(`没有找到类型为 ${type} 的VCascader组件`)
    return
  }
  store[key].update()
}
