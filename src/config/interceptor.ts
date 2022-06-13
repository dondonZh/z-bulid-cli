import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common.Token = localStorage.getItem('token') || '8d670f7d0c4a4477b5430db6aa838e49'
axios.defaults.headers.common.appCatCd = '9050.175'
axios.defaults.timeout = 30000
