import React, { useState } from 'react'

export const GestioneAccount = () => {
  const [nomeAccount, setNomeAccount] = useState<string>("Mario");

  return (
    <div className="container-gestioneaccount">
      <button className='gestioneaccount'>Cambia nome</button>
      <button className='gestioneaccount'>Cambia email</button>
      <button className='gestioneaccount'>Cambia password</button>
      <button className='gestioneaccount'>Logout</button>
    </div>
  )
}
