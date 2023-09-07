import React from 'react'
import styled from 'styled-components'
import logo from '../logo.svg';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
const Container = styled.div`
    flex:1;
    height:100vh;
    Background-color: ${({theme})=> theme.bg };
    color: ${({theme})=> theme.text };
    position: sticky;
    top:0;
`

const Wrapper = styled.div`
    padding: 18px 26px;
`

const Logo = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    font-weight:bold;
    margin-bottom:25px;
`;

const Img = styled.img`
    height:25px;
`
const Hr = styled.hr`
    margin: 15px 0px;
    border:0.5 px solid ${({theme})=> theme.soft };
`
const Item = styled.div`
    display:flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 10px 0px ;
    &:hover{
        background-color: ${({theme})=> theme.soft };
    }
`
const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #dddddd;
    margin-bottom:20px;
`
const Login = styled.div`
`

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid blue;
    color: blue;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`
const Menu = ({ lightTheme, setLightTheme }) =>{
    const {currentUser} = useSelector(state=> state.user)
    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Logo>
                    <Img src={logo} />
                    YouTube
                </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                <Item>
                    <ExploreOutlinedIcon />
                    Explore
                </Item>
                </Link>
                <Link
                to="subscriptions"
                style={{ textDecoration: "none", color: "inherit" }}
                >
                <Item>
                    <SubscriptionsOutlinedIcon />
                    Subscriptions
                </Item>
                </Link>
                <Hr />
                <Item>
                <VideoLibraryOutlinedIcon />
                Library
                </Item>
                <Item>
                <HistoryOutlinedIcon />
                History
                </Item>
                <Hr />
                {!currentUser &&
                <>
                    <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button>
                        <AccountCircleOutlinedIcon />
                        SIGN IN
                        </Button>
                    </Link>
                    </Login>
                    <Hr />
                </>
                }
                <Title>BEST OF YOUTUBE</Title>
                <Item>
                <LibraryMusicOutlinedIcon />
                Music
                </Item>
                <Item>
                <SportsBasketballOutlinedIcon />
                Sports
                </Item>
                <Item>
                <SportsEsportsOutlinedIcon />
                Gaming
                </Item>
                <Item>
                <MovieOutlinedIcon />
                Movies
                </Item>
                <Item>
                <ArticleOutlinedIcon />
                News
                </Item>
                <Item>
                <LiveTvOutlinedIcon />
                Live
                </Item>
                <Hr />
                <Item>
                <SettingsOutlinedIcon />
                Settings
                </Item>
                <Item>
                <FlagOutlinedIcon />
                Report
                </Item>
                <Item>
                <HelpOutlineOutlinedIcon />
                Help
                </Item>
                <Item onClick={() => setLightTheme(!lightTheme)}>
                    <SettingsBrightnessOutlinedIcon />
                    {lightTheme ? "Dark" : "Light"} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu
