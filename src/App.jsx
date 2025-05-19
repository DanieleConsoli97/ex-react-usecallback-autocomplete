

import { useState, useEffect, useCallback } from "react"

const jsonfetch = async (url, query = "") => {
  const promise = await fetch(`${url}/products?search=${query}`)
  const promiseJson = await promise.json()
  return promiseJson
}

const ListItems = ({ product }) => {
  
  return <li className="list-group-item list-group-item-secondary">{product.name}</li>
}


function App() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  console.log(products)

  const fetchUsers = async (url, query) => {
    try {
      const data = await jsonfetch(url, query)
      setProducts(data)
      console.log("richiesta effettuata")
    } catch (error) {
      console.log("errore", error)
    }
  }


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => { fetchUsers("http://localhost:5000", search) }, [search])


  return (
    <>
      <main>
        <div className="container-md">
          <div className="row">
            <div className="col-12 text-center" >
              <h1 className="text-primary">Ricerca Nomi</h1>
              <p className="text-primary">Inserisci il nome da cercare</p>
              <input type="text" onChange={handleChange} />
              {search &&
                <div>
                  <p>elenco ricerca</p>
                  <ul className="list-group">
                    {products?.map((product, index) => {
                      return <ListItems key={index} product={product} />
                    })
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
