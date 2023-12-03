import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';




function GestioneLista() {

  const [itemList, setItemList] = useState<string[]>([]);
  const [textBarContent, setTextBarContent] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [oggettiPrecedenti, setOggettiPrecedenti] = useState<string[]>([""]);

  const {idlista} = useParams();


  const idUtente = "65607ab6a2e1fab36a735b96";

  const url = "http://localhost:3000";


  useEffect(() => {

    // api per caricare gli oggetti della lista

    const getOggettiPrecedenti = async () => {
      const response = await fetch(`${url}/liste/oggetti/${idUtente}`);
      if (response.ok) {
        console.log("ricevuti gli oggetti precedenti dal DB");
        const result = await response.json();
        setOggettiPrecedenti(result[0].oggetti);
      }
    }

    getOggettiPrecedenti();

    return () => {
      //salvare la lista quando viene smontata
    }
    
  }, []);


  const addItem = () => {
    if (textBarContent != "") {
      let newItemString: string = `${quantity} ${textBarContent}`;
      setItemList([...itemList, newItemString]);
      if (!(oggettiPrecedenti.includes(textBarContent))) {        
        aggiungiOggettoDatabase();
      }
      setTextBarContent("");
      setQuantity(0);
    }
  }

  const removeItem = (i: number) => {
    if (i < 0 || i >= itemList.length) {
        console.error("Indice non valido");
    }
    const newItemList = [...itemList.slice(0, i), ...itemList.slice(i + 1)];
    setItemList(newItemList);
  }

  const removeAllItems = () => {
    setItemList([]);
  }

  const addQuantity = () => {
    setQuantity(quantity + 1);
  }

  const subtractQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
  }

  const aggiungiOggettoDatabase = async () => {
    try {
      const response = await fetch(`${url}/liste/oggetti/${idUtente}`, {
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
  

  return (
    <>
      <p>{idlista}</p>

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

      {itemList.length != 0 &&
        <div><button onClick={removeAllItems}> Remove all </button></div>
      }

      <ul>
        {itemList.map((item:string, index:number) => (
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