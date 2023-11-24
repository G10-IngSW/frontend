import {useState} from 'react';


interface Props {
  titolo: string;
}


function GestioneLista({titolo}: Props) {

  let [itemList, setItemList] = useState<string[]>([]);
  let [textBarContent, setTextBarContent] = useState<string>("");
  let [quantity, setQuantity] = useState<number>(0);

  const addItem = () => {
    if (textBarContent != "") {
      let newItemString: string = `${quantity} ${textBarContent}`;
      setItemList([...itemList, newItemString]);
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

  return (
    <>
      <p>{titolo}</p>
      {itemList.length != 0 &&
        <button onClick={removeAllItems}> Remove all </button>
      }
      <ul>
        {itemList.map((item:string, index:number) => (
          <li key={index}>
            {`${item}  `}
            <button onClick={() => {removeItem(index)}}> x </button>
            </li>
        ))}
      </ul>

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

    </>
  )
}

export default GestioneLista