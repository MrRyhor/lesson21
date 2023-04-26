class NumericList {
    constructor() {
        this.numericList = this.createList()
    }
    getRandomLi(min = 1, max = 10) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }
    getRandomNum(min = 1, max = 100) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }
    createList() {
        this.ol = document.createElement('ol')
        for (let i = 0; i < this.getRandomLi(); i++) {
            const li = document.createElement('li')
            li.innerText = this.getRandomNum()
            this.ol.append(li)
        }
        return this.ol
    }
    render() {
        const list = this.createList()
        document.getElementById('res').append(list)
    }
}
class Button {
    constructor() {
    }
    getPaintNumListInColor() {
        let olList = document.querySelectorAll('ol')
        for (const ol of olList) {
            for (const li of ol.children) {
                if (li.innerText % 2 === 0)
                    li.style.backgroundColor = 'green'
                else
                    li.style.backgroundColor = 'red'
            }
        }
    }
    createButton() {
        const btn = document.createElement('button')
        btn.setAttribute('id', 'btn')
        btn.innerText = 'Get'
        btn.onclick = this.getPaintNumListInColor
        return btn
    }
    render(targetContainer) {
        document.getElementById(targetContainer).after(this.createButton())
    }
}

for (let i = 0; i < 5; i++) {
    new NumericList().render()
}

const btn = new Button()
btn.render('res')



