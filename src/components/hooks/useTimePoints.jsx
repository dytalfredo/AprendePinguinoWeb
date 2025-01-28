import { useState, useEffect, useRef } from "react";

export function useTimePoints(decayConstant) {
    const [points, setPoints] = useState(200000); 
    const [second, setSecond] = useState(0); 
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecond((prevSecond) => prevSecond + 1); 
        }, 1000);

        return () => clearInterval(intervalId); 
    }, []);

    useEffect(() => {
        if (second > 0) {
            setPoints((prevPoints) => prevPoints / (1 + decayConstant * second) ); 
        }
    }, [second]);
    return [ points, second ]; 
}
