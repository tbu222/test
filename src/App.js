import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkMode, lightMode } from './utils/Theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from './pages/SignIn';
import Search from './pages/Search';
// import SignIn from "./pages/SignIn";
// import Search from "./pages/Search";
const Container = styled.div`
  display:flex;
`

const Main = styled.div`
  flex:7;
  background-color: ${({theme})=> theme.bg};
`;

const Wrapper =styled.div`
  padding: 20px 100px;
`;
function App() {
  const [lightTheme, setLightTheme]  = useState(true)
  return (
    <ThemeProvider theme={lightTheme ? lightMode : darkMode}>
      <Container>
        <BrowserRouter>
          <Menu lightTheme={lightTheme} setLightTheme={setLightTheme}></Menu>
          <Main>
            <Navbar></Navbar>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>}/>
                  <Route path="trends" element={<Home type="trend"/>}/>
                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                  <Route path="signin" element={<SignIn/>}></Route>
                  <Route path="search" element={<Search/>}/>
                  <Route path="video">
                    <Route path=":id" element={<Video></Video>}/>
                  </Route>

                </Route>
              </Routes>
            </Wrapper>
          </Main>
          {}
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
