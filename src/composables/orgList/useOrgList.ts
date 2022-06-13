/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-03-08 17:41:57
 * @LastEditors: dali
 * @LastEditTime: 2022-03-08 17:58:55
 */
import { ref} from 'vue'
import {OrgModel,OrgItem} from "@/module/model/org"
import {Flatten} from '@/types'

export default function useOrgList(){
  const flatten = ref<Flatten[]>([])
  const orgSelectOptions = ref<OrgItem[]>([])
  const getOrgList = () => {
    OrgModel.getOrgList()
    .then(data =>{
      orgSelectOptions.value = data;
      flatten.value = [];
      transferTreeData(data);
    }).catch(err => {
      console.log('err', err)
    })
  }
  
  const transferTreeData = (orgArr:Array<OrgItem>) =>{
    if (orgArr && orgArr.length > 0) {
      orgArr.forEach((org:OrgItem) => {
        flatten.value.push({
          id: org.id,
          nm: org.nm
        })
        if (org.child) {
          transferTreeData(org.child)
        }
      })
    }
  }

  return {
    orgSelectOptions,
    flatten,
    getOrgList,
  }
}