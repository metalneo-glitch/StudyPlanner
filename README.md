# Study Planner

Un'applicazione HTML/JavaScript standalone per pianificare e monitorare lo studio di più materie in vista di una data di esame.
Il mio tipo di studi presenta un certo numero di lezioni per ogni materia e mediamente io riesco a fare 3 capitoli al giorno quando vado veloce.
É un valore mediano che può essere molto maggiore per materie leggere o solo una per materie che richiedono un impegno maggiore.

## Funzionalità principali

- **Gestione di due materie di studio**
  - Imposta nome, numero totale di lezioni e lezioni già completate.
- **Pianificazione automatica**
  - Calcola e visualizza quante lezioni studiare ogni giorno fino alla data di fine impostata.
- **Personalizzazione**
  - Numero di lezioni giornaliere configurabile (default 3).
  - Aggiornamento dinamico della tabella di marcia.
- **Salvataggio configurazioni**
  - Esporta e importa file `.json` con le impostazioni e lo stato di avanzamento.
  - Possibilità di attivare il salvataggio automatico.
- **Interfaccia moderna**
  - Tema scuro con card, pulsanti e layout responsive.

## Utilizzo

1. Apri il file `calendario.html` in un browser moderno.
2. Imposta le tue materie e parametri nello spazio **Impostazioni**.
3. Inserisci le ultime lezioni completate nella sezione **Progressi**.
4. Premi **Aggiorna** per generare il piano di studio.
5. Usa **Salva configurazione** per esportare un file `.json` da caricare su altri dispositivi o sessioni successive.

## Esempio di configurazione esportata

```json
{
  "currentDate": "2025-11-25",
  "subject1Name": "Statistica",
  "subject1Lessons": 72,
  "lastLesson1": 13,
  "subject2Name": "Automatica",
  "subject2Lessons": 72,
  "lastLesson2": 20,
  "lessonsPerDay": 3,
  "endDate": "2025-02-12"
}
