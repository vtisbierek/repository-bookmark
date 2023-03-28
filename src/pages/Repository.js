import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Container, Owner, Loading, BackButton, IssuesList, PageActions, StateSelector, SelectButton} from "../styles/stylesRepo";
import api from "../services/api";
import {FaSpinner, FaArrowLeft} from "react-icons/fa";

export default function Repository(){ //Objeto match, ver: https://v5.reactrouter.com/web/api/match/null-matches
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [state, setState] = useState("all");
    
    const {repoName} = useParams(); //hook do react-router-dom v6 que me permite pegar o path dinâmico desse route

    useEffect(()=>{
        async function load(){
            //const response = await api.get(`/repos/${repoName}`); //eu precisaria fazer duas requisições, para pegar as informações gerais do repo e também as issues, que ficam num endpoint diferente
            //const issues = await api.get(`/repos/${repoName}/issues`);

            const [repoData, issueData] = await Promise.all([ //porém tem um jeito melhor de fazer múltiplas requisições (desde que não tenha problema que elas sejam feitas simultaneamente)
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, { //o axios permite passar os parâmetros da requisição dessa forma, com vírcula e um objeto, se fosse do jeito normal eu teria que passar os parâmetros no próprio endpoint, mexendo na url
                    params: {
                        state: state, //para receber somente as issues que estiverem abertas
                        per_page: 5, //para receber apenas 5 itens, não mais que isso (senão viria um resultado com uma montanha de dados)
                    },
                })
            ]);

            setRepository(repoData.data);
            setIssues(issueData.data);
            setLoading(false);
        }

        load();

    }, [repoName, state]);

    useEffect(() => {
        async function newIssuePage(){
            const newPage = await api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: state,
                    page: page,
                    per_page: 5,
                },
            });
            setIssues(newPage.data);
        }

        newIssuePage();

    }, [page, state, repoName]);

    function handlePage(action){
        setPage(action === "back" ? page - 1 : page + 1); //se a string enviada como parâmetro pelo botão for "back", volta uma página, caso contrário avança uma página
    }

    function handleState(currentState){
        setState(currentState);
    }

    if(loading){
        return (
            <Loading>
                <FaSpinner color="#FFF" size={40} />
                <h1>Loading...</h1>
            </Loading>     
        );
    }
    
    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>

            <Owner>
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <StateSelector>
                <SelectButton type="button" selected={state === "all"} onClick={() => handleState("all")} >All</SelectButton>
                <SelectButton type="button" selected={state === "open"} onClick={() => handleState("open")} >Open</SelectButton>
                <SelectButton type="button" selected={state === "closed"} onClick={() => handleState("closed")} >Closed</SelectButton>
            </StateSelector>

            <IssuesList>
                {issues.map(item => (
                    <li key={String(item.id)} > {/*a key deve ser uma string, e o id é um número, então estou convertendo pra string pra usar na key*/}
                        <img src={item.user.avatar_url} alt={item.user.login} />
                        <div>
                            <strong>
                                <a href={item.html_url} target="_blank" rel="noreferrer" >
                                    {item.title}
                                </a>
                                {item.labels.map(label => (
                                    <span key={String(label.id)} >
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>{item.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button" disabled={page < 2} onClick={() => handlePage("back")} >Back</button>
                <span>{`Page ${page}`}</span>
                <button type="button" onClick={() => handlePage("next")} >Next</button>
            </PageActions>
        </Container>
    );
}