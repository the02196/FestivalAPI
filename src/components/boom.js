import React, { useState } from 'react'
import { styled } from 'styled-components';

const Box = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px auto;
`

function boom() {
    const [bomb, setBomb] = useState(""); 
    return (
    <>
        <Box>{bomb === "터져라" ? "펑" : "폭탄"}</Box>
        <button onClick={()=>{
        setBomb("터져라");
        }}></button>
    </> 
  )
}

export default boom