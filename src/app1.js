import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View'
import EventBus from './base/EventBus'

//数据相关 都放到m

const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem('n'))//初始化数据 
    },
    update(data) {
        Object.assign(m.data, data)
        m.trigger('m-updated')//不能有空格
        localStorage.setItem('n', m.data.n)
    }
})
//视图相关 都放到v
//其他都放在c
const init = (container) => {
    new View({
        container: container,
        data: m.data,
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
        render(data) {
            const n = data.n
            if (this.container.children.length !== 0) this.container.empty()
            $(this.html.replace('{{n}}', m.data.n)).appendTo(this.container)

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
        }
    })
}

//第一次渲染（初始化）html
export default init




