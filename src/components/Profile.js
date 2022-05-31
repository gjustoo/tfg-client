import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PostLayoutLiked from "./PostLayoutLiked";
import './styles/profileStyle.css';
import showSnackBar from "./util/SnackBar";

function Profile() {
    const navigate = useNavigate();

    const username = Cookies.get("user_name");

    const liked_url = ("http://localhost:20000/post/liked/" + username);
    const getUserData = ("http://localhost:20000/users/user/" + username);
    const getFollowingURL = ("http://localhost:20000/users/following_pages/" + username);
    const getPfpUrl = ("http://localhost:20000/users/user/" + username + "/get_pfp");
    const setPfpUrl = ("http://localhost:20000/users/upload/pfp/" + username);
    const getBannerUrl = ("http://localhost:20000/users/user/" + username + "/get_banner");
    const setBannerUrl = ("http://localhost:20000/users/upload/banner/" + username);

    useEffect(() => {
        const isLogged = Cookies.get("user_logged");
        if (!isLogged) {
            navigate('/login');
        }
        getPfp();
        getBanner();
        getFollowing();
        getPosts();
    }, [])

    const [userData, setUserData] = useState({});
    const [followingPages, setFollowingPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pfp, setPfp] = useState(null);
    const [banner, setBanner] = useState(null);


    const getPosts = async () => {
        try {
            const res = await axios.get(getUserData);
            setUserData(res.data);
            setLoading(true);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getPfp = async () => {
        try {
             await axios
                .get(getPfpUrl, { responseType: "blob" })
                .then(response => {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onload = function () {

                        var imageDataUrl = reader.result;
                        setPfp(imageDataUrl);
                    }
                    // console.log(Buffer.from(response.data, 'binary').toString('base64'))
                }
                )

            setLoading(true);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getBanner = async () => {
        try {
            await axios
                .get(getBannerUrl, { responseType: "blob" })
                .then(response => {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onload = function () {

                        var imageDataUrl = reader.result;
                        setBanner(imageDataUrl);
                    }
                    // console.log(Buffer.from(response.data, 'binary').toString('base64'))
                }
                )

            setLoading(true);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getFollowing = async () => {
        try {
            const res = await axios.get(getFollowingURL);
            setFollowingPages(res.data);
            setLoading(true);

        } catch (err) {
            console.log(err.message);
        }
    }

    const handleSubmitPfp = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append("file", e.target.files[0])
            const response = await axios.post(setPfpUrl, formData);
            if (response.status === 200) {
                showSnackBar({ text: "Profile image set" });
                window.location.reload();
            } else {
                showSnackBar({ text: "Could not set profile image" })
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleSubmitBanner = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append("file", e.target.files[0])
            const response = await axios.post(setBannerUrl, formData);
            if (response.status === 200) {
                showSnackBar({ text: "Banner image set" });
                window.location.reload();
            } else {
                showSnackBar({ text: "Could not set banner image" })
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="profile_page">
            <div className='profile_wrapper'>
                <div className="profile_banner">
                    {loading && <span className="profile_username"> {userData.username} </span>}
                    <div className="banner_change_button">
                        <form method="post" encType="multipart/form-data">
                            <input type="file" className="input_pfp" name="image" accept="image/png, image/jpeg" onChange={(e) => handleSubmitBanner(e)} />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" /></svg>
                        </form>
                    </div>
                    <img src={banner || "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} alt="" />

                </div>
                <div className="profile_body">
                    <div className="personal_data">

                        <div className="pfp_wrapper_main">
                            <img src={pfp || "https://i.pinimg.com/564x/4a/9b/a7/4a9ba770888a903abaca0738fa72dee6.jpg"} alt="profile" />
                            <div className="pfp_change_button">
                                <form onSubmit={handleSubmitBanner} method="post" encType="multipart/form-data">
                                    <input type="file" className="input_pfp" name="image" accept="image/png, image/jpeg" onChange={(e) => handleSubmitPfp(e)} />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" /></svg>
                                </form>
                            </div>
                        </div>

                        <div className="user_data">
                            {loading && <p > @{userData.username} </p>}
                            {loading && <p > Joined: {userData.formatted_date} </p>}

                        </div>

                        <div className="contacts_wrapper">
                            <span>
                                Following pages :
                            </span>
                            <div className="contacts_container">
                                {loading && followingPages.map((page, key) => (
                                    <Contact key={key} id={page.id} user={username} platform={page.platform} name={page.name} />
                                ))}
                            </div>

                        </div>

                    </div>
                    <div className="liked_posts_wrapper">
                        <span className='liked_posts_title'>Liked posts</span>
                        <PostLayoutLiked small="true" url={liked_url} />

                    </div>
                </div>
            </div>


        </div>
    )
}

function Contact(props) {

    const handleUnfollow = () => {
        const username = Cookies.get("user_name");
        axios.delete("http://localhost:20000/users/" + username + "/unfollow/" + props.id).then(response => {

            if (response.status === 200) {
                showSnackBar({ text: "Unfollowed" })
                window.location.reload();
            } else {
                showSnackBar({ text: "Could not unfollow" })
                window.location.reload();
            }

        })

    }

    return (
        <div className="contact_wrapper">
            <div className="pfp_wrapper_small">
                <div className="unfollow_dot" onClick={handleUnfollow}>X</div>
                <img src={props.platform.icon_url} alt="profile" />
            </div>
            <span className="icon_name">{(props.platform.name === "twitter") ? "@" + props.name : "r/" + props.name}</span>
        </div>
    )
}








export default Profile;