import React from 'react';
import Die from './Die';
import { useState,useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'


const Main = () => {

    
       const[dice,setDice]=useState(allNewDice())                                                   // STARTING STATE //
       const [tenzies,setTenzies]=useState(false)                                                    // STATE FOR WIN / NOT WIN ///
       const[rollCount,setRollCout]=useState(0)
       const[sucessMsg,setSuccessMsg]=useState('')

       
    /***  USEEFFECT Fn (Checks if allHeld && all have the same value for each dice state) */  


    useEffect(()=>{ const allHeld=dice.every(die=>die.isHeld===true )                                   //  IF ALL DIE IS HELD  ,STORE IN allHeld
                    const firstValue=dice[0].value
                    const allSameValue=dice.every(die=>die.value===firstValue)                          //  if all the die have the same value //
                    if( allHeld && allSameValue)                                  
                    {
                        setTenzies(true)
                       //console.log('You won')
                       setSuccessMsg(`Congratulations..You Have Won In ${rollCount} Rolls`)
                       
                    }
                
                },[dice])


/***  USEEFFECT Fn (Saving The success to Local Storage) */   
      
    useEffect(() => {localStorage.setItem('react-tenzies-game',JSON.stringify(sucessMsg))}, [tenzies]);  

/***********************************************************/


      function allNewDice()                                                 
      {   
                           const newDice=[]
                            
                            for(var i=0;i<10;i++)
                            {
                                 newDice.push({ id:nanoid(),
                                                value:Math.ceil(Math.random()*6),
                                                isHeld:false
                                            })  ;                                  
                            }                           
                            return newDice;                                                   

       }
        

       /******  ROLL DICE FUNCTION ************/


       const rollDice=()=>
              {

            if(!tenzies)                                                                // If not tenziess(not win) ///
            {

                const update_roll=dice.map(die=>{return die.isHeld? die : {id:nanoid(),value:Math.ceil(Math.random()*6),isHeld:false} })
                setDice(update_roll)
                setRollCout(prevCount=>prevCount+1)  

            }
            else                                                                      // if tenzies //
            {             
                
                setTenzies(false)
                setDice(allNewDice())                                               // new Array of Dice //
            }        
       }
    
    /*********************************************************************/     


        const dieElements=dice.map(die=>< Die   key={die.id} 
                                                id={die.id} 
                                                value={die.value}                                               
                                                isHeld={die.isHeld} 
                                                dice={dice}  
                                                setDice={setDice} />)      
      
      
    return (
        <div className='container'>             
                 {tenzies &&  <Confetti />}                                       {/* If tenzies ,then Confetti */}                       
            
                 <h2 className='title'>Tenzies</h2>            
           
                 <p  className='info_container'>Roll until all dice are the same.Click each dice to freeze it ar its current value between rolls.</p>            
            
                  <div className='dice_container'>

                      {dieElements}               
            
                 </div>
                
                 {tenzies &&  <p className='count'>{sucessMsg}</p> }
                <div className='footerbtn_container'>
                    <button className='btn' onClick={rollDice} >{tenzies ? 'New Game' : 'Roll' }</button>            {/*If tenzies ,then btn is 'New Game' ,else 'Roll' */}               
                </div>
        </div>
    );
}

export default Main;
