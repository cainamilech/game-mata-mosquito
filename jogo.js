var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 2500

var nivel = window.location.search
nivel = nivel.replace('?', '') //replace tira algo, no caso o ? e substitui por algo, no caso nada.

if(nivel === 'normal') {
	criaMosquitoTempo = 2500
} else if(nivel === 'dificil') {
	criaMosquitoTempo = 1000
} else if(nivel === 'profissional') {
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth
}

//variavel pro cronometro, que chama uma função, que decrementa 1 de tempo, a cada 1 segundo
//pra espelhar no html, é usado o id e o innerHTML (que faz entrar na tag do id)
var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0){
		clearInterval(cronometro) //limpa toda essa função e para de decrementar depois que vem a vitoria
		clearInterval(criaMosquito) //limpa a funcao de criar mosquito
		window.location.href = 'vitoria.html' //redireciona pra pagina da vitoria
	}
	else{

	document.getElementById('cronometro').innerHTML = tempo
}
	
}, 1000)

ajustaTamanhoPalcoJogo()

function posicaoRandomica() {

//SE tiver o mosquito, ele remove, porem nao tem AINDA, pq foi feito la embaixo
//mas logo ele vai exitir, entao quando existir, sera removido, assim seguindo a cada tempo determinado la na funcao
//esse if foi feito depois de quase tudo
if(document.getElementById('mosquito')){
	document.getElementById('mosquito').remove()

	if(vidas > 3){
		
	//redirecionar pra outra pagina, quando acaba as vidas
	window.location.href = 'fimdejogo.html'

	//vai adicionando 1 unidade de coração vazio, até ser maior q 3.	
	} else{	
	document.getElementById('v' + vidas).src = "coracao_vazio.png" //troca o src
	vidas ++
	}
}

var posicaoX = Math.floor(Math.random() * largura) - 90
var posicaoY = Math.floor(Math.random() * altura) - 90 //pra nao passa pelo tamanho da img

//como pode dar valor negativo pelo -90 temos que criar uma regra pra nao fugir da tela
posicaoX = posicaoX < 0 ? 0 : posicaoX
posicaoY = posicaoY < 0 ? 0 : posicaoY

console.log(posicaoX, posicaoY)

//criar o elemento html
var mosquito = document.createElement('img')
mosquito.src = 'mosca.png'
mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
//pra chamar uma das classes dos tamanhos dos mosquitos, se tivesse só uma, seria só o nome dela
mosquito.style.left = posicaoX + 'px'
mosquito.style.top = posicaoY + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'mosquito'

//faz remover o elemento(mosquito) e é por isso que no if la de cima, nao adiciona 1 vida, pq o mosquito nao existe, entao nao pode ser removido pra realizar o outro if de adição de vidas
mosquito.onclick = function(){
	this.remove()
}

document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3) //gera um valor aleatorio de 0 a 1, e multiplica, e o floor arredonda

	switch(classe){
		case 0:
		return 'mosquito1'

		case 1:
		return 'mosquito2'

		case 2:
		return 'mosquito3'
	}

}

function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2) //gera um valor aleatorio de 0 a 1, e multiplica, e o floor arredonda
											//sempre arredonda pra baixo, entao vai ter só duas opções 0, ou 1.
	switch(classe){
		case 0:
		return 'ladoA'

		case 1:
		return 'ladoB'
	}
}