import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { deleteAHistory, getAllHistory } from '../services/allAPI'

function WatchHistory() {

const [history , setHistory ] = useState([])
 
const watchAllHistory = async()=>{
const {data} = await getAllHistory()
/* console.log(data); */
setHistory(data)
}
console.log(history);


//function to remove a particualar history
const removeAHistory = async(id)=>{
  await deleteAHistory(id)
  // to get the remainig history
  watchAllHistory()
}

useEffect(()=>{
  watchAllHistory()
},[])

  return (
    <>
    <div className="container mt-5 d-flex justify-content-between">
      <h3>WatchHistory</h3>
      <Link to={'/home'} className='d-flex align-items-center' style={{textDecoration:'none', color:'white' ,fontsize:'20px'}}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>  
     </div>
     <table className='table mt-5 mb-5 container'>
      <thead>
        <tr>
          <th>#</th>
          <th>caption</th>
          <th>url</th>
          <th>time stamp</th>
          <th>Action</th>

        </tr>
      </thead>
     <tbody>
      { history?.length>0?
        history.map((item, index)=>(<tr>
        <td>{index+1}</td>
        <td>{item.caption}</td>
        <td><a href={item.embedLink} target='_blank'>{item.embedLink}</a></td>
        <td>{item.timestamp}</td>
        <td> <button onClick={()=>removeAHistory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></button></td>
      </tr>))
     : <p className='fw-bolder fs-4 text-danger m-4' >Nothing to display</p>
         }
     </tbody>
     </table>
    </>
  )
}

export default WatchHistory