import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducer/userReducer'

export const UserContext = createContext()

const Routing = () =>{
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history('/')
    }
    else{
      history('/signin')
    }
  },[])
  return(
    <Routes>
        <Route exact path = "/" element = {<Home />}></Route>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/signin" element = {<Signin />}></Route>
        <Route path = "/profile" element = {<Profile />}></Route>
        <Route path = "/create" element = {<CreatePost />}></Route>
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
