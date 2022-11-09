const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

iniciarGame();
function iniciarGame(){
    criarHtmlDoCard(game.criarDadosdosCards());
};

function criarHtmlDoCard(cards){
    let cardBoard = document.getElementById("card_board");
    cardBoard.innerHTML = "";
    cards.forEach(card => {
        let div = document.createElement("div");
        div.id = card.id;
        div.classList.add(CARD);
        div.dataset.icone = card.icone;
        criarFrenteVersoDoCard(card , div);
        div.addEventListener('click', virar);
        cardBoard.appendChild(div);
    });
};

function criarFrenteVersoDoCard(card, div){
    criarFacesDocard(FRONT, card, div);
    criarFacesDocard(BACK, card, div);
};

function criarFacesDocard(face, card, elemento){
    let divDedentro = document.createElement("div");
    divDedentro.classList.add(face);
    if(face === FRONT){
        let img = document.createElement("img");
        img.classList.add(ICON);
        img.src = "./images/" + card.icone + ".png";
        divDedentro.appendChild(img);
    }else{
        divDedentro.innerHTML = "&lt/&gt";
    }
    elemento.appendChild(divDedentro);
};

function virar(){
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.segundoCard){
            if(game.checarPar()){
                game.resetarPrimeirosegundoCard();
                if(game.resetarGame()){
                    let gameOver = document.getElementById("gameOver");
                    gameOver.style.display = "flex";
                };
            }else{
                setTimeout(()=>{
                    let primeiroCardview = document.getElementById(game.primeiroCard.id);
                    let segundoCardview = document.getElementById(game.segundoCard.id);
                    primeiroCardview.classList.remove("flip");
                    segundoCardview.classList.remove("flip");
                    game.desvirar();
                },1000);
            };
        }; 
    };
};

function resetar(){
    let gameOver = document.getElementById("gameOver");
    gameOver.style.display = "none";
    iniciarGame();
}

document.getElementById("btn").addEventListener("click", resetar);
