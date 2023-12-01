import React, { useState } from 'react'

export const GestioneAccount = () => {
    const [nomeAccount,setNomeAccount] = useState<string>("Mario");

  return (
    <>
        <header>
            <h1 id='left-title'>Pricepal</h1>
            <h1 id='right-title'>Account</h1>
        </header>
        <div>
            
        </div>
    </>
  )
}
