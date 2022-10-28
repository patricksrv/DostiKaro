import React from 'react'

const Profile = () =>{
    return(
        <div style={{maxWidth:"700px",margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"240px",height:"240px",borderRadius:"120px"}}
                    src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"
                     />
                </div>
                <div>
                    <h4>Ramesh Verma</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>50 Posts</h6>
                        <h6>50 Followers</h6>
                        <h6>50 Followings</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
                <img className='item' src="https://unsplash.com/photos/NR705beN_CU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHx8fDE2NjUwNDI2ODA&force=true"></img>
            </div>
        </div>
    )
}

export default Profile