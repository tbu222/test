import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess, logout } from "../redux/userSlice";
import {auth, provider} from "../firebase";
import {signInWithPopup} from "firebase/auth"
import {Route, Navigate, useNavigate} from 'react-router-dom'
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content: center;
    height: calc(100vh - 50px);
    color: ${({theme})=> theme.text};
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction:column;
    background-color: ${({theme})=> theme.bgLighter};
    border: 1px solid ${({theme})=> theme.soft};
    padding: 20px 50px;
    gap: 10px;
`
const Title = styled.h1`
    font-size: 25px;
`
const SubTitle = styled.h2`
    font-size: 20px;   
    font-weight: 400;
`
const Input = styled.input`
    border: 1px solid ${({theme})=> theme.soft};
    border-radius: 5px;
    padding: 10px;
    width: 100%;
`
const Button = styled.button`
    border-radius: 5px;
    border: none;
    font-weight: 500;
    padding: 10px 20px;
    cursor: pointer;
`
const More = styled.div`
    display:flex;
    font-size: 15px;
    margin-top:10px;
    color: ${({theme})=> theme.textSoft};
`
const Link = styled.span`
    margin-left: 25px;
`
const Links = styled.div`
    margin-left: 50px;
`

const SignIn = ()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signInWithGoogle = async()=>{
        dispatch(loginStart())
        signInWithPopup(auth, provider).then((result)=>{
            axios.post("auth/google",{
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
            }).then((res)=>{
                dispatch(loginSuccess(res.data));
                navigate('/');
            })
        }).catch((error)=>{
            dispatch(loginFailure())
        });
    };
    const handleLogin = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await axios.post("/auth/signin", { name, password });
            dispatch(loginSuccess(res.data));
            navigate('/');
        }catch(err){
            dispatch(loginFailure());
        }
    };
    const handleSignUp = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await axios.post("/auth/signup", { name, email, password });
            dispatch(loginSuccess(res.data));
            navigate('/');
        }catch(err){
            dispatch(loginFailure());
        }
    };
    return  (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to Youtube</SubTitle>
                <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                <Button onClick={handleLogin}>Sign in</Button>
                <Title> or </Title>
                <Button onClick={signInWithGoogle}>Google Signin</Button>
                <Title> or </Title>
                <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
                <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                <Button onClick={handleSignUp}>Sign up</Button>
            </Wrapper>
            <More>
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn