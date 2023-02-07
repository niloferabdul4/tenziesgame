
import React from 'react';
const Die = ({id,value,isHeld,dice,setDice}) => {

        /*****    HOLD DICE FN      **********/

        const holdDice=(id)=>
        {
                const update_holded=dice.map((die)=> {return die.id===id ?  {...die,isHeld:!isHeld} :die}) 
                setDice(update_holded)
                //console.log(update_holded)
                
        }
        

       /****  STYLES  ******/
      
        const styles=
        {
        backgroundColor:(isHeld===true? 'green' : 'white' )                 // change style based on isHeld //
        }
          
return (
            <>    
                 <button className='die_face' style={styles} onClick={()=>holdDice(id)}>{value}</button>            
                        
            </>
     
    );
}

export default Die;
