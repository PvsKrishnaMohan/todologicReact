import { useState } from 'react'
import './App.css'

const App = () => {
  const [list,setList] = useState([])

  const [message,setMessage] = useState({
    text:"",
    id: ""
  })
     
  const [isEditing,setIsEditing] = useState({
    id:"",
    iseditable:false

  })

  function handleOnChange(e){
    setMessage({
      ...message,
      text : e.target.value
    })
  }

  const handleEdit =(id) => {
    let editableTodo = list.find((eachItem) => eachItem.id === id)
    setMessage({...message,text:editableTodo.text,id: editableTodo.id})
    setIsEditing({...isEditing,iseditable:true,id:id})
  }

  const handleDelete = (id) =>{
    const filteredItems = list.filter((eachItem) => {
      return eachItem.id!== id
    })
    setList(filteredItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      text : message.text,
      id : new Date().getTime().toString()
    }
    setList([...list,newTodo])
    setMessage({
      text:"",
      id:""
    })
  }

  const handleUpdate =(e) =>{
    e.preventDefault();
    let updatedNewTodos = list.map((eachItem)=> {
      if (eachItem.id === isEditing.id){
           return {
              text:message.text,
              id: isEditing.id
           }     
      }else{
        return eachItem
      }
    })
    setList(updatedNewTodos)
    setMessage({text:"",id:""})
    setIsEditing({id:"",iseditable:false})
  }
  return(
    <>
      <form>
        <input type="text"
         placeholder='enter todo item'
         value={message.text}
         id="message"
         name="message" 
         onChange={handleOnChange}       
        />
        {
          isEditing.iseditable ?  
             <button onClick = {handleUpdate}type='submit'>Update</button> : 
             <button onClick={handleSubmit} type='submit'>Add</button>
        }
      </form>
    <hr/>
    {list.length ===0 && <h4>There are no items to display</h4> }
    {
      list.map((eachItem) => {
        const {id,text} = eachItem
        return (
          <div className="card" key={id}>
              <h1 className="heading">{text}</h1><br/>
                <div className='buttonContainer'>
                  <button className='acceptButton' onClick={() => handleEdit(id)}>edit</button>
                  <button className = 'declineButton' onClick={() => handleDelete(id)}>delete</button>
                </div>
          </div>
        )
      })
    }
    </>
  )
}

export default App
