<template>
  <div
    id="tags-view-container"
    ref="tagsview"
    class="tags-view-container"
  >
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag)?'active':''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      class="tags-view-item"
      @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
      @contextmenu.prevent="openMenu(tag,$event)"
    >
      <p class="p-title">
        {{ tag.title }}
      </p>
      <el-icon
        v-if="!isAffix(tag)"
        :size="20"
        class="el-icon-close"
        @click.prevent.stop="closeSelectedTag(tag)"
      >
        <close />
      </el-icon>
    </router-link>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭当前
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭所有
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { useTagsStore } from '@/store/tags'
import { defineComponent ,watch,onMounted,ref,nextTick ,toRefs} from 'vue'
import { useRouter ,useRoute } from 'vue-router'
import {RouterItem,View} from '@/types'
import { Close } from '@element-plus/icons-vue'


export default defineComponent({
  components: {
    Close
  },
  setup () {
    const router = useRouter()
    const cRoute = useRoute()
    const useTag = useTagsStore()
    const {vViews} = toRefs(useTag)
    const { delView,addView,delAllView,delOthersViews,updateVisitedView} = useTag

    const top = ref<number>(0)
    const left = ref<number>(0)
    const visible = ref(false)
    const selectedTag = ref<View>()
    const tagsview = ref()

   
    const  isActive = (route:RouterItem) => {
     return route.path === cRoute.path;
    }

    const  isAffix = (tag:View) => {
      return tag?.meta?.affix;
    }

   const  toLastView = (visitedViews:View[], view:View) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        latestView.fullPath && router.push(latestView.fullPath) 
      } else {
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }

    const closeSelectedTag = (view:View) => {
      console.log('vViews',vViews)
      
      //如果是最后一个标签 不让关闭
      if(vViews.value.length === 1){
        return
      }
      delView(view).then(({ visitedViews }:{visitedViews:View[]}) => {
        if (isActive(view)) {
          toLastView(visitedViews, view);
        }
      });
    }

     const moveToCurrentTag = () => {
        nextTick(() => {
          for (const tag of vViews.value) {
            if (tag.path === cRoute.path) {
              // when query is different then update
              if (tag.fullPath !== cRoute.fullPath) {
                updateVisitedView( { ...cRoute } as RouterItem)
              }
              break;
            }
          }
        });
     }


    const closeOthersTags = () => {
      if(selectedTag.value){
        router.push(selectedTag.value.fullPath);
        console.log('ininiinselectedTag.value',selectedTag.value)
        delOthersViews(selectedTag.value).then(() => {
          console.log('vView',vViews)
          
          moveToCurrentTag()
        });
      }
    }

    const refreshSelectedTag = (view:View) => {
       console.log('t')
      
    }

    const closeAllTags = (view:View) => {
          //如果是最后一个标签 不让关闭
      if(vViews.value.length === 1){
        return
      }
      let firstVisitedView = vViews.value[0]
      delAllView().then(({ visitedViews }:{visitedViews:View[]}) => {
        //如果标签为0 默认推送第一个标签
        if(visitedViews.length === 0){
           addView(firstVisitedView)
        }
        toLastView(visitedViews, view);
      });
    }

 
    const  openMenu = (tag:View, e:MouseEvent) => {
      const menuMinWidth = 105;
      const offsetLeft = tagsview?.value.getBoundingClientRect().left; // container margin left
      const offsetWidth = tagsview?.value.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const leftWidth = e.clientX - offsetLeft + 15; // 15: margin right

      if (leftWidth > maxLeft) {
        left.value = maxLeft;
      } else {
        left.value = leftWidth;
      }

      top.value = e.clientY - 10;
      visible.value = true;
      selectedTag.value = tag;
    }

    const addTags = () =>{
      
      const { name } = cRoute
      console.log('name',name)

      const addRoute = { ...cRoute } as RouterItem
      if (name) {
        addView(addRoute)
      }
      return false
    }
    
    onMounted(() => {
      console.log('cRoute',cRoute)
    })
   
    watch(cRoute, () => {
      addTags()
    },{immediate:true})

    const closeMenu = ()=>{
      visible.value = false
    }

    watch(visible, (value) => {
      if (value) {
        document.body.addEventListener("click", closeMenu);
      } else {
        document.body.removeEventListener("click", closeMenu);
      }
    })


    return {
      visitedViews:vViews,
      top,
      left,
      visible,
      tagsview,
      selectedTag,
      openMenu,
      closeSelectedTag,
      closeOthersTags,
      refreshSelectedTag,
      closeAllTags,
      isAffix,
      isActive
    }
  },
  methods:{

  }
})
// import { SingleMenu } from  '@/module/business/menu';
// import mainMenu from "./SidebarData";
// import bus from '../bus';
// export default {
//   data() {
//     return {
//       visible: false,
//       top: 0,
//       left: 0,
//       selectedTag: {},
//     };
//   },
//   computed: {
//     visitedViews() {
//       return this.$store.state.visitedViews;
//     },
//     routeNoMatch() {
//       return { ...this.$route, matched: "" };
//     },
//   },
//   watch: {
//     $route() {
//       this.addTags();
//       //重新定位左侧与头部菜单
//       this.moveSideBarAndHead()
//       this.moveToCurrentTag();
//     },
//     visible(value) {
//       if (value) {
//         document.body.addEventListener("click", this.closeMenu);
//       } else {
//         document.body.removeEventListener("click", this.closeMenu);
//       }
//     },
//   },
//   mounted() {
//     this.addTags();
//     //重新定位左侧与头部菜单
//     this.moveSideBarAndHead()
//   },
//   methods: {
//     isActive(route) {
//       return route.path === this.$route.path;
//     },
//     isAffix(tag) {
//       return tag.meta && tag.meta.affix;
//     },
//     addTags() {
//       const isExist = this.visitedViews.some(item => {
//           return item.fullPath === this.$route.fullPath;
//       })
//       if(!isExist){
//          if(this.visitedViews.length >= 8){
//             let affixIndex = this.visitedViews.findIndex(v => v.meta.affix)
//             let delView = ~affixIndex ? this.visitedViews.slice(affixIndex + 1,affixIndex + 2)[0] : this.visitedViews[0]
//             this.$store.dispatch("delView", delView)
//          }
//       }
//       let {path} = this.$route;
//       //如果是刷新不填入标签
//       if(!~path.indexOf('/redirect')){
//         this.$store.dispatch("addView", this.routeNoMatch);
//       }
//       return false;
//     },
//     //联动侧边菜单激活与头部菜单激活
//     moveSideBarAndHead(){
//       let tepMenu = JSON.parse(JSON.stringify(mainMenu));
//       let fmenu = SingleMenu.getInstance().filterMenu(tepMenu)
//       //父层级的index
//       let [parentIndex,colsestParentIndex] = SingleMenu.getInstance().findParentIndex(fmenu,this.$route.path)
//       //更改header菜单
//       ~parentIndex && bus.$emit('refreshHeader',parentIndex,colsestParentIndex)
//     },
//     moveToCurrentTag() {
//       const tags = this.$refs.tag;
//       this.$nextTick(() => {
//         for (const tag of tags) {
//           if (tag.to.path === this.$route.path) {
//             // when query is different then update
//             if (tag.to.fullPath !== this.$route.fullPath) {
//               this.$store.dispatch("updateVisitedView", this.routeNoMatch);
//             }
//             break;
//           }
//         }
//       });
//     },
//     refreshSelectedTag(view) {
//       this.$store.dispatch("delCachedView", view).then(() => {
//         const { fullPath } = view;
//         this.$nextTick(() => {
//           this.$router.replace({
//             path: "/redirect" + fullPath,
//           });
//           if(view.meta.isIframe){
//             document.getElementById('eiframe').contentWindow.postMessage(
//               {
//                 cmd: "refresh",
//               },
//               "*"
//             );
//           }
//         });
//       });
//     },
//     closeSelectedTag(view) {
//       //如果是最后一个标签 不让关闭
//       if(this.visitedViews.length === 1){
//         return
//       }
//       this.$store.dispatch("delView", view).then(({ visitedViews }) => {
//         if (this.isActive(view)) {
//           this.toLastView(visitedViews, view);
//         }
//       });
//     },
//     closeOthersTags() {
//       this.$router.push(this.selectedTag);
//       this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
//         this.moveToCurrentTag();
//       });
//     },
//     closeAllTags(view) {
//       //如果是最后一个标签 不让关闭
//       if(this.visitedViews.length === 1){
//         return
//       }
//       let firstVisitedView = this.visitedViews[0]
//       this.$store.dispatch("delAllViewsWithAffix").then(({ visitedViews }) => {
//         //如果标签为0 默认推送第一个标签
//         if(visitedViews.length === 0){
//           this.$store.dispatch("addView", firstVisitedView);
//         }
//         this.toLastView(this.visitedViews, view);
        
//       });
//     },
//     toLastView(visitedViews, view) {
//       const latestView = visitedViews.slice(-1)[0];
//       if (latestView) {
//         this.$router.push(latestView.fullPath);
//       }
//     },
//     openMenu(tag, e) {
//       const menuMinWidth = 105;
//       const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
//       const offsetWidth = this.$el.offsetWidth; // container width
//       const maxLeft = offsetWidth - menuMinWidth; // left boundary
//       const left = e.clientX - offsetLeft + 15; // 15: margin right

//       if (left > maxLeft) {
//         this.left = maxLeft;
//       } else {
//         this.left = left;
//       }

//       this.top = e.clientY - 60;
//       this.visible = true;
//       this.selectedTag = tag;
//     },
//     closeMenu() {
//       this.visible = false;
//     },
//   },
// };
</script>


<style lang="scss">
.tags-view-container {
  min-width: 1200px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  padding: 6px 9px;
  position: relative;
  display: flex;
  .p-title{
    max-width: 160px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  a{
    text-decoration: none;
  }
  .tags-view-item {
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    min-width: 60px;
    text-align: center;
    padding: 0 12px;
    margin-right: 5px;
    color: #666;
    float: left;
    height: 34px;
    line-height: 32px;
    overflow: hidden;
    cursor: pointer;
    vertical-align: middle;
    font-size: 14px;
    margin-right: 7px;
    border-radius: 2px;
    border: 1px solid rgba(214, 214, 214, 1);
    &.active {
      color: #fff;
      border: 1px solid #1875f0;
      background-color: #1875f0;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.tags-view-item {
  .el-icon-close {
    width: 20px;
    height: 20px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    &:before {
      display: inline-block;
      position: relative;
      top: 3px;
      right: -2px;
    }
  }
}
</style>
