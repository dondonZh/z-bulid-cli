import { UnknownError, SystemError, ServerProcessError } from './error'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MittEvent } from '@/types/index'
import { ElMessage } from 'element-plus'
import mitt from 'mitt'
const emitter = mitt<MittEvent>()
function getQueryParams (query: Record<string, unknown>) {
  if (query) {
    const arr = []
    for (const q in query) {
      arr.push(q + '=' + query[q])
    }
    if (arr.length === 0) {
      return ''
    }
    return '?' + arr.join('&')
  }
}
interface RequestConfig extends AxiosRequestConfig {
  query?: Record<string, unknown>
}
interface CustomResponse<T> {
  data: T;
  msg: string | null;
  ret: boolean;
  status: number;
  watchKey?: number | null
}
export function processRequest<T> ({ url, query, method = 'GET', params = null, data = null, timeout = 30000, headers = {} }: RequestConfig) {
  return new Promise<T>((resolve, reject) => {
    if (query && url) {
      url = url + getQueryParams(query)
    }
    axios({
      method,
      url,
      params,
      data,
      timeout,
      headers
    }).then(async (res: AxiosResponse<CustomResponse<T>>) => {
      let myErr = new UnknownError()
      if (res.status === 200 && res.data) {
        if (res.data.status === 200 && res.data.ret) {
          resolve(res.data.data)
        } else if (res.data.status === 400) {
          myErr = new ServerProcessError(res.data.msg || '')
          reject(myErr)
        } else if (res.data.status === 408) {
          let repeatCount = 0
          const watchKey = res.data.watchKey
          const watchkeyStr = watchKey ? ('?watchKey=' + watchKey) : ''
          const newUrl = url + watchkeyStr
          while (repeatCount < 20) {
            const resNew = await axios({
              method: method,
              url: newUrl,
              params: {},
              data: data,
              timeout: timeout
            })
            if (resNew.data.status === 200 && resNew.data.ret) {
              resolve(resNew.data.data)
              break
            } else if (resNew.data.status === 400) {
              if (resNew.data.msg) {
                myErr = new ServerProcessError(resNew.data.msg)
              }
              reject(myErr)
              break
            } else if (resNew.data.status === 408) {
              repeatCount++
            }
          }
          if (repeatCount === 20) {
            myErr = new ServerProcessError(res.data.msg || '')
            reject(myErr)
          }
        } else if (res.data.status === 210) {
          emitter.emit('doLogin', null)
          reject(res.data)
        } else {
          reject(myErr)
        }
      } else {
        reject(myErr)
      }
    }).catch(err => {
      reject(new SystemError(err))
    })
  })
}

export function handleRequest<T> ({ url, query, method, params, data, timeout, headers }: RequestConfig) {
  return new Promise<T>((resolve, reject) => {
    processRequest<T>({ url, query, method, params, data, timeout, headers })
      .then((res) => {
        resolve(res)
      })
      .catch(err => {
        err.msg && ElMessage.error(err.msg)
        reject(err)
      })
  })
}
