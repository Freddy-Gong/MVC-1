import $ from 'jquery'
import EventBus from './EventBus'
class View extends EventBus {
    constructor(option) {
        super()// 调用EventBus#constructor()
        Object.assign(this, option)//options有什么我就把什么放到this上面
        this.container = $(this.container)
        this.render(this.data)// view = render(data)
        this.autoBindEvens()
        this.on('m-updated', () => {
            this.render(this.data)
        })
    }
    autoBindEvens() {
        for (let key in this.events) {
            const value = this[this.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            this.container.on(part1, part2, value)
        }
    }
}
export default View