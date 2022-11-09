let game = {

    modoBloqueio: false,
    primeiroCard: null,
    segundoCard: null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id == id)[0];
        if(card.flipped || this.modoBloqueio){
            return false;
        }
        if(!this.primeiroCard){
            this.primeiroCard = card;
            card.flipped = true;
            return true;
        }else{
            this.segundoCard = card;
            card.flipped = true;
            this.modoBloqueio = true;
            return true;
        }
    },

    checarPar: function(){
        return this.primeiroCard.icone === this.segundoCard.icone;
    },

    resetarPrimeirosegundoCard: function(){
        this.primeiroCard = null;
        this.segundoCard = null;
        this.modoBloqueio = false;
    },

    desvirar: function(){
        this.primeiroCard.flipped = false;
        this.segundoCard.flipped = false;
        this.resetarPrimeirosegundoCard();
    },

    resetarGame: function(){
        return this.cards.filter(card => card.flipped != true).length == 0;
    },

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    
    cards: null,

    criarDadosdosCards: function(){
        this.cards = [];
        this.techs.forEach(tech => {
            this.cards.push(this.criarParDeCards(tech));
        });
        this.cards = this.cards.flatMap(par => par);
        this.embaralharcards();
        return this.cards;
    },
     
    criarParDeCards: function(tech){
        return [{
            id: this.geradorDeId(tech),
            icone: tech,
            flipped: false,
        } , {
            id: this.geradorDeId(tech),
            icone: tech,
            flipped: false,
        }];
    },
     
    geradorDeId: function(tech){
      return tech + Math.floor(Math.random() * 1000);
    },

    embaralharcards: function(){
        let x = this.cards.length;
        let y = 0;
        while(x != 0){
            y = Math.floor(Math.random() * x);
            x--;
            [this.cards[x] , this.cards[y]] = [this.cards[y] , this.cards[x]];
        };
    },

};


