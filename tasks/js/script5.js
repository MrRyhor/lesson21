function onInputClick(event) {
    let inpt = event.target
    console.log(inpt)
    if (inpt.tagName === 'INPUT')
        inpt.value = 0
}

const inputList = document.querySelectorAll('#input')
for (const input of inputList) {
    input.addEventListener('click', onInputClick)
}