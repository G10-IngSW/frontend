import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lista from '../../classi/Lista';
import { useAppContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { faColonSign } from '@fortawesome/free-solid-svg-icons';

type ListaDB = {
  _id:string, 
  titolo:string, 
  oggetti:string[], 
  idAccount:string, 
  dataUltimaModifica:Date,
}



function GestioneLista() {

  const listaNuova: Lista = new Lista("nuova_lista_id", "Nuova lista", [], new Date);

  const [lista, setLista] = useState<Lista>(listaNuova);
  const [mostralista, setMostraLista] = useState<boolean>(false);

  const [textBarContent, setTextBarContent] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const [oggettiPrecedenti, setOggettiPrecedenti] = useState<string[]>([""]);

  const navigate = useNavigate();

  const {idListaUrl} = useParams();

  const datiApp = useAppContext();

  const [modificheEffettuate, setModificheEffettuate] = useState<boolean>(false);


  useEffect(() => {

    // caricare la lista
    const getListaById = () => {
      for (var l of datiApp.liste) {
        if (l.id == idListaUrl) return l;
      }
      navigate("/");
      return new Lista("error_id", "ERRORE!", [], new Date);
    }

    // codice eseguito alla creazione
    if (idListaUrl !== "nuova_lista") {
      setLista(getListaById());
    }
    setMostraLista(true);
    setOggettiPrecedenti(datiApp.oggettiPrecedenti);

    // codice eseguito alla distruzione
    return () => {
    }
    
  }, []);


  const addItemFromTextBox = async () => {
    if (textBarContent == "") return;
    addItem(textBarContent);
  }
  
  const addItem = async (item: string) => {
    let newItemString: string;
    if (quantity == 0) {
      newItemString = item;
    } else {
      newItemString = `${quantity} ${item}`;
    }
    const newOggetti = [...lista.oggetti, newItemString];
    setLista(new Lista(lista.id, lista.titolo, newOggetti, lista.dataUltimaModifica));
    if (!(oggettiPrecedenti.includes(item))) {        
      aggiungiOggettoDatabase();
    }
    setModificheEffettuate(true);
    setTextBarContent("");
    setQuantity(0); 
  }

  const removeItem = (i: number) => {
    if (i < 0 || i >= lista.oggetti.length) {
        console.error("Indice non valido");
    }
    const newOggetti = [...lista.oggetti.slice(0, i), ...lista.oggetti.slice(i + 1)];
    setLista(new Lista(lista.id, lista.titolo, newOggetti, lista.dataUltimaModifica));
    setModificheEffettuate(true);
  }

  const removeAllItems = () => {
    setLista(new Lista(lista.id, lista.titolo, [], lista.dataUltimaModifica));
    setModificheEffettuate(true);
  }

  const addQuantity = () => {
    setQuantity(quantity + 1);
  }

  const subtractQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
  }

  const aggiungiOggettoDatabase = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/oggetti/${datiApp.account.id}`, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oggetto: textBarContent,
        })
      });

      if (response.ok) {
        console.log('oggetto aggiunto al DB');
        setOggettiPrecedenti([...datiApp.oggettiPrecedenti, textBarContent]);
        datiApp.aggiungiOggettoInLocale(textBarContent);
      } else {
        const errordata = await response.json();
        console.error("Errore nell'aggiunta dell'oggetto al DB: ", errordata);
      }

    } catch (error) {
      console.log("errore nella richiesta di aggiunta di oggetto al DB: ", error);
    }
  }

  
  const modificaLista = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/liste/${lista.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titolo: lista.titolo,
          oggetti: lista.oggetti,
        }),
      });
  
      if (response.ok) {
        console.log('lista modificata nel DB');
        const result = await response.json();
        const resultLista = result.lista_modificata as ListaDB;
        const listaModificata = new Lista(resultLista._id, resultLista.titolo, resultLista.oggetti, resultLista.dataUltimaModifica);
        setLista(listaModificata);
        datiApp.modificaListaInLocale(listaModificata);
      } else {
        alertListaNonSalvata();
        console.log("Lista non modificata");
      }
    } catch (error) {
      alertListaNonSalvata();
      console.log(error);
    }
  }
  
  
  const creaLista = async () => {

    try {
      const response = await fetch(`${datiApp.serverUrl}/liste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titolo: lista.titolo,
          oggetti: lista.oggetti,
          idAccount: datiApp.account.id,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        const resultLista = result.lista_salvata as ListaDB;
        const listaAggiunta = new Lista(resultLista._id, resultLista.titolo, resultLista.oggetti, resultLista.dataUltimaModifica);
        console.log("lista creata nel DB")
        setLista(listaAggiunta);
        datiApp.aggiungiListaInLocale(listaAggiunta);
      } else {
        throw new Error("Lista non creata");
      }
    } catch (error) {
      alertListaNonSalvata();
      console.error(error);
    }


  };

  const salvaLista = async () => {
    setModificheEffettuate(false);
    if (lista.id === "nuova_lista_id") {
      creaLista();
    } else {
      modificaLista();
    }
  }

  const alertListaNonSalvata = () => {
    window.alert("ERRORE: Lista non salvata!\nRiprova a salvare la lista, o potrai perdere le ultime modifiche.");
  }

  const eliminaLista = async () => {
    
    if (lista.id == "nuova_lista_id") {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`${datiApp.serverUrl}/liste/${lista.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({}),
      });
  
      if (response.ok) {
        console.log('lista eliminata nel DB');
        datiApp.rimuoviListaInLocale(lista.id);
        navigate("/");
      } else {
        console.log("Lista non eliminata");
      }
    } catch (error) {
      console.log("errore nell\'eliminare la lista: ");
    }
  }

  const eliminaOggettiRecenti = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/oggetti/${datiApp.account.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('oggetti eliminati dal DB');
        setOggettiPrecedenti([]);
        datiApp.rimuoviTuttiOggettiInLocale();
      } else {
        console.log("oggetti non eliminati");
      }
    } catch (error) {
      console.log("errore nell\'eliminare gli oggetti: ");
    }
  }
  
  //<p>{`${lista.id} ${lista.titolo} ${lista.dataUltimaModifica}`}</p>

  //<button onClick={eliminaOggettiRecenti} >Elimina autocompletamento oggetti</button>

  return (
    <>
      {
        mostralista ?
        <>
          


          <div className="flexbox-orizzontale" id='barra-titolo'>
            <div>
              <input 
                type="text" 
                value={lista.titolo}
                className='input-text'
                id='titolo-lista-input'
                onChange={(e) => 
                  {setLista(new Lista(lista.id, e.target.value, lista.oggetti, lista.dataUltimaModifica));
                    setModificheEffettuate(true);}
                }
              />
            </div>


            <div className="flexbox-orizzontale" id='disposizione-icone'>

              {lista.oggetti.length != 0 &&
                <div><FontAwesomeIcon icon={faBroom} onClick={removeAllItems} id="remove-all-icon" className='icona-salvataggio-eliminazione' /></div>
              }

              <FontAwesomeIcon icon={faFloppyDisk} onClick={salvaLista} className={modificheEffettuate ? 'salvataggio-possibile' : 'icona-salvataggio-eliminazione'} />

              <FontAwesomeIcon icon={faTrash} onClick={eliminaLista} className='icona-salvataggio-eliminazione' />

            </div>
            

             


          </div>


                
    
          <ul className= {oggettiPrecedenti.length != 0 ? 'lista-oggetti' : 'lista-oggetti-no-oggetti-precedenti' }>
            {lista.oggetti.map((item:string, index:number) => (
              <li key={index} className='oggetto-lista'>
                {`${item}  `}
                <button className='rimozione-oggetto-button' onClick={() => {removeItem(index)}}> x </button>
              </li>
            ))}
          </ul>
    
          

          {oggettiPrecedenti.length != 0 &&
          <div className='oggetti-precedenti'>
            <OggettiPrecedenti oggettiPrecedenti={oggettiPrecedenti} filtro={textBarContent} addItem={addItem}/>
          </div>}

          
          
          
          
          
          <div className="aggiunta-oggetti-bar">

            <div>
              <button  className="quantity-button" onClick={addQuantity}>+</button>
              <button className="quantity-button" onClick={subtractQuantity}>-</button>
        
              <span className='quantity-span'>{`  ${quantity}  `}</span>
        
              <input 
                type="text" 
                value={textBarContent}
                className='input-text'
                onChange={(e) => setTextBarContent(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    addItemFromTextBox();
                  }
                }}
              />
            </div>
            

            
      
            <div>
              {oggettiPrecedenti.length != 0 &&
                <button onClick={eliminaOggettiRecenti} className="quantity-button" id='aggiungi-button'>Rimuovi Oggetti Recenti</button>
              }
              <button className="quantity-button" id='aggiungi-button' onClick={addItemFromTextBox}>Aggiungi</button>
            </div>
            
          </div>
        </>
        :
        <p>Caricamento...</p>

      }

    </>
  )
}

export default GestioneLista

interface Props {
  oggettiPrecedenti: string[];
  filtro: string;
  addItem: (i:string) => void;
}


const OggettiPrecedenti = ({oggettiPrecedenti, filtro, addItem}: Props) => {

  return (
    <ul>
      { oggettiPrecedenti.length != 0 &&
        oggettiPrecedenti.map((item:string, index:number) => (
          item.startsWith(filtro) ?
            <li key={index} className='auto-completion-item' onClick={() => addItem(oggettiPrecedenti[index])}>
              {item}
            </li>
          :
            null
        ))
      }
    </ul>
  );
}