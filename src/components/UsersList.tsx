import { type User } from '../types'

interface Props{
    deleteUser:(email:string) => void
    showColors: boolean
    users:User[]
}
export function UsersList ({deleteUser, users, showColors}:Props)  {
  return (
    <table width='100%'>
        <thead>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>           
        </thead> 
    
        <tbody>
            {
                users.map((user,index)=>{
                    const backgroundColor = index % 2 == 0 ? '#333':'#555'  
                    const color =showColors ? backgroundColor : 'transparent'

                    return( 
                        <tr key={user.email} style={{backgroundColor:color}}>
                            <td>
                                <img src={user.picture.thumbnail}/>
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={()=>{deleteUser(user.email)}}>Borrar</button>
                            </td>
                        </tr>
                     )
                })
            }
        </tbody>
    </table>
  )
}

