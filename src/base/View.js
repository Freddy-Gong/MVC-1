import $ from 'jquery'
class View {
    constructor({ container, html, render }) {
        this.container = $(container)
        this.html = html
        this.render = render
    }
}
export default View