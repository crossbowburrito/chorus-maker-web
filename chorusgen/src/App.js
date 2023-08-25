import axios from 'axios';
import './index.css';
import { useState, useEffect } from 'react';

function App() {

  const [error, setError] = useState(null);



//tempo
const [tempo, setTempo] = useState(120);
const [isTempoRandom, setIsTempoRandom] = useState(false);


const handleTempoChange = (e) => {
  const newTempo = e.target.value;
  setTempo(newTempo);
  setResults(prevResults => ({ ...prevResults, tempo: newTempo }));
  setHasChanged(true);
};

const randomizeTempo = async () => {
  try {
      const response = await axios.get('http://localhost:5000/api/random-tempo');
      setTempo(response.data.tempo);
      setResults(prevResults => ({ ...prevResults, tempo: response.data.tempo }));
  } catch (error) {
      console.error("Error fetching random tempo:", error);
      setError(`Failed to fetch data: ${error.message}`);
  }
};

const handleRandomTempoButtonClick = () => {
  setIsTempoRandom(prevState => !prevState);
  if (!isTempoRandom) randomizeTempo();
  setHasChanged(true);
};


//mami
const [mami, setMami] = useState("Major");
const [isMamiRandom, setIsMamiRandom] = useState(false);

const handleMamiChange = (e) => {
  const newMami = e.target.value;
  setMami(e.target.value);
  setResults(prevResults => ({ ...prevResults, mami: newMami }));
  setHasChanged(true);
};


const handleRandomMamiButtonClick = () => {
  setIsMamiRandom(prevState => !prevState);

  if (!isMamiRandom) randomizeMami();
  setHasChanged(true);
};

const randomizeMami = async () => {
  try {
      const response = await axios.get('http://localhost:5000/api/random-mami');
      setMami(response.data.mami);
      setResults(prevResults => ({ ...prevResults, mami: response.data.mami }));
  } catch (error) {
      console.error("Error fetching random tempo:", error);
      setError(`Failed to fetch data: ${error.message}`);
  }
};


//key
const [key, setKey] = useState("A");
const [nsf, setNsf] = useState("");
const [isKeyRandom, setIsKeyRandom] = useState(false);

const handleKeyChange = (e) => {
  const newKey = e.target.value;
  setKey(newKey);
  setResults(prevResults => ({ ...prevResults, key: newKey }));
  setHasChanged(true);
};

const handleNsfChange = (e) => {
  const newNsf = e.target.value;
  setNsf(newNsf);
  setResults(prevResults => ({ ...prevResults, key: key + newNsf }));
  setHasChanged(true);
};


const handleRandomKeyButtonClick = () => {
  setIsKeyRandom(prevState => !prevState);

  if (!isKeyRandom) randomizeKey();
  setHasChanged(true);
};

const randomizeKey = async () => {
  try {
      const response = await axios.get('http://localhost:5000/api/random-key');
      setKey(response.data.key);
      setNsf(response.data.nsf);
      setResults(prevResults => ({ ...prevResults, key: response.data.key }));
  } catch (error) {
      console.error("Error fetching random tempo:", error);
      setError(`Failed to fetch data: ${error.message}`);
  }
};


//chord progression

const [chordProgression, setChordProgression] = useState("");
const [shouldRandomizeChordProgression, setShouldRandomizeChordProgression] = useState(false);


const randomizeChordProgression = async () => {
  console.log("Frontend mami value:", mami);
  try {
      const response = await axios.get(`http://localhost:5000/api/random-chord-progression?mami=${mami}`);
      setChordProgression(response.data.progression);
      setResults(prevResults => ({ ...prevResults, chordProgression: response.data.progression }));
  } catch (error) {
      console.error("Error fetching random progression:", error);
      setError(`Failed to fetch data: ${error.message}`);
  }
};

//time signature

const [timeSignature, setTimeSignature] = useState("4/4");
const [isTimeSignatureRandom, setIsTimeSignatureRandom] = useState(false);

const handleTimeSignatureChange = (e) => {
  const newTimeSignature = e.target.value;
  setTimeSignature(newTimeSignature);
  setResults(prevResults => ({ ...prevResults, timeSignature: newTimeSignature }));
  setHasChanged(true);
}

const handleRandomTimeSignatureButtonClick = () => {
  setIsTimeSignatureRandom(prevState => !prevState);
  setHasChanged(true);
}

const randomizeTimeSignature = async () => {

  try {
      const response = await axios.get('http://localhost:5000/api/random-time-signature');
      setTimeSignature(response.data.timeSignature);
      setResults(prevResults => ({ ...prevResults, timeSignature: response.data.timeSignature }));
  }
  catch (error) {
      console.error("Error fetching random time signature:", error);
      setError(`Failed to fetch data: ${error.message}`);
  }};


//randomize all

const handleRandomizeAllButtonClick = () => {
  setIsTempoRandom(true);
  setIsMamiRandom(true);
  setIsKeyRandom(true);
  setIsTimeSignatureRandom(true);
  randomizeTempo();
  randomizeMami();
  randomizeKey();
  setShouldRandomizeChordProgression(true);
  setHasChanged(true);
}
  
useEffect(() => {
  if (shouldRandomizeChordProgression) {
    randomizeChordProgression();
    setShouldRandomizeChordProgression(false);
  }
}, [shouldRandomizeChordProgression, mami]); // Depend on both the flag and the mami state


//results

const [results, setResults] = useState({
  tempo: 120,
  mami: 'Major',
  key: 'A',
  timeSignature: '4/4'
});


const [hasChanged, setHasChanged] = useState(false);

const [showResults, setShowResults] = useState(false);

const generateResults = () => {
  randomizeChordProgression();
  setShowResults(true);
};

const closeModal = () => {
  window.location.reload();
};




  return (
    <div className="App">
      <header className="header">
        <div className='header'>
          <h1>Make Music!</h1>
        </div>
      </header>
      
      {error && <div className="error">{error}</div>}

      <div className="content">

        <div className="row" id ="tempo">
          <label className="lefty">
            Tempo: {tempo}
          </label>
          <label className='centering'>
            40&nbsp;<input type= "range" min="40" max= "200" className="tempoSlider" value={tempo} onChange={(handleTempoChange)} disabled={isTempoRandom}/>&nbsp;200
          </label>
          <label className="righty">
          <input type="checkbox" checked={isTempoRandom} onChange={handleRandomTempoButtonClick} /> Random
          </label>
        </div>

        <div className="row" id="mami">
          <label className="lefty">
          <label>
            <input type="radio"  value="Major" label="Major" onChange={handleMamiChange} disabled={isMamiRandom} name ="mami"/> Major
          </label>
          <label>
            <input type="radio" value="Minor" label="Minor" onChange={handleMamiChange} disabled={isMamiRandom} name ="mami"/> Minor
          </label>
          </label>
          <label className='righty'>
          <input type="checkbox" checked={isMamiRandom} onChange={handleRandomMamiButtonClick} /> Random
          </label>

          
        </div>

        <div className="row" id ="key">
          <label className="lefty">
            <select value={key} onChange={handleKeyChange} disabled={isKeyRandom} name="letter">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
            <select onChange={handleNsfChange} disabled={isKeyRandom} >
              <option value=" "> </option>
              <option value="b">b</option>
              <option value="#">#</option>
            </select>
          </label>
          <label>
            <input type="checkbox" checked={isKeyRandom} onChange={handleRandomKeyButtonClick} /> Random
          </label>
        </div>

        <div className='row' id='timesig'>
          <label className='lefty'>
            <select value={timeSignature} onChange={handleTimeSignatureChange} disabled={isTimeSignatureRandom}>
              <option value="4/4">4/4</option>
              <option value="3/4">3/4</option>
              <option value="6/8">6/8</option>
            </select>
          </label>
          <label className='righty'>
            <input type="checkbox" checked={isTimeSignatureRandom} onChange={handleRandomTimeSignatureButtonClick} /> Random
          </label>
        </div>

        <div className="row" id ="buttons">
          <label className="lefty">
          {hasChanged && <button onClick={generateResults}>Generate</button>}
          </label>
          <label className="righty">
          <a href="https://forms.gle/o4hrQc3SCUDwnh3Q6" target='.blank' rel='noopener noreferrer'>
          <button>Report Bug</button></a>
          <button onClick={handleRandomizeAllButtonClick}>Randomize All</button>
          </label>
        </div>

        <div className="row" id ="results">
          {showResults && results.tempo && <p>Tempo: {results.tempo}</p>}
          {showResults && results.key && <p>Key: {results.key} {results.mami}</p>}
          {showResults && results.chordProgression && <p>Chord Progression: {results.chordProgression.join(" - ")}</p>}
          {showResults && results.timeSignature && <p>Time Signature: {results.timeSignature}</p>}
        </div>

        {showResults && (
          <div className="modal">
            <div className="modal-content" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#2eb82e"
              }}>
              <button className="close-button" onClick={closeModal}>&times;</button>
              
              <label style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px"
              }  
              }>Results:</label>
              {results.tempo && <p>Tempo: {results.tempo}</p>}
              {results.key && <p>Key: {results.key} {results.mami}</p>}
              {results.chordProgression && <p>Chord Progression: {results.chordProgression.join(" - ")}</p>}
              {results.timeSignature && <p>Time Signature: {results.timeSignature}</p>}
 &nbsp;
              <button className="restart-button" onClick={closeModal}>Close</button>
            </div>
          </div>
      )}

      </div>
    </div>
  );
}

export default App;
