import './App.css';
import { TextField, Alert, Button, Card, CardContent } from '@mui/material';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Devine le nombre</h1>
        </div>
        <div className="main">
            <div className="input">
              <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '100%'}} />
            </div>
            <div className="result">
              <Alert severity="info" variant="outlined" style={{width: '100%'}}>This is an info Alert.</Alert>
            </div>
            <div className="buttons">
              <div className="button">
                <Button variant="contained">Check</Button>
              </div>
              <div className="button">
                <Button variant="contained">Restart</Button>
              </div>
            </div>
            <div className="history">
              <Card className="historyItem">
                12
              </Card>
              <Card className="historyItem">
                13
              </Card>
              <Card className="historyItem">
                54
              </Card>
            </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
