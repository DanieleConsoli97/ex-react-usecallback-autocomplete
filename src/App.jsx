


function App() {
  const isTrue=true

  return (
    <>
      <main>
        <div>
          <h1>Ricerca Nomi</h1>
          <div>
            <p htmlFor="">Inserisci il nome da cercare</p>
            <input type="text" onChange={()=>{}}/>
            {isTrue && 
              <div>
              <ul>
                <li>prova</li>
                <li>prova</li>
                <li>prova</li>
              </ul>
            </div>
            
            }
          </div>

        </div>
      </main>
    </>
  )
}

export default App
