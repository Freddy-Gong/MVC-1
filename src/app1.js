import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'

const eventBus = $(window)
//数据相关 都放到m

const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n'))//初始化数据 
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m-updated')//不能有空格
        localStorage.setItem('n', m.data.n)
    }
})
//视图相关 都放到v
//其他都放在c
const v = {
    container: null,
    html: `
    <div>
                <div class="output">
                    <span id="number">{{n}}</span>
                </div>
                <div class="actions">
                    <button id="add1">+1</button>
                    <button id="minus1">-1</button>
                    <button id="mul2">*2</button>
                    <button id="divide2">/2</button>
                </div>
            </div>
    `,
    init(container) {
        v.container = $(container)
        v.render(m.data.n)// view = render(data)
        v.autoBindEvens()
        eventBus.on('m-updated', () => {
            v.render(m.data.n)
        })
    },
    render(n) {
        if (v.container.children.length !== 0) v.container.empty()
        $(v.html.replace('{{n}}', m.data.n)).appendTo(v.container)

    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div'
    },
    add() {
        m.update({ n: m.data.n + 1 })
    },
    minus() {
        m.update({ n: m.data.n - 1 })
    },
    mul() {
        m.update({ n: m.data.n * 2 })

    },
    div() {
        m.update({ n: m.data.n / 2 })
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
//第一次渲染（初始化）html
export default v




