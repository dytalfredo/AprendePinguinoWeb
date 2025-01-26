import { useState, useEffect } from 'react';

import levelsDatas from "../json/gameControl.json";
import Button from './Button.jsx';
import "./TerminalGame.css";
import { executeCommandBtn } from "../../public/script.mjs"

const input = document.getElementById("input")
const dialog = document.getElementById("myDialog")
const dialog2 = document.getElementById("myDialog2")



export default function TerminalGame() {
    const [level, setLevel] = useState(0);
    const [correct, setCorrect] = useState('');
    const [parts, setParts] = useState([]);
    const [enunciate, setEnunciate] = useState('');
  
  
  
    useEffect(() => {
      // Seleccionar el Level Correcto
      const nowLevel = levelsDatas[0].Levels[level];
      setCorrect(nowLevel.Confirm);
      setEnunciate(nowLevel.Enunciate);
      setParts(nowLevel.Parts.map(part=>({
        value:part
      })));
    }, [level])

const handleButtonClick = (value) => {
    //cambia el estado de los input cambiando el texto del input seleccionado
       input.value += value
       
      };
  
const clean = () => {
    input.value ="";
}

const nextLevel = () =>{
    setLevel(level+1);
    const nowLevel = levelsDatas[0].Levels[level];
      setCorrect(nowLevel.Confirm);
      setEnunciate(nowLevel.Enunciate);
      setParts(nowLevel.Parts.map(part=>({
        value:part
      })));

}

const confirm = () => {
    if (correct==input.value){
        console.log("RESPUESTA CORRECTA")
        dialog.showModal();
        executeCommandBtn();
        nextLevel();
    
    }else{
      dialog2.showModal();
        console.log("Respuesta incorrecta")
    }
}

    return (
      <div>

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

     </div>
      </div>
      </div>
    );
  
  }