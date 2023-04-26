function paintInRed() {
    let div = this
    while (div.nextElementSibling) {
        div = div.nextElementSibling
        div.style.backgroundColor = 'rgb(251, 72, 72)'
    }    
}

const div = document.querySelectorAll('.div')

for (const el of div) {
    el.onclick = paintInRed
}