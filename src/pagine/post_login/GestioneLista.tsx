import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lista from '../../classi/Lista';
import { useAppContext } from '../../context';
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


  useEffect(() => {

    // caricare la lista
    const getListaById = () => {
      for (var l of datiApp.liste) {
        if (l.id == idListaUrl) return l;
      }
      return new Lista("error_id", "ERRORE!", [], new Date);
    }

    // api per caricare gli oggetti precedentemente inseriti
    const getOggettiPrecedenti = async () => {
      const response = await fetch(`${datiApp.serverUrl}/oggetti/${datiApp.account.id}`);
      if (response.ok) {
        console.log("ricevuti gli oggetti precedenti dal DB");
        const result = await response.json();
        console.log("result = ", result);
        setOggettiPrecedenti(result.oggetti[0].oggetti);
      }
    }
    

    // codice eseguito alla creazione
    if (idListaUrl !== "nuova_lista") {
      setLista(getListaById());
    }
    setMostraLista(true);
    getOggettiPrecedenti();


    // codice eseguito alla distruzione
    return () => {
      
    }
    
  }, []);


  const addItem = () => {
    console.log("url_id_lista = ", idListaUrl);
    if (textBarContent != "") {
      const newItemString: string = `${quantity} ${textBarContent}`;
      const newOggetti = [...lista.oggetti, newItemString];
      setLista(new Lista(lista.id, lista.titolo, newOggetti, new Date));
      if (!(oggettiPrecedenti.includes(textBarContent))) {        
        aggiungiOggettoDatabase();
      }
      setTextBarContent("");
      setQuantity(0);
    }
  }

  const removeItem = (i: number) => {
    if (i < 0 || i >= lista.oggetti.length) {
        console.error("Indice non valido");
    }
    const newOggetti = [...lista.oggetti.slice(0, i), ...lista.oggetti.slice(i + 1)];
    setLista(new Lista(lista.id, lista.titolo, newOggetti, new Date));
  }

  const removeAllItems = () => {
    lista.oggetti = [];
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
        console.log('oggetto aggiunto');
        setOggettiPrecedenti([...oggettiPrecedenti, textBarContent]);
      } else {
        const errordata = await response.json();
        console.error("Errore nell'aggiunta dell'oggetto: ", errordata);
      }

    } catch (error) {
      console.log("errore nella richiesta: ", error);
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
        console.log('lista modificata');
        datiApp.updateListe();
      } else {
        alertListaNonSalvata();
        console.log("Lista non modificata");
      }
    } catch (error) {
      alertListaNonSalvata();
      console.log(error);
    }
  }
  
  
  // PUO' LANCIARE ERRORI
  const creaLista = async () => {

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
      console.log('lista creata');
      const result = await response.json();
      const resultLista = result.listaAggiunta as ListaDB;
      const listaAggiunta = new Lista(resultLista._id, resultLista.titolo, resultLista.oggetti, resultLista.dataUltimaModifica);
      setLista(listaAggiunta);
      datiApp.updateListe();
    } else {
      console.log("Lista non creata")
    }

  };

  const salvaLista = async () => {
    if (lista.id === "nuova_lista_id") {
      try {
        await creaLista();
      } catch (error) {
        alertListaNonSalvata();
        console.error(error);
      }
    } else {
      modificaLista();
    }
  }

  const alertListaNonSalvata = () => {
    window.alert("ERRORE: Lista non salvata!\nRiprova a salvare la lista, o potrai perdere le ultime modifiche.");
  }
  

  return (
    <>
      {
        mostralista ?
        <>
          <p>{`${lista.id} ${lista.titolo} ${lista.dataUltimaModifica}`}</p>

          <input 
            type="text" 
            value={lista.titolo}
            onChange={(e) => setLista(new Lista(lista.id, e.target.value, lista.oggetti, lista.dataUltimaModifica))}
          />

          <br />
    
          <button onClick={addQuantity}>+</button>
          <button onClick={subtractQuantity}>-</button>
    
          <span>{`  ${quantity}  `}</span>
    
          <input 
            type="text" 
            value={textBarContent}
            onChange={(e) => setTextBarContent(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addItem();
              }
            }}
          />
    
          {lista.oggetti.length != 0 &&
            <div><button onClick={removeAllItems}> Remove all </button></div>
          }
    
          <ul>
            {lista.oggetti.map((item:string, index:number) => (
              <li key={index}>
                {`${item}  `}
                <button onClick={() => {removeItem(index)}}> x </button>
              </li>
            ))}
          </ul>
    
          <br />
          <button onClick={salvaLista}>Salva</button>
        </>
        :
        <p>Caricamento...</p>

      }

    </>
  )
}

export default GestioneLista