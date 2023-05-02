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
class SelectSearchAutoList {
    constructor(autoList) {
        this.autoList = autoList
        this.el = this.createElement()
    }
    onSelectChangeAuto() {
        const changeAuto = new CustomEvent('changeAuto', { detail: { selectAuto: this.selectAuto, ul: this.ul } })
        this.el.dispatchEvent(changeAuto)
    }
    onSelectChangeYear() {
        const changeYear = new CustomEvent('changeYear', { detail: { selectYear: this.selectYear , ul: this.ul }})
        this.el.dispatchEvent(changeYear)
    }
    createElement() {
        const containerAll = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-all' } })
        const containerSelect = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-select', innerText:'Фильтр по марке авто' } })
        this.selectAuto = ElementsCreator.createHTMLElement({ tag: 'select', props:{innerHTML: 'Auto'}, events: { change: this.onSelectChangeAuto.bind(this) } })
        containerSelect.append(this.selectAuto)
        const filteredAutoListByName = this.autoList.reduce((o, i) => {
            if (!o.find(v => v.auto == i.auto)) {
                o.push(i);
            }
            return o;
        }, []);
        for (const opt of filteredAutoListByName) {
            this.optionAuto = ElementsCreator.createHTMLElement({ tag: 'option', props: { innerText: `${opt.auto}` }, attrs: { value: `${opt.auto}`} })
            this.selectAuto.append(this.optionAuto)
        }
        const containerYear = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-year', innerText: 'Фильтр по году вып. авто' } })

        this.selectYear = ElementsCreator.createHTMLElement({ tag: 'select', events: { change: this.onSelectChangeYear.bind(this) } })
        containerYear.append(this.selectYear)
        const filteredAutoListByYear = this.autoList.reduce((o, i) => {
            if (!o.find(v => v.year == i.year)) {
                o.push(i);
            }
            return o;
        }, []);
        for (const opt of filteredAutoListByYear) {
            this.optionYear = ElementsCreator.createHTMLElement({ tag: 'option', props: { innerText: `${opt.year}` }, attrs: { value: `${opt.year}` } })
            this.selectYear.append(this.optionYear)
        }
        containerAll.append(containerSelect)
        containerAll.append(containerYear)
        const containerDataList = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-data-list' } })
        this.ul = ElementsCreator.createHTMLElement({ tag: 'ul', props: { innerText: 'Список авто' } })
        containerDataList.append(this.ul)
        for (const el of this.autoList) {
            this.li = ElementsCreator.createHTMLElement({ tag: 'li', props: { innerText: `${el.auto} - ${el.year} - ${el.price}` } })
            this.ul.append(this.li)
        }
        containerAll.append(containerDataList)
        return containerAll
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.el)
    }

}

class SearchAutoListManager {
    constructor() {
    }
    onSelectChangeAuto(e) {
        console.log(e.target)
        console.log(e.detail.selectAuto.value)
        console.log(e.detail.ul.children)
        for (const li of e.detail.ul.children) {
            if (li.innerText.includes(e.detail.selectAuto.value))
            li.classList.remove('hide')
            else li.classList.add('hide')
        }
    }
    onSelectChangeYear(e) {
        console.log(e.detail.selectYear.value)
        console.log(e.detail)        
        for (const li of e.detail.ul.children) {
            if (li.innerText.includes(e.detail.selectYear.value))
            li.classList.remove('hide')
            else li.classList.add('hide')
        }
    }
    createElement() {
        const totalContainer = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'total-container' } })
        const searchList = new SelectSearchAutoList(autoList)
        searchList.el.addEventListener('changeAuto', this.onSelectChangeAuto.bind(this))
        searchList.el.addEventListener('changeYear', this.onSelectChangeYear.bind(this))
        totalContainer.append(searchList.el)
        //  console.log(searchList.selectAuto)
        // console.log(searchList.selectYear)
        return totalContainer
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createElement())
    }
}





const autoList = [
    {
        auto: 'Audi',
        year: 2015,
        price: 12000
    },
    {
        auto: 'Mercedes',
        year: 2011,
        price: 9000
    },
    {
        auto: 'Ford',
        year: 2016,
        price: 13300
    },
    {
        auto: 'BMW',
        year: 2010,
        price: 8800
    },
    {
        auto: 'Audi',
        year: 2010,
        price: 8500
    },
    {
        auto: 'Mercedes',
        year: 2007,
        price: 7800
    },
    {
        auto: 'Audi',
        year: 2010,
        price: 8500
    },
    {
        auto: 'Ford',
        year: 2016,
        price: 13300
    }
]

window.onload = () => {
    const b = new SearchAutoListManager()
    b.render('res')    
}
