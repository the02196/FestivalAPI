import React, { useState } from 'react'
import Example_ from "./../components/Example"
import { styled } from 'styled-components';

const Content = styled.div`
  display: flex;
  justify-content: space-between;

`

function Example() {
  let [data, setData] = useState(Example_);
  let [job, setJob] = useState("전체");

  const dataFilter = data.filter(e => {
    if(job === "전체"){
      return e.job
    }else{
      return e.job === job
    }
  })
  
  const FilterJob = [...new Set(data.map(e => e.job))];
  console.log(FilterJob);

  return (
    <>
     <ul style={{display: "flex", justifyContent: "space-between"}}>
      <li onClick={()=>{setJob("전체")}}>전체</li>
      {
        FilterJob.map((e,i)=>{
          return(
            <li key={i} onClick={()=>{setJob(e)}}>{e}</li>
          )
        })
      }
    </ul>
     <Content>
    {
     dataFilter.map((el,i)=>{
        return(
          <p key={i}>{el.name}</p>
        )
      })
    }
      
    </Content>
    </>
  )
}
  

export default Example