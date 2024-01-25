const botaoTarefas = document.querySelector('.task-button')
const valorTarefas = document.querySelector('.task-input')
const tarefasUl = document.querySelector('.task-ul')
const tarefaFinalizada = document.querySelector('.task-ul-checked')

botaoTarefas.addEventListener('click', addNovaTarefa)

minhaListaTarefas = []
tarefasConcluidas = []

valorTarefas.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        addNovaTarefa()

    }
})
function addNovaTarefa() {
    if (valorTarefas.value.length >= 21) {
        Swal.fire({
            icon: "warning",
            title: "Max: 20 caracteres",
            confirmButtonColor: "#f00",
        })
        valorTarefas.value = valorTarefas.value
        return
    }
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
                <img src="img/check.png" alt="Concluída" class="img-check" title="Concluída" onclick="concluirTarefa(${indice})">
                <p>${tarefa}</p>
                <img src="img/edit.png" alt="Editar" class="img-edit" title="Editar (Função indisponível)">
                <img src="img/del.png" alt="Apagar" class="img-del" title="Apagar" onclick="deletarTarefa(${indice})">
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
        }
    })
}
function confirmacaoDelete(i) {
    minhaListaTarefas.splice(i, 1)
    mostraTarefas()
}
function concluirTarefa(i) {
    tarefasConcluidas.push(minhaListaTarefas[i])
    mostrarTarefasConcluidas()
    confirmacaoDelete(i)
    deleteTempo()
}
function mostrarTarefasConcluidas() {
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
function deleteConcluidas(i) {
    tarefasConcluidas.splice(i, 1)
    mostrarTarefasConcluidas()
}
function deleteTempo() {
    setTimeout(function () {
        deleteConcluidas()
    }, 20000)
}
