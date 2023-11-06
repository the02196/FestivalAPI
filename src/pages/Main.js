import axios from "axios";
import React, { useEffect, useState } from "react";

import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

const Content = styled.div`
  width: 100%;
  padding: 120px 0% 50px 0%;
  background-color: ${(props) => props.theme.colors.BgColor};
  overflow: hidden;
`;

const ContentWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 1.2%;
`;

const ContentItem = styled.div`
  background-color: ${(props) => props.theme.colors.ContentBg};
  flex-basis: 32.5%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: border-box;
  cursor: pointer;
  white-space: break-spaces; //줄이 길어지면 자동으로 줄 바꿈
  img {
    width: 100%;
    display: block;
    margin-bottom: 24px;
  }
  h3 {
    margin-bottom: 24px;
    color:  ${(props) => props.theme.colors.Color};
  }
  li {
    line-height: 1.7;
    margin-bottom: 3px;
    color:  ${(props) => props.theme.colors.Color};
  }
  @media screen and (max-width: 1200px) {
    flex-basis: 49%;
  }
  @media screen and (max-width: 640px) {
    flex-basis: 100%;
  }
`;

const Category = styled.div`
  width: 100%;
  margin-bottom: 1.2%;
  div {
    &.on{
      background-color: orange;
    }
  }
  ul {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      border: 1px solid #ddd;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.ContentBg};
      color: ${(props) => props.theme.colors.Color};
      &.on {
        background-color: violet;
        font-weight: bold;
        color: white;
      }
      
    }
  }
`;

const Pagination = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  ul{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
    li {
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      background-color: white;
      padding: 5px 20px;
      &.on{
        background-color: violet;
        color: white;
      }
    }
  }
`

function Main() {
  const [data, setData] = useState();

  const list = 10;
  const [allData, setAllData] = useState();
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [gugun, setGugun] = useState("전체");
  const pagination = 5;
  const totalPage = Math.floor(totalCnt / list);
  
  let startPage; 
  let endPage;
  

  const currentBlock = Math.ceil(page / pagination);
  // ceil은 소수점이 나왔을 때, 반올림해서 리턴한다. Math.floor()의 반대
  startPage = (currentBlock - 1) * pagination + 1;
  endPage = startPage + pagination - 1;
  if(endPage > totalPage){
    endPage = totalPage;
  }

  const PrevBlock = () => {
    if(startPage > 1){
      setPage(startPage - pagination);
    }
  }

  const NextBlock = () => {
    if(endPage < totalPage){
      setPage(startPage + pagination);
    }
  }

  const PageList = [];
  for(let i = startPage; i < endPage; i++){
    PageList.push(
      <li key={i}
      onClick={()=>{setPage(i + 1)}}>{i}</li>
    )
  }
  console.log(PageList)

  useEffect(() => {
    axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=${page}&numOfRows=10&resultType=json`)
    .then(function(res){
      setData(res.data.getFestivalKr.item);
      setTotalCnt(res.data.getFestivalKr.totalCount)
      
    })
  }, [page]);

  useEffect(() => {
    axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=100&resultType=json`)
    .then(function(res){
      setAllData(res.data.getFestivalKr.item);
    })
  }, []);


  const FilterData = data && data.filter(e => {
    return gugun === "전체" || gugun === e.GUGUN_NM;
  })

  const FilterGugun = [...new Set(allData && allData.map((e) => e.GUGUN_NM))];

  const [isActive, setIsActive] = useState(-1);
  const [isOn, setIsOn] = useState(-1);

  return (
    <>
      <Content>
        <Category>
          {/* <div className={isOn === -1 ? "on" : ""} onClick={()=>{
                  setIsOn(-1)}}>인덱스 번호 : -1</div>
         {
           Array(5).fill().map((e,i)=>{
              return(
                <div className={isOn === i ? "on" : ""} onClick={()=>{
                  setIsOn(i)
                }}
                >{`인덱스 번호 : ${i}`}</div>
              )
           })
         } */}
          <ul>
            <li className={isActive === -1 ? "on" : ""} onClick={()=>{
                setIsActive(-1)
                setGugun("전체");
              }}>전체</li>
            {data && FilterGugun.map((e, i) => {
              return <li className={isActive === i ? "on" : ""} onClick={()=>{
                // setIsActive(isActive === false ? true : false)
                setIsActive(i)
                setGugun(e)
              }} key={i}>{e}</li>;
            })}
          </ul>
        </Category>
        <ContentWrap>
          {data && FilterData.map((e, i) => {
            return (
              <ContentItem key={i}>
                <NavLink to={`detail/${e.UC_SEQ}`} state={e}>
                  <h3>{e.TITLE}</h3>
                  <img src={e.MAIN_IMG_THUMB} alt={e.MAIN_TITLE}></img>
                  <ul>
                    <li>구군 : {e.GUGUN_NM}</li>
                    {/* {
                      Object.entries(e).map((el,i)=>{
                        return (
                          el[1] !== "" &&
                          <li>운영 및 시간 : {e.USAGE_DAY_WEEK_AND_TIME}</li>
                          <li>편의 시설 : {e.MIDDLE_SIZE_RM1}</li>
                          <li>이용요금 : {e.USAGE_AMOUNT}</li>
                          <li>교통편 : {e.TRFC_INFO}</li>
                          <li>주요장소 : {e.MAIN_PLACE}</li>
                        )
                      })
                    } */}
                    {e.USAGE_DAY_WEEK_AND_TIME !== "" && (
                      <li>운영 및 시간 : {e.USAGE_DAY_WEEK_AND_TIME}</li>
                    )}
                    {e.MIDDLE_SIZE_RM1 !== "" && (
                      <li>편의 시설 : {e.MIDDLE_SIZE_RM1}</li>
                    )}
                    {e.USAGE_AMOUNT !== "" && (
                      <li>이용요금 : {e.USAGE_AMOUNT}</li>
                    )}
                    {e.TRFC_INFO !== "" && <li>교통편 : {e.TRFC_INFO}</li>}
                    {e.MAIN_PLACE !== "" && <li>주요장소 : {e.MAIN_PLACE}</li>}
                  </ul>
                </NavLink>
              </ContentItem>
            );
          })}
        </ContentWrap>
      </Content>
      <Pagination>
        <ul>
          <li onClick={PrevBlock}>이전</li>
          {PageList}
          <li onClick={NextBlock}>다음</li>
        </ul>
      </Pagination>
    </>
  );
}

export default Main;
