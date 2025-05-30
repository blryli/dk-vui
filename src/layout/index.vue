<script setup>
import { routes } from '../router'
import { useRoute } from 'vue-router'
import { useColorMode } from "@vueuse/core"

const route = useRoute()

const mode = useColorMode({
  attribute: "class",
  modes: { light: "light", grey: "grey", dark: "dark" },
})

const maps = {
  components: '组件',
  directives: '指令',
  api: 'API',
  public: '全局参数',
}
const list = routes.reduce((acc, cur) => {
  let fullPath = cur.path
  const paths = fullPath.substring(1).split('/')
  const [parant, child] = paths
  const path = `/${parant}`
  if (path === '/') return acc
  if (path === '/index') {
    acc.unshift({ path, name: parant })
    return acc
  }
  if (child) {
    const index = acc.findIndex(d => d.path === path)
    if (index > -1) {
      acc[index].children.push({ path: fullPath, name: child })
    } else {
      acc.push({ path, name: maps[parant] || parant, children: [{ path: fullPath, name: child }] })
    }
  } else {
    acc.push({ path, name: parant })
  }
  return acc
}, [])
const menus = ['/index', '/public', '/components', '/directives', '/api'].map(d => list.find(l => l.path === d))
console.log('menus', menus)
</script>

<template>
  <div class="app-header">
    <div class="logo">dk-vui</div>
    <el-radio-group v-model="mode" style="margin-left: auto;">
      <el-radio-button label="light" value="light" />
      <el-radio-button label="grey" value="grey" />
      <el-radio-button label="dark" value="dark" />
    </el-radio-group>
  </div>
  <div class="app-container">
    <el-scrollbar class="menu">
      <div class="menu-list">
        <template v-for="(da, idx) in menus">
          <div v-if="da.children" :key="da.path" class="menu-group">
            <h3 class="menu-title">{{ da.name }}</h3>
            <div v-for="(d, i) in da.children" :key="i" class="menu-item" :class="d.path === route.path && 'is--active'">
              <router-link :to="d.path">
                <el-link :underline="false" :type="d.path === route.path ? 'primary' : 'default'">{{ d.name }}</el-link>
              </router-link>
            </div>
          </div>
          <div v-else :key="idx" class="menu-item">
            <router-link :to="da.path">
              <el-link :underline="false">{{ da.name }}</el-link>
            </router-link>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <div class="body">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- <keep-alive>
          <component :is="Component" />
        </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>

<style lang="scss">
.app-header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid rgba($color: #666, $alpha: .3);
  background: var(--el-bg-color);
  z-index: 100;

  .logo {
    font-size: 24px;
    font-weight: bold;
  }
}

.app-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .menu {
    padding: 3rem 2rem;
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
    width: var(--menu-width);
    background-color: var(--el-bg-color);

    &-group {
      .menu-item {
        padding-left: 15px;
      }
    }

    &-title {
      margin: 0;
    }

    .el-link,
    &-title {
      display: block;
      padding: 10px;
    }
    .is--active {
      .el-link__inner {
        font-weight: bold;
      }
    }
  }
}

:root {
  --border-color: #ddd;
  --menu-width: 200px;
}

.body {
  height: 100%;
  margin-left: var(--menu-width);
  background-color: var(--el-bg-color);
  border-radius: 6px;
  padding-top: 50px;
}
.page {
  min-height: calc(100% - 30px);
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 30px;

  table {
    border-collapse: collapse;
    width: 100%;
    background-color: var(--el-bg-color);
    font-size: var(--el-font-size-base);
    line-height: 1.5em;

    th {
      border-bottom: 1px solid var(--border-color);
      padding: 0.6em 1em;
      text-align: left;
      max-width: 250px;
      white-space: pre-wrap;
    }

    td {
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      padding: 0.6em 1em;
      text-align: left;
      max-width: 250px;
      white-space: pre-wrap;
    }
  }
}
</style>