// Obter referências aos elementos HTML
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Array para armazenar as tarefas. Inicialmente vazio ou carregado do localStorage.
let tasks = [];

// Chave para o localStorage
const localStorageKey = 'simple-todo-list';

// --- Funções de Gerenciamento de Dados (LocalStorage) ---

// Carregar tarefas do localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem(localStorageKey);
    if (storedTasks) {
        // Analisa a string JSON de volta para um array de objetos
        tasks = JSON.parse(storedTasks);
        // Renderiza as tarefas carregadas na tela
        renderTasks();
    }
}

// Salvar tarefas no localStorage
function saveTasks() {
    // Converte o array de objetos 'tasks' para uma string JSON
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

// --- Funções de Manipulação da UI (Renderização) ---

// Renderizar todas as tarefas na lista
function renderTasks() {
    // Limpa a lista atual na UI
    taskList.innerHTML = '';

    // Itera sobre o array de tarefas
    tasks.forEach((task, index) => {
        // Cria um novo elemento <li> para a tarefa
        const listItem = document.createElement('li');

        // Adiciona a classe 'completed' se a tarefa estiver completa
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Cria o texto da tarefa (clicável para marcar/desmarcar)
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskText.addEventListener('click', () => toggleComplete(index)); // Adiciona evento de clique

        // Cria a área de ações (botões)
        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        // Cria o botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteTask(index)); // Adiciona evento de clique

         // Cria o botão de completar (se estivesse usando botões em vez de texto clicável)
         /*
         const completeButton = document.createElement('button');
         completeButton.classList.add('complete-btn');
         completeButton.textContent = task.completed ? 'Desfazer' : 'Completar';
         completeButton.addEventListener('click', () => toggleComplete(index));
         taskActions.appendChild(completeButton); // Adiciona o botão de completar
         */


        // Adiciona o texto da tarefa e as ações ao item da lista
        listItem.appendChild(taskText);
        taskActions.appendChild(deleteButton); // Adiciona o botão de excluir
        listItem.appendChild(taskActions);


        // Adiciona o item da lista à lista principal (UL)
        taskList.appendChild(listItem);
    });
}

// --- Funções de Lógica da Aplicação ---

// Adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); // Pega o texto do input e remove espaços em branco

    // Verifica se o input não está vazio
    if (taskText === '') {
        alert('Por favor, digite uma tarefa.'); // Alerta o usuário
        return; // Sai da função se estiver vazio
    }

    // Cria um novo objeto tarefa
    const newTask = {
        text: taskText,
        completed: false // Nova tarefa não está completa por padrão
    };

    // Adiciona a nova tarefa ao array de tarefas
    tasks.push(newTask);

    // Salva as tarefas no localStorage
    saveTasks();

    // Renderiza a lista atualizada na tela
    renderTasks();

    // Limpa o campo de input
    taskInput.value = '';
    taskInput.focus(); // Volta o foco para o input
}

// Marcar/desmarcar uma tarefa como completa
function toggleComplete(index) {
    // Inverte o status 'completed' da tarefa no índice especificado
    tasks[index].completed = !tasks[index].completed;

    // Salva as tarefas no localStorage
    saveTasks();

    // Renderiza a lista atualizada na tela
    renderTasks();
}

// Excluir uma tarefa
function deleteTask(index) {
    // Remove a tarefa do array no índice especificado
    // splice(indice, quantidadeDeElementosParaRemover)
    tasks.splice(index, 1);

    // Salva as tarefas no localStorage
    saveTasks();

    // Renderiza a lista atualizada na tela
    renderTasks();
}

// --- Event Listeners (Ouvintes de Eventos) ---

// Adiciona um ouvinte de clique no botão "Adicionar"
addTaskBtn.addEventListener('click', addTask);

// Permite adicionar a tarefa pressionando Enter no campo de input
taskInput.addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada foi 'Enter' (código 13)
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão (ex: submit de form)
        addTask(); // Chama a função para adicionar a tarefa
    }
});

// --- Inicialização ---

// Carrega as tarefas salvas quando a página é carregada
loadTasks();