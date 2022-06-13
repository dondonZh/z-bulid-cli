<!--
 * @Description: 组织选择树
 * @Author: dali
 * @Date: 2022-03-07 09:44:35
 * @LastEditors: dali
 * @LastEditTime: 2022-03-08 18:26:02
-->
<!-- 树状选择器 -->
<template>
  <el-popover
    ref="popoverRef"
    placement="bottom-start"
    trigger="click"
    width="auto"
    @show="onShowPopover"
    @hide="onHidePopover"
  >
    <el-tree
      ref="treeRef"
      class="select-tree"
      show-checkbox
      highlight-current
      :data="options"
      :props="props"
      node-key="id"
      :filter-node-method="handleFilterNode"
      :[dynymicKey]="dynymicValue"
      @check="onClickNode"
    />
    <template #reference>
      <el-select
        ref="selectRef"
        v-model="orgsSelected"
        class="org-tree-select"
        :collapse-tags="filterFlag"
        :filter-method="handleFilter"
        :filterable="filterFlag"
        multiple
        :placeholder="placeholder"
        popper-class="multi-popper orgSelectTreeClass"
        clearable
        @change="handleCheckedChange"
        @keydown.capture.stop
      >
        <el-option
          v-for="item in flatten"
          :key="item.id"
          :label="item.nm"
          :value="item.id"
        />
      </el-select>
    </template>
  </el-popover>
</template>

<script lang="ts">
import type { ElTree } from 'element-plus'
import {defineComponent,onMounted,ref,computed,watch,PropType} from 'vue'
import {OrgItem} from "@/module/model/org"
import {Flatten} from '@/types'
import * as $ from 'jquery';
export default defineComponent({
  name: 'SelectTree',
  // 设置绑定参数
  model: {
    prop: 'selectedOrgs',
    event: 'selected'
  },
  props: {
    //当前编辑id
    editOrgId: {
      type: String,
      default: ''
    },
    // 接收绑定参数
    selectedOrgs:  {
      type: Array as PropType<Array<string>>,
      default: (()=>{
        return []
      })
    },
    // 输入框宽度
    width:  {
      type: String,
      default: ''
    },
    // 选项数据
    options: {
      type: Array as PropType<OrgItem[]>,
      required: true
    },
    // 扁平数据
    flatten: {
      type: Array as PropType<Array<Flatten>>,
      required: true
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 是否开启过滤
    filterFlag: {
      type: Boolean,
      default: false
    },
    // 默认展开第一层的节点
    expandFirstLevel: {
      type: Boolean,
      default: false
    },
    // 树节点配置选项
    props: {
      type: Object,
      default: () => ({
        label: 'nm',
        children: 'child'
      })
    },
  },
  emits: ['selected'],
  setup(props,ctx){
  
    const popoverRef = ref()

    const selectRef = ref()

    const treeRef = ref<InstanceType<typeof ElTree>>()

    const dynymicKey = computed(() => {
       return props.expandFirstLevel ? 'default-expanded-keys' : 'default-expand-all'
    })

    const dynymicValue = computed(() => {
      if (props.expandFirstLevel) {
        if (props.options[0]) {
          return [props.options[0].id]
        } else {
          return []
        }
      } else {
        return true
      }
    })

    const orgsSelected = computed({
      get: () => {
        return props.selectedOrgs
      },
      set: (val) => {
        ctx.emit('selected', val)
        treeRef.value!.setCheckedKeys(val)
      },
    })

    watch(props.selectedOrgs, (newVal) => {
      treeRef.value!.setCheckedKeys(newVal)
    })


    const handleCheckedChange = () => {
      console.log('setCheckedKeys')
    }

    const handleFilter = (val:string) => {
      treeRef.value!.filter(val)
    }

    const hideLayout = () => {
      $('.multi-popper').css('display', 'none')
      $('.orgSelectTreeClass').css('visibility', 'hidden')
    }

    const handleFilterNode = (query:string, data:OrgItem) => {
      if (!query) return true
      const labelKey = props.props.label as keyof OrgItem
      return (data[labelKey] as string).indexOf(query) !== -1
    }

    const onClickNode = (node:OrgItem, status: { checkedNodes: any; }) => {
      const checkedNodes = status.checkedNodes
      const nodesIds = checkedNodes.map((node:OrgItem) => {
        return node.id
      })
      orgsSelected.value = nodesIds
    }

    const onCloseTree = () => {
      popoverRef.value.showPopper = false
    }

    const onShowPopover = () => {
      hideLayout()
    }

    const onHidePopover = () => {
      props.filterFlag && handleFilter('')
      selectRef.value.blur()
      hideLayout()
    }

 
    
    //这里的ts判断写的有问题，后续优化
    const queryTree = (tree:Array<OrgItem>, id:string) => {
      let stark:Array<OrgItem> = []
      stark = stark.concat(tree)
      while (stark.length) {
        const temp = stark.shift() as OrgItem
        let child = props.props.children as keyof OrgItem
        let value = props.props.value as keyof OrgItem
        let label = props.props.label as keyof OrgItem
        if (temp[child]) {
          stark = stark.concat(temp[child] as Array<OrgItem>)
        }
        if (temp[value] === id) {
          return temp[label]
        }
      }
      return ''
    }

    ctx.expose({
      queryTree
    })

    onMounted(() => {
      hideLayout()
    })

    return {
      treeRef,
      selectRef,
      popoverRef,
      dynymicKey,
      dynymicValue,
      orgsSelected,

      handleCheckedChange,
      handleFilterNode,
      handleFilter,
      onClickNode,
      onCloseTree,
      onShowPopover,
      onHidePopover,
      queryTree
    }
  },
})
</script>

<style lang="scss" scoped>
  :deep .el-input.el-input--suffix {
    cursor: pointer;
    overflow: hidden;
  }
  :deep .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
  .select-tree {
    max-height: 150px;
    overflow-y: scroll;
  }
  /* 菜单滚动条 */
  .select-tree::-webkit-scrollbar {
    z-index: 11;
    width: 6px;
  }
  .select-tree::-webkit-scrollbar-track,
  .select-tree::-webkit-scrollbar-corner {
    background: #fff;
  }
  .select-tree::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b4bccc;
  }
  .select-tree::-webkit-scrollbar-track-piece {
    background: #fff;
    width: 6px;
  }

  :deep .el-select__tags{max-height:30px;overflow-y: auto;}
</style>
