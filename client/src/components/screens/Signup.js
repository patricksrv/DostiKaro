import React,{useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
    const history = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPasword] = useState("")

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email", classes:"#f44336 red"})
            return
        }
        fetch("/signup",{
            method : "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                M.toast({html: data.message, classes:"#4caf50 green"})
                history('/signin')
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
                placeholder="name"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                />
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
                    SignUp
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup