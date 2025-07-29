// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    
    // Validação: verifica se o campo não está vazio
    if (nome === '') {
        alert('Por favor, digite um nome válido.');
        input.focus();
        return;
    }
    
    // Validação: verifica se o nome já existe na lista
    if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado. Digite um nome diferente.');
        input.value = '';
        input.focus();
        return;
    }
    
    // Adiciona o nome ao array
    amigos.push(nome);
    
    // Limpa o campo de input
    input.value = '';
    
    // Atualiza a exibição da lista
    atualizarLista();
    
    // Limpa os resultados anteriores
    limparResultado();
    
    // Retorna o foco para o input
    input.focus();
}

// Função para atualizar a exibição da lista de amigos
function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    
    // Limpa a lista atual
    lista.innerHTML = '';
    
    // Adiciona cada amigo como um item da lista
    amigos.forEach((nome, index) => {
        const li = document.createElement('li');
        li.className = 'name-item';
        
        // Cria o conteúdo do item com nome e botão de remover
        li.innerHTML = `
            <span class="friend-name">${nome}</span>
            <button class="button-remove" onclick="removerAmigo(${index})" aria-label="Remover ${nome}" title="Remover ${nome}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
                <span class="remove-text">Remover</span>
            </button>
        `;
        
        lista.appendChild(li);
    });
}

// Função para remover um amigo da lista com confirmação
function removerAmigo(index) {
    const nomeAmigo = amigos[index];
    
    // Confirmação antes de remover
    if (confirm(`Tem certeza que deseja remover "${nomeAmigo}" da lista?`)) {
        // Remove o amigo no índice especificado
        amigos.splice(index, 1);
        
        // Atualiza a exibição da lista
        atualizarLista();
        
        // Limpa os resultados
        limparResultado();
        
        // Feedback visual (opcional)
        mostrarNotificacao(`${nomeAmigo} foi removido da lista!`, 'success');
    }
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    // Validação: verifica se há pelo menos 2 amigos
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio.');
        return;
    }
    
    // Cria uma cópia da lista para manipulação
    let amigosDisponiveis = [...amigos];
    let pares = [];
    let tentativas = 0;
    const maxTentativas = 100;
    
    // Algoritmo para garantir que ninguém tire a si mesmo
    while (tentativas < maxTentativas) {
        pares = [];
        amigosDisponiveis = [...amigos];
        let sucesso = true;
        
        for (let i = 0; i < amigos.length; i++) {
            const pessoa = amigos[i];
            
            // Remove a própria pessoa das opções disponíveis
            const opcoes = amigosDisponiveis.filter(amigo => amigo !== pessoa);
            
            // Se não há opções disponíveis, reinicia o processo
            if (opcoes.length === 0) {
                sucesso = false;
                break;
            }
            
            // Escolhe aleatoriamente um amigo secreto
            const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
            const amigoSecreto = opcoes[indiceAleatorio];
            
            // Adiciona o par à lista
            pares.push({
                pessoa: pessoa,
                amigoSecreto: amigoSecreto
            });
            
            // Remove o amigo secreto escolhido das opções disponíveis
            const indiceRemover = amigosDisponiveis.indexOf(amigoSecreto);
            amigosDisponiveis.splice(indiceRemover, 1);
        }
        
        if (sucesso) {
            break;
        }
        
        tentativas++;
    }
    
    // Se não conseguiu fazer o sorteio após muitas tentativas
    if (tentativas >= maxTentativas) {
        alert('Erro ao realizar o sorteio. Tente novamente.');
        return;
    }
    
    // Exibe o resultado
    exibirResultado(pares);
}

// Função para exibir o resultado do sorteio
function exibirResultado(pares) {
    const resultado = document.getElementById('resultado');
    
    // Limpa resultados anteriores
    resultado.innerHTML = '';
    
    // Adiciona título do resultado
    const titulo = document.createElement('li');
    titulo.className = 'result-title';
    titulo.textContent = '🎉 Resultado do Sorteio:';
    resultado.appendChild(titulo);
    
    // Adiciona cada par ao resultado
    pares.forEach(par => {
        const li = document.createElement('li');
        li.className = 'result-item';
        li.innerHTML = `
            <span class="giver">${par.pessoa}</span>
            <span class="arrow">→</span>
            <span class="receiver">${par.amigoSecreto}</span>
        `;
        resultado.appendChild(li);
    });
    
    // Adiciona botão para novo sorteio
    const novoSorteio = document.createElement('li');
    novoSorteio.className = 'new-draw-container';
    novoSorteio.innerHTML = `
        <button class="button-new-draw" onclick="novoSorteio()">
            🔄 Fazer Novo Sorteio
        </button>
    `;
    resultado.appendChild(novoSorteio);
    
    // Faz scroll suave para o resultado
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// Função para limpar o resultado
function limparResultado() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
}

// Função para fazer um novo sorteio
function novoSorteio() {
    if (amigos.length >= 2) {
        sortearAmigo();
    } else {
        limparResultado();
        alert('Adicione pelo menos 2 amigos para realizar um novo sorteio.');
    }
}

// Função para limpar tudo e começar do zero
function reiniciarJogo() {
    amigos = [];
    atualizarLista();
    limparResultado();
    document.getElementById('amigo').focus();
}

// Event listener para a tecla Enter no campo de input
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('amigo');
    
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
        }
    });
    
    // Foca no input quando a página carrega
    input.focus();
});

// Função utilitária para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remove notificação anterior se existir
    const notificacaoExistente = document.querySelector('.notification');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    // Cria elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notification notification-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Adiciona estilos inline para a notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Define cor baseada no tipo
    if (tipo === 'success') {
        notificacao.style.backgroundColor = '#10b981';
    } else if (tipo === 'error') {
        notificacao.style.backgroundColor = '#ef4444';
    } else {
        notificacao.style.backgroundColor = '#3b82f6';
    }
    
    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Adiciona ao DOM
    document.body.appendChild(notificacao);
    
    // Remove após 3 segundos
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                notificacao.remove();
            }, 300);
        }
    }, 3000);
}

// Função utilitária para embaralhar array (caso precise no futuro)
function embaralharArray(array) {
    const arrayEmbaralhado = [...array];
    for (let i = arrayEmbaralhado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayEmbaralhado[i], arrayEmbaralhado[j]] = [arrayEmbaralhado[j], arrayEmbaralhado[i]];
    }
    return arrayEmbaralhado;
}