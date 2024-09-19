const btnComecar = document.querySelector('.comecar-jogo');
const containerPerguntas = document.querySelector('.container-perguntas');
const containerRespostas = document.querySelector('.container-respostas')
const textoPergunta = document.querySelector('.perguntas');
const btnProximo = document.querySelector('.proxima-pergunta');
const Pontuacao = document.querySelector('.pontuacao')
const Pontos = document.querySelector('.pontos')
const Mensagemm = document.querySelector('.mensagem-aviso')


// Evento de click para o botão de começar e proxima pergunta
btnComecar.addEventListener('click', comecarJogo);
btnProximo.addEventListener('click', displayProximaPergunta);

// Variavéis de contagem
let currentQuestionIndex = 0;
let totalCerto = o;
let embaralharPerguntas;

// Função de começar o jogo
function comecarJogo() {
    btnComecar.classList.add('hide');
    containerPerguntas.classList.remove('hide');
    Pontuacao.classList.remove('hide');
    embaralharPerguntas = embaralhar(perguntas);
    displayProximaPergunta();
}

// Função para rodar a proxima pergunta
function displayProximaPergunta() {
    voltarPadrao();

    // Verificar se as perguntas acabaram( fim do jogo)
    if (perguntas.length === currentQuestionIndex) {
        return fimJogo();
    }

    textoPergunta.textContent = perguntas[currentQuestionIndex].pergunta;
    perguntas[currentQuestionIndex].respostas.forEach(resposta => {
        const novaResposta = document.createElement("button");
        novaResposta.classList.add("button", "respostas");
        novaResposta.textContent = resposta.texto;
        if (resposta.certo) {
            novaResposta.dataset.certo = resposta.certo
        }
        containerRespostas.appendChild(novaResposta) /*C.R adiciona novos filhos (botões)*/

        novaResposta.addEventListener("click", selecionarResposta);
    });
}


// Função de voltar ao padrão depois de clicar em proxima pergunta
function voltarPadrao() {
    while (containerRespostas.firstChild) {
        containerRespostas.removeChild(containerRespostas.firstChild)
    }
    document.body.removeAttribute('class');
    btnProximo.classList.add('hide');
    Mensagemm.classList.add('hide')
}

// Função de selecionar resposta e verificar se está certo ou não e incrementar a pontuação
// event serve para retornar o botão clicado
function selecionarResposta(event) {
    const respostaClicado = event.target;

    if (respostaClicado.dataset.certo) {
        document.body.classList.add("certoo")
        totalCerto++;
        Pontos.innerHTML = totalCerto
        Mensagemm.classList.remove('hide')
        Mensagemm.innerHTML = "Resposta correcta!"

    } else {
        document.body.classList.add("erradoo")
        Pontos.innerHTML = totalCerto
        Mensagemm.classList.remove('hide')
        Mensagemm.innerHTML = "Resposta incorrecta!"
    }

    // Fazer com que os botões mudem de cor quando escolher a resposta
    document.querySelectorAll(".respostas").forEach(button => {
        if (button.dataset.certo) {
            button.classList.add("certo")

        } else {
            button.classList.add("errado")
        }

        // Poder escolher apenas uma única opção
        button.disabled = true;
    })

    btnProximo.classList.remove('hide')
    currentQuestionIndex++;
}

// Função de fim do jogo e verificar a pontuação obtida.
function fimJogo() {
    Pontuacao.classList.add('hide')

    const totalPerguntas = perguntas.length;
    const resultado = Math.floor(totalCerto * 100 / totalPerguntas)

    let mensagem = "";

    switch (true) {
        case (resultado >= 90):
            mensagem = "Excelente!"
            break
        case (resultado >= 70):
            mensagem = "Muito Bom!"
            break
        case (resultado >= 50):
            mensagem = "Bom!"
            break
        case (resultado >= 0):
            mensagem = "Pode melhorar!"
            break
    }

    containerPerguntas.innerHTML =
        `
        <p class="mnsgm-final" >
            Você acertou ${totalCerto} de ${totalPerguntas} perguntas!
            <span>Resultado: ${mensagem} </span> 
        </p>
        <button onclick=window.location.reload() class="button">
            Jogar outra vez!
        </button>

    `

}

// função de embaralhar as perguntas para venham de forma aleatória
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



// Perguntas
const perguntas = [
    {
        pergunta: 'Qual é a capital da Guiné-Bissau?',
        respostas: [
            { texto: 'Bissau', certo: true },
            { texto: 'Conacri', certo: false },
            { texto: 'Dakar', certo: false },
            { texto: 'Praia', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a língua oficial da Guiné-Bissau?',
        respostas: [
            { texto: 'Francês', certo: false },
            { texto: 'Português', certo: true },
            { texto: 'Espanhol', certo: false },
            { texto: 'Inglês', certo: false },
        ]
    },
    {
        pergunta: 'Em que ano a Guiné-Bissau tornou-se independente?',
        respostas: [
            { texto: '1973', certo: true },
            { texto: '1960', certo: false },
            { texto: '1985', certo: false },
            { texto: '1990', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a moeda oficial da Guiné-Bissau?',
        respostas: [
            { texto: 'Naira', certo: false },
            { texto: 'Franco CFA', certo: true },
            { texto: 'Escudo', certo: false },
            { texto: 'Metical', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a maior religião na Guiné-Bissau?',
        respostas: [
            { texto: 'Cristianismo', certo: false },
            { texto: 'Islamismo', certo: true },
            { texto: 'Hinduísmo', certo: false },
            { texto: 'Budismo', certo: false },
        ]
    },
    {
        pergunta: 'Qual é o principal rio que atravessa a Guiné-Bissau?',
        respostas: [
            { texto: 'Rio Níger', certo: false },
            { texto: 'Rio Senegal', certo: false },
            { texto: 'Rio Gâmbia', certo: false },
            { texto: 'Rio Geba', certo: true },
        ]
    },
    {
        pergunta: 'Qual país faz fronteira com a Guiné-Bissau a leste?',
        respostas: [
            { texto: 'Senegal', certo: false },
            { texto: 'Mali', certo: false },
            { texto: 'Guiné', certo: true },
            { texto: 'Cabo Verde', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a principal exportação da Guiné-Bissau?',
        respostas: [
            { texto: 'Ouro', certo: false },
            { texto: 'Castanha de caju', certo: true },
            { texto: 'Petróleo', certo: false },
            { texto: 'Café', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a área aproximada da Guiné-Bissau?',
        respostas: [
            { texto: '36.125 km²', certo: true },
            { texto: '100.000 km²', certo: false },
            { texto: '250.000 km²', certo: false },
            { texto: '500.000 km²', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a ilha mais famosa da Guiné-Bissau?',
        respostas: [
            { texto: 'Ilha de Santiago', certo: false },
            { texto: 'Ilha de Fogo', certo: false },
            { texto: 'Ilha de Bubaque', certo: true },
            { texto: 'Ilha de São Vicente', certo: false },
        ]
    },
    {
        pergunta: 'Qual é o nome do aeroporto principal na Guiné-Bissau?',
        respostas: [
            { texto: 'Aeroporto Internacional de Dakar', certo: false },
            { texto: 'Aeroporto Internacional Osvaldo Vieira', certo: true },
            { texto: 'Aeroporto Internacional de Bamako', certo: false },
            { texto: 'Aeroporto Internacional Amílcar Cabral', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a principal dança tradicional da Guiné-Bissau?',
        respostas: [
            { texto: 'Samba', certo: false },
            { texto: 'Kizomba', certo: false },
            { texto: 'Funaná', certo: false },
            { texto: 'Tina', certo: true },
        ]
    },
    {
        pergunta: 'Qual é o maior grupo étnico da Guiné-Bissau?',
        respostas: [
            { texto: 'Mandinga', certo: false },
            { texto: 'Fula', certo: false },
            { texto: 'Balanta', certo: true },
            { texto: 'Manjaco', certo: false },
        ]
    },
    {
        pergunta: 'Quem foi o primeiro presidente da Guiné-Bissau após a independência?',
        respostas: [
            { texto: 'Amílcar Cabral', certo: false },
            { texto: 'Nino Vieira', certo: false },
            { texto: 'Luís Cabral', certo: true },
            { texto: 'Kumba Ialá', certo: false },
        ]
    },
    {
        pergunta: 'Qual é a taxa de alfabetização aproximada da Guiné-Bissau?',
        respostas: [
            { texto: '20%', certo: false },
            { texto: '50%', certo: false },
            { texto: '60%', certo: false },
            { texto: '59%', certo: true },
        ]
    },
    {
        pergunta: 'Qual é a maior cidade da Guiné-Bissau?',
        respostas: [
            { texto: 'Bafatá', certo: false },
            { texto: 'Bolama', certo: false },
            { texto: 'Gabú', certo: false },
            { texto: 'Bissau', certo: true },
        ]
    },
    {
        pergunta: 'Quantas regiões administrativas a Guiné-Bissau possui?',
        respostas: [
            { texto: '6', certo: false },
            { texto: '9', certo: true },
            { texto: '11', certo: false },
            { texto: '13', certo: false },
        ]
    },
    {
        pergunta: 'Qual é o nome do parque nacional mais famoso da Guiné-Bissau?',
        respostas: [
            { texto: 'Parque Nacional de Niokolo-Koba', certo: false },
            { texto: 'Parque Nacional de Bissau', certo: false },
            { texto: 'Parque Nacional das Florestas do Norte', certo: false },
            { texto: 'Parque Nacional de Cantanhez', certo: true },
        ]
    },
    {
        pergunta: 'Qual é o principal estádio de futebol da Guiné-Bissau?',
        respostas: [
            { texto: 'Estádio 24 de Setembro', certo: true },
            { texto: 'Estádio da Luz', certo: false },
            { texto: 'Estádio Nacional de Bissau', certo: false },
            { texto: 'Estádio do Dragão', certo: false },
        ]
    },
    {
        pergunta: 'Qual é o nome do prato tradicional feito de arroz e peixe na Guiné-Bissau?',
        respostas: [
            { texto: 'Jollof Rice', certo: false },
            { texto: 'Cachupa', certo: false },
            { texto: 'Thieboudienne', certo: true },
            { texto: 'Moamba de Galinha', certo: false },
        ]
    }
];
