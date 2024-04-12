// JavaScript
document.addEventListener('DOMContentLoaded', (event) => {

    const KontenerGry = document.querySelector(".memory-game");


    let Karty = ["👺", "🤬", "😵", "👀", "😭", "😳", "💖", "🤮", "👺", "🤬", "😵", "👀", "😭", "😳", "💖", "🤮"];

    Karty = Karty.sort(() => 0.5 - Math.random());


    let OdwroconoKarte = false;

    let BlokadaTablicy = false;

    let PierwszaKarta, DrugaKarta;

    let LicznikKlikniec = 0;

    let StartCzasu, KoniecCzasu;


    function OdwracanieKart() {

        if (BlokadaTablicy) return;

        if (this === PierwszaKarta) return;


        this.classList.remove('face-down');

        this.classList.add('flipped');


        LicznikKlikniec++;

        console.log(`Click count: ${LicznikKlikniec}`);


        if (!OdwroconoKarte) {

            OdwroconoKarte = true;

            PierwszaKarta = this;


            if (LicznikKlikniec === 1) {

                StartCzasu = new Date();

                console.log(`Licznik Zaczął: ${StartCzasu}`);

            }


            return;

        }

        DrugaKarta = this;

        checkForMatch();

    }


    function checkForMatch() {

        let CzyJestPoprawnie = PierwszaKarta.dataset.framework === DrugaKarta.dataset.framework;
        

        CzyJestPoprawnie ? disableKarty() : unflipKarty();

    }


    function disableKarty() {

        PierwszaKarta.removeEventListener('click', OdwracanieKart);

        DrugaKarta.removeEventListener('click', OdwracanieKart);

        ResetTablicy();

    }


    function unflipKarty() {

        BlokadaTablicy = true;


        setTimeout(() => {

            PierwszaKarta.classList.remove('flipped');

            DrugaKarta.classList.remove('flipped');

            PierwszaKarta.classList.add('face-down');

            DrugaKarta.classList.add('face-down');

            ResetTablicy();

        }, 1500);

    }

    function ResetTablicy() {

        [OdwroconoKarte, BlokadaTablicy] = [false, false];
    
        [PierwszaKarta, DrugaKarta] = [null, null];
    
    
        if (gameHasEnded()) {
    
            KoniecCzasu = new Date();
    
            let RoznicaCzasu = KoniecCzasu - StartCzasu; // in ms
    
            RoznicaCzasu /= 1000; // strip the ms
    
            let Sekundy = Math.round(RoznicaCzasu);
    
            console.log(`Licznik Skończył Na: ${KoniecCzasu} Cały Czas: ${Sekundy} Sekund`);
    
        }
    
    }

    Karty.forEach(card => {

        let KartaMemory = document.createElement("div");

        KartaMemory.classList.add("memory-card", "face-down");

        KartaMemory.dataset.framework = card;

        KartaMemory.innerHTML = `<span>${card}</span>`;

        KartaMemory.addEventListener('click', OdwracanieKart);

        KontenerGry.appendChild(KartaMemory);

    });

});
