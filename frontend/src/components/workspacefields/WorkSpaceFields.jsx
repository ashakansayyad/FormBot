import React from 'react'
import styles from './WorkSpaceFields.module.css';
import {
   text_babble,
   image_babble,
   video_babble,
   gif_babble,
   delete_icon
} from '../../assets/assets';

const  WorkSpaceFields = React.memo(({ fields,setFields,handleFieldsDelete,error,setError })=> {

   function handleInputChange(idx,newValue){
      setFields((prev)=>{
         return prev.map((item,index)=>(
            index === idx ? {...item,value:newValue} : item
         ))
      })
   }


   return (
      <div className={styles.formbotfields}>
         {
            fields?.length > 0 && (
               fields?.map((fields, idx) => (
                  fields.type === "babble" ? (
                     <div 
                      key={idx}
                      className={styles.babbleFieldsConatiner}
                      > 
                      <div
                      onClick={()=>handleFieldsDelete(idx)}
                      id={styles.delete_icon}>
                        <img  src={delete_icon} />
                      </div>
                        <h3>{fields.name} {fields.count} </h3>
                        <div 
                        style={{border:error[fields.name.toLowerCase()] ? "1px solid rgba(245, 80, 80, 1)" : "none"}}
                        >
                           <img src={fields.name === "Text" ? text_babble : fields.name === "Image" ? image_babble :
                              fields.name === "Video" ? video_babble  : gif_babble
                           } />
                        <input type="text"
                        onChange={(e)=>{
                           handleInputChange(idx,e.target.value)
                           setError((prev)=>({...prev,[fields.name.toLowerCase()]:false}))
                        }}
                        value={fields.value || "" }
                           placeholder={fields.name === "Text" ? "Click here to edit" : "Click to add link"}
                        />
                        </div>
                        {error[fields.name.toLowerCase()] && (
                           <span className={styles.errorMessage}>Required Field</span>
                        )}
                     </div>

                  ) : (
                     <div key={idx} className={styles.inputFieldsConatiner}>
                        <h3>Input {fields.name}  {fields.count}</h3>
                        <div
                         onClick={()=>handleFieldsDelete(idx)}
                        id={styles.delete_icon}>
                        <img  src={delete_icon} />
                      </div>
                        {
                           fields.name === "Button" ? (
                              <input type='text' 
                              value={fields.value || ""}
                              onChange={(e)=>handleInputChange(idx,e.target.value)}
                              />
                           ) : (
                              <p>
                                 
                                 Hint : {fields.name === "Text" ? "User will input a text on his form" :
                                    fields.name === "Number" ? "User will input a number on his form" :
                                       fields.name === "Email" ? " User will input a email on his form" :
                                          fields.name === "Phone" ? " User will input a phone on his form" :
                                             fields.name === "Date" ? " User will select a date" :
                                                " User will tap to rate out of 5"
                                 }
                              </p>

                           )
                        }
                     </div>
                  )
               ))
            )
         }

      </div>
   )
});

export default WorkSpaceFields
