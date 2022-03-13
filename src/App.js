import React, { useState, useEffect} from "react";
import './App.css';
import Form from '../src/components/Form'
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const[todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] =useState([]);

  useEffect(()=>{
    getFromLocal();
  },[ ]);

  useEffect(()=>{
filterHandler();
saveToLocal ();
  },[todos, status]);


  const filterHandler  = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
          default:
            setFilteredTodos(todos);
            break;
    }
  }
  
  //save localstorage
  const saveToLocal =() =>{
      localStorage.setItem('todos',JSON.stringify(todos));
  }
  const getFromLocal = () =>{
    if(localStorage.getItem('todos')==null){
      localStorage.setItem('todos',JSON.stringify([]));
    
    }
    else{
     let todoLocal = JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
    <header>
      <h2>TODO</h2>
    </header>
    <Form 
    inputText={inputText}
    setInputText={setInputText}
    todos={todos} 
    setTodos={setTodos}
    setStatus ={setStatus}
    filteredTodos = {filteredTodos}
    />
    <TodoList 
    filteredTodos={filteredTodos}
    setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
