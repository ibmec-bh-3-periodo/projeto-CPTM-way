const metrozinho = document.getElementById("metrozinho");
const progresso = document.getElementById("Progresso");
const timerDisplay = document.getElementById("timer");

const totalTempo = 15 * 60; // 15 minutos em segundos

function getSegundosDesdeInicio() {
    const agora = new Date();
    const inicio = new Date();
    inicio.setHours(5, 30, 0, 0); // 5:30 da manhã

    let diff = (agora - inicio) / 1000; // diferença em segundos

    if (diff < 0) {
        // Se for antes de 5:30, considera que a próxima janela começa amanhã
        diff += 24 * 60 * 60;
    }

    return diff % totalTempo; // quanto tempo passou desde o último ciclo de 15 min
}

function moverMetro() {
    const progressoWidth = progresso.offsetWidth - metrozinho.offsetWidth;

    setInterval(() => {
        const tempoPassado = getSegundosDesdeInicio();
        const tempoRestante = totalTempo - tempoPassado;

        // Atualiza timer
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = Math.floor(tempoRestante % 60);
        timerDisplay.textContent =
            (minutos < 10 ? "0" + minutos : minutos) + ":" +
            (segundos < 10 ? "0" + segundos : segundos);

        // Atualiza posição do metrô
        const posicaoAtual = (tempoPassado / totalTempo) * progressoWidth;
        metrozinho.style.left = posicaoAtual + "px";
    }, 1000); // Atualiza a cada segundo
}

async function carregarEstacoes() {
    try {
        const response = await fetch("../db/estacoes_db.json");
        const estacoes = await response.json();

        const lista = document.getElementById("estacoes-list");
        const paginacao = document.getElementById("pagination");
        const estacoesPorPagina = 10;
        let paginaAtual = 1;
        const totalPaginas = Math.ceil(estacoes.length / estacoesPorPagina);

        function renderizarPagina(pagina) {
            lista.innerHTML = "";
            const inicio = (pagina - 1) * estacoesPorPagina;
            const fim = inicio + estacoesPorPagina;
            const estacoesPagina = estacoes.slice(inicio, fim);

            estacoesPagina.forEach(estacao => {
                const item = document.createElement("div");
                item.className = "border p-4 rounded shadow bg-white";

                item.innerHTML = `
                    <h3 class="text-lg font-semibold">${estacao['ESTAÇÕES']}</h3>
                    <p><strong>Linha:</strong> ${estacao['Linha']}</p>
                    <p><strong>Classificação:</strong> ${estacao['Classificação']}</p>
                    <p><strong>Área:</strong> ${estacao['ÁREAS (m²)']} m²</p>
                    <p><strong>Total (DU):</strong> ${estacao['TOTAL (DU)'].toLocaleString('pt-BR')}</p>
                `;

                lista.appendChild(item);
            });
        }

        function criarPaginacao() {
            paginacao.innerHTML = "";

            for (let i = 1; i <= totalPaginas; i++) {
                const btn = document.createElement("button");
                btn.textContent = i;
                btn.className = `px-3 py-1 rounded ${i === paginaAtual ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`;
                btn.onclick = () => {
                    paginaAtual = i;
                    renderizarPagina(paginaAtual);
                    criarPaginacao();
                };
                paginacao.appendChild(btn);
            }
        }

        renderizarPagina(paginaAtual);
        criarPaginacao();

    } catch (error) {
        console.error("Erro ao carregar estações:", error);
    }
}


window.onload = () => {
    moverMetro();
    carregarEstacoes();
};
