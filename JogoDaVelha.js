
var tabuleiro = ['','','','','','','','','']
var finDeJogo = 1
var caixa_do_game = null
var caixa_principal = null
var audioClick
var audioVitoria   
var jogarContraPC = 1
var pause = 1
var tema = 0
var listaDeGanhadores = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ]

var simbolo = {
        opcao: ['X', 'O'],
        playerAtual: 0,
        trocarPlayer: function(){
            if (this.playerAtual===0) {
                this.playerAtual = 1;
            } else {
                this.playerAtual = 0;
            }
        },
    }

function iniciar(container) {
        caixa_principal = container
        caixa_do_game = document.createElement('div');
        caixa_do_game.className = 'caixa_do_game'
        caixa_principal.appendChild(caixa_do_game)
        audioClick = document.getElementById('audio_click')
        audioVitoria = document.getElementById('som_vitoria')
    }

function reiniciar(botao) {
    if (pause) {
        tabuleiro = ['','','','','','','','',''];
        mostrarJogo();
        finDeJogo = 1;
        simbolo.playerAtual = 0;
        try {
            document.getElementById('caixa_botao_reiniciar').remove()
        } catch (e) {
        }
        console.log("reiniciou");
    }
}

function gameOver() {
        var botao = document.createElement('div'); 
        botao.id = 'caixa_botao_reiniciar';
        botao.innerHTML = '<button onclick="reiniciar(this)">Reiniciar</button>';
        caixa_principal.appendChild(botao);
        if (tema) {
            document.querySelector('#caixa_botao_reiniciar > button').style.backgroundColor = '#959595'
        }
        console.log("fim de jogo");
        finDeJogo = 0;
    }

function fazerJogar( posicao ){
        if(finDeJogo && pause){
            console.log(posicao);
            if ( tabuleiro[ posicao ] === '' ) {
                tabuleiro[ posicao ] = simbolo.opcao[ simbolo.playerAtual ];

                audioClick.play();
                mostrarJogo();
                
                if (verificarGanhador(simbolo.opcao[ simbolo.playerAtual ])) {

                    gameOver();
                    return;
                }
                
                simbolo.trocarPlayer();
                if (jogarContraPC) {
                    computador()   
                }
            }
            else{
                console.log("posição ocupada");
            }
            verificarTabuleiroCheio();
        }      
    }

function computador() {
        let jogadas = [];

        for (let i=0; i<10; i++) {
            try {
                if ((tabuleiro[i].indexOf("X") == -1) && (tabuleiro[i].indexOf("O") == -1)) {
                jogadas.push(i);
            }
            } catch (error) {
                //console.log(error);
            }
            
        }

        let jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
        if (simbolo.playerAtual == 1) {
            setTimeout(() => {
               fazerJogar(jogada); 
            }, 100);
        }
    }

function verificarGanhador(playeratual) {
        for(let i=0; i < 8; i++){

            //se o tabuleiro tiver o mesmo simbolo na posição de listaDeGanhadores 0 1 e 2 o player atual ganha
            if (tabuleiro[listaDeGanhadores[i][0]] === playeratual &&
            tabuleiro[listaDeGanhadores[i][1]] === playeratual &&
            tabuleiro[listaDeGanhadores[i][2]] === playeratual) {

                audioVitoria.play()

                //para pintar as letras ganhadoras de verde
                var letraGanhadora1 = document.getElementById(listaDeGanhadores[i][0])
                var letraGanhadora2 = document.getElementById(listaDeGanhadores[i][1])
                var letraGanhadora3 = document.getElementById(listaDeGanhadores[i][2])
                
                
                letraGanhadora1.style.color = '#3bdb50';
                letraGanhadora2.style.color = '#3bdb50';
                letraGanhadora3.style.color = '#3bdb50';
                
                
                letraGanhadora1.style.boxShadow = '3px 3px 4px #1b262e';
                letraGanhadora2.style.boxShadow = '3px 3px 4px #1b262e';
                letraGanhadora3.style.boxShadow = '3px 3px 4px #1b262e';

                return 1;  
            }
        }
    }

function verificarTabuleiroCheio() {
        if (!tabuleiro.includes('')) {
            gameOver();
            return 0;
        }
        return 1; 
    }

function mostrarJogo(){
        let content = '';
        for ( i in this.tabuleiro ) {
            content += '<div id='+i+' onclick="fazerJogar(' + i + ')"> ' + this.tabuleiro[i] + '</div>';
        }
        this.caixa_do_game.innerHTML = content;

        if (tema) {
            for (let i = 0; i < 9; i++) {
                document.getElementById(i).style.backgroundColor = '#959595'
            }
        }
        else{
            for (let i = 0; i < 9; i++) {
                document.getElementById(i).style.backgroundColor = '#4c687a'
            }
        }
    }
