# EmployeeManager

**EmployeeManager** è un'applicazione web sviluppata con React e JavaScript che permette di gestire un elenco di dipendenti attraverso un'interfaccia intuitiva, responsive e accessibile.

Il progetto nasce come esercitazione pratica per approfondire lo sviluppo di applicazioni React, la gestione dello stato, la validazione dei dati e l'interazione con l'utente.

## Funzionalità

### Gestione dei dipendenti
- Visualizzazione dell'elenco dei dipendenti.
- Aggiunta di nuovi dipendenti.
- Modifica dei dati dei dipendenti esistenti.
- Modifica simultanea di più dipendenti, con gestione indipendente dei dati temporanei.
- Eliminazione dei dipendenti tramite finestra di conferma.
- Riepilogo dinamico del numero totale di dipendenti e di quelli attualmente in modifica.

### Validazione e feedback
- Validazione dei campi prima del salvataggio.
- Controllo dei valori inseriti e degli eventuali duplicati.
- Visualizzazione di messaggi di errore contestuali.
- Messaggi di successo temporanei dopo le operazioni.
- Possibilità di annullare le modifiche non salvate.

### Interfaccia e accessibilità
- Layout responsive per desktop, tablet e smartphone.
- Icone integrate tramite Lucide React.
- Gestione del focus durante le interazioni.
- Finestra modale con supporto alla tastiera e chiusura tramite `Escape`.
- Utilizzo di elementi HTML semantici e attributi di accessibilità.

## Tecnologie utilizzate

- **React** — sviluppo dell'interfaccia tramite componenti.
- **JavaScript (ES6+)** — logica applicativa e gestione dei dati.
- **Vite** — ambiente di sviluppo e build.
- **CSS3** — layout, responsive design e animazioni.
- **Lucide React** — libreria di icone.
- **ESLint** — analisi statica del codice.

## Installazione

Clona il repository e accedi alla cartella del progetto:

```bash
git clone https://github.com/FrancescoAntonioR/EmployeeManager.git
cd EmployeeManager
```

Installa le dipendenze:

```bash
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri nel browser l'indirizzo indicato da Vite.

## Comandi disponibili

| Comando | Descrizione |
|---|---|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run lint` | Esegue i controlli ESLint |
| `npm run build` | Genera la build di produzione |
| `npm run preview` | Visualizza in locale la build di produzione |

## Evoluzione del progetto

### v1.0.0 — Prima versione
Realizzazione della struttura iniziale dell'applicazione e delle funzionalità fondamentali per la gestione dei dipendenti.

### v2.0.0 — Evoluzione dell'applicazione
- Miglioramento della gestione delle modifiche simultanee.
- Introduzione della validazione dei dati.
- Gestione dei messaggi di errore e successo.
- Conferma dell'eliminazione tramite modale.
- Miglioramenti all'accessibilità e alla gestione del focus.
- Riprogettazione dell'interfaccia e del layout responsive.
- Integrazione delle icone Lucide.
- Refactoring del CSS e miglioramento dell'organizzazione del codice.

## Obiettivi didattici

Il progetto è stato sviluppato per consolidare le conoscenze di React e JavaScript, con particolare attenzione a:

- Componenti React e passaggio delle props.
- Gestione dello stato tramite `useState`.
- Utilizzo di `useEffect` e `useRef`.
- Rendering condizionale e gestione degli eventi.
- Aggiornamento immutabile di array e oggetti.
- Gestione dei form controllati.
- Validazione degli input.
- Accessibilità e interazioni da tastiera.
- Organizzazione e manutenzione del CSS.
