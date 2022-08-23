import { defineStore } from 'pinia'
import { routeType } from './types'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [] as routeType[],
    cachedViews: [] as string[],
  }),
  actions: {
    addVisitedView(view: routeType) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name',
        })
      )
    },
    addCachedView(view: routeType) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    addView(view: routeType) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },

    delVisitedView(view: routeType) {
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
    delCachedView(view: routeType) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    delView(view: routeType) {
      return new Promise((resolve) => {
        Promise.all([this.delVisitedView(view), this.delCachedView(view)]).then(() => {
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews],
          })
        })
      })
    },

    delOthersVisitedViews(view: routeType) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: routeType) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },
    delOthersViews(view: routeType) {
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
      return new Promise((resolve) => {
        Promise.all([this.delAllVisitedViews(), this.delAllCachedViews()]).then(() => {
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews],
          })
        })
      })
    },

    updateVisitedView(view: routeType) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
