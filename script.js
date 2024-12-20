const icone = document.querySelector('#icone-play');
const buttonPlay = document.querySelector('#play');
const buttonReset = document.querySelector('#reset');
const buttonMark = document.querySelector('#mark');
const display = document.querySelector('#timer')
const marksList = document.querySelector('.marks')
var iniciado = false
var mili = 0
var temporizador
var tempos = []

function formataTime (time){
    // tenho que entender melhor essa porra da conversao do tempo
    const hours = Math.floor(time / 360000)
    const minutos = Math.floor(time % 360000  / 6000 )
    const segundos = Math.floor(time % 6000 / 100 ) 
    const centesimos = Math.floor(time % 100)
    // ele so armazena o resto por exemplo ele tranforma o valoe em segundo dividindo por 100 e o que resta sao os centesimos
    // padStart (nomero de digitos, "o que colocar") vai adicionar um zero se onumero for menor que 2 digitos

    return `${hours.toString().padStart(2, "0")} : ${minutos.toString().padStart(2, "0")} : ${segundos.toString().padStart(2, "0")} : ${centesimos.toString().padStart(2, "0")} `


}

function escreveTempo (tempo) {
    display.innerText = formataTime(tempo)
}

function iniciarParar (){
    if (iniciado){
        // clear interva se ele limpa nao deveria tambem apagar o valor porque ele volta de onde parou
        clearInterval(temporizador)
        escreveTempo(mili)
        icone.classList.remove('bi-pause')
        icone.classList.add('bi-play') 
        
    }
    else{
        temporizador = setInterval( () =>{
            mili++
            escreveTempo(mili)
        }
        ,10)
        icone.classList.remove('bi-play')
        icone.classList.add('bi-pause')
    }
    iniciado = !iniciado
}

function restart(){
    mili = 0
    clearInterval(temporizador)
    display.innerText = '00:00:00:00'
    icone.classList.add('bi-play')
    iniciado = false
}
function mark(){
    if (tempos.length < 5){
        clearInterval(temporizador)
        tempos.push(formataTime(mili))
        salva(tempos.length,mili)
    }
    else{
        alert('Você pode salvar no maximo 5 tempos')
    }

}

function salva(idx,temp){
    // se apagar da pra fazer com forEach so adicionando na lista o que da a possibilidade de usar o local storage
    // marksList.innerText = ''
    marksList.innerHTML += `<p> ${idx} | ${formataTime(temp)} </p>`
    
}


buttonPlay.addEventListener('click', iniciarParar)
buttonReset.addEventListener('click', restart)
buttonMark.addEventListener('click', mark)
