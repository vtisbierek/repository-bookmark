import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";

const animateLoading = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    svg{
        margin-bottom: 20px;
        animation: ${animateLoading} 3s linear infinite;
    }
`;

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 30px;
    margin: 80px auto;
`;

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background-color: transparent;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2636;
    }

    p{
        font-size: 14px;
        margin-top: 5px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 20px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{ /*o & se refere ao elemento pai, então nesse caso significa li + li (ou seja, vai ignorar apenas o primeiro li da lista)*/
            margin-top: 10px;    
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0d2636;
        }

        div{
            flex: 1;
            margin-left: 12px;

            p{
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }
        }

        strong{
            font-size: 15px;

            a{
                text-decoration: none;
                color: #222;
                transition: 0.3s;

                &:hover{
                    color: #0071db;
                }
            }

            span{
                background-color: #222;
                color: #fff;
                font-size: 12px;
                border-radius: 4px;
                font-weight: 600;
                padding: 5px 7px;
                margin-left: 10px;
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background-color: #0d2636;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        margin-top: 20px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    span{
        color: #0d2636;
        margin-top: 20px;
    }
`;

export const StateSelector = styled.div`
    display: flex;
    align-items: center;
`;

export const SelectButton = styled.button.attrs({type: "button"})`
    outline: 0;
    border: 0;
    background-color: ${props => (props.selected ? "#0071db" : "#000")};
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 20px 5px 0;
    opacity: ${props => (props.selected ? "1" : "0.5")}; 
`;