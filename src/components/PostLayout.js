import React from 'react';
import Post from './Post';

function PostLayout() {
    return (
        <div style={styles.post_container}>
            <Post size ='small'/>
            <Post size ='medium'/>
            <Post size ='small'/>
            <Post size ='medium'/>
            <Post size ='large'/>
            <Post size ='small'/>
            <Post size ='small'/>
            <Post size ='medium'/>
            <Post size ='large'/>
            <Post size ='medium'/>
            <Post size ='large'/>
            <Post size ='large'/>
            <Post size ='small'/>
            <Post size ='medium'/>
            <Post size ='large'/>
            <Post size ='small'/>
            <Post size ='medium'/>
            <Post size ='large'/>
        </div>
    )
}


const styles ={
    post_container :{
        margin:0,
        padding:0,
        width:'80vw',
        backgroundColor:'black',
        position:'absolute',
        left:'50%',
        transform:'translateX(-50%)',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,250px)',
        gridAutoRows:'10px',
        justifyContent:'center'

    }
}

export default PostLayout;