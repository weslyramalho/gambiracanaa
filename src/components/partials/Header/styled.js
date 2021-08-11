import React from 'react';
import styled from 'styled-components'

export const HeaderArea = styled.div`
height: 60px;
background-color: #E2C547;
border-bottom: 1px solid #CCC;

.container {
    max-width: 1000px;
    margin: auto;
    display: flex;
}
a {
    text-decoration: none;
}

.logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 3rem;
    width: 3.75em;

    img{
        width: 20rem;
        height: 20rem;
    }

   
    .logo-1{ color:#FF0000; }
    .logo-2{ color:#00FF00; }
    .logo-3{ color:#0000FF; }

}

nav {
    padding-top:10px;
    padding-bottom:10px;

    ul, li {
        margin:0;
        padding:0;
        list-style:none;
    }

    ul {
        display:flex;
        align-items:center;
        height:40px;
    }

    li {
        margin-left:20px;
        margin-right:20px
        }
        .a, .button {
            border:0;
            background: none;
            color:#000;
            font-size:14px;
            text-decoration:none;
            cursor:pointer;
            outline:0;

            &:hover {
                color:#999;
            }

            &.button {
                background-color:#38732F;
                border-radius:4px;
                color:#FFF;
                padding:5px 10px;
            }

            &.button:hover {
                background-color:#E57706;
            }

        
    }
}
//responsividade
@media (max-width: 600px){
    & {
        height: auto;
    }
    .container{
        flex-direction:column;
    }
    .logo {
        justify-content:center;
        margin:20px 0;
    }
    nav ul {
         flex-direction:column;
         height: auto;
    }
    nav li {
        margin:10px 20px;
    }
}
`;