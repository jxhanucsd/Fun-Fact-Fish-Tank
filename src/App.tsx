import {useState, useEffect, useRef} from "react";
//import logo from './logo.svg';
import './uistyle.css';
//import ''./fishtank.css';'

  const waterbackground = [
    "/water 1.png",
    "/water 2.png",
    "/water 3.png",
  ];

  const plants = [
    "/plants 1.png",
    "/plants 2.png",
  ];

  const fish = [
    "/fishies 1.png",
    "/fishies 10.png",
  ];



function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  //ANIMATION 4 WATER BACKGROUND
  const [index, setIndex] = useState(0);

  useEffect(() => {

    //setInterval = do something repeatedly every 800 milliseconds
    //interval = i made this label so I can clear it later, otherwise it will keep running forever
    const interval = setInterval(() => {
      //yas = previous value of index, waterbackground.length = total number of images
      setIndex((yas) => (yas + 1) % waterbackground.length);
    }, 800); 

    //clearInterval = stop the interval from running when the component closes
    return () => clearInterval(interval);
  }, []);

  //ANIMATION 4 plants
  const [current, changeimg] = useState(0);

  useEffect(() => {

    //setInterval = do something repeatedly every 650 milliseconds
    //interval = i made this label so I can clear it later, otherwise it will keep running forever
    const interval = setInterval(() => {
      //prev = previous value of index, plants.length = total number of images
      changeimg((prev) => (prev + 1) % plants.length);
    }, 650); 

    //clearInterval = stop the interval from running when the component closes
    return () => clearInterval(interval);
  }, []);
  

  //ANIMATION 4 fish opacity
  const [fishOpacity, setFishOpacity] = useState(1); // starts showing fishies1 fully

  useEffect(() => {
    const interval = setInterval(() => {
      setFishOpacity((prev) => prev === 1 ? 0 : 1); // toggles between 1 and 0
    }, 1300); // how long each position holds before switching

    return () => clearInterval(interval);
  }, []); 

  //fishing button toggle
  const [isFishing, setIsFishing] = useState(false);
  const [showFact, setShowFact] = useState(false);

  function goFishing() {
    setIsFishing(true);        // show fishing rod immediately

    const sound = new Audio("/glitter.mp3"); //sound effect
    sound.play();
    
    setTimeout(() => {
     // sound.pause();            // stop sound effect
     // sound.currentTime = 0;     // reset sound effect to start 4 next time
      setIsFishing(false);     // hide fishing rod
      setShowFact(true);     // show fact overlay
      const pop = new Audio("/pop.mp3"); 
      pop.play();
    }, 1200);                   // 1200ms delay between the two
  }

//sound effect toggle
const [isMuted, setIsMuted] = useState(true); // starts muted

// sound stored in a ref so you can pause it later
const soundRef = useRef<HTMLAudioElement | null>(null);
const sound2Ref = useRef<HTMLAudioElement | null>(null);

function toggleSound() {
  if (isMuted) {
    // currently muted → play sound
    const sound = new Audio("/watersound.mp3");
    const sound2 = new Audio("/music.mp3");
    
    sound.loop = true;
    sound2.loop = true;
    
    sound.play();
    sound2.play();

    soundRef.current = sound;
    sound2Ref.current = sound2;
    
    setIsMuted(false);
  } else {
    soundRef.current?.pause();
    sound2Ref.current?.pause();
    setIsMuted(true);
  }
}

  return (
    <div className="tank">

      {/*top*/}
      <div className="top">
        
        <img  src={isMuted ? "/mute.png" : "/speaker.png"} alt="sound toggle" style={{ width: '4vmin', height: '4vmin', cursor: 'pointer' }} onClick={toggleSound} />
      </div>

      <div className="middle">
        {/*water background*/}
        <img className="water" src={waterbackground[index]} alt="water" />

        {/*plants*/}
        <img className="plants" src={plants[current]} alt="plants" />
    
        {/*fish*/}
        <img src="/fishies 1.png" className="fish-layer" style={{ opacity: fishOpacity }} />
        <img src="/fishies 10.png" className="fish-layer" style={{ opacity: 1 - fishOpacity }} />

        {/* fishing rod loading — only renders when isFishing is true */}
        {isFishing && (
          <img src="/fishingrod.png" className="fishingrod" alt="fishing rod"/>
        )}

        {/* fun fact — only renders when showFact is true */}
        {showFact && (
          <div className="fact-overlay">
            <div className="fact-content">
              <p className= "fact-text">I have a pet betta veiltail fish! Her name is Sapphire, Fire for short.</p>
              <img src="/fire.gif" className="fact-image" />
              <div className="fact-buttons"> 
                  <button className="exit" onClick={() => setShowFact(false)}>Exit</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*bottom*/}
      <div className="bottom">
        <div className="left-column">
          <h6 style={{ color: 'rgb(62, 141, 156)', textAlign: 'left', display: 'inline-flex'}}>Fun Fact Fish Tank</h6>
          <p style={{ color: 'rgb(62, 141, 156)', textAlign: 'left', display: 'inline-flex' }}>Coded with React and TypeScript</p>
        </div>

        <div className="right-column">
          <button className= "button" onClick={goFishing}>Go Fishing!</button>
        </div>
      </div>


      <canvas
        ref={canvasRef}
        width={800}
        height={800}
      />
    </div>
  );
}

export default App;
