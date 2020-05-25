import EventBus from "./EventBus"

class Model extends EventBus {
    constructor(options) {
        super()// 调用EventBus#constructor()
        const keys = ['data', 'update', 'create', 'delete', 'get']
        keys.forEach((key) => {
            if (key in options) {
                this[key] = options[key]
            }
        })
    }
    create() {
        // ?. 可选链 console?.error?.('你还没有实现。。。。') 新语法
        console && console.error && console.error('你还没有实现 create')
    }
    delete() { console && console.error && console.error('你还没有实现 delete') }
    update() { console && console.error && console.error('你还没有实现 update') }
    get() { console && console.error && console.error('你还没有实现 get') }
}

export default Model