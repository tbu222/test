import React, { useEffect, useState } from "react";
import axios from "axios"
import styled from "styled-components"
import {format} from "timeago.js";

const Container = styled.div`
    display:flex;
    gap: 10px;
    margin: 30px 0px;
`;
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const Name = styled.span`
    font-size: 15px;
    font-weight: 500;
`

const Date = styled.span`
    font-size: 10px;
    font-weight: 300;
    color: ${({theme})=> theme.textSoft };
    margin-left: 5px;
`

const Text = styled.span`
    font-size: 15px;

`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme})=> theme.text };
`
const Comment = ({ comment }) => {
    
    const [channel,setChannel] = useState({});
    useEffect(() => {
        const fetchComment = async () => {
          const res = await axios.get(`/users/find/${comment.userId}`);
          setChannel(res.data)
        };
        fetchComment();
    }, [comment.userId]);
    return (
        <Container>
            <Avatar src={channel.img}></Avatar>
            <Details>
                <Name> 
                    {channel.name} <Date> {format(comment.createdAt)}</Date>
                </Name>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    )
}

export default Comment