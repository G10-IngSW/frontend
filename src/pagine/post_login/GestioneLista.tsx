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
      navigate("/");
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
    if (textBarContent == "") return;

    let newItemString: string;
    if (quantity == 0) {
      newItemString = textBarContent;
    } else {
      newItemString = `${quantity} ${textBarContent}`;
    }
    const newOggetti = [...lista.oggetti, newItemString];
    setLista(new Lista(lista.id, lista.titolo, newOggetti, lista.dataUltimaModifica));
    if (!(oggettiPrecedenti.includes(textBarContent))) {        
      aggiungiOggettoDatabase();
    }
    setTextBarContent("");
    setQuantity(0);
    
  }

  const removeItem = (i: number) => {
    if (i < 0 || i >= lista.oggetti.length) {
        console.error("Indice non valido");
    }
    const newOggetti = [...lista.oggetti.slice(0, i), ...lista.oggetti.slice(i + 1)];
    setLista(new Lista(lista.id, lista.titolo, newOggetti, lista.dataUltimaModifica));
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
        const result = await response.json();
        console.log(result);
        const resultLista = result.lista_modificata as ListaDB;
        const listaModificata = new Lista(resultLista._id, resultLista.titolo, resultLista.oggetti, resultLista.dataUltimaModifica);
        setLista(listaModificata);
        datiApp.updateListe();


        datiApp.updateListe();
      } else {
        console.log("BBB");
        alertListaNonSalvata();
        console.log("Lista non modificata");
      }
    } catch (error) {
      console.log("CCC");
      alertListaNonSalvata();
      console.log(error);
    }
  }
  
  
  // PUO' LANCIARE ERRORI
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
        setLista(listaAggiunta);
        datiApp.updateListe();
      } else {
        throw new Error("Lista non creata");
      }
    } catch (error) {
      alertListaNonSalvata();
      console.error(error);
    }


  };

  const salvaLista = async () => {
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
    const response = await fetch(`${datiApp.serverUrl}/liste/${lista.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({}),
    });

    if (response.ok) {
      console.log('lista eliminata');
      datiApp.updateListe();
      navigate("/");
    } else {
      console.log("Lista non eliminata")
    }
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
          <button onClick={eliminaLista}>Elimina</button>
        </>
        :
        <p>Caricamento...</p>

      }

    </>
  )
}

export default GestioneLista