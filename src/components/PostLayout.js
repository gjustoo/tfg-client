import axios from "axios";
import React, { useEffect, useState } from 'react';
import Post from './Post';

function PostLayout(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [end, setEnd] = useState(false);

    let update = true;
    let page = 0;

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            console.log("Scrolled");
            getPosts();
        }
    }

    const getPosts = () => {
        axios.post(props.url + update + "&page=" + page).then(({ data }) => {

            const newPosts = [];
            data.forEach((p) => { newPosts.push(p); });
            if(newPosts.length !== 0){
                setPosts((oldPosts) => [...oldPosts, ...newPosts]);
                setEmpty(data && data.length);
                setLoading(true);
            }
            
        }).catch(error => {
            setEnd(true);
        });
        page += 1;

        update = false;

    }
    useEffect(() => {
        getPosts();
        window.addEventListener("scroll", handleScroll);
    }, [])

    return (
        <div style={props.small ? styles.post_container_small : styles.post_container}>

            {loading && posts.map((post, key) => (
                (!post.mediaUrl.includes("gfycat")) ?

                    <Post content={post} key={key} id={post.id} size={randomSize()}></Post> : null))}
            {(!loading) &&
                <div style={props.small ? styles.post_container_small : styles.post_container}>
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                    <Post content={{ title: "No sigues a ninguna pagina o usuario" }} size={randomSize()} />
                </div>
            }
        </div>
    )
}

function randomSize() {
    var size = Math.floor(Math.random() * (3 + 1));
    if (size === 3) {
        return "small";
    }
    if (size === 2) {
        return "large";
    }
    return "medium";

}

const styles = {
    post_container: {
        margin: 0,
        padding: 0,
        width: '80vw',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridAutoRows: '10px',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(auto-fill, 350px)'
    },
    post_container_small: {
        margin: 0,
        padding: 0,
        width: '100%',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridAutoRows: '10px',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(auto-fill, 250px)'
    }
}

export default PostLayout;