import { useState, useRef, useEffect } from "react";
import "./App.css";
import { UserRoundPlus, Pencil, Trash2, Check, X } from "lucide-react";

const regexNome = /^[\p{L}\s'-]+$/u;
const regexRuolo = /\p{L}/u;

function App(){
  const [dipendenti, setDipendenti] = useState([
    { id: 1, nome: "Marco", ruolo: "Developer", stipendio: 1800 },
    { id: 2, nome: "Giulia", ruolo: "Designer", stipendio: 1700 },
    { id: 3, nome: "Luca", ruolo: "Manager", stipendio: 2500 },
    { id: 4, nome: "Sara", ruolo: "Developer", stipendio: 1900 }
  ]);

  const [dipendentiTemporanei, setDipendentiTemporanei] = useState({});

  const [errore, setErrore] = useState({});

  const [successo, setSuccesso] = useState({});

  const timerSuccesso = useRef({});

  const [aggiuntaDipendente, setAggiuntaDipendente] = useState(false);

  const [nuovoDipendente, setNuovoDipendente] = useState({
    nome: "",
    ruolo: "",
    stipendio: ""
  });

  const [dipendenteDaEliminare, setDipendenteDaEliminare] = useState(null);

  const pulsanteAperturaModaleRef = useRef(null);
  const pulsanteAggiungiRef = useRef(null);
  const titoloRef = useRef(null);

  const modificaDipendenti = (idDipendente) => {
    const dipendenteDaModificare = dipendenti.find(({id}) => id === idDipendente);
    setDipendentiTemporanei(prev => {
      return {
        ...prev,
        [idDipendente] : dipendenteDaModificare
      }
    })

    clearTimeout(timerSuccesso.current[idDipendente]);
    delete timerSuccesso.current[idDipendente];
    setSuccesso(prev => {
      const {[idDipendente]:messaggioEscluso, ...altriMessaggi} = prev;
      return altriMessaggi;
    })
  }

  const annullaModifica = (idDipendente) => {
    setDipendentiTemporanei(prev => {
      const {[idDipendente]:dipendenteEscluso, ...resto} = prev;
      return resto;
    });
    
    setErrore(prev => {
      const {[idDipendente]:erroreDipendente, ...erroriAltriDipendenti} = prev;
      return erroriAltriDipendenti;
    });
  }

  const salvaDipendente = (e, idDipendente) => {
    e.preventDefault();
    
    const erroriDipendente = {};

    if(!regexNome.test(dipendentiTemporanei[idDipendente].nome.trim())){
      erroriDipendente.erroreNome = "Inserisci un nome valido."
    }

    if(!regexRuolo.test(dipendentiTemporanei[idDipendente].ruolo.trim())){
      erroriDipendente.erroreRuolo = "Inserisci un ruolo valido."
    }

    if(dipendentiTemporanei[idDipendente].stipendio <= 0 || !Number.isFinite(dipendentiTemporanei[idDipendente].stipendio)){
      erroriDipendente.erroreStipendio = "Inserisci uno stipendio valido."
    }

    if(Object.keys(erroriDipendente).length > 0) {
      setErrore(prev => {
        return {
          ...prev,
          [idDipendente]: erroriDipendente
        }
      })
      return;
    }

    setDipendenti(prev => {
      return prev.map(dipendente => {
        if(dipendente.id === idDipendente){
          return dipendentiTemporanei[idDipendente]
        }
        return dipendente;
      })
    })

    setErrore(prev => {
      const {[idDipendente]:erroreDipendente, ...erroriAltriDipendenti} = prev;
      return erroriAltriDipendenti;
    });

    setDipendentiTemporanei(prev => {
      const {[idDipendente]:dipendenteEscluso, ...resto} = prev;
      return resto;
    })

    setSuccesso(prev => {
      return {
        ...prev,
      [idDipendente] : "Dati salvati correttamente."
      }
    })

    clearTimeout(timerSuccesso.current[idDipendente]);

    timerSuccesso.current[idDipendente] = setTimeout(() => {
      setSuccesso(prev => {
        const {[idDipendente]:messaggioEscluso, ...altriMessaggi} = prev;
        return altriMessaggi;
      })

      delete timerSuccesso.current[idDipendente];
    }, 2000);
  }

  const numeroDipendenti = dipendenti.length;
  const numeroDipendentiInModifica = Object.keys(dipendentiTemporanei).length;

  const aggiungiNuovoDipendente = (e) => {
    e.preventDefault();

    const erroriAggiuntaDipendente = {};

    const idDipendenti = dipendenti.map(({id}) => id);
    const idNuovoDipendente = dipendenti.length > 0 ? Math.max(...idDipendenti) + 1 : 1;

    const dipendenteGiaPresente = dipendenti.some(({nome, ruolo}) => nome.trim().toLowerCase() === nuovoDipendente.nome.trim().toLocaleLowerCase() && ruolo.trim().toLowerCase() === nuovoDipendente.ruolo.trim().toLowerCase());

    if(dipendenteGiaPresente){
      erroriAggiuntaDipendente.erroreGiaPresente = "Dipendente già presente per il ruolo indicato."
    }

    if(!regexNome.test(nuovoDipendente.nome.trim())){
      erroriAggiuntaDipendente.erroreNome = "Inserisci un nome valido.";
    }

    if(!regexRuolo.test(nuovoDipendente.ruolo.trim())){
      erroriAggiuntaDipendente.erroreRuolo = "Inserisci un ruolo valido.";
    }

    if(nuovoDipendente.stipendio <= 0 || !Number.isFinite(nuovoDipendente.stipendio)){
      erroriAggiuntaDipendente.erroreStipendio = "Inserisci uno stipendio valido."
    }
    
    if(Object.keys(erroriAggiuntaDipendente).length > 0) {
      setErrore(prev => {
        return{
          ...prev,
          erroriAggiuntaDipendente
        }
      })
      return;
    }

    const nomeNuovoDipendente = nuovoDipendente.nome.charAt(0).toUpperCase() + nuovoDipendente.nome.slice(1);
    const ruoloNuovoDipendente = nuovoDipendente.ruolo.charAt(0).toUpperCase() + nuovoDipendente.ruolo.slice(1);

    setDipendenti(prev => {
      return [...prev, {
        id: idNuovoDipendente,
        nome: nomeNuovoDipendente,
        ruolo: ruoloNuovoDipendente,
        stipendio: nuovoDipendente.stipendio
      }]
    })

    setSuccesso(prev => {
      return {
        ...prev,
        aggiunta: "Dipendente aggiunto correttamente."
      }
    });

    clearTimeout(timerSuccesso.current.aggiunta);

    timerSuccesso.current.aggiunta = setTimeout(() => {
      setSuccesso(prev => {
        const {aggiunta:messaggioEscluso, ...altriMessaggi} = prev;
        return altriMessaggi;
      })

      delete timerSuccesso.current.aggiunta;
    }, 2000);

    setAggiuntaDipendente(false);

    setNuovoDipendente({
      nome: "",
      ruolo: "",
      stipendio: ""
    })

    setErrore(prev => {
      const {erroriAggiuntaDipendente:erroreEscluso, ...altriMessaggi} = prev;
      return altriMessaggi;
    })
  }

  const annullaAggiuntaDipendente = () => {
    setAggiuntaDipendente(false);
    
    setNuovoDipendente({
      nome: "",
      ruolo: "",
      stipendio: ""
    })
    
    setErrore(prev => {
      const {erroriAggiuntaDipendente:erroreEscluso, ...altriMessaggi} = prev;
      return altriMessaggi;
    })
  }

  const apriModaleEliminazione = (idDipendente, pulsante) => {
    pulsanteAperturaModaleRef.current = pulsante;
    setDipendenteDaEliminare(idDipendente);
  }

  const eliminaDipendente = (idDipendente) => {
    setDipendenti(prev => {
      return prev.filter(({id}) => id !== idDipendente);
    })

    clearTimeout(timerSuccesso.current[idDipendente]);
    delete timerSuccesso.current[idDipendente];

    setSuccesso(prev => {
      const {[idDipendente]:messaggioEscluso, ...altriMessaggi} = prev;
      return altriMessaggi;
    })
  }

  const dipendenteEliminazione = dipendenti.find(({id}) => id === dipendenteDaEliminare);

  const confermaEliminazione = () => {
    eliminaDipendente(dipendenteDaEliminare);
    setDipendenteDaEliminare(null);
    
    requestAnimationFrame(() => {
      if(pulsanteAggiungiRef.current !== null){
        pulsanteAggiungiRef.current.focus();
      }else{
        titoloRef.current?.focus();
      }
    });
  };

  const annullaEliminazione = () => {
    pulsanteAperturaModaleRef.current?.focus();
    setDipendenteDaEliminare(null)
  }

  return (
    <>
    <main className="gestore-dipendenti">
      <h1 ref={titoloRef} tabIndex={-1}>Employee Manager</h1>
      <h3>Gestore dipendenti con modifiche simultanee</h3>
      <div className="dashboard">
        <section className="aggiunta-dipendente">
          <AggiuntaDipendente
            aggiuntaDipendente={aggiuntaDipendente}
            annullaAggiuntaDipendente={annullaAggiuntaDipendente}
            setAggiuntaDipendente={setAggiuntaDipendente}
            nuovoDipendente={nuovoDipendente}
            setNuovoDipendente={setNuovoDipendente}
            aggiungiNuovoDipendente={aggiungiNuovoDipendente}
            pulsanteAggiungiRef={pulsanteAggiungiRef}
            errore={errore}
            successoAggiunta={successo.aggiunta}
          />
        </section>
        <section className="dipendenti">
          <header className="intestazione-dipendenti">
            <h2>Gestione dipendenti</h2>
            <div className="riepilogo-dipendenti">
              <p>Dipendenti: {numeroDipendenti} (in modifica: {numeroDipendentiInModifica})</p>
            </div>
          </header>
          {numeroDipendenti > 0 ?
          <ListaDipendenti
            dipendenti={dipendenti}
            dipendentiTemporanei={dipendentiTemporanei}
            setDipendentiTemporanei={setDipendentiTemporanei}
            modificaDipendenti={modificaDipendenti}
            annullaModifica={annullaModifica}
            salvaDipendente={salvaDipendente}
            apriModaleEliminazione={apriModaleEliminazione}
            errore={errore}
            successo={successo}
          />
          :
          <p>Non ci sono dipendenti.</p>
          }
        </section>
      </div>
    </main>
    {dipendenteEliminazione && (
      <ModaleEliminazione
        dipendenteEliminazione={dipendenteEliminazione}
        confermaEliminazione={confermaEliminazione}
        annullaEliminazione={annullaEliminazione}
      />
    )}
    </>
  )
}

function ListaDipendenti({dipendenti, dipendentiTemporanei, setDipendentiTemporanei, modificaDipendenti, annullaModifica, salvaDipendente, apriModaleEliminazione, errore, successo}){
  return(
    dipendenti.map(dipendente => {
      return(
        <Dipendente key={dipendente.id}
          dipendente={dipendente}
          dipendentiTemporanei={dipendentiTemporanei}
          setDipendentiTemporanei={setDipendentiTemporanei}
          modificaDipendenti={modificaDipendenti}
          annullaModifica={annullaModifica}
          salvaDipendente={salvaDipendente}
          apriModaleEliminazione={apriModaleEliminazione}
          errore={errore}
          successo={successo}
        />
      )
    })
  )
}

function Dipendente({dipendente, dipendentiTemporanei, setDipendentiTemporanei, modificaDipendenti, annullaModifica, salvaDipendente, apriModaleEliminazione, errore, successo}){
  return(
    <div className="dipendente">
    {dipendentiTemporanei[dipendente.id] ?
      <div className="modifica-dipendente">
        <h4>Modifica dipendente</h4>
        <form onSubmit={(e) => salvaDipendente(e, dipendente.id)}>
          <label>Nome
            <input
              value={dipendentiTemporanei[dipendente.id].nome}
              onChange={(e) => setDipendentiTemporanei(prev => ({
                ...prev,
                [dipendente.id]: {
                  ...prev[dipendente.id],
                  nome: e.target.value
                }
              }))} />
          </label>
          <label>Ruolo
            <input
              value={dipendentiTemporanei[dipendente.id].ruolo}
              onChange={(e) => setDipendentiTemporanei(prev => ({
                ...prev,
                [dipendente.id]:{
                  ...prev[dipendente.id],
                  ruolo: e.target.value
                }
              }))}
            />
          </label>
          <label>Stipendio (€)
            <input
              type="number"
              value={dipendentiTemporanei[dipendente.id].stipendio}
              onChange={(e) => setDipendentiTemporanei(prev => ({
                ...prev,
                [dipendente.id]:{
                  ...prev[dipendente.id],
                  stipendio: e.target.value === "" ? "" : Number(e.target.value)
                }
              }))}
            />
          </label>
          <div className="azioni">
            <button className="salva" type="submit"><Check size={14} />Salva</button>
            <button type="button" onClick={() => annullaModifica(dipendente.id)}><X size={14} />Annulla</button>
          </div>
        </form>
        {errore[dipendente.id]?.erroreNome &&
          <p className="errore">{errore[dipendente.id]?.erroreNome}</p>
        }
        {errore[dipendente.id]?.erroreRuolo &&
          <p className="errore">{errore[dipendente.id]?.erroreRuolo}</p>
        }
        {errore[dipendente.id]?.erroreStipendio &&
          <p className="errore">{errore[dipendente.id]?.erroreStipendio}</p>
        }
      </div>
      :
      <>
      <div className="info-dipendente">
        <h2>{dipendente.nome}</h2>
        <p>{dipendente.ruolo} • {dipendente.stipendio} €</p>
      </div>
      <div className="azioni">
        <button className="modifica" onClick={() => modificaDipendenti(dipendente.id)}><Pencil size={14} />Modifica</button>
        <button className="elimina" onClick={(e) => apriModaleEliminazione(dipendente.id, e.currentTarget)}><Trash2 size={14} />Elimina</button>
      </div>
      </>
    }
    {successo[dipendente.id] && <p className="successo">{successo[dipendente.id]}</p>}
    </div>
  )
}

function AggiuntaDipendente({aggiuntaDipendente, annullaAggiuntaDipendente, setAggiuntaDipendente, nuovoDipendente, setNuovoDipendente, aggiungiNuovoDipendente, pulsanteAggiungiRef, errore, successoAggiunta}){
  return(
    aggiuntaDipendente ?
    <div className="aggiungi-dipendente">
      <h4>Aggiungi dipendente</h4>
      <form onSubmit={aggiungiNuovoDipendente}>
        <label>Nome
          <input value={nuovoDipendente.nome} onChange={(e) => setNuovoDipendente(prev => ({...prev, nome: e.target.value}))} />
        </label>
        <label>Ruolo
          <input value={nuovoDipendente.ruolo} onChange={(e) => setNuovoDipendente(prev => ({...prev, ruolo: e.target.value}))} />
        </label>
        <label>Stipendio (€)
          <input type="number" value={nuovoDipendente.stipendio} onChange={(e) => setNuovoDipendente(prev => ({...prev, stipendio: e.target.value === "" ? "" : Number(e.target.value)}))} />
        </label>
        <div className="azioni">
          <button className="aggiungi" type="submit"><Check size={14} />Aggiungi</button>
          <button type="button" onClick={annullaAggiuntaDipendente}><X size={14} />Annulla</button>
        </div>
      </form>
      {errore.erroriAggiuntaDipendente?.erroreGiaPresente &&
        <p className="errore">{errore.erroriAggiuntaDipendente?.erroreGiaPresente}</p>
      }
      {
        errore.erroriAggiuntaDipendente?.erroreNome &&
        <p className="errore">{errore.erroriAggiuntaDipendente?.erroreNome}</p>
      }
      {
        errore.erroriAggiuntaDipendente?.erroreRuolo &&
        <p className="errore">{errore.erroriAggiuntaDipendente?.erroreRuolo}</p>
      }
      {
        errore.erroriAggiuntaDipendente?.erroreStipendio &&
        <p className="errore">{errore.erroriAggiuntaDipendente?.erroreStipendio}</p>
      }
    </div>
    :    
    <div className="barra-aggiunta">
      <div className="info-aggiunta">
        <h2>Nuovo dipendente</h2>
        {successoAggiunta ? (
          <p className="successo" role="status">
            <Check size={16} aria-hidden="true" />
            {successoAggiunta}
          </p>
        ) : (
          <p>Inserisci una nuova persona nel team</p>
        )}
      </div>

      <button
        className="aggiungi"
        ref={pulsanteAggiungiRef}
        onClick={() => setAggiuntaDipendente(true)}
      >
        <UserRoundPlus size={20} />
        Aggiungi dipendente
      </button>
    </div>
  )
}

function ModaleEliminazione({dipendenteEliminazione, confermaEliminazione, annullaEliminazione}){
  
  const pulsanteAnnullaRef = useRef(null);
  const pulsanteEliminaRef = useRef(null);
  
  useEffect(() => {
    pulsanteAnnullaRef.current.focus();

    const gestisciTastiera = (e) => {
      if (e.key === "Escape") {
        annullaEliminazione();
      }
      
      if(e.key === "Tab" && !e.shiftKey && document.activeElement === pulsanteAnnullaRef.current){
        e.preventDefault();
        pulsanteEliminaRef.current.focus();
      }

      if(e.key === "Tab" && e.shiftKey && document.activeElement === pulsanteEliminaRef.current){
        e.preventDefault();
        pulsanteAnnullaRef.current.focus();
      }
    };

    document.addEventListener("keydown", gestisciTastiera);

    return () => {
      document.removeEventListener("keydown", gestisciTastiera);
    };
  }, [annullaEliminazione]);
  
  return(
    <div className="modale-eliminazione" role="dialog" aria-modal="true" aria-labelledby="titolo-eliminazione" aria-describedby="descrizione-eliminazione">
      <div className="modale-eliminazione-info">
        <p id="titolo-eliminazione">Eliminare il dipendente <b>{dipendenteEliminazione.nome}</b>?</p>
        <p id="descrizione-eliminazione">Questa operazione non può essere annullata.</p>
        <div className="azioni">
          <button className="elimina" ref={pulsanteEliminaRef} onClick={confermaEliminazione}>Elimina</button>
          <button className="annulla" ref={pulsanteAnnullaRef} onClick={annullaEliminazione}>Annulla</button>
        </div>
      </div>
    </div>
  )
}

export default App;