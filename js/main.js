const botaoTarefas = document.querySelector('.task-button')
const valorTarefas = document.querySelector('.task-input')
const tarefasUl = document.querySelector('.task-ul')
const tarefaFinalizada = document.querySelector('.task-ul-checked')
botaoTarefas.addEventListener('click', addNovaTarefa)
minhaListaTarefas = []
tarefasConcluidas = []


valorTarefas.addEventListener('keypress', function(e) {
    if (e.keyCode === 13){
        addNovaTarefa()
    }
})


function addNovaTarefa() {
    if (!valorTarefas.value) {
        Swal.fire({
            icon: "warning",
            title: "Tarefa vazia",
            confirmButtonColor: "#f00",
        })
        return


    }
    if (minhaListaTarefas.includes(valorTarefas.value)) {
        Swal.fire({
            icon: "info",
            title: "Esta tarefa já existe",
            confirmButtonColor: "#87CEFA"
        })
        mostraTarefas()
        valorTarefas.value = ''
    } else {
        minhaListaTarefas.push(valorTarefas.value)
        valorTarefas.value = ''
        mostraTarefas()
        valorTarefas.focus()
    }
}
function mostraTarefas() {
    let novaTarefa = ''
    minhaListaTarefas.forEach((tarefa, indice) => {
        novaTarefa = novaTarefa + `
            <li class="task-li">
                <img src="assets/img/check.png" alt="Concluída" class="img-check" title="Concluída" onclick="concluirTarefa(${indice})">
                <img src="assets/img/edit.png" alt="Editar" class="img-edit" title="Editar">
                <img src="assets/img/del.png" alt="Apagar" class="img-del" title="Apagar" onclick="deletarTarefa(${indice})">
                <p>${tarefa}</p>
            </li>
        `
    })
    tarefasUl.innerHTML = novaTarefa
}


function deletarTarefa(i) {
    Swal.fire({
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Apagar",
    }).then((result) => {
        if (result.isConfirmed) {
            confirmacaoDelete(i)
            Swal.fire({
                text: "Tarefa apagada",
                icon: "success",
                confirmButtonColor: "#3085d6",
            })
        }
    })
}
function confirmacaoDelete(i) {
    minhaListaTarefas.splice(i, 1)
    mostraTarefas()
}


function concluirTarefa(i){
    tarefasConcluidas.push(minhaListaTarefas[i])
    mostrarTarefasConcluidas()
    confirmacaoDelete(i)
    deleteTempo()
}


function mostrarTarefasConcluidas(){
    let concluida = ''
    tarefasConcluidas.forEach((tarefa, indice) => {
        concluida = concluida + `
        <li class="task-li-concluidas">
        <p>${tarefa}</p>
        </li>
        `
    })
    tarefaFinalizada.innerHTML = concluida
}


function deleteConcluidas(i){
    tarefasConcluidas.splice(i, 1)
    mostrarTarefasConcluidas()


}


function deleteTempo() {
    setTimeout(function(){
    deleteConcluidas()
  }, 15000)
}
