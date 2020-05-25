import './app2.css'
import $ from 'jquery'
import Model from './base/Model'

const eventBus = $(window)
//数据相关 都放到m
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem('app2.index')) || 0//初始化数据 
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m-updated')//不能有空格
        localStorage.setItem('app2.index', m.data.index)
    },
})

const v = {
    container: null,
    html: (index) => {
        return `
        <div>
            <ol class="tab-bar">
                <li class="${index === 0 ? 'selected' : ''}" data-index='0'>1</li>
                <li class="${index === 1 ? 'selected' : ''}" data-index='1'>2</li>
            </ol>
            <ol class="tab-content">
                <li class="${index === 0 ? 'active' : ''}" >内容1</li>
                <li class="${index === 1 ? 'active' : ''}" >内容2</li>
            </ol>
        </div>
    `},
    render(index) {
        if (v.container.children.length !== 0) v.container.empty()
        $(v.html(index)).appendTo(v.container)

    },
    init(container) {
        v.container = $(container)
        v.render(m.data.index)// view = render(data)
        v.autoBindEvens()
        eventBus.on('m-updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({ index: index })
    },
    autoBindEvens() {
        for (let key in v.events) {
            const value = v[v.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.container.on(part1, part2, value)
        }
    }

}

export default v