import {createContext, PropsWithChildren, useContext} from 'react'
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
        case "ADD_LIST":{
            return{
                ...state
            }
        }
        case "ADD_TASK":{
            return{
                ...state
            }
        }
        default:{
            return state
        }
    }
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

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = ({children}:PropsWithChildren<{}>)=>{
    return(
        <AppStateContext.Provider value ={{state:appData}}>
            {children}
        </AppStateContext.Provider>
    )
}
export const useAppState = ()=>{
    return useContext(AppStateContext)
}