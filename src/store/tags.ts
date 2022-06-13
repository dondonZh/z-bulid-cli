/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-10 15:20:30
 * @LastEditors: dali
 * @LastEditTime: 2022-04-21 13:57:56
 */

//src/store/user.ts

import { defineStore } from 'pinia'
import {RouterItem,View} from '@/types'

export type TagsState = {
  visitedViews:View[],
  cachedViews:string[]
}

export const useTagsStore = defineStore({
  id: 'tags', 
  state: () => {
    return {
      visitedViews: [],
      cachedViews:[]
    } as TagsState
  },
  getters: {
    vViews():View[] {
      return this.visitedViews 
    },
    cViews():string[] {
      return this.cachedViews 
    },
  },
  actions: {

    delView(view:RouterItem):Promise<TagsState> {
      window.parent.postMessage({
        cmd: 'del-view'
      }, '*')
      return new Promise(resolve => {
        this.DEL_VISITED_VIEW(view)
        this.DEL_CACHED_VIEW(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllView():Promise<TagsState> {
      return new Promise(resolve => {
        this.DEL_ALL_VISITED_VIEWS()
        this.DEL_ALL_CACHED_VIEWS()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersViews(view:RouterItem):Promise<TagsState> {
      return new Promise(resolve => {
        this.DEL_OTHERS_VISITED_VIEWS(view)
        this.DEL_OTHERS_CACHED_VIEWS(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    addView(view:RouterItem) {
      this.ADD_VISITED_VIEW(view)
      this.ADD_CACHED_VIEW(view)
    },
    updateVisitedView(view:RouterItem) {
      this.UPDATE_VISITED_VIEW(view)
    },
    

    ADD_VISITED_VIEW(view:RouterItem) {
      console.log('this',this)
      console.log('this.visitedViews',this.visitedViews)
      
      if (this.visitedViews.some((v:RouterItem) => v.path === view.path)) return
      this.visitedViews.push({...view,title: (view.meta?.title || 'no-name') as string})
    },

    ADD_CACHED_VIEW(view:RouterItem) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEW(view:RouterItem) {
      const fIdx = this.visitedViews.findIndex((v) => v.path === view.path)
      if(~fIdx){
       this.visitedViews.splice(fIdx, 1)
      }
    },

    DEL_CACHED_VIEW(view:RouterItem) {
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },

    DEL_OTHERS_VISITED_VIEWS(view:RouterItem) {
      this.visitedViews = this.visitedViews.filter(v => {
        return v.meta?.affix || v.path === view.path
      })
    },
    
    DEL_OTHERS_CACHED_VIEWS(view:RouterItem) {
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },

    DEL_ALL_VISITED_VIEWS() {
      const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
      this.visitedViews = affixTags
    },

    DEL_ALL_VISITED_VIEWS_FORCE() {
      this.visitedViews = []
    },

    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },
    
    UPDATE_VISITED_VIEW(view:RouterItem) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})

