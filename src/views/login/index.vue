<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'
import type { LocationQuery } from 'vue-router'
import { useUserStore } from '@/store/user'
import User from '~icons/ep/user'
import Lock from '~icons/ep/lock'
const { t } = useI18n()

const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const loading = ref(false)

const loginRules: FormRules = reactive({
  username: [{ required: true, trigger: 'blur', message: t('login.loginRules.username') }],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error(t('login.loginRules.password')))
        } else {
          callback()
        }
      },
    },
  ],
})

// 获取url重定向的参数
const route = useRoute()
const redirect = ref()
const otherQuery = ref({})
const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc: LocationQuery, cur: string) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
watch(
  route,
  (route) => {
    const query = route.query
    if (query) {
      redirect.value = query.redirect
      otherQuery.value = getOtherQuery(query)
    }
  },
  {
    immediate: true,
  }
)

// 大小写检测
const capsTooltip = ref(false)
const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  capsTooltip.value = !!(key && key.length === 1 && key >= 'A' && key <= 'Z')
}

// 登录
const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()
const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/', query: otherQuery.value })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}

// 自动聚焦输入框
const usernameRef = ref<HTMLInputElement>()
const passwordRef = ref<HTMLInputElement>()
onMounted(() => {
  if (loginForm.username === '') {
    usernameRef.value?.focus()
  } else if (loginForm.password === '') {
    passwordRef.value?.focus()
  }
})
</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      size="large"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          :placeholder="$t('login.loginForm.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          :prefix-icon="User"
        />
      </el-form-item>

      <el-tooltip :visible="capsTooltip" :content="$t('login.capslock')" placement="right">
        <el-form-item prop="password">
          <el-input
            ref="passwordRef"
            v-model="loginForm.password"
            show-password
            :placeholder="$t('login.loginForm.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            :prefix-icon="Lock"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
          />
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width: 100%" @click.prevent="handleLogin">
        {{ $t('login.login') }}
      </el-button>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 520px;
    max-width: 90%;
    height: 50%;

    :deep(input) {
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
      }
    }
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
