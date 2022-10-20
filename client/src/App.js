
import "./App.css"
import io from 'socket.io-client';
import {useEffect,useState} from "react";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const socket = io.connect("http://localhost:3001")
function App() {
const [keyword,setkeyword]=useState("")
const [data,setdata]=useState(["show me sales data"])

  const sendMessage=(e)=>{
     socket.emit("send_message",{message:e.target.value})
  }
  useEffect(()=>{
socket.on("recieve_message",(data)=>{
  setdata(data)
console.log(data)
})
  },[socket])
  return (
    <div className="App">
     <input placeholder="Type here ..." onChange={sendMessage}/>
     <button onClick={sendMessage}>Send Message</button>
     <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        multiple
        autoHighlight
        options={data.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="Command" onChange={sendMessage}/>}
      />
      </Stack>
    </div>
  );
}

export default App;
