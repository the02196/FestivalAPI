import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { styled } from 'styled-components'

const ASide = styled.div`
        position: fixed;
        right: 20px;
        bottom: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 5px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
    `
function Aside({ThemeSelect, themeConfig}) {
  return (
    <ASide onClick={ThemeSelect}><FontAwesomeIcon icon={themeConfig === 'light' ? faMoon : faSun} size="xl"/></ASide>
  )
}

export default Aside