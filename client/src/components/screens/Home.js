import React,{useEffect,useState} from 'react'

const Home = () =>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
    return(
        <div className='home'>
            {
                data.map(item=>{
                    return(
                        <div className='card home-card'>
                            <h5>Hitesh</h5>
                            <div className='card-image'>
                                <img src="https://unsplash.com/photos/-98y5HIFDs8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8c2NlbmVyeXxlbnwwfHx8fDE2NjUwODc2NzE&force=true"></img>
                            </div>
                            <div className='card-content'>
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                                <h6>Title</h6>
                                <p>This is amazing post</p>
                                <input type="text" placeholder='Add a comment'/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home