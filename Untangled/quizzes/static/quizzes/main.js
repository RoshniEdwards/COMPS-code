console.log('hello world')

const modalBtns = [... document.getElementsByClassName('btn-primary')]
const modalBody = document.getElementById('modal-body-confirm')
const startBtn = document.getElementById('start-button')

const url = window.location.href

modalBtns.forEach(modalBtn=> modalBtn.addEventListener('click', ()=>{
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestions = modalBtn.getAttribute('data-questions')

    modalBody.innerHTML = `
        <div class="h5 mb-3">Our ${name} will guide you through a set of questions and return your personalized hair type and product recommendations found just for you.</div>
        <div class="text-muted">
            <ul>
                <li>number of questions: <b>${numQuestions}</b></li>
            <ul>
    `

    startBtn.addEventListener('click', ()=>{
        window.location.href = url + pk
    })
}))