import {useState} from 'react'
import{NewItemFormContainer, NewItemButton, NewItemInput} from './styles'
import {useFocus} from './utils/useFocus'

interface NewItemFormProps{
    onAdd(text:string):void
}

export const NewItemForm = ({onAdd}:NewItemFormProps)=>{
    const [text, setText] = useState("")
    const inputRef = useFocus()
    return(
        <NewItemFormContainer>
         <NewItemInput 
            value={text}
            ref={inputRef}
            onChange={e=>setText(e.target.value)}/> 
         <NewItemButton onClick={()=> onAdd(text)}>
             Create
        </NewItemButton>  
        </NewItemFormContainer>
    )
}