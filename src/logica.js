window.onload = ()=> {
    var dific = 2000;

    var statustxt = document.querySelector('#status');
    var numero = 0;
    var contador = document.querySelector('#nCount');
    function pickRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    function aumentaDific() { return dific -= 50; }
    //Criar elemento svg
    var width = 500;
    var height = 300;
    var balloon = d3.select("#balao")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //Adicionar circulo
    balloon = balloon.append("circle")
        .attr("cx", pickRandom(35, 465))
        .attr("cy", 35)
        .attr("r", 35)
        .attr("fill", "red");

    function queda() {
        balloon.transition()
            .attr('cy', 265)
            .duration(aumentaDific())
            .ease(d3.easeQuadIn);
    }
    function randRetorno() {
        balloon.interrupt()
            .attr('cy', 35)
            .attr("cx", pickRandom(35, 465));
    }

    function gameover() {
        setTimeout(() => {
            if (balloon.attr("cy") == 265) {
                statustxt.innerHTML = 'Jogar de novo</br>Pontuação:' + numero;
                //zerando variaveis
                numero = 0;
                dific = 2000;
                contador.innerHTML = numero;
                statustxt.style.display = '';
            }
        }, dific + 15);

    }
    ///game
    statustxt.addEventListener('click', () => {
        balloon.style.pointerEvents = "auto";
        statustxt.style.display = 'none';
        queda();
        balloon.on('click', () => {
            randRetorno()
            queda();
            contador.innerHTML = numero += 1
            gameover();
        });
    });
}
