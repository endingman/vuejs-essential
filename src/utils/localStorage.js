const ls = localStorage

export default {
  setItem(name, value) {
    ls.setItem(name, JSON.stringify(value))//localStorage.setItem(name,value)，设置loaclstorage中key的值
  },
  getItem(name) {
    try {
      return JSON.parse(ls.getItem(name))//localStorage.getItem(name)取出loaclstorage中某个key的值
    } catch (e) {
      return null
    }
  },
  removeItem(name) {
    ls.removeItem(name)//localStorage.removeItem(name)移除loaclstorage中某个key的值
  }
}
