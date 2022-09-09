import { Directive } from 'vue'
import type { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { roles } = storeToRefs(useUserStore())
    const { value } = binding

    if (value && value instanceof Array) {
      const hasPermission = roles.value.some((role: string) => {
        return value.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need roles! Like v-auth=\"['admin','test']\"")
    }
  },
}
