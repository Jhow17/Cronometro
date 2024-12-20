const icone = document.querySelector('#icone-play');
const button = document.querySelector('#play');
const display = document.querySelector('#timer')
let iniciado = false
var mili = 0
let temporizador

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

button.addEventListener('click', iniciarParar)
function iniciarParar (){

    if (iniciado){
        // clear interva se ele limpa nao deveria tambem apagar o valor porque ele volta de onde parou
        clearInterval(temporizador)
        escreveTempo(mili)
    }
    else{
        temporizador = setInterval( () =>{
            mili++
            escreveTempo(mili)
        }
        ,10)
        icone.classList.toggle('bi-play')
        icone.classList.toggle('bi-pause') 
    }
    iniciado = !iniciado
}

function escreveTempo (tempo) {
    display.innerText = formataTime(tempo)
}
