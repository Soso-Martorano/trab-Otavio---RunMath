// ======================================================
// RUNMATH
// DO MOVIMENTO AO GRÁFICO
// ======================================================


// =========================
// ELEMENTOS
// =========================

const velocidadeInput =
    document.getElementById("velocidade");

const tempoInput =
    document.getElementById("tempo");

const calcularBtn =
    document.getElementById("calcularBtn");


const velocidadeDisplay =
    document.getElementById("velocidadeDisplay");

const distanciaResultado =
    document.getElementById("distanciaResultado");

const velocidadeResultado =
    document.getElementById("velocidadeResultado");

const tempoResultado =
    document.getElementById("tempoResultado");


const funcaoResultado =
    document.getElementById("funcaoResultado");

const funcaoDescricao =
    document.getElementById("funcaoDescricao");

const coefAngular =
    document.getElementById("coefAngular");

const coefLinear =
    document.getElementById("coefLinear");


const tabelaDados =
    document.getElementById("tabelaDados");

const grafico =
    document.getElementById("grafico");


const runner =
    document.getElementById("runner");


const raceTime =
    document.getElementById("raceTime");

const raceDistance =
    document.getElementById("raceDistance");

const raceSpeed =
    document.getElementById("raceSpeed");


// =========================
// VARIÁVEIS DA SIMULAÇÃO
// =========================

let velocidadeAtual = 8;

let tempoMaximo = 4;

let tempoAnimacao = 0;

let animacaoAtiva = true;

let ultimoFrame = null;


// =========================
// FORMATAÇÃO
// =========================

function formatarNumero(numero) {

    return Number(numero).toLocaleString(
        "pt-BR",
        {
            maximumFractionDigits: 2
        }
    );
}


// =========================
// FUNÇÃO AFIM
// =========================

function criarFuncao(a, b) {

    const aFormatado =
        formatarNumero(a);

    const bFormatado =
        formatarNumero(Math.abs(b));


    if (b === 0) {

        return `f(x) = ${aFormatado}x`;

    }


    if (b > 0) {

        return `f(x) = ${aFormatado}x + ${bFormatado}`;

    }


    return `f(x) = ${aFormatado}x - ${bFormatado}`;
}


// =========================
// ATUALIZAR SIMULAÇÃO
// =========================

function atualizarSimulacao() {

    velocidadeAtual =
        parseFloat(velocidadeInput.value);

    tempoMaximo =
        parseFloat(tempoInput.value);


    if (
        isNaN(velocidadeAtual) ||
        isNaN(tempoMaximo) ||
        velocidadeAtual <= 0 ||
        tempoMaximo <= 0
    ) {

        return;

    }


    const posicaoInicial = 0;


    const distanciaFinal =
        velocidadeAtual * tempoMaximo;


    // =========================
    // RESULTADOS
    // =========================

    velocidadeDisplay.textContent =
        `${formatarNumero(velocidadeAtual)} km/h`;


    distanciaResultado.textContent =
        `${formatarNumero(distanciaFinal)} km`;


    velocidadeResultado.textContent =
        `${formatarNumero(velocidadeAtual)} km/h`;


    tempoResultado.textContent =
        `${formatarNumero(tempoMaximo)} h`;


    // =========================
    // FUNÇÃO
    // =========================

    const funcao =
        criarFuncao(
            velocidadeAtual,
            posicaoInicial
        );


    funcaoResultado.textContent =
        funcao;


    funcaoDescricao.textContent =
        `A cada hora, o corredor percorre ${formatarNumero(velocidadeAtual)} km.`;


    coefAngular.textContent =
        formatarNumero(velocidadeAtual);


    coefLinear.textContent =
        "0";


    // =========================
    // TABELA
    // =========================

    gerarTabela(
        velocidadeAtual,
        tempoMaximo
    );


    // =========================
    // GRÁFICO
    // =========================

    desenharGrafico(
        velocidadeAtual,
        tempoMaximo
    );


    // =========================
    // VELOCIDADE DA ANIMAÇÃO
    // =========================

    tempoAnimacao = 0;

}


// =========================
// TABELA
// =========================

function gerarTabela(
    velocidade,
    tempoMaximo
) {

    tabelaDados.innerHTML = "";


    const quantidadePontos = 5;


    for (
        let i = 0;
        i < quantidadePontos;
        i++
    ) {

        const tempo =
            (tempoMaximo / 4) * i;


        const distancia =
            velocidade * tempo;


        const linha =
            document.createElement("tr");


        const colunaTempo =
            document.createElement("td");


        const colunaDistancia =
            document.createElement("td");


        colunaTempo.textContent =
            `${formatarNumero(tempo)} h`;


        colunaDistancia.textContent =
            `${formatarNumero(distancia)} km`;


        linha.appendChild(colunaTempo);

        linha.appendChild(colunaDistancia);


        tabelaDados.appendChild(linha);

    }

}


// =========================
// GRÁFICO
// =========================

function desenharGrafico(
    velocidade,
    tempoMaximo
) {

    grafico.innerHTML = "";


    const largura = 800;

    const altura = 450;


    const margemEsquerda = 70;

    const margemDireita = 30;

    const margemSuperior = 30;

    const margemInferior = 55;


    const larguraGrafico =
        largura -
        margemEsquerda -
        margemDireita;


    const alturaGrafico =
        altura -
        margemSuperior -
        margemInferior;


    const distanciaMaxima =
        velocidade * tempoMaximo;


    const maxX =
        tempoMaximo > 0
            ? tempoMaximo
            : 1;


    const maxY =
        distanciaMaxima > 0
            ? distanciaMaxima
            : 1;


    function converterX(valor) {

        return margemEsquerda +
            (valor / maxX) *
            larguraGrafico;

    }


    function converterY(valor) {

        return altura -
            margemInferior -
            (valor / maxY) *
            alturaGrafico;

    }


    function svgElement(
        tipo,
        atributos
    ) {

        const elemento =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                tipo
            );


        for (
            const atributo in atributos
        ) {

            elemento.setAttribute(
                atributo,
                atributos[atributo]
            );

        }


        return elemento;

    }


    // =========================
    // FUNDO
    // =========================

    const fundo =
        svgElement(
            "rect",
            {
                x: 0,
                y: 0,
                width: largura,
                height: altura,
                fill: "#fafbfc"
            }
        );


    grafico.appendChild(fundo);


    // =========================
    // GRADE
    // =========================

    const linhas = 5;


    for (
        let i = 0;
        i <= linhas;
        i++
    ) {

        const valorX =
            (maxX / linhas) * i;


        const x =
            converterX(valorX);


        const linhaVertical =
            svgElement(
                "line",
                {
                    x1: x,
                    y1: margemSuperior,
                    x2: x,
                    y2: altura - margemInferior,
                    stroke: "#e2e6ea",
                    "stroke-width": 1
                }
            );


        grafico.appendChild(
            linhaVertical
        );


        const valorY =
            (maxY / linhas) * i;


        const y =
            converterY(valorY);


        const linhaHorizontal =
            svgElement(
                "line",
                {
                    x1: margemEsquerda,
                    y1: y,
                    x2: largura - margemDireita,
                    y2: y,
                    stroke: "#e2e6ea",
                    "stroke-width": 1
                }
            );


        grafico.appendChild(
            linhaHorizontal
        );


        // NÚMERO X

        const textoX =
            svgElement(
                "text",
                {
                    x: x,
                    y: altura - 25,
                    "text-anchor": "middle",
                    fill: "#7b858f",
                    "font-size": 12
                }
            );


        textoX.textContent =
            formatarNumero(valorX);


        grafico.appendChild(
            textoX
        );


        // NÚMERO Y

        const textoY =
            svgElement(
                "text",
                {
                    x: margemEsquerda - 12,
                    y: y + 4,
                    "text-anchor": "end",
                    fill: "#7b858f",
                    "font-size": 12
                }
            );


        textoY.textContent =
            formatarNumero(valorY);


        grafico.appendChild(
            textoY
        );

    }


    // =========================
    // EIXO X
    // =========================

    const eixoX =
        svgElement(
            "line",
            {
                x1: margemEsquerda,
                y1: altura - margemInferior,
                x2: largura - margemDireita,
                y2: altura - margemInferior,
                stroke: "#17202a",
                "stroke-width": 2
            }
        );


    grafico.appendChild(eixoX);


    // =========================
    // EIXO Y
    // =========================

    const eixoY =
        svgElement(
            "line",
            {
                x1: margemEsquerda,
                y1: margemSuperior,
                x2: margemEsquerda,
                y2: altura - margemInferior,
                stroke: "#17202a",
                "stroke-width": 2
            }
        );


    grafico.appendChild(eixoY);


    // =========================
    // RETA DA FUNÇÃO
    // =========================

    const x1 =
        converterX(0);


    const y1 =
        converterY(0);


    const x2 =
        converterX(tempoMaximo);


    const y2 =
        converterY(distanciaMaxima);


    const linhaFuncao =
        svgElement(
            "line",
            {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: "#1d6fd6",
                "stroke-width": 5,
                "stroke-linecap": "round"
            }
        );


    grafico.appendChild(
        linhaFuncao
    );


    // =========================
    // PONTOS
    // =========================

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const tempo =
            (tempoMaximo / 4) * i;


        const distancia =
            velocidade * tempo;


        const ponto =
            svgElement(
                "circle",
                {
                    cx: converterX(tempo),
                    cy: converterY(distancia),
                    r: 6,
                    fill: "#ffffff",
                    stroke: "#1d6fd6",
                    "stroke-width": 3
                }
            );


        grafico.appendChild(
            ponto
        );

    }


    // =========================
    // EIXO X — TÍTULO
    // =========================

    const tituloX =
        svgElement(
            "text",
            {
                x: largura / 2,
                y: altura - 5,
                "text-anchor": "middle",
                fill: "#17202a",
                "font-size": 13,
                "font-weight": "700"
            }
        );


    tituloX.textContent =
        "Tempo (h)";


    grafico.appendChild(
        tituloX
    );


    // =========================
    // EIXO Y — TÍTULO
    // =========================

    const tituloY =
        svgElement(
            "text",
            {
                x: 18,
                y: altura / 2,
                "text-anchor": "middle",
                fill: "#17202a",
                "font-size": 13,
                "font-weight": "700",
                transform:
                    `rotate(-90 18 ${altura / 2})`
            }
        );


    tituloY.textContent =
        "Distância (km)";


    grafico.appendChild(
        tituloY
    );

}


// =========================
// ANIMAÇÃO DO CORREDOR
// =========================

function animarCorredor(timestamp) {

    if (
        ultimoFrame === null
    ) {

        ultimoFrame =
            timestamp;

    }


    const delta =
        (timestamp - ultimoFrame) / 1000;


    ultimoFrame =
        timestamp;


    if (animacaoAtiva) {

        /*
         * A velocidade visual aumenta conforme
         * a velocidade matemática aumenta.
         */

        const velocidadeAnimacao =
            0.12 +
            velocidadeAtual * 0.025;


        tempoAnimacao +=
            delta * velocidadeAnimacao;


        /*
         * O ciclo representa o corredor
         * percorrendo a pista.
         */

        if (
            tempoAnimacao > 1
        ) {

            tempoAnimacao = 0;

        }


        // Posição do corredor
        const posicao =
            5 +
            tempoAnimacao * 87;


        runner.style.left =
            `${posicao}%`;


        // Tempo correspondente
        const tempoAtual =
            tempoAnimacao *
            tempoMaximo;


        // Distância correspondente
        const distanciaAtual =
            velocidadeAtual *
            tempoAtual;


        raceTime.textContent =
            `${formatarNumero(tempoAtual)} h`;


        raceDistance.textContent =
            `${formatarNumero(distanciaAtual)} km`;


        raceSpeed.textContent =
            `${formatarNumero(velocidadeAtual)} km/h`;

    }


    requestAnimationFrame(
        animarCorredor
    );

}


// =========================
// EVENTOS
// =========================


// Slider muda em tempo real

velocidadeInput.addEventListener(
    "input",
    atualizarSimulacao
);


// Tempo muda em tempo real

tempoInput.addEventListener(
    "input",
    atualizarSimulacao
);


// Botão

calcularBtn.addEventListener(
    "click",
    atualizarSimulacao
);


// =========================
// INICIAR
// =========================

atualizarSimulacao();

requestAnimationFrame(
    animarCorredor
);