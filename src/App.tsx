import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import {type User} from './types'


function App() {
  const [users,setUsers] = useState<User[] >([])
  const [showColors, setShowColors]= useState(false)
  const [sortByCountry, setSortByCountry]=useState(false)
  const originalUsers=useRef<User[]>([])
  const[filterCountry, setFilterCountry]= useState<string | null>(null)
  
  
  const toggleColors =()=>{
    setShowColors(!showColors)
  }
  const toggleSortByCountry = ()=>{
    setSortByCountry(prevState=>!prevState)
  }

  const handleReset=()=>{
    setUsers(originalUsers.current) 
  }
  const handleDelete = (email:string) =>{
    const filteredUsers = users.filter((user)=> user.email != email)
      setUsers(filteredUsers)
  }


  useEffect(()=>{
    fetch('https://randomuser.me/api?results=100')
      .then(async res=> await res.json())
      .then(res=>{
        setUsers(res.results)
        originalUsers.current=res.results
      })
      .catch (err=>{
        console.error(err)
        }) 
  },[])

  const filteredUsers = typeof filterCountry == 'string' && filterCountry.length > 0
   ? users.filter((user=>{
    return user.location.country.toLowerCase().includes(filterCountry.toLocaleLowerCase())
   }))
   :
   users

  const sortedUsers =  sortByCountry
   ? [...filteredUsers].sort((a,b) =>{
    return a.location.country.localeCompare(b.location.country)
  })
  :
  filteredUsers

  return (
  <div className ="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <div className='actions'>
        <button onClick={toggleColors}> <span>Colorear filas</span></button>
        <button onClick={toggleSortByCountry}><span>{sortByCountry ? 'Desordenar' : 'Ordenar por país'} </span></button>
        <button onClick={handleReset}><span>Resetear estado</span></button>
        <input placeholder='Filtra por país' onChange={(e)=>{
          setFilterCountry(e.target.value)
        }}/>
        </div>
      </header>
      <main>
      <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
  </div>
  )
}

export default App
