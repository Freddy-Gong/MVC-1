import './app2.css'
import $ from 'jquery'
import Model from './base/Model'
import View from './base/View'
import EventBus from './base/EventBus'

const eventBus = new EventBus()

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



const init = (container) => {
    new View({
        container: container,
        data: m.data,
        eventBus: eventBus,
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
        events: {
            'click .tab-bar li': 'x'
        },
        render(data) {
            const index = data.index
            if (this.container.children.length !== 0) this.container.empty()
            $(this.html(index)).appendTo(this.container)

        },
        x(e) {
            const index = parseInt(e.currentTarget.dataset.index)
            m.update({ index: index })
        }
    })
}
export default init