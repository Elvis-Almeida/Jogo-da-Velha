if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../Scripts/sw.js')
    .then(function(registration) {
        console.log("registo com sucesso, no escopo: ", registration.scope);
    })
    .catch(function(error) {
        console.log('falha no registro, erro: ', error);
    })
}

var tabuleiro = ['','','','','','','','','']
var finDeJogo = 1
var caixa_do_game = null
var caixa_principal = null
var audioClick
var audioVitoria   
var jogarContraPC = 1
var pause = 1
var tema = 0
var dificuldade = 0
var quemComeca = 1;
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
        caixa_do_game.className = 'caixa_do_game';
        caixa_principal.appendChild(caixa_do_game);
        audioClick = document.getElementById('audio_click');
        audioVitoria = document.getElementById('som_vitoria');

        jogadorInicial()

        simbolo.playerAtual = quemComeca;
        if (jogarContraPC) {
            computador()   
        }
        iniciar_menu();
        
    }

function reiniciar(botao) {
    if (pause) {
        tabuleiro = ['','','','','','','','',''];
        finDeJogo = 1;
        
        mostrarJogo();
        jogadorInicial()

        simbolo.playerAtual = quemComeca;
        try {
            document.getElementById('caixa_botao_reiniciar').remove()
        } catch (e) {
        }
        console.log("reiniciou");
        if (jogarContraPC) {
            computador()   
        }
    }
}

function jogadorInicial() {
    quemComeca = Math.round(Math.random())
    console.log(quemComeca);
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

function jogarfacil() {
    let jogadas = []

    for (let i=0; i<10; i++) {
        try {
            if ((tabuleiro[i].indexOf("X") == -1) && (tabuleiro[i].indexOf("O") == -1)) {
                jogadas.push(i);
            }
        } catch (error) {
            //console.log(error);
        }
        
    }

    return jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]      
}

function jogarDificil(dificil) {
    let jogada = -1
    let quantidadeDeAcerto=0
    let player 
    let posicaoVazia

    for (let i=0; i < 2; i++) {

        player = simbolo.opcao[i]
        console.log(player);

        for(let j=0; j < 8; j++){
            quantidadeDeAcerto=0

            // verifica se tem duas peças alinhadas para ganhar
            if (tabuleiro[listaDeGanhadores[j][0]] === player ) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][0]
            }

            if (tabuleiro[listaDeGanhadores[j][1]] === player) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][1]
            }
            
            if (tabuleiro[listaDeGanhadores[j][2]] === player) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][2]
            }

            //verifica se a posição é vazia
            
            if (quantidadeDeAcerto==2) {
                if ((tabuleiro[posicaoVazia].indexOf("X") == -1) && (tabuleiro[posicaoVazia].indexOf("O") == -1)) {
                    jogada = posicaoVazia
                    console.log('jogou certo');
                    break
                }
            }   
        }   
    }
    if (jogada == -1) {
        if (dificil) {
            if (tabuleiro[4]==''){
                jogada = 4
            }
            else{
                let jogadas
                if (
                    tabuleiro[0] == "X" ||
                    tabuleiro[2] == "X" ||
                    tabuleiro[6] == "X" ||
                    tabuleiro[8] == "X"
                ) {
                    if (tabuleiro[4] != 'X'){
                        jogadas = [1,3,5,7]
                        console.log('jogou no meio');
                    }
                    else{
                        jogadas = [0,2,6,8]
                        console.log('jogou no canto');
                    }
                }
                else{
                    jogadas = [0,2,6,8]
                    console.log('jogou no canto');
                }

                let test=0
                jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
                while (tabuleiro[jogada] != '') {
                    jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
                    if (test > 3) {
                        jogada = jogarfacil()
                        console.log('jogou facil');
                        break
                    }
                    test += 1
                }
            }
        }
        else{
            jogada = jogarfacil()
        }
         
    }
    return jogada
}

function jogarImpossivel() {
    let jogada = -1
    let quantidadeDeAcerto=0
    let player 
    let posicaoVazia

    for (let i=0; i < 2; i++) {

        player = simbolo.opcao[i]
        console.log(player);

        for(let j=0; j < 8; j++){
            quantidadeDeAcerto=0

            // verifica se tem duas peças alinhadas para ganhar
            if (tabuleiro[listaDeGanhadores[j][0]] === player ) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][0]
            }

            if (tabuleiro[listaDeGanhadores[j][1]] === player) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][1]
            }
            
            if (tabuleiro[listaDeGanhadores[j][2]] === player) {
                quantidadeDeAcerto+=1
            }
            else{
                posicaoVazia = listaDeGanhadores[j][2]
            }

            //verifica se a posição é vazia
            
            if (quantidadeDeAcerto==2) {
                if ((tabuleiro[posicaoVazia].indexOf("X") == -1) && (tabuleiro[posicaoVazia].indexOf("O") == -1)) {
                    jogada = posicaoVazia
                    console.log('jogou certo');
                    break
                }
            }   
        }   
    }
    if (jogada == -1) {

            if (tabuleiro[4]==''){
                jogada = 4
            }
            else{
                let jogadas
                if (
                    tabuleiro[0] == "X" ||
                    tabuleiro[2] == "X" ||
                    tabuleiro[6] == "X" ||
                    tabuleiro[8] == "X"
                ) {
                    if (tabuleiro[4] == 'X'){
                        jogadas = [0,2,6,8]
                        console.log('jogou no canto');
                    }
                    if (
                        tabuleiro[4] == 'O' && 
                        !(tabuleiro[1] == "X" ||
                        tabuleiro[3] == "X" ||
                        tabuleiro[5] == "X" ||
                        tabuleiro[7] == "X")
                    ){
                        jogadas = [1,3,5,7]
                        console.log('jogou no meio');
                    }
                    else{

                        if (tabuleiro[0] == "X" && tabuleiro[5] == "X") {
                            jogadas = [2];
                        }
                        if (tabuleiro[2] == "X" && tabuleiro[7] == "X") {
                            jogadas = [8];
                        }
                        if (tabuleiro[8] == "X" && tabuleiro[3] == "X") {
                            jogadas = [6];
                        }
                        if (tabuleiro[6] == "X" && tabuleiro[1] == "X") {
                            jogadas = [0];
                        }
                        //==========
                        if (tabuleiro[0] == "X" && tabuleiro[7] == "X") {
                            jogadas = [6];
                        }
                        if (tabuleiro[2] == "X" && tabuleiro[3] == "X") {
                            jogadas = [0];
                        }
                        if (tabuleiro[8] == "X" && tabuleiro[1] == "X") {
                            jogadas = [2];
                        }
                        if (tabuleiro[6] == "X" && tabuleiro[5] == "X") {
                            jogadas = [8];
                        }
                        
                        console.log('jogou no canto');
                    }
                }
                else{
                    jogadas = [0,2,6,8]
                    console.log('jogou no canto');
                }

                let test=0
                jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
                while (tabuleiro[jogada] != '') {
                    jogada = jogadas[Math.ceil(Math.random() * (jogadas.length - 1))]
                    if (test > 3) {
                        jogada = jogarfacil()
                        console.log('jogou facil');
                        break
                    }
                    test += 1
                }
            }      
    }
    return jogada
}

function computador() {
    let jogada = -1
    let primeiraJogada = 1
    
    if (simbolo.playerAtual == 1) {
        if (dificuldade == 0) { // facil
            jogada = jogarfacil()
        }
        if (dificuldade == 1) { // medio
            jogada = jogarDificil(0)
        }
        if(dificuldade == 2){ // dificil
            jogada = jogarDificil(1)
        }
        if (dificuldade == 3) {
            jogada = jogarImpossivel()
        }
        primeiraJogada += 1
        setTimeout(() => {
            fazerJogar(jogada); 
        }, 120);
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
    
// import * as jogoDaVelha from '../JogoDaVelha.js'

var botao_Menu
var listaMenu
var temaClaroEscuro
var dificuldadeDoJogo
var modo_de_jogo

function iniciar_menu() {

    botao_Menu = document.getElementById('caixa_icone_menu')
    temaClaroEscuro = document.getElementById('tema')
    listaMenu = document.getElementById('lista_menu')
    dificuldadeDoJogo = document.getElementById("dificuldade")
    modo_de_jogo = document.getElementById('modo_de_jogo')

    temaClaroEscuro.addEventListener('click', Mudar_tema)
    botao_Menu.addEventListener('click', abrir_menu)
    dificuldadeDoJogo.addEventListener('click', mudarDificuldade)
    modo_de_jogo.addEventListener('click', modoDeJogo)
    

}

function abrir_menu() {
    pause = 0

    let blur
    if (window.innerHeight > window.innerWidth) {
        blur = window.innerWidth
    }
    else{
        blur = window.innerHeight
    }

    console.log('abriu');
    caixa_principal.style.filter = ' blur('+ blur*0.04 +'px)'
    listaMenu.style.visibility = 'visible'


    let painelEscuro = document.createElement('div')
    painelEscuro.id = 'painel_escuro'
    document.body.appendChild(painelEscuro)
    // painelEscuro.addEventListener('click', fechar_menu)



    botao_Menu.removeEventListener('click', abrir_menu)
    botao_Menu.addEventListener('click', fechar_menu)
}

function fechar_menu(){
    pause = 1

    console.log('fechou 4')
    caixa_principal.style.filter = 'blur(0px)'
    listaMenu.style.visibility = 'hidden'
    document.getElementById('painel_escuro').remove()
    botao_Menu.removeEventListener('click', fechar_menu)
    botao_Menu.addEventListener('click', abrir_menu)

}

function modoDeJogo() {
    console.log('modo de jogo', jogarContraPC);
    if(jogarContraPC == 0){
        jogarContraPC = 1
        modo_de_jogo.textContent = 'Modo de jogo: Singleplayer'
    }
    else{
        jogarContraPC = 0
        modo_de_jogo.textContent = 'Modo de jogo: Multplayer'
    }
    reiniciar()
}

function Mudar_tema() {
    if (tema == 0) {
        document.body.style.backgroundColor = '#333333'
        caixa_do_game.style.backgroundColor = '#555555'
        caixa_do_game.style.border = '0.8vw solid #555555'
        
        
        
        try {
            document.querySelector('#caixa_botao_reiniciar > button').style.backgroundColor = '#959595'
        } catch (error) {
        }
        
        
        document.getElementById('barra1').style.backgroundColor = '#ffffff'
        document.getElementById('barra2').style.backgroundColor = '#ffffff'
        document.getElementById('barra3').style.backgroundColor = '#ffffff'
        document.getElementById('tema').textContent = 'Tema: Claro'
        
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).style.backgroundColor = '#959595'
        }

        tema = 1
    }else{
        document.body.style.backgroundColor = '#f1f9ff'
        caixa_do_game.style.backgroundColor = '#354b5a'
        caixa_do_game.style.border = '0.8vw solid #354b5a'

        try {
            document.querySelector('#caixa_botao_reiniciar > button').style.backgroundColor = '#4c687a'
        } catch (error) {
            
        }

        document.getElementById('barra1').style.backgroundColor = '#354b5a'
        document.getElementById('barra2').style.backgroundColor = '#354b5a'
        document.getElementById('barra3').style.backgroundColor = '#354b5a'
        document.getElementById('tema').textContent = 'Tema: Escuro'
        
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).style.backgroundColor = '#4c687a'
        }

        tema = 0 
    }
    console.log('tema'); 
}

function mudarDificuldade(){
    dificuldade+=1
    if (dificuldade == 4) {
        dificuldade = 0
    }
    console.log("mudou para", dificuldade);
    if (dificuldade == 0) {
        dificuldadeDoJogo.textContent = "Dificuldade: Facil"
    }
    if (dificuldade == 1) {
        dificuldadeDoJogo.textContent = "Dificuldade: Médio"
    }
    if (dificuldade == 2) {
        dificuldadeDoJogo.textContent = "Dificuldade: Difícil"
    }
    if (dificuldade == 3) {
        dificuldadeDoJogo.textContent = "Dificuldade: Impossível"
    }
}
    
   
    
    