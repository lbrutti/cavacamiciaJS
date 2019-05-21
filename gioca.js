function gioca(iniziatore = [], sfidante = [], banco = [], turno = 0, residuo = 1) {
    //caso base: mi fermo quando il giocatore in turno non ha piu' carte
    if (iniziatore.length == 0) {
        sfidante = sfidante.concat(banco);
        console.log("iniziatore = ", iniziatore.toString());
        console.log("sfidante = ", sfidante.toString());

        return "fine";
    }
    //passo: faccio le giocate
    if (residuo == 0) {
        sfidante = sfidante.concat(banco);
        console.log("lo sfidante prende il banco :", banco.toString());

        return gioca(sfidante, iniziatore, [], turno++);
    }
    //iniziatore estrae prima carta dal mazzo e la mette nel banco
    let carta = iniziatore.shift();
    banco.push(carta); //appendo in coda in modo che banco sia uno stack FIFO
    //se iniziatore ha appena giocato una carta potente 
    //il turno passa a sfidante che deve scartare "carta" carte
    if (carta == 1 || carta == 2 || carta == 3) {
        return gioca(sfidante, iniziatore, banco, turno, carta);
    }
    //se ho estratto una carta neutra
    else {
        //se non devo piu' estrarre carte -> sfidante fa la presa e gioca
        if (residuo == 0) {
            console.log("qui non arriva mai");

            //sfidante ruba il mazzo dal banco
            sfidante = sfidante.concat(banco);
            // iniziatore inizia nuova giocata
            return gioca(sfidante, iniziatore, [], turno++, 1);
        } else {
            //se devo ancora buttare carte passa la mano a sfidante
            //decrementando il residuo
            return gioca(iniziatore, sfidante, banco, turno, --residuo);
        }
    }

}

let res = gioca([1, 0, 0], [0, 2, 0]);
console.log(res);