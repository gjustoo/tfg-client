import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie"
import './styles/postStyle.css';
import showSnackBar from './util/SnackBar';
function Post(props) {

    const username = Cookies.get("user_name");

    const [liked, setLiked] = useState(false);

    const handleLike = (id) => {

        const data = { username, id }
        fetch("http://localhost:20000/post/likes_post/", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                setLiked(true);
                showSnackBar({ text: "Post Liked" });
            } else if (response.status === 420) {
                setLiked(false);
                showSnackBar({ text: "Post unliked" });

            } else {
                showSnackBar({ text: "Could not like post" });
            }
        });


    }
    useEffect(() => {
        setLiked(props.content.user_liked);
    }, [])


    return (
        <div style={{
            ...styles.post,
            ...styles[props.size]
        }}>

            <div className='card'>
                <div className='pin_modal'>
                    <span className='pin_modal_title' onClick={() => { window.open(props.content.source, "_blank") }}>{props.content.title}</span>
                    <div className='modal_head'>
                        <div className='save_card' onClick={() => { handleLike(props.content.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "red" : "white"} viewBox="0 0 512 512" height="50" width="50"><path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" /></svg>
                        </div>
                    </div>
                </div>
                <div className='pin_image' >
                    {}
                    {props.content.TYPE === 'IMAGE' && <img src={props.content.mediaUrl} style={{ ...imgStyles[props.size] }} alt='pin_image' />}
                    {props.content.TYPE === 'VIDEO' && getVideoEmbedded(props.content.mediaUrl, imgStyles[props.size])}

                </div>
            </div>
        </div >
    )
}

const imgStyles = {
    small: {
        width: '500px',
        height: '700px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',

    },
    medium: {
        width: 'auto',
        height: '700px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',


    },
    large: {
        width: 'auto',
        height: '900px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',


    }
}
const styles = {
    post: {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative'


    },
    small: {
        gridRowEnd: 'span 35'
    },
    medium: {
        gridRowEnd: 'span 50'

    },
    large: {
        gridRowEnd: 'span 63'

    },
    img: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',

    }
}



function getVideoEmbedded(url, style) {
    return (
        <video loop autoPlay src={url} style={style}  >
        </video>
    );
}



export default Post;