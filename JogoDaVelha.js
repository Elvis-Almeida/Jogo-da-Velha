//criar jogo com programação orientada a objeto
const JogoDaVelha = {

    tabuleiro: ['','','','','','','','',''], 

    finDeJogo: 1,

    conteiner_element: null, //para receber a div do html aqui 
    
    jogarContraPC: 1,

    listaDeGanhadores: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ],

    simbolo: {
        opcao: ['X', 'O'],
        playerAtual: 0,
        trocarPlayer: function(){
            if (this.playerAtual===0) {
                this.playerAtual = 1;
            } else {
                this.playerAtual = 0;
            }
        }
    },

    iniciar: function( container ) {
        this.conteiner_element = container;
    },

    reiniciar: function(botao) {
        this.tabuleiro = ['','','','','','','','',''];
        this.mostrarJogo();
        this.finDeJogo = 1;
        this.simbolo.playerAtual = 0;
        botao.parentNode.removeChild(botao);
        console.log("reiniciou");
    },

    gameOver: function () {
        var botao = document.createElement('div'); 
        botao.id = 'botao';
        botao.innerHTML = '<button onclick="JogoDaVelha.reiniciar(this)">Reiniciar</button>';
        document.body.appendChild(botao);
        console.log("fim de jogo");
        this.finDeJogo = 0;
    },

    fazerJogar: function( posicao ){
        if(this.finDeJogo){
            console.log(posicao);
            if ( this.tabuleiro[ posicao ] === '' ) {
                this.tabuleiro[ posicao ] = this.simbolo.opcao[ this.simbolo.playerAtual ];

                this.mostrarJogo();

                if (this.verificarGanhador(this.simbolo.opcao[ this.simbolo.playerAtual ])) {

                    this.gameOver();
                    return;
                }
                
                this.simbolo.trocarPlayer();
                if (this.jogarContraPC) {
                    this.computador()   
                }
            }
            else{
                console.log("posição ocupada");
            }
            this.verificarTabuleiroCheio();
        }      
    },

    computador: function () {
        let jogadas = [];

        for (let i=0; i<10; i++) {
            try {
                if ((this.tabuleiro[i].indexOf("X") == -1) && (this.tabuleiro[i].indexOf("O") == -1)) {
                jogadas.push(i);
            }
            } catch (error) {
                //console.log(error);
            }
            
        }

        let jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
        if (this.simbolo.playerAtual == 1) {
            this.fazerJogar(jogada);
        }
    },


    verificarGanhador: function(playeratual) {
        for(let i=0; i < 8; i++){

            //se o tabuleiro tiver o mesmo simbolo na posição de listaDeGanhadores 0 1 e 2 o player atual ganha
            if (this.tabuleiro[this.listaDeGanhadores[i][0]] === playeratual &&
            this.tabuleiro[this.listaDeGanhadores[i][1]] === playeratual &&
            this.tabuleiro[this.listaDeGanhadores[i][2]] === playeratual) {

                //para pintar as letras ganhadoras de verde
                var letraGanhadora1 = document.getElementById(this.listaDeGanhadores[i][0])
                var letraGanhadora2 = document.getElementById(this.listaDeGanhadores[i][1])
                var letraGanhadora3 = document.getElementById(this.listaDeGanhadores[i][2])
                
                letraGanhadora1.style.color = '#3bdb50';
                letraGanhadora2.style.color = '#3bdb50';
                letraGanhadora3.style.color = '#3bdb50';

                letraGanhadora1.style.boxShadow = '3px 3px 4px #1b262e';
                letraGanhadora2.style.boxShadow = '3px 3px 4px #1b262e';
                letraGanhadora3.style.boxShadow = '3px 3px 4px #1b262e';

                return 1;  
            }
        }
    },

    verificarTabuleiroCheio: function() {
        if (!this.tabuleiro.includes('')) {
            this.gameOver();
            return 0;
        }
        return 1; 
    },

    mostrarJogo: function (){
        let content = '';
        for ( i in this.tabuleiro ) {
            content += '<div id='+i+' onclick="JogoDaVelha.fazerJogar(' + i + ')"> ' + this.tabuleiro[i] + '</div>';
        }
        this.conteiner_element.innerHTML = content;
    },

    
};