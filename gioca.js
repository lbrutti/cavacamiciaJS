function gioca(p1 = [], p2 = [], banco = [], turno = 0, residuo = 1) {
    //caso base: mi fermo quando il giocatore in turno non ha piu' carte
    if (p1.length == 0) {
        p2 = p2.concat(banco);
        console.log("p1 = ", p1.toString());
        console.log("p2 = ", p2.toString());

        return "fine";
    }
    //passo: faccio le giocate
    if (residuo == 0) {
        p2 = p2.concat(banco);
        console.log("lo p2 prende il banco :", banco.toString());

        return gioca(p2, p1, [], turno++);
    }
    //p1 estrae prima carta dal mazzo e la mette nel banco
    let carta = p1.shift();
    banco.push(carta); //appendo in coda in modo che banco sia uno stack FIFO
    //se p1 ha appena giocato una carta potente 
    //il turno passa a p2 che deve scartare "carta" carte
    if (carta == 1 || carta == 2 || carta == 3) {
        return gioca(p2, p1, banco, turno, carta);
    }
    //se ho estratto una carta neutra
    else {
        //se non devo piu' estrarre carte -> p2 fa la presa e gioca
        if (residuo == 0) {
            console.log("qui non arriva mai");

            //p2 ruba il mazzo dal banco
            p2 = p2.concat(banco);
            // p1 inizia nuova giocata
            return gioca(p2, p1, [], turno++, 1);
        } else {
            //se devo ancora buttare carte passa la mano a p2
            //decrementando il residuo
            return gioca(p1, p2, banco, turno, --residuo);
        }
    }

}

let res = gioca([1, 0, 0], [0, 2, 0]);
console.log(res);