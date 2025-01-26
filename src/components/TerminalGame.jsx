import { useState, useEffect } from 'react';

import levelsDatas from "../json/gameControl.json";
import Button from './Button.jsx';
import "./TerminalGame.css";
import { executeCommandBtn } from "../../public/script.mjs"

const input = document.getElementById("input")

console.log(levelsDatas);

export default function TerminalGame() {
    const [level, setLevel] = useState(0);
    const [correct, setCorrect] = useState('');
    const [parts, setParts] = useState([]);
    const [enunciate, setEnunciate] = useState('');
  
    /* const [inputs, setInputs] = useState([]);
    const [palabraSeleccionada, setPalabraSeleccionada] = useState(null);
    const [sentence, setSentence]= useState(null);
  
    const [showCorrectAnswerScreen, setShowCorrectAnswerScreen] = useState(false);
    const [showIncorrectAnswerScreen, setShowIncorrectAnswerScreen] = useState(false);
    const [show, setShow] = useState(true); */
  
    
    
  
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
        executeCommandBtn();
        nextLevel();
    
    }else{
        console.log("Respuesta incorrecta")
    }
}

    return (
      <div>

        <h1>{enunciate}</h1>
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


        
   
  
{/*          <div className='general'>
         <h1 className='title'> Complete la oración con las palabras a continuación </h1>
          <div className="button-container">
          {palabras.map((palabra, index) => (
         
         <Button
           key={index}
           palabra={palabra.texto}
           onClick={() => {
             handleButtonClick(index);
     
         }}
           estado={palabra.seleccionado ? 'colocado' : 'sinUsar'}
         />
       ))}
          </div>
        
          <div className="input-container">
        {inputs.map((input, index) => (
          <Input
            key={index}
            value={input.texto}
            estado={input.seleccionado ? 'colocado' : 'sinUsar'}
            onChange={() => handleInputChange(index)}
          
          />
        ))}
        </div>
  
        <div className="control-container">
        {
                          showCorrectAnswerScreen && (
                              <>
                              <Confetti
        width={1500}
        height={900}
        gravity={1}
      />
                                  <div>
                                      <h1>Correcto</h1>
                                      <p>{`Oración : ${sentence.join(" ")}`}</p>
                                      
                                  </div>
                                  <button className='button' onClick={nextSentence} >
                                      Continuar
                                  </button>
                              </>
                          )
                      }
  
                      {
                          showIncorrectAnswerScreen && (
                              <>
                                  <div>
                                      <h1 className='red'>Incorrecto</h1>
                                      
                              
                                  </div>
                                  <button className='button' onClick={tryAgain} >
                                      Volver a intentar
                                  </button>
                              </>
                          )
                      }
                      {
                        show && (
  <button className="button" onClick={comprobarOracion}>Comprobar</button>
                        )
                      }
        
        </div>
      </div> */}
      </div>
      </div>
    );
  
  }