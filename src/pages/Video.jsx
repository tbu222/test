import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import {format} from "timeago.js";
import Recommendation from "../components/Recommendation";
const Container = styled.div`
    display:flex;
    gap: 25px;
`
const Content = styled.div`
    flex:5;
`
const Channel = styled.div`
    display: flex;
    justify-content: space-between;

`;

const ChannelInfo= styled.div`
    display:flex;
    gap:20px;
`;
const Subscribe= styled.button`
    background-color: red;
    font-weight: 500;
    color: white;
    border: None;
    border-radius: 5px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;
const VideoFrame = styled.video`
    width: 100%;
    width: 100%;
    object-fit: cover;
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const ChannelDetail =styled.div`
    display:flex;
    flex-direction: column;
    color: ${({theme})=> theme.text};
`;
const ChannelName =styled.span`
    font-weight: 500;
`;
const ChannelCounter =styled.span`
    margin-top: 5px;
    margin-bottom: 15px;
    color: ${({theme})=> theme.textSoft};
    font-size: 15px;
`;
const Description =styled.p`
    font-size: 15px;
`;
const VideoWrapper = styled.div``
const Title = styled.h1`
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme})=> theme.text };
`

const Details = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
`
const Info = styled.div`
    color: ${({theme})=> theme.textSoft };
`

const Buttons = styled.div`
    display: flex;
    gap: 15px;
    color: ${({theme})=> theme.text };
`

const Button = styled.div`
    display:flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    border: 0.5px solid  ${({theme})=> theme.soft };
    margin: 15px 0px;
`
const Video = () => {
    const {currentUser} = useSelector((state)=> state.user);
    const {currentVideo} = useSelector((state)=> state.video);
    const dispatch = useDispatch();
    const path = useLocation().pathname.split("/")[2];
    const [channel, setChannel] = useState({})
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const videoRes = await axios.get(`/videos/find/${path}`);
                const ChannelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
                
                setChannel(ChannelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            }catch(err){}
        };
        fetchData();
    },[path,dispatch])
    console.log('test', currentVideo)
    const handleLike =async ()=>{
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }

    const handleDislike =async ()=>{
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
    }

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
          ? await axios.put(`/users/unsub/${channel._id}`)
          : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo.videoUrl} controls />
                </VideoWrapper>
                <Title> {currentVideo.title}</Title>
                <Details>
                    <Info>{currentVideo.views} views . {format(currentVideo.createdAt)}</Info>
                    <Buttons>
                        <Button onClick={handleLike}> 
                            {currentVideo.likes?.includes(currentUser?._id) ? (
                                <ThumbUpIcon />
                            ) : (
                                <ThumbUpOutlinedIcon />
                            )}{" "}
                            {currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}> 
                            {currentVideo.dislikes?.includes(currentUser?._id) ? (
                            <ThumbDownIcon />
                            ) : (
                            <ThumbDownOffAltOutlinedIcon />
                            )}{" "}
                            Dislike

                        </Button>
                        <Button> <ReplyOutlinedIcon/></Button>
                        <Button> <AddTaskOutlinedIcon /> Save</Button>
                    </Buttons>
                </Details>
                <Hr></Hr>

                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img}></Image>
                        <ChannelDetail>
                            <ChannelName> {channel.name}</ChannelName>
                            <ChannelCounter> {channel.subscribers}</ChannelCounter>
                            <Description>{currentVideo.desc}</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSub}> {currentUser?.subscribedUsers.includes(channel._id) ? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
                </Channel>

                <Hr></Hr>
                <Comments videoId={currentVideo._id}></Comments>
            </Content>
            <Recommendation tags={currentVideo.tags}>
            </Recommendation>
        </Container>
    )
}

export default Video