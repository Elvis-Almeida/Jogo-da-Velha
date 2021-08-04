import * as jogoDaVelha from './JogoDaVelha.js'

var botao_Menu
var listaMenu
var multiplayer
var singleplayer
var temaClaroEscuro

function iniciar_menu() {

    botao_Menu = document.getElementById('caixa_icone_menu')
    multiplayer = document.getElementById('multplayer')
    singleplayer = document.getElementById('singleplayer')
    temaClaroEscuro = document.getElementById('tema')
    listaMenu = document.getElementById('lista_menu')

    temaClaroEscuro.addEventListener('click', ()=>{Mudar_tema()})
    singleplayer.addEventListener('click', ()=>{Singleplayer()})
    multiplayer.addEventListener('click', ()=>{Multplayer()})
    botao_Menu.addEventListener('click', ()=>{abrir_menu()})
}

function abrir_menu() {

    let blur
    if (window.innerHeight > window.innerWidth) {
        blur = window.innerWidth
    }
    else{
        blur = window.innerHeight
    }

    caixa_principal.style.filter = ' blur('+ blur*0.04 +'px)'
    listaMenu.style.visibility = 'visible'

    botao_Menu.addEventListener('click', ()=>{fechar_menu()})
}

function fechar_menu(){
    caixa_principal.style.filter = ' blur(0px)'
    listaMenu.style.visibility = 'hidden'
    botao_Menu.addEventListener('click', ()=>{abrir_menu()})

}

function Multplayer() {
    console.log('MULTPLAYER');
    jogarContraPC = 0
    fechar_menu()
}

function Singleplayer() {
    console.log('Singleplayer');
    jogarContraPC = 1
    fechar_menu()
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
        document.getElementById('tema').textContent = 'Tema Claro'
        
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
        document.getElementById('tema').textContent = 'Tema Escuro'
        
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).style.backgroundColor = '#4c687a'
        }

        tema = 0 
    }
    console.log('tema');
    fechar_menu()   
}


iniciar_menu();
