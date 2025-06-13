<template>
  <el-popover v-model:visible="visible" :disabled="disabled" trigger="click" placement="bottom-end" width="405px" :offset="2" :show-arrow="false" @show="open" @hide="close">
    <template #reference>
      <el-input v-model="showValue" :placeholder="$attrs.placeholder || '请输入'" :class="['v-batch-input', showValue && !visible && 'is--value']" v-bind="$attrs">
        <template #suffix>
          <svg class="v-batch-input-icon" width="14px" height="14.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#909399"
              d="M765.932181 720.345605m22.756717 22.756717l226.015571 226.015571q22.756717 22.756717 0 45.513433l0 0q-22.756717 22.756717-45.513433 0l-226.015571-226.015571q-22.756717-22.756717 0-45.513433l0 0q22.756717-22.756717 45.513433 0Z" />
            <path fill="#909399"
              d="M192.365714 236.982857m32.182857 0l575.634286 0q32.182857 0 32.182857 32.182857l0 0q0 32.182857-32.182857 32.182857l-575.634286 0q-32.182857 0-32.182857-32.182857l0 0q0-32.182857 32.182857-32.182857Z" />
            <path fill="#909399"
              d="M192.365714 479.817143m32.182857 0l191.634286 0q32.182857 0 32.182857 32.182857l0-0.731429q0 32.182857-32.182857 32.182858l-191.634286 0q-32.182857 0-32.182857-32.182858l0 0.731429q0-32.182857 32.182857-32.182857Z" />
            <path fill="#909399"
              d="M192.365714 722.651429m32.182857 0l63.634286 0q32.182857 0 32.182857 32.182857l0-0.731429q0 32.182857-32.182857 32.182857l-63.634286 0q-32.182857 0-32.182857-32.182857l0 0.731429q0-32.182857 32.182857-32.182857Z" />
            <path fill="#909399"
              d="M896 0H128A128 128 0 0 0 0 128v768A128 128 0 0 0 128 1024h576.365714v-63.634286H128a64.365714 64.365714 0 0 1-63.634286-64.365714V128a63.634286 63.634286 0 0 1 63.634286-63.634286h768a64.365714 64.365714 0 0 1 64.365714 63.634286v448.365714H1024V128A128 128 0 0 0 896 0z" />
            <path fill="#909399"
              d="M670.72 449.097143a192.365714 192.365714 0 1 0 191.634286 192.365714 192.365714 192.365714 0 0 0-191.634286-192.365714z m0 320.365714a128 128 0 1 1 128-128 128 128 0 0 1-128 128z" />
          </svg>
          <svg class="v-batch-input-clear" @mouseenter="disabled = true" @mouseleave="disabled = false" @click="clear" t="1731313372920" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="3649" width="19" height="19">
            <path d="M512 96a416 416 0 1 1 0 832 416 416 0 0 1 0-832z m0 64a352 352 0 1 0 0 704 352 352 0 0 0 0-704z" p-id="3650" fill="currentColor"></path>
            <path d="M365.12 387.328a32 32 0 0 1 44.864-45.248l4.096 4.032 244.8 290.56a32 32 0 0 1-44.864 45.248l-4.096-4.032-244.8-290.56z" p-id="3651" fill="currentColor"></path>
            <path d="M365.12 636.672a32 32 0 0 0 44.864 45.248l4.096-4.032 244.8-290.56a32 32 0 0 0-44.864-45.248l-4.096 4.032-244.8 290.56z" p-id="3652" fill="currentColor">
            </path>
          </svg>
        </template>
      </el-input>
    </template>
    <div class="v-batch-input-wrapper">
      <el-input ref="inputRef" v-model="inputValue" :rows="12" :placeholder="`一行一个(最多支持${rows}行)`" type="textarea" style="width: 100%;" @blur="handleBlur" />
      <Handle :value="inputValue" @clear="clear" @close="close" @submit="handleConfirm" />
    </div>
  </el-popover>
</template>
<script setup>
import GlobalConfig from "~/packages/config"
import Handle from './Handle.vue'

const props = defineProps({
  modelValue: { type: String, default: () => '' },
  rows: { type: [Number, String], default: () => GlobalConfig.batchInput.rows },
})

const emit = defineEmits(["update:modelValue", "search"])
const visible = ref(false)
const disabled = ref(false)
const inputRef = ref()

const inputValue = computed({
  get() {
    return props.modelValue?.replaceAll(',', '\n') || ''
  },
  set(val) {
    emit('update:modelValue', val?.split('\n').join(',') || '')
  }
})

const showValue = computed(() => inputValue.value?.split('\n').filter(Boolean).join(',') || '')

const open = async () => {
  visible.value = true
  await 1
  inputRef?.value.focus()
}
const close = () => {
  visible.value = false
}

const handleBlur = () => {
  emit('update:modelValue', inputValue.value?.split('\n').filter(Boolean).slice(0, props.rows).join(',') || '')
}

const clear = () => {
  inputValue.value = ''
}

//确认
const handleConfirm = () => {
  close()
  emit("search")
}

defineExpose({ clear })
</script>

<style lang="scss">
.v-batch-input {
  &-wrapper {
    width: 380px;
  }
  .v-batch-input-clear {
    color: #888;
    display: none;
    &:hover {
      color: var(--base-icon-color);
      cursor: pointer;
    }
  }

  &:hover {
    &.is--value {
      .v-batch-input-icon {
        display: none;
      }
      .v-batch-input-clear {
        display: block;
        z-index: 1;
      }
    }
  }
  &.is--focus {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-color-primary))
      inset;
    z-index: 1;
  }
}
</style>