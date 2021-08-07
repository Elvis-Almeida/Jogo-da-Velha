import * as jogoDaVelha from './JogoDaVelha.js'

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


    botao_Menu.removeEventListener('click', abrir_menu)
    botao_Menu.addEventListener('click', fechar_menu)
}

function fechar_menu(){
    pause = 1

    console.log('fechou')
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
    fechar_menu()   
}

function mudarDificuldade(){
    dificuldade+=1
    if (dificuldade == 3) {
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
}


iniciar_menu();
