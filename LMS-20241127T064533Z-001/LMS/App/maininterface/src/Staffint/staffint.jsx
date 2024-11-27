import './staffint.css'
import { useLocation } from 'react-router-dom'

function Staff(){
    const location = useLocation()
    const data = location.state
    console.log(data)
    return( <>
        <h1>Hello {data.S_name} </h1>
    </>)
}

export default Staff