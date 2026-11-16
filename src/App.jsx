import { useState } from "react";
import "./App.css";

function App(){
  const [dipendenti, setDipendenti] = useState([
    { id: 1, nome: "Marco", ruolo: "Developer", stipendio: 1800 },
    { id: 2, nome: "Giulia", ruolo: "Designer", stipendio: 1700 },
    { id: 3, nome: "Luca", ruolo: "Manager", stipendio: 2500 },
    { id: 4, nome: "Sara", ruolo: "Developer", stipendio: 1900 }
  ]);

  const [idDipendenteInModifica, setIdDipendenteInModifica] = useState(null);

  const [dipendenteTemporaneo, setDipendenteTemporaneo] = useState(null);

  const [errore, setErrore] = useState(null);

  const modificaDipendente = (idDipendente) => {
    const dipendenteInModifica = dipendenti.find(({id}) => id === idDipendente);
    setIdDipendenteInModifica(idDipendente);
    setDipendenteTemporaneo(dipendenteInModifica);
    setErrore(null);
  }

  const salvaDipendente = (e) => {

    e.preventDefault();

    if(!dipendenteTemporaneo.nome.trim()){
      setErrore("Inserisci un nome valido.");
      return;
    }

    if(!dipendenteTemporaneo.ruolo.trim()){
      setErrore("Inserisci un ruolo valido.");
      return;
    }

    if(dipendenteTemporaneo.stipendio <= 0 || !Number.isFinite(dipendenteTemporaneo.stipendio)){
      setErrore("Inserisci uno stipendio valido.");
      return;
    }
    
    setDipendenti(prev => {
      return prev.map(dipendente => {
        if(dipendente.id === idDipendenteInModifica){
          return {
            ...dipendente,
            nome: dipendenteTemporaneo.nome,
            ruolo: dipendenteTemporaneo.ruolo,
            stipendio: Number(dipendenteTemporaneo.stipendio)
          }
        }
        return dipendente;
      })
    })

    setIdDipendenteInModifica(null);
  }

  return (
    <main className="gestore-dipendenti">
      <h1>Gestore dipendenti con modifica</h1>
      <div className="dashboard">
        <div className="dipendenti">
          <ListaDipendenti
            dipendenti={dipendenti}
            modificaDipendente={modificaDipendente}
            idDipendenteInModifica={idDipendenteInModifica}
            dipendenteTemporaneo={dipendenteTemporaneo}
            setDipendenteTemporaneo={setDipendenteTemporaneo}
            setIdDipendenteInModifica={setIdDipendenteInModifica}
            salvaDipendente={salvaDipendente}
            errore={errore}
          />
        </div>
      </div>
    </main>
  )
}

function ListaDipendenti({dipendenti, modificaDipendente, idDipendenteInModifica, dipendenteTemporaneo, setDipendenteTemporaneo, setIdDipendenteInModifica, salvaDipendente, errore}){
  return(
    dipendenti.map(dipendente => {
      return(
        <Dipendente key={dipendente.id}
          dipendente={dipendente}
          modificaDipendente={modificaDipendente}
          idDipendenteInModifica={idDipendenteInModifica}
          dipendenteTemporaneo={dipendenteTemporaneo}
          setDipendenteTemporaneo={setDipendenteTemporaneo}
          setIdDipendenteInModifica={setIdDipendenteInModifica}
          salvaDipendente={salvaDipendente}
          errore={errore}
        />
      )
    })
  )
}

function Dipendente({dipendente, modificaDipendente, idDipendenteInModifica, dipendenteTemporaneo, setDipendenteTemporaneo, setIdDipendenteInModifica, salvaDipendente, errore}){
  return(
    <div className="dipendente">
      {idDipendenteInModifica === dipendente.id ?
      <div className="dipendente-in-modifica">
        <form onSubmit={salvaDipendente}>
          <label>Nome
            <input
              value={dipendenteTemporaneo.nome} 
              onChange={(e) => {setDipendenteTemporaneo(prev => ({...prev, nome: e.target.value}))}}
            />
          </label>
          <label>Ruolo
            <input
              value={dipendenteTemporaneo.ruolo} 
              onChange={(e) => setDipendenteTemporaneo(prev => ({...prev, ruolo: e.target.value}))}
            />
          </label>
          <label>Stipendio (€)
            <input
              type="number"
              value={dipendenteTemporaneo.stipendio}
              onChange={(e) => setDipendenteTemporaneo(prev => ({...prev, stipendio: Number(e.target.value)}))}
            />
          </label>
          <div className="azioni">
            <button className="salva" type="submit">Salva</button>
            <button className="annulla" type="button" onClick={() => setIdDipendenteInModifica(null)}>Annulla</button>
          </div>
        </form>
        {errore && <p className="errore">{errore}</p>}
      </div>
      :
      <>
        <div className="info-dipendente">
          <h2>{dipendente.nome}</h2>
          <p>{dipendente.ruolo} • {dipendente.stipendio} €</p>
        </div>
        <div className="azioni">
          <button className="modifica" onClick={() => modificaDipendente(dipendente.id)}>Modifica</button>
        </div>
      </>
      }
    </div>
  )
}

export default App;
