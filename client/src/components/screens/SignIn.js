import React,{useState,useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext} from '../../App'

const SignIn = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPasword] = useState("")

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email", classes:"#f44336 red"})
            return
        }
        fetch("/signin",{
            method : "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                email:email
            })
        }).then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signedin success", classes:"#4caf50 green"})
                history('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>DostiKaro</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
                <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) =>setPasword(e.target.value)}
                />
                <button className='btn waves-effect waves-light #ff9800 orange'
                onClick={()=>PostData()}>
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn