class Table {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum
        this.colNum = colNum
        this.counter = 0
    }
    getRandomNum(min = 1, max = 100) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }
    getTableRedFrame(){
        this.table.setAttribute('id', 'red')
    }
    getClickCounter() {
        this.counter++
        this.updateThisCounter()
        return this.counter       

    }
    updateThisCounter(){
        this.cnt.innerText = `Click = ${this.counter}`
    }
    
    createTable() {
        const container = document.createElement('div')
        container.className = 'container'
        this.table = document.createElement('table')
        this.table.className = 'table'
        this.table.onclick = this.getClickCounter.bind(this)
        for (let i = 0; i < this.rowNum; i++) {
            const row = document.createElement('tr')
            this.table.append(row)
            for (let j = 0; j < this.colNum; j++) {
                const col = document.createElement('td')
                col.innerText = this.getRandomNum()
                col.onclick = this.getTableRedFrame.bind(this)
                row.append(col)
            }
        }
        container.append(this.table)
        this.cnt = document.createElement('p')
        this.cnt.innerText = `Click = ${this.counter}`
        container.append(this.cnt)
        return container
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createTable())
    }
}

for (let i = 0; i < 3; i++) {
    const table = new Table(3, 3)
    table.render('res')
}


