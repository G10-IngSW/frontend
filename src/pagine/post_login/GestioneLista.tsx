import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Lista from '../../classi/Lista';
import { useAppContext } from '../../context';




function GestioneLista() {

  const listaInCaricamento: Lista = new Lista("tmp_id", "Caricamento...", [], new Date);
  const listaNuova: Lista = new Lista("nuova_lista_id", "Nuova lista", [], new Date);

  const [lista, setLista] = useState<Lista>(listaInCaricamento);

  const [textBarContent, setTextBarContent] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [oggettiPrecedenti, setOggettiPrecedenti] = useState<string[]>([""]);

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
      const response = await fetch(`${datiApp.serverUrl}/liste/oggetti/${datiApp.account.id}`);
      if (response.ok) {
        console.log("ricevuti gli oggetti precedenti dal DB");
        const result = await response.json();
        console.log("result = ", result);
        setOggettiPrecedenti(result.oggetti[0].oggetti);
      }
    }

    
    setLista(getListaById());
    getOggettiPrecedenti();


    return () => {
      //salvare la lista quando viene smontata. Se è nuova bisogna crearla (basta guardare idLista)
    }
    
  }, []);


  const addItem = () => {
    console.log("url_id_lista = ", idListaUrl);
    if (textBarContent != "") {
      const newItemString: string = `${quantity} ${textBarContent}`;
      const newElementi = [...lista.elementi, newItemString];
      setLista(new Lista(lista.id, lista.titolo, newElementi, new Date));
      if (!(oggettiPrecedenti.includes(textBarContent))) {        
        aggiungiOggettoDatabase();
      }
      setTextBarContent("");
      setQuantity(0);
    }
  }

  const removeItem = (i: number) => {
    if (i < 0 || i >= lista.elementi.length) {
        console.error("Indice non valido");
    }
    const newElementi = [...lista.elementi.slice(0, i), ...lista.elementi.slice(i + 1)];
    setLista(new Lista(lista.id, lista.titolo, newElementi, new Date));
  }

  const removeAllItems = () => {
    //const date: number = Date.now();
    //setLista(new Lista(lista.id, lista.titolo, [], Date.now()));
    let nuovaLista = new Lista(lista.id, lista.titolo, [], new Date);
  }

  const addQuantity = () => {
    setQuantity(quantity + 1);
  }

  const subtractQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
  }

  const aggiungiOggettoDatabase = async () => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/liste/oggetti/${datiApp.account.id}`, {
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


  // TODO: chiamare questa funzione quando si preme sul tasto "salva lista" e lista.id === "nuova_lista_id"
  const creaLista = async (accountId: string) => {
    try {
      const response = await fetch(`${datiApp.serverUrl}/liste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titolo: "Lista di prova 2",
          elementi: ["aaaa", "bbb", "cc", "d", "eee", "f"],
          idUtente: accountId,
          dataUltimaModifica: Date.now(),
        }),
      });
  
      if (response.ok) {
        console.log('lista creata');
      } else {
        console.log("Lista non creata")
      }

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <p>{`${lista.id} ${lista.titolo} ${lista.dataUltimaModifica}`}</p>

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

      {lista.elementi.length != 0 &&
        <div><button onClick={removeAllItems}> Remove all </button></div>
      }

      <ul>
        {lista.elementi.map((item:string, index:number) => (
          <li key={index}>
            {`${item}  `}
            <button onClick={() => {removeItem(index)}}> x </button>
          </li>
        ))}
      </ul>

    </>
  )
}

export default GestioneLista