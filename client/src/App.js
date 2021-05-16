import React,{useEffect, useState} from 'react';
import io from "socket.io-client"
import './App.css';

function App() {

const [rip,setRip] = useState(false)

useEffect( () =>{
     let socket = io.connect("http://localhost:5000/");
     socket.on("connect",()=>{
      console.log("u Ripped")
    })
  }
, [rip])

const handleClick = () => {
    setRip(prev=>!prev)
}


return (
    <form>

    </form>
  );
}

export default App;
