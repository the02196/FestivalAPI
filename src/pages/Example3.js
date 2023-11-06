import React, { useState } from 'react'
import Example3_ from './../components/Example3'
import { styled } from 'styled-components';

const ContentWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 30px;
`
const TextBox = styled.li`
  padding: 5px 10px;
  border: 1px solid black;
  display: inline-block;
  font-size: 13px;
`

const ButtonWrap = styled.ul`
    display: flex;
    justify-content: space-between;
    max-width: 400px;
    margin: 20px auto;
`

const ButtonBox = styled.li`
  padding: 10px 20px;
  border: 1px solid black;
  display: inline-block;
`

function Example3() {
  let [data, setData] = useState(Example3_);
  let [animal, setAnimal] = useState("전체");
  let [gender, setGender] = useState("전체");
  const FilterCategory = [...new Set(data.map(e => e.animal))];
  const FilterCategoryGender = [...new Set(data.map(e => e.gender))];

  const dataFilter = data.filter(e => {

    let isAnimal = animal === "전체" || e.animal === animal;
    let isGender = gender === "전체" || e.gender === gender;
    return isAnimal && isGender;
    
  // return(animal === "전체" ? e.animal : e.animal === animal);

  //   if (animal === "전체") {
  //     return e.animal
  //   } else {
  //     return e.animal === animal
  //   }
  // 
  })
 
  return (
    <>
      <ContentWrap>
        {
          dataFilter.map((el, i) => {
            return (
              <TextBox key={i}>{el.animal} - {el.gender} - {el.height}</TextBox>
            )
          })
        }
      </ContentWrap>
      <ButtonWrap>
        <ButtonBox>전체</ButtonBox>
        {
          FilterCategory.map((e, i) => {
            return (
              <ButtonBox key={i} onClick={() => { setAnimal(e) }}>{e}</ButtonBox>
            )
          })
        }
      </ButtonWrap>
      <ButtonWrap>
      <ButtonBox>전체</ButtonBox>
        {
          FilterCategoryGender.map((e, i) => {
            return (
              <ButtonBox key={i} onClick={() => { setGender(e) }}>{e}</ButtonBox>
            )
          })
        }
      </ButtonWrap>
    </>
  )
}

export default Example3