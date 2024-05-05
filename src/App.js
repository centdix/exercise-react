import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateNumber(100));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState("");
  const [ranking, setRanking] = useState([]);
  const [open, setOpen] = useState(false);
  const [pseudo, setPseudo] = useState("");

  function generateNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function onValidate(input, randomNumber, newHistory) {
    if (input > randomNumber) {
      setResult("Trop grand");
    }
    if (input < randomNumber) {
      setResult("Trop petit");
    }
    if (input == randomNumber) {
      setResult(
        `Bravo, tu as trouve le nombre en ${newHistory.length} essais.`,
      );
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  };

  function saveRanking() {
      if (pseudo === "") {
        return ;
      }
      setOpen(false);
      const newRanking = [...ranking];
      newRanking.push({
        pseudo: pseudo,
        attempts: history.length,
      });
      newRanking.sort((a, b) => a.attempts - b.attempts);
      setRanking(newRanking);
      localStorage.setItem("rankings", JSON.stringify(newRanking));
  }

  useEffect(() => {
    let data = localStorage.getItem("rankings");
    if (data) {
      console.log('rankings', data);
      setRanking(JSON.parse(data));
    }
  }, [])

  console.log(randomNumber);

  return (
    <div className="app">
      <div className="container">

        <div className="title">
          <h1>GUESS THE NUMBER</h1>
        </div>

        <div className="main">

          <div className="input">
            <TextField
              style={{ width: "100%" }}
              id="outlined-number"
              label="Number"
              type="number"
              min="0"
              max="100"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          {result.length > 0 && (
            <div className="result">
              <Alert severity="info" style={{ width: "100%" }}>
                {result}
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
                }}
              >
                Check
              </Button>
            </div>

            <div className="button">
              <Button
                aria-label="contained"
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={() => {
                  let newRandomNumber = generateNumber(100);
                  console.log(newRandomNumber);
                  setRandomNumber(newRandomNumber);
                  setHistory([]);
                  setInput("");
                  setResult("");
                }}
              >
                Restart
              </Button>
            </div>
          </div>

          <div className="history">
            {history.map((value, index) => (
              <Card className="historyItem" key={index}>
                {" "}
                {value}{" "}
              </Card>
            ))}
          </div>

          <div className="ranking">
            <h3>Ranking</h3>
            {ranking.map((player, index) => (
              <div className="ranking-row" key={index}>
                <span>{index + 1}</span>
                <span>{player.pseudo}</span>
                <span>{player.attempts}</span>
              </div>
            ))}
          </div>


        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Save score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your pseudo to save your score.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveRanking}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
