import { useState, useEffect } from 'react';

import levelsDatas from "../json/gameControl.json";
import Button from './Button.jsx';
import "./TerminalGame.css";
import { executeClear, executeCommandBtn } from "../../public/script.mjs"
import Confetti from 'react-confetti';
import { useTimePoints } from './hooks/useTimePoints.jsx'; 

const input = document.getElementById("input")
const dialog = document.getElementById("myDialog")
const dialog2 = document.getElementById("myDialog2")




export default function TerminalGame() {
    const [level, setLevel] = useState(0);
    const [correct, setCorrect] = useState('');
    const [parts, setParts] = useState([]);
    const [enunciate, setEnunciate] = useState('');
    const [isOpen, setIsOpen]= useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWins, setIsWins]= useState(false);
    const [lives, setLives]= useState(2);
    const [mensajeDialog, setMensajeDialog ] = useState('');
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    const [ timePoints, seconds ] = useTimePoints(0.001);
    
    const calculatePoints = () => {
      return Math.floor(timePoints * lives);
    }

    useEffect(() => {
     
      if(Math.floor(timePoints) === 0){
        gameOver();
        setIsOpen(true);
      }
    }, [timePoints])
    
  
    useEffect(() => {
      // Seleccionar el Level Correcto
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
    handleResize();
    
      const nowLevel = levelsDatas[0].Levels[level];
      setCorrect(nowLevel.Confirm);
      setEnunciate(nowLevel.Enunciate);
      setParts(nowLevel.Parts.map(part=>({
        value:part
      })));
      setIsOpen(false);
setIsWins(false);
setIsGameOver(false);
return () => window.removeEventListener('resize', handleResize);    
    }, [level])

const handleButtonClick = (value) => {
    //cambia el estado de los input cambiando el texto del input seleccionado
       input.value += value
       
      };
  
const clean = () => {
    input.value ="";
}

const handleClose = () => {
  setIsOpen(false);
  window.location.reload();
};

const gameWins = ()=>{
 setIsWins(true);
 setMensajeDialog(`Felicitaciones has ganado. 
  Puntuación : ${calculatePoints()}
  Tiempo transcurrido : ${seconds}s`);
}

const gameOver = ()=>{
  setIsGameOver(true);
  setMensajeDialog("Que malo eres. has perdido vergonzosamente")
}

const nextLevel = () =>{
    console.log(level, "=",levelsDatas[0].Levels.length-1)
  
    if(!(level==levelsDatas[0].Levels.length-1)){
      dialog.showModal();
      setLevel(level+1);
      const nowLevel = levelsDatas[0].Levels[level];
      setCorrect(nowLevel.Confirm);
    
      setEnunciate(nowLevel.Enunciate);
      setParts(nowLevel.Parts.map(part=>({
        value:part
      })));
      console.log("La respuesta correcta", correct);
    }else{
      gameWins();
      setIsOpen(true);
    }
}

const error = () =>{
  if(lives==0){

  }
}

const confirm = () => {
  console.log("La respuesta correcta", correct);
    if (correct==input.value){
        console.log("RESPUESTA CORRECTA")
       
        executeCommandBtn();
        nextLevel();
    
    }else{
      setLives(lives-1);
      if(lives==1){
        gameOver();
        setIsOpen(true);
      }else{
      dialog2.showModal();
      
      
      executeClear()
      clean();
        console.log("Respuesta incorrecta")}
    }
}

    return (
      <div>
        {isWins &&(
          <Confetti
      width={windowSize.width}
      height={windowSize.height}
    />
        )

        }
        <h2 className='timer'>
          <span className={timePoints < 200 ? "parpadeo" : ""}> Tiempo: {seconds}</span>
        </h2>
        <h2 className='lives'>Vidas restante: {lives}</h2>
        <h1 className='titleLevel'>{enunciate}</h1>
          <div id="BarraBotones" className="barraBotones">
          {parts.map((part, index) => (
       
       <Button
         key={index}
         palabra={part.value}
         onClick={() => {
           handleButtonClick(part.value);
   
       }} />
     ))}
     <div className='gameBotons'>
        <button className='buttonL' onClick={clean}> Limpiar</button>
        <button className='buttonL' id="confirmarBoton" onClick={confirm}> Confirmar </button>
        
        {isOpen && (
          <dialog open className={isGameOver? 'pantallaFinal':'pantallaFinal2'}>  
          <h2>¡{mensajeDialog}!</h2>
          <button className={isGameOver ? ' buttonL derrota' : ' buttonL victoria'} onClick={handleClose}>Cerrar</button>
        </dialog>
        
      )}


     </div>
      </div>
      </div>
    );

 
  
  }

  

          