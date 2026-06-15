// Mini-libreria — Settimana VII Giorno I
//
// Devi fare 4 cose:
// 1. Definire una classe Libro (titolo, autore, anno, letto)
// 2. Definire una classe LibroDigitale che estende Libro (aggiunge formato, dimensioneMb)
// 3. Aggiungere un listener al form che crea una nuova istanza e la aggiunge all'array
// 4. Renderizzare la lista nel <ul id="lista-libri"> via innerHTML
//
// Bonus: bottone "Segna come letto" su ogni elemento, gestito con event delegation.

// === Classi ===
class Libro {
  static contatore = 0;
  constructor(_titolo, _autore, _anno, _letto) {
    this.id = Libro.contatore++;
    this.titolo = _titolo;
    this.autore = _autore;
    this.anno = _anno;
    this.letto = false;
  }

  segnaComeLetto() {
    this.letto = true;
  }

  formato() {
    this.type = "cartaceo";
  }
}

class LibroDigitale extends Libro {
  constructor(_titolo, _autore, _anno, _letto, _formato, _dimensioneMb) {
    super(_titolo, _autore, _anno, _letto);
    this.formato = _formato;
    this.dimensioneMb = _dimensioneMb;
  }

  formato() {
    // per fare override
    this.type = `digitale (${this.dimensioneMb} MB)`;
  }
}

// === Stato (array di libri) ===
const libri = [];

// === Render ===
function renderLibri() {
  const ul = document.getElementById("lista-libri"); // creare la "libreria"
  ul.innerHTML = ""; // per svuotare il contenuto, per partire "puliti"

  const contatore = document.getElementById("contatore");
  contatore.textContent = libri.length;

  libri.forEach((libro) => {
    const li = document.createElement("li");
    li.classList.add("card-libro");
    li.classList.toggle("letto", libro.letto); // aggiunge classe "letto" se il libro è letto
    li.dataset.id = libro.id;

    // colonna sinistra: titolo + formato + autore/anno
    const info = document.createElement("div");

    const riga1 = document.createElement("div");
    riga1.classList.add("card-riga1");

    const titolo = document.createElement("strong");
    titolo.textContent = libro.titolo;

    const badge = document.createElement("span");
    badge.classList.add("badge");
    if (libro instanceof LibroDigitale) {
      badge.textContent = `digitale (${libro.dimensioneMb} MB)`;
    } else {
      badge.textContent = "cartaceo";
    }

    riga1.appendChild(titolo);
    riga1.appendChild(badge);

    const riga2 = document.createElement("div");
    riga2.classList.add("card-riga2");
    riga2.textContent = `${libro.autore} — ${libro.anno}`;

    info.appendChild(riga1);
    info.appendChild(riga2);

    // colonna destra: stato o bottone
    const azione = document.createElement("div");
    if (libro.letto) {
      const stato = document.createElement("span");
      stato.classList.add("stato-letto");
      stato.textContent = "✓ letto";
      azione.appendChild(stato);
    } else {
      const bottone = document.createElement("button");
      bottone.textContent = "Segna come letto";
      bottone.dataset.azione = "leggi";
      azione.appendChild(bottone);
    }

    li.appendChild(info);
    li.appendChild(azione);
    ul.appendChild(li);
  });
}

renderLibri();

// === Eventi ===
const selectFormato = document.getElementById("formato"); // trova il menu a tendina
const campoDimensione = document.getElementById("campo-dimensione"); // trova il campo MB (che è nascosto)

selectFormato.addEventListener("change", (e) => {
  if (e.target.value === "digitale") {
    campoDimensione.removeAttribute("hidden"); // mostra il campo MB
  } else {
    campoDimensione.setAttribute("hidden", ""); // nasconde il campo MB
  }
});

const form = document.getElementById("aggiungi-libro"); // trova il form

form.addEventListener("submit", (e) => {
  e.preventDefault(); // blocca il ricaricamento della pagina

  // leggo i valori scritti nei campi
  const titolo = document.getElementById("titolo").value;
  const autore = document.getElementById("autore").value;
  const anno = parseInt(document.getElementById("anno").value); // parseInt converte la stringa in numero intero
  const formato = document.getElementById("formato").value;
  const dimensione = parseFloat(document.getElementById("dimensione").value); // parseFloat per numeri con virgola (es. 2.4)

  // creo il libro giusto in base al formato scelto
  let nuovoLibro;
  if (formato === "digitale") {
    nuovoLibro = new LibroDigitale(
      titolo,
      autore,
      anno,
      false,
      formato,
      dimensione,
    );
  } else {
    nuovoLibro = new Libro(titolo, autore, anno, false);
  }

  libri.push(nuovoLibro); // aggiungo il nuovo libro all'array
  renderLibri(); // ridisegno la lista a schermo

  e.target.reset(); // svuota tutti i campi del form
  campoDimensione.setAttribute("hidden", ""); // nasconde di nuovo il campo MB
});

const ul = document.getElementById("lista-libri"); // trova la lista

ul.addEventListener("click", (e) => {
  const bottone = e.target.closest("[data-azione='leggi']"); // hai cliccato il bottone "Segna come letto"?
  if (!bottone) return; // se no, esci subito — hai cliccato altrove

  const card = bottone.closest("li"); // risali al <li> che contiene il bottone
  const id = parseInt(card.dataset.id); // leggi l'id del libro da data-id

  const libro = libri.find((l) => l.id === id); // trova il libro nell'array con quell'id
  libro.segnaComeLetto(); // segna il libro come letto
  renderLibri(); // ridisegna la lista per mostrare la spunta aggiornata
});
