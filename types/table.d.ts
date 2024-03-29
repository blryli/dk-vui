import { defineComponent } from 'vue'

/**
 * dk-vui 组件 - 表格
 */

export default /*#__PURE__*/ defineComponent(
  {
    props: {
      scrollHideForm: Boolean, // 滚动时是否收起搜索区域
      autoLoadQuery: Boolean, // 加载完毕后是否主动请求数据
      crossSlip: Boolean, // 是否开启鼠标滚轮横向滚动
    }
  },
)
