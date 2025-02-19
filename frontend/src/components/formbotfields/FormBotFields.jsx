import React from 'react'
import styles from './FormBotFields.module.css';


function FormBotFields({babblesAndInputs}) {
  return (
    <div className={styles.formbotfields}>
      {
        babblesAndInputs?.length > 0 && (
            babblesAndInputs?.map((fields,idx)=>{
                
                switch(fields){
                    case "babbleText" : 
                     return <input key={idx} type="text" />
                 
                    case "babbleImage":
                       return <img src="" alt="" />
                  
                    case "babbleVideo":
                     return <video src=""></video>
                   
                    case "babbleGif":
                        return <img src="" alt="" />
                
                    case "InputText":
                       return <input type="text" />
                  
                    case "InputNumber":
                       return <input type="text" />
                   
                    case "InputEmail":
                       return <input type="text" />
               
                    case "InputPhone":
                       return <input type="text" />
                  
                    case "InputDate":
                       return <input type="text" />
                 
                    case "InputRating":
                       return <input type="text" />
                   
                    case "InputButtons":
                       return <input type="text" />
                    
                    default:
                        return null;
                }
            })
        )
      }
    </div>
  )
}

export default FormBotFields
