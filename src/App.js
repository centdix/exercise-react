import './App.css';
import { TextField, Alert, Button, Card } from '@mui/material';
import { useState } from 'react';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://whfqnaajcsqdqwsfwzfc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZnFuYWFqY3NxZHF3c2Z3emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MjEwNzEsImV4cCI6MjAzMDQ5NzA3MX0.S4qsLhrJ1QireKTQx2vF1cKNtiVwU8dGgTf72CJAvWE";

function App() {

  const [input, setInput] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100));
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState('');

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(randomNumber);

  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Devine le nombre</h1>
        </div>
        <div className="main">
            <div className="input">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                style={{width: '100%'}}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              />
            </div>
            <div className="result">
              <Alert severity="info" variant="outlined" style={{width: '100%'}}>{result}</Alert>
            </div>
            <div className="buttons">
              <div className="button">
                <Button variant="contained" onClick={async () => {
                  const { error } = await supabase
                  .from('test')
                  .insert({ test: 'fewfew' })
                  if (input === '' || isNaN(input)) {
                    setResult('Please enter a number')
                  } else {
                    if (input > randomNumber) {
                      setResult('Too high')
                    } else if (input < randomNumber) {
                      setResult('Too low')
                    } else {
                      setResult('Congratulations')
                    }
                    setHistory([...history, input])
                  }
                }}>Check</Button>
              </div>
              <div className="button">
                <Button variant="contained" onClick={() => {
                  setInput('')
                  setHistory([])
                  setResult('')
                  setRandomNumber(Math.floor(Math.random() * 100))
                }}>Restart</Button>
              </div>
            </div>
            <div className="history">
              {history.map((item, index) => (
                <Card className="historyItem" key={index}>
                  {item}
                </Card>
              ))}
            </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
