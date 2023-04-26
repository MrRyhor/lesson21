class Workers {
    constructor(nameList) {
        this.nameList = nameList
    }
    createWorkersContainer() {
        const workersContainer = document.createElement('div')
        workersContainer.className = 'workers-container'
        this.ul = document.createElement('ul')
        this.ul.innerText = 'Workers'
        workersContainer.append(this.ul)
        for (const name of this.nameList) {
            this.li = document.createElement('li')
            this.li.innerText = name
            this.ul.append(this.li)
        }
        return workersContainer
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createWorkersContainer())
    }
}

class DynamicSerch {
    constructor() {
    }
    getSearch() {
        let searchResult = this.input.value
        console.log('searchResult')
        console.log(searchResult)
        const liList = document.querySelectorAll('li')
        console.log(liList)
        if (searchResult) {
            liList.forEach(el => {
                if (el.innerText.search(searchResult) === -1)
                    el.classList.add('hide')
            })
        } else
            liList.forEach(el => el.classList.remove('hide'))

    }
    createInputContainer() {
        const container = document.createElement('div')
        container.className = 'container'
        const label = document.createElement('label')
        label.innerText = 'Name'
        container.append(label)
        this.input = document.createElement('input')
        this.input.oninput = this.getSearch.bind(this)
        container.append(this.input)

        return container
    }
    render(targetContainer) {
        document.getElementById(targetContainer).before(this.createInputContainer())
    }
}

const nameList = ['Ivanov', 'Petrov', 'Skripka', 'Goncharenko', 'Ivas', 'Kolyba']

window.onload = () => {
    const workers = new Workers(nameList)
    workers.render('res')

    const input = new DynamicSerch()
    input.render('res')
}