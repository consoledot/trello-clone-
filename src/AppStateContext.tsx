import {createContext, PropsWithChildren, useContext, useReducer} from 'react'
import {v4 as uuid} from 'uuid'
import {findItemIndexById} from './utils/findItemIndexById'

interface Task{
    id:string
    text:string
}
interface List{
    id:string
    text:string 
    tasks:Task[] 
}
export interface AppState{
    lists:List[]
}
interface AppStateContextProps{
    state:AppState
    dispatch:any
}



const appData:AppState={
    lists:[
        {
            id:"0",
            text:"To Do",
            tasks:[
                {
                    id:"c0",
                    text:"Generate app scaffold"
                }
            ]
        },
        {
            id:'1',
            text:"In Progress",
            tasks:[
                {
                    id:"c2",
                    text:"Learn TypeScript"
                }
            ]
        },
        {
            id:'2',
            text:"Done",
            tasks:[
                {
                    id:"c3",
                    text:"Begin to use static typing"
                }
            ]
        }
    ]
}
type Action =
|{
    type:"ADD_LIST"
    payload:string
}
|{
    type:"ADD_TASK"
    payload:{text:string, taskId:string}
}
const appStateReducers = (state:AppState, action:Action):AppState=>{
    switch(action.type){
        case "ADD_TASK":{
            const tagertLaneIndex = findItemIndexById(state.lists, action.payload.taskId)
            state.lists[tagertLaneIndex].tasks.push({
                id:uuid(),
                text: action.payload.text
            })
            return{
             ...state
            }
        }
        case "ADD_LIST":{
            return{
                ...state,
                lists:[
                    ...state.lists,
                    {id:uuid(), text: action.payload, tasks:[]}
                ]
            }
        }
        default:{
            return state
        }
    }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = ({children}:PropsWithChildren<{}>)=>{
    const [state, dispatch] = useReducer(appStateReducers, appData)
    return(
        <AppStateContext.Provider value ={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}
export const useAppState = ()=>{
    return useContext(AppStateContext)
}