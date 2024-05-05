import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import React, {useState} from 'react'


function App() {

const [randomNumber, setRandomNumber] = useState(generateNumber(100));
const [input, setInput] = useState("");
const [history, setHistory] = useState([]);
const [result, setResult] = useState("");

  function generateNumber(max) {
    return Math.floor(Math.random() * max);
}
console.log(randomNumber);
console.log(history);
console.log(result);

function onValidate(input, randomNumber, newHistory) {
  if (input > randomNumber) {
    setResult("Trop grand")
  }
  if (input < randomNumber) {
    setResult("Trop petit")
  }
  if (input == randomNumber) {
    setResult(`Bravo, tu as trouve le nombre en ${newHistory.length} essais.`)
  }
}  


return (
    <div className="app">
      <div className="container">
      <div className="title">
          <h1>GUESS THE NUMBER</h1>
        </div>
        <div className="main">
            <div className="input">
            <TextField
            style={{width:"100%"}}
          id="outlined-number"
          label="Number"
          type="number"
          min="0"
          max="100"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
            </div>
            {result.length > 0 && (
            <div className="result">
            <Alert 
            severity="info" 
            style={{width:"100%"}}>
            {result}.
            </Alert>
            </div>
            )}
            <div className="buttons">
              <div className="button">
              <Button 
              aria-label="contained" 
              variant="outlined" 
              startIcon={<CheckIcon />}
              id="checkButton"
              onClick={() => {
                const newHistory = [...history];
              newHistory.push(input);
              setHistory(newHistory);
              onValidate(input, randomNumber, newHistory);
              }}>
              Check
              </Button>
              </div>

              <div className="button">
              <Button 
              aria-label="contained" 
              variant="outlined" 
              startIcon={<ReplayIcon />}
              onClick={() => {
                let newRandomNumber = generateNumber(100)
                console.log(newRandomNumber);
                setRandomNumber(newRandomNumber);
                setHistory([]);
                setInput("");
                setResult("");
              }}>
                Restart
              </Button>
              </div>
              </div>
              <div className="history">
              {history.map((value, index) => (
                <Card className="historyItem" key={index}> {value} </Card>
              ))}
            </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
