import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main.js"
import Detail from "./pages/Detail.js"
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Example from "./pages/Example.js"
import Example2 from "./pages/Example2.js"
import Example3 from "./pages/Example3.js"
import Example4 from "./pages/Example4";
import Datepicker from "./pages/Datepicker";


function App() {
  
  const light = {
    colors: {
      Primary : "orange",
      Secondary : "black",
      BgColor : "#e9f1f6",
      Color : "#000",
      Content : "#fff"
    }
  }
  
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary : "white",
      BgColor : "#333",
      Color : "#e9e9e9",
      ContentBg: "#272929"
    }
  }
  
  const [themeConfig, setThemeConfig] = useState("light");

  const DarkMode = themeConfig === 'light' ? light : dark;

  const ThemeSelect = () => {
    setThemeConfig(themeConfig === 'light' ? 'dark' : 'light')
  }


  return (
   <>
   <ThemeProvider theme={DarkMode}>
    <GlobalStyle />
    <Aside ThemeSelect={ThemeSelect} themeConfig={themeConfig}/>
    {/* 아래는 고정되는 부분 */}
    {/* <ul>
      <li><NavLink to="/">홈</NavLink></li>
      <li><NavLink to="/detail">디테일</NavLink></li>
      <li><NavLink to="/example">Example</NavLink></li>
    </ul> */}
    {/* NAV가 고정되고 아래 부분만 부드럽게 바뀌는 사이트는 보통 이런 라우터를 사용한 경우다. */}
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/ex" element={<Example />}></Route>
      <Route path="/ex2" element={<Example2 />}></Route>
      <Route path="/ex3" element={<Example3 />}></Route>
      <Route path="/ex4" element={<Example4 />}></Route>
      <Route path="/detail/:seq" element={<Detail />}></Route>
      <Route path="/datepicker" element={<Datepicker />}></Route>
    </Routes>
    </ThemeProvider>
   </>
  );
}

export default App;
