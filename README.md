# Study Planner

Un'applicazione HTML/JavaScript standalone per pianificare e monitorare lo studio di più materie in vista di una data di esame.
É basato sul mio ritmo di studio di due materie a sessione, e considero un ritmo sostenuto quello di 3 capitoli al giorno (mediamente). La data finale la metto qualche giorno prima dell'esame in modo da dedicare gli ultimi giorni al ripasso.

## Funzionalità principali

- **Gestione di due materie di studio**
  - Imposta nome, numero totale di lezioni e lezioni già completate.
- **Pianificazione automatica**
  - Calcola e visualizza quante lezioni studiare ogni giorno (e su quale giorno) fino alla data di fine impostata.
- **Personalizzazione**
  - Numero di lezioni giornaliere configurabile (default 3).
  - Aggiornamento dinamico della tabella di marcia.
- **Salvataggio configurazioni**
  - Esporta e importa file `.json` con le impostazioni e lo stato di avanzamento.
  - Possibilità di attivare il salvataggio automatico.
- **Interfaccia moderna**
  - Tema scuro con card, pulsanti, layout e riposta immediata ad ogni azione.

## Utilizzo

1. Aprire il file `index.html`
2. Impostare materie e parametri nello spazio **Impostazioni**.
3. Inserire/aggiornare l'ultimo capitolo completato nella sezione **Progressi**.
4. Con **Salva configurazione** si esporta in un file `.json` da caricare su altri dispositivi o sessioni successive.

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
```