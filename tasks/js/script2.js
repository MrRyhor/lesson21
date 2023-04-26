function onInputChange() {
    let label = this
    let num = parseInt(label.lastElementChild.value)
    const copyLabel = label   
    while (label.nextElementSibling) {
        label = label.nextElementSibling
        num++
        label.lastElementChild.value = num
    }
    label = copyLabel
    while (label.previousElementSibling) {
        num = parseInt(label.lastElementChild.value)
        label = label.previousElementSibling
        num--
        label.lastElementChild.value = num
    }
}

let div = document.querySelector('.input-list')
console.log(div)
for (const input of div.children) {
    input.oninput = onInputChange
}