import styled from 'styled-components';


export const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
`

export const LogoDiv = styled.div`

    padding-top:10%;
    display: flex;
    justify-content: center;
    align-items: center;

`
export const InputForm = styled.form`

    display: flex;
    padding: 5px;
    padding-left: 20px;
    align-items: center;
    background-color: #EFEFEF;
    width: 50%;
    height: 40px;
    margin: auto;
    border-radius: 18px;

`;

export const InputText = styled.input.attrs(props => ({
    type: "text"
}))`

    font-size: 20px;
    border: none;
    background: transparent;
    outline: none;
    width: 50%;

`;

export const DropdownMenu = styled.div`

    display: flex;
    position: relative;
    border: 1px solid #c2c2c2;
    border-radius: 5px;
    width: 100%;
    align-items: center;
    width: 50px;
    padding: 2px;
    margin-right: 10px;
    margin-left: auto;
    justify-content: center;

`

export const ValueDropDown = styled.h1`

    color: #666666;
    margin:1px;
    font-size: 16px;
    font-weight: normal;

`


export const DropDownMenuDiv = styled.div`

    margin-left: auto;
    position: relative;
    display: inline-block;

`

export const DropDownMenuContent = styled.div`

    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    height: 200px;
    border-radius: 5px;
    margin-right: 10px;
    white-space: nowrap;
    overflow-y: scroll;

    ${DropDownMenuDiv}:hover & {
        display: block;
    }

`

export const ListItems = styled.ul`

    padding: 0;
    padding-left:10px;
    list-style-type: none;

    &:hover{

        cursor: pointer;
    }

    li{
        margin-top: -15px;
        margin-bottom: 20px;


    }

    li  a{

        &:hover {

            color:#000;
        }

        font-size: 15px;
        color:#b5b5b5;

    }



`

export const listLinks = styled.a`

    


`

