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

window.onload = moverMetro;
