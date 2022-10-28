import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'

const CreatePost = () =>{
    const history = useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:"#f44336 red"})
                }
                else{
                    M.toast({html: "post created successfully", classes:"#4caf50 green"})
                    history('/')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","DostiKaro")
        data.append("cloud_name","dqd2jhqrv")
        fetch("https://api.cloudinary.com/v1_1/dqd2jhqrv/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

        // when only this fetch kickin thenafter, createpost fetch
    }

    return(
        <div className='card input-filed'
        style={{margin:"10px auto",maxWidth:"700px",padding:"20px",textAlign:"center"}}
        >
            <input type="text" 
            placeholder='title'
            value={title}
            onChange={(e=>setTitle(e.target.value))}
            />
            <input tyee="text" 
            placeholder='body'
            value={body}
            onChange={(e=>setBody(e.target.value))}
            />
            <div className="file-field input-field">
                <div className="btn #ff9800 orange">
                    <span>Upload</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} multiple/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more images" />
                </div>
                </div>
            <button className='btn waves-effect waves-light #ff9800 orange'
            onClick={()=>postDetails()}
            >
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost