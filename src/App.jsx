import { useState, useEffect, useCallback } from "react"
import { debounce } from "lodash"



const jsonfetch = async (query) => {
  const promise = await fetch(`http://localhost:5000/products?search=${query}`)
  const promiseJson = await promise.json()
  return promiseJson
}

const debouncefunc = (callBack, delay) => { 
  let timeout
  return  (value) =>{
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(value)
    }, delay)
  }
}

const ListItems = ({ product }) => {

  return <li className="list-group-item list-group-item-secondary">{product.name}</li>
}

function App() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")


  const fetchUsers = async (query) => {
    try {
      const data = await jsonfetch(query)
      console.log(query)
      setProducts(data)
      console.log("richiesta effettuata")
    } catch (error) {
      console.log("errore", error)
    }
  }

const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const debouncedFetchProduct = useCallback (
    debouncefunc (fetchUsers, 500)
    , [])

  useEffect(() => { debouncedFetchProduct(search) }, [search])


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
                <div className={`search-results-animated}`}>
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
