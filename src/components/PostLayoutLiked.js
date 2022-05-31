import axios from "axios";
import React, { useEffect, useState } from 'react';
import Post from './Post';

function PostLayoutLiked(props) {

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [empty, setEmpty] = useState(true);



    const getLiked = () => {
        axios.post(props.url).then(({ data }) => {
            setPosts(data);
            setEmpty(data.length == 0 );
            setLoadingPosts(true);
        });
    }
    useEffect(() => {
        getLiked();
    }, [])

    return (
        <div style={props.small ? styles.post_container_small : styles.post_container}>

            {loadingPosts && posts.map((post, key) => (

                (!post.mediaUrl.includes("gfycat")) ?
                    <Post content={post} key={key} size={randomSize()}></Post> : null))}
            {empty  &&
                <div style={props.small ? styles.post_container_small : styles.post_container}>
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} empty={true} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
                    <Post content={{ title: "No has indicado que te gusta ningun post" }} size={randomSize()} />
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

export default PostLayoutLiked;