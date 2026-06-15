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
const libri = [
  new LibroDigitale("Il nome della rosa", "Umberto Eco", 1980, true, "digitale", 2.4),
  new LibroDigitale("1984", "George Orwell", 1949, true, "digitale", 1.1),
  new Libro("Il Signore degli Anelli", "J.R.R. Tolkien", 1954, true),
  new LibroDigitale("Harry Potter e la pietra filosofale", "J.K. Rowling", 1997, false, "digitale", 3.2),
  new Libro("Orgoglio e pregiudizio", "Jane Austen", 1813, false),
  new LibroDigitale("Il Grande Gatsby", "F. Scott Fitzgerald", 1925, true, "digitale", 0.8),
  new Libro("Delitto e castigo", "Fyodor Dostoevsky", 1866, false),
  new LibroDigitale("Il Conte di Montecristo", "Alexandre Dumas", 1844, false, "digitale", 5.7),
  new Libro("Don Chisciotte", "Miguel de Cervantes", 1605, true),
  new LibroDigitale("La metamorfosi", "Franz Kafka", 1915, true, "digitale", 0.5),
];

// === Render ===
function renderLibri() {
    const ul = document.getElementById("lista-libri"); // creare la "libreria"
    ul.innerHTML = ""; // per svuotare il contenuto, per partire "puliti"

    libri.forEach((libri) {
        const li = document.createElement("li"); // crea un li per ogni libro

        const titolo = document.createElement("strong"); // per avere il titolo in grassetto
        titolo.textContent = `${libro.titolo} - ${libro.autore} - ${libro.anno}`;

        const formato = document.createElement("em") // il testo del formato apparirà in corsivo
        if (libro instanceof LibroDigitale) {
            formato.textContent = `digitale - ${libro.dimensioneMb} MB`;
        } else {
            formato.textContent = "cartaceo";
        }

        const stato = document.createElement("span");
        stato.textContent = libro.letto ? "✓ Letto" : "✗ Non letto";
        
        const bottone = document.createElement("button");
        bottone.textContent = "Segna come letto";
        bottone.dataset.id = libro.id;  // data-id serve per l'event delegation

        li.appendChild(titolo);   // aggiungi <strong> dentro <li>
        li.appendChild(formato);  // aggiungi <em> dentro <li>
        li.appendChild(stato);    // aggiungi <span> dentro <li>
        li.appendChild(bottone);  // aggiungi <button> dentro <li>

        ul.appendChild(li);       // aggiungi <li> dentro <ul>
    });
}

renderLibri();

// === Eventi ===
