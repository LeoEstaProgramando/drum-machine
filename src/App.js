import "./App.css";
import { useState, useEffect, useRef } from "react";

const drumPad = [
  {
    nombre: "Heater 1",
    letra: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    nombre: "Heater 2",
    letra: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    nombre: "Heater 3",
    letra: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    nombre: "Heater 4",
    letra: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    nombre: "Clap",
    letra: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    nombre: "Open-HH",
    letra: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    nombre: "Kick-n'-Hat",
    letra: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    nombre: "Kick",
    letra: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    nombre: "Closed-HH",
    letra: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {

  const [power, setPower] = useState(false);
  const [volumen, setVolumen] = useState(0.5);

  const handleKeyDown = (event) => {
    const drum = drumPad.find((drum) => drum.letra === event.key.toUpperCase());
    if (drum) {
      playDrum(drum);
    }
  };

  function playDrum(drum) {
    if (drum.audio) {
       document.getElementById(drum.letra).pause()
       document.getElementById(drum.letra).currentTime = 0
       document.getElementById(drum.letra).volume = volumen
       document.getElementById(drum.letra).play();
       document.getElementById("display").innerHTML = drum.nombre;
    }
  }

  useEffect(() => {
    if (power) {
      document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    }
  }, [power]);
  
  return (
    <div className="container" id="drum-machine">
      <div className="drumPadButtons">
        {drumPad.map((drum, index) => (
          <button
            onClick={() => playDrum(drum)}
            className={power ? 'drum-pad' : 'drum-pad-off'}
            id={drum.nombre}
            key={index}
            disabled={!power}
          >
            {drum.letra}
            <audio
              className="clip"
              preload="none"
              src={drum.audio}
              id={drum.letra}
            ></audio>
          </button>
        ))}
      </div>
      <div className="drumPadControls">
        <div className="optionControl">
          <p className="titleOption">Power</p>
          <label className="switch">
            <input type="checkbox" onClick={() => setPower(!power)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="resumeControl">
          {(power) ? <p id="display"></p> : '' }
        </div>
        <div className="volumeControl">
          <input type="range" id="volume" disabled={!power} min={0} max={1} step={0.1} value={volumen} onChange={(e) => setVolumen(e.target.value)} />
        </div>
        <div className="optionControl">
          <p className="titleOption">Bank</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
