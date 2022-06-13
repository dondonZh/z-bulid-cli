export type CompareProp = string | number | undefined
export type CalculationProp = string | number
/**
 * [数字、字母混合的排序]
 * @return  {[type]}     [return 比较结果用于排序]
 */
export function mixOrderSort (a: CompareProp, b: CompareProp) {
  const aIsFinite = isFinite(Number(a))
  const bIsFinite = isFinite(Number(b))
  if (aIsFinite !== bIsFinite) {
    return Number(bIsFinite) - Number(aIsFinite)
  } else {
    if (aIsFinite && bIsFinite) {
      // a b都是数字
      return Number(a) - Number(b)
    } else {
      return (a as string).localeCompare(b as string)
    }
  }
}

export function getDateFirstLastDay (str: string) {
  const firstDay = new Date(str)
  const lastDay = new Date(str)
  lastDay.setMonth(parseInt(str.substring(5, 7)))
  lastDay.setDate(0)
  const first = dateFormat('YYYY-mm-dd', firstDay)
  const last = dateFormat('YYYY-mm-dd', lastDay)
  return [first, last]
}

/**
  *
  * @param {string} fmt
  * @param {object} date 日期对象
  */
export function dateFormat (fmt: string, date: Date) {
  let ret
  interface Opt {
    'Y+': string;
    'm+': string;
    'd+': string;
    'H+': string;
    'M+': string;
    'S+': string;
  }
  const opt: Opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    const key = k as keyof Opt
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[key]) : (opt[key].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

class Calculation {
  /**
   * 判断是否为0
   * @param {string|number} num
   */
  isZero (num: CalculationProp):boolean {
    let val = 0
    if (typeof num === 'string') {
      val = parseFloat(num)
    } else if (typeof num === 'number') {
      val = num
    } else {
      return false
    }
    return val === 0
  }

  /**
   * 为零的显示为空
   * @param {string|number} num
   */
  zeroToBlank (num: CalculationProp) {
    return this.isZero(num) ? '' : num
  }

  /**
   * toFixed精度优化
   * @param {string|number} num
   * @param {number} n
   */
  toFixed (m: CalculationProp, n: number) {
    let num
    if (typeof m === 'string') {
      num = parseFloat(m) || 0
    } else {
      num = m
    }
    if (num < 0) {
      num = -num
    } else {
      return parseInt((num * Math.pow(10, n) + 0.5).toString(), 10) / Math.pow(10, n)
    }
    return -(parseInt((num * Math.pow(10, n) + 0.5).toString(), 10) / Math.pow(10, n))
  }

  /**
   * toFixed精度优化
   * @param {string|number} num
   * @param {number} n
   */
  toFixedZeroFill (m: CalculationProp, n: number) {
    let num
    if (typeof m === 'string') {
      num = parseFloat(m) || 0
    } else {
      num = m
    }
    let si = ''
    if (num < 0) {
      num = -num
      si = '-'
    } else if (num === 0) {
      return ''
    }
    const nu = parseInt((num * Math.pow(10, n) + 0.5).toString(), 10) / Math.pow(10, n)
    let s = si + nu
    const l = s.indexOf('.')
    if (l > 0) {
      s = s + '0'.repeat(n - s.length + l + 1)
    } else {
      s = s + '.' + '0'.repeat(n)
    }
    return s
  }
}

const calculation = new Calculation()
export {
  calculation
}
