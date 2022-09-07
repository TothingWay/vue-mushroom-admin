import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export const visitedViewsStorage = useStorage('visitedViews', [])

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: visitedViewsStorage.value as RouteLocationNormalizedLoaded[],
    cachedViews: visitedViewsStorage.value.map((view: any) => view.fullPath) as string[],
  }),
  actions: {
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if (this.visitedViews.some((v) => v.path === view.path)) return

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name',
        })
      )
    },
    addCachedView(view: RouteLocationNormalizedLoaded) {
      if (this.cachedViews.includes(view.fullPath)) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.fullPath)
      }
    },
    addView(view: RouteLocationNormalizedLoaded) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },

    delVisitedView(view: RouteLocationNormalizedLoaded) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: RouteLocationNormalizedLoaded) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.fullPath)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    delView(view: RouteLocationNormalizedLoaded) {
      return new Promise<any>((resolve) => {
        Promise.all([this.delVisitedView(view), this.delCachedView(view)]).then(() => {
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews],
          })
        })
      })
    },

    delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: RouteLocationNormalizedLoaded) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.fullPath)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      return new Promise((resolve) => {
        Promise.all([this.delOthersVisitedViews(view), this.delOthersCachedViews(view)]).then(
          () => {
            resolve({
              visitedViews: [...this.visitedViews],
              cachedViews: [...this.cachedViews],
            })
          }
        )
      })
    },

    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },
    delAllViews() {
      return new Promise<any>((resolve) => {
        Promise.all([this.delAllVisitedViews(), this.delAllCachedViews()]).then(() => {
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews],
          })
        })
      })
    },

    updateVisitedView(view: RouteLocationNormalizedLoaded) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
