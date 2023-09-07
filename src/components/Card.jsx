import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

const Container = styled.div`
    width: ${(props)=> props.type !=="sm" && "360px"};;
    margin-bottom: ${(props)=> props.type ==="sm" ? "10px":"50px"};
    cursor: pointer;
    display: ${(props)=> props.type ==="sm" && "flex"};
    gap: 10px;
`
const Image = styled.img`
    width: 100%;
    height: ${(props)=> props.type ==="sm" ? "150px":"200px"};
    background-color: grey;
    flex: 1;
`

const Details = styled.div`
    display: flex;
    margin-top: ${(props)=> props.type ==="sm" ? "0px":"15px"};
    gap: 10 px;
    flex: 1;
`

const ProfImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: grey;
    display: ${(props)=> props.type ==="sm" &&"none"};
`

const Texts= styled.div``;
const Title= styled.h1`
    font-size: 15px;
    font-weight: 500;
    color: ${({theme})=> theme.text }
`;
const ChannelName= styled.h2`
    font-size: 15px;
    color: ${({theme})=> theme.textSoft }
    margin: 10px 0px;
`;
const Info= styled.div`
    font-size: 15px;
    color: ${({theme})=> theme.textSoft }
`;

const Card= ({type, video})=> {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`);
            setChannel(res.data);

        };
        fetchChannel();
    }, [video.userId]);
    return (
        <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl}></Image>
                <Details type={type}>
                    <ProfImage type={type} src={channel.img}></ProfImage>
                    <Texts>
                        <Title>{video.title} </Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info>{video.views} views . {format(video.createdAt)} </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}
export default Card;