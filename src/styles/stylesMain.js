import styled, {keyframes, css} from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.5);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg{
            margin-right: 10px;
        }
    }
`;

const animateLoading = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1; /*esta propriedade faz o input ocupar 100% do tamanho da linha (1 = 100%)*/
        border: 1px solid ${props => (props.alert ? "#ff0000" : "#ddd")}; /*se o props alert vier true, a borda fica vermelha*/
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

export const SubmitButton = styled.button.attrs(props => ({type: "submit", disabled: props.loading,}))` /*é possível passar atributos também, nesse caso especificando que o componente SubmitButton que eu estou fazendo é um botão com o tipo submit*/
    background-color: #0d2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    &[disabled]{ /*para acessar as propriedades de um elemento, usa-se &[nome da propriedade]{} */
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading && 
        css` 
            svg{ /*estou aplicando essa animação em todos elementos svg dentro do meu elemento SubmitButton quando o props loading for igual a 1 (os icones são svg)*/
                animation: ${animateLoading} 2s linear infinite;
            }
        `
    }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    li + li{ /*assim só aplica para cada elemento li que venha após outro elemento li, ou seja, ignora o primeiro*/
        border-top: 1px solid #eee;
    }

    a{
        color: #0d2636;
        text-decoration: none;
    }
`;

export const DeleteButton = styled.button.attrs({type: "button"})`
    background-color: transparent;
    color: #0d2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;

export const ErrorMessage = styled.p.attrs(props => ({hidden: props.alert,}))`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    color: #ff0000;

    &[hidden]{
        display: none;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: center;
 
    p{
        color: #fff;
    }
`;