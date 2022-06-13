const errno = {
  UNKNWON_ERROR: {
    code: 100000,
    msg: '未知的错误'
  },
  SYSTEM_ERROR: {
    code: 100001,
    msg: '未知的系统错误'
  },
  NETWORK_ERROR: {
    code: 100002,
    msg: '网络发生错误'
  },
  SERVER_PROCESS_ERROR: {
    code: 100003,
    msg: '未知的服务器错误'
  },
  SERVICE_ERROR: {
    code: 100003,
    msg: '未知的业务错误'
  }
}

class MyError {
  code = 0
  msg = ''
  constructor (code: number, msg: string) {
    this.code = code
    this.msg = msg
  }
}

export class UnknownError extends MyError {
  constructor () {
    const code = errno.UNKNWON_ERROR.code
    const msg = errno.UNKNWON_ERROR.msg
    super(code, msg)
  }
}

export class SystemError extends MyError {
  constructor (err: any) {
    const code = errno.SYSTEM_ERROR.code
    let msg = errno.SYSTEM_ERROR.msg
    if (err && err.process && err.process.message) {
      msg = err.process.message
    }
    super(code, msg)
  }
}

export class NetworkError extends MyError {
  constructor () {
    const code = errno.NETWORK_ERROR.code
    const msg = errno.NETWORK_ERROR.msg
    super(code, msg)
  }
}

export class ServerProcessError extends MyError {
  constructor (msg: string) {
    const code = errno.SERVER_PROCESS_ERROR.code
    super(code, msg || errno.SERVER_PROCESS_ERROR.msg)
  }
}

export class ServiceError extends MyError {
  constructor (msg: string) {
    const code = errno.SERVICE_ERROR.code
    super(code, msg || errno.SERVICE_ERROR.msg)
  }
}
