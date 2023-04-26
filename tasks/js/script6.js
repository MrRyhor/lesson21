class ElementsCreator {
    static createHTMLElement({ tag, attrs, props, events }) {
        const el = document.createElement(tag)
        if (attrs) {
            for (const atrrKey in attrs) {
                el.setAttribute(atrrKey, attrs[atrrKey])
            }
        }
        if (props) {
            for (const propKey in props) {
                el[propKey] = props[propKey]
            }
        }
        if (events) {
            for (const eventType in events) {
                el.addEventListener(eventType, events[eventType])
            }
        }
        return el
    }
}

class Product {
    constructor({ imgSrc, title, link, price, id }) {
        this.imgSrc = imgSrc
        this.title = title
        this.link = link
        this.price = price
        this.id = id
        this.count = 1
        this.el = this.createElement()
    }
    onClickMinus() {
        const minus = new CustomEvent('minus', { detail: { id: this.id, count: this.countProduct, totalPriceProduct: this.priceProduct, price: this.price, btnMinus: this.btnMinus, btnAdd: this.btnAdd } })
        this.el.dispatchEvent(minus)
    }
    onClickPlus() {
        const plus = new CustomEvent('plus', { detail: { id: this.id, count: this.countProduct, totalPriceProduct: this.priceProduct, price: this.price, btnMinus: this.btnMinus, btnAdd: this.btnAdd } })
        this.el.dispatchEvent(plus)
    }
    onClickDelete() {
        const deleteProduct = new CustomEvent('delete', { detail: { id: this.id, count: this.countProduct, totalPriceProduct: this.priceProduct, price: this.price } })
        this.el.dispatchEvent(deleteProduct)
    }
    createElement() {
        this.container = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container' } })
        const img = ElementsCreator.createHTMLElement({ tag: 'img', attrs: { src: `${this.imgSrc}` } })
        this.container.append(img)
        const link = ElementsCreator.createHTMLElement({ tag: 'a', attrs: { href: `${this.link}`, target: '_blank' } })
        this.container.append(link)
        const title = ElementsCreator.createHTMLElement({ tag: 'h2', props: { innerText: `${this.title}` } })
        link.append(title)
        this.btnMinus = ElementsCreator.createHTMLElement({ tag: 'button', props: { className: 'btn-minus', innerText: '<' }, events: { click: this.onClickMinus.bind(this) } })
        this.container.append(this.btnMinus)
        this.countProduct = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'count', innerHTML: `${this.count}` } })
        this.container.append(this.countProduct)
        this.btnAdd = ElementsCreator.createHTMLElement({ tag: 'button', props: { className: 'btn-add', innerText: '>' }, events: { click: this.onClickPlus.bind(this) } })
        this.container.append(this.btnAdd)
        const titlePrice = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'title-price', innerText: 'К оплате:' } })
        this.container.append(titlePrice)
        this.priceProduct = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'price', innerText: `${this.price}` } })
        this.container.append(this.priceProduct)
        const unitPrice = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'unit-price', innerText: 'грн.' } })
        this.container.append(unitPrice)
        this.btnDelete = ElementsCreator.createHTMLElement({ tag: 'button', props: { className: 'btn-delete', innerText: 'X' }, events: { click: this.onClickDelete.bind(this) } })
        this.container.append(this.btnDelete)
        return this.container
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createElement())
    }
}

class ProductManager {
    constructor(productList) {
        this.productList = productList
    }
    onClickMinus(e) {
        console.log(e.detail)
        let count = parseInt(e.detail.count.innerText)
        if (count <= 0) e.detail.btnMinus.setAttribute('disabled', 'true')
        else {
            count--
            e.detail.btnAdd.removeAttribute('disabled')
        }
        e.detail.count.innerText = count
        let price = e.detail.price
        let totalCost = parseInt(e.detail.totalPriceProduct.innerText)
        totalCost = price * count
        e.detail.totalPriceProduct.innerText = totalCost
        let totalSum = parseInt(this.totalSumContainer.innerText)
        console.log(totalSum)
        this.totalSumContainer.innerText = totalSum - price
    }
    onClickPlus(e) {
        console.log(e.detail)
        let count = parseInt(e.detail.count.innerText)
        count++
        e.detail.btnMinus.removeAttribute('disabled')
        if (count >= 10) e.detail.btnAdd.setAttribute('disabled', 'true')
        e.detail.count.innerText = count
        let price = e.detail.price
        let totalCost = parseInt(e.detail.totalPriceProduct.innerText)
        totalCost = price * count
        e.detail.totalPriceProduct.innerText = totalCost
        let totalSum = parseInt(this.totalSumContainer.innerText)
        console.log(totalSum)
        this.totalSumContainer.innerText = totalSum + price
    }

    onClickDelete(e) {
        e.target.remove()
        let totalCost = parseInt(e.detail.totalPriceProduct.innerText)
        let totalSum = parseInt(this.totalSumContainer.innerText)
        this.totalSumContainer.innerText = totalSum - totalCost
    }
    createList() {
        this.containerList = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-list' } })
        this.totalSum = 0
        for (const product of productList) {
            let item = new Product(product)
            item.el.addEventListener('minus', this.onClickMinus.bind(this))
            item.el.addEventListener('plus', this.onClickPlus.bind(this))
            item.el.addEventListener('delete', this.onClickDelete.bind(this))
            this.totalSum += item.price
            this.containerList.append(item.el)
        }
        const totalSum = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'total-sum', innerText: 'Всего к оплате, грн.:' } })
        this.totalSumContainer = ElementsCreator.createHTMLElement({ tag: 'p', props: { className: 'total-sum-container', innerText: this.totalSum } })
        totalSum.append(this.totalSumContainer)
        this.containerList.append(totalSum)
        return this.containerList
    }


    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createList())
    }
}


const productList = [
    {
        imgSrc: 'https://content2.rozetka.com.ua/goods/images/big/301872056.jpg',
        title: 'Телевизор Xiaomi TV A2 43',
        link: 'https://rozetka.com.ua/xiaomi-959125/p361653582/',
        price: 14999,
        id: 1312
    },
    {
        imgSrc: 'https://content1.rozetka.com.ua/goods/images/big/314481841.jpg',
        title: 'Телевизор LG 43UQ80006LB',
        link: 'https://rozetka.com.ua/lg_43uq80006lb_adrb/p351475902/',
        price: 17999,
        id: 1313
    },
    {
        imgSrc: 'https://content2.rozetka.com.ua/goods/images/big/311140517.jpg',
        title: 'Телевизор Ergo 32GFS6500',
        link: 'https://rozetka.com.ua/ergo-32gfs6500/p362684385/',
        price: 7499,
        id: 1314
    }
]

window.onload = () => {
    pm = new ProductManager(productList)
    pm.render('res')
}