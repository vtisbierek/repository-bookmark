import React, {useState, useCallback, useEffect} from "react";
import {Container, Form, SubmitButton, List, DeleteButton, ErrorMessage, Footer} from "../styles/stylesMain";
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from "react-icons/fa";
import api from "../services/api";
import {Link} from "react-router-dom";

export default function Main(){
    const [newRepo, setNewRepo] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const repoStorage = JSON.parse(localStorage.getItem("listOfRepos"));
        if(repoStorage){
            setRepositories(repoStorage);
        }
        
    }, []);

    //sempre que houver alterações na minha lista de repositórios, eu preciso salvar as alterações no localStorage (não estou usando banco de dados)
    useEffect(() => {
        localStorage.setItem("listOfRepos", JSON.stringify(repositories));
    }, [repositories]);

    //esse é o método normal, usando um simples async e await na nossa requisição da API e atualizando os estados repositories e newRepo direto
    /*async function handleSubmit(event){
        event.preventDefault(); //preventDefault serve pra evitar que seja feito refresh na página após o evento de submit, que é o comportamento padrão
        const response = await api.get(`repos/${newRepo}`); //o endereço dos repositórios na API do github é https://api.github.com/repos/facebook/react por exemplo, e minha base URL é https://api.github.com, então eu adiciono o repos/ como string fixa mesmo e depois o nome do repositório que quero add, como por exemplo facebook/react
        const data = {
            name: response.data.full_name, //pegando apenas a propriedade full_name da resposta enviada pela API, pq é muita coisa e o resto não interessa
        }
        setRepositories([...repositories, data]); //adicionando os dados recebidos à lista de repositorios que eu já tinha, usando para isso o spread
        setNewRepo(""); //zerando o input pra limpar novamente o campo após o usuário cadastrar o repo que ele queria
    }*/

    //porém existe um jeito melhor, utilizando o react hook useCallback, que evita que sejam feitas renderizações desnecessárias quando muda algum estado
    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        async function submit(){
            setLoading(true);
            setAlert(false);
            try{
                if(newRepo === ""){
                    throw new Error("You must enter a repository.");
                }

                const response = await api.get(`repos/${newRepo}`);
                const data = {
                    name: response.data.full_name,
                }

                const isDuplicated = repositories.find(r => r.name === newRepo); //procura no estado repositories se tem algum item com o mesmo valor de newRepo, se tiver é porque o usuário está tentando salvar um repositório que já está na lista
                if(isDuplicated){
                    throw new Error("This repository is already saved on your list.");
                }

                setRepositories([...repositories, data]);
                setNewRepo("");
            } catch(error){
                setAlert(true);
                console.log(error.message);
                setAlertMessage(error.message);
            } finally{
                setLoading(false);
                console.log(repositories);
            }
        }

        submit();
        
    }, [newRepo, repositories]);

    function handleInputChange(event){
        setNewRepo(event.target.value);
        setAlert(false);
    }

    const handleDelete = useCallback(repo => {
        const find = repositories.filter(r => r.name !== repo); //usando a função filtro e filtrando o estado repositories para deixar apenas os repositórios que não sejam o informado (ou seja, este será deletado da lista)
        setRepositories(find);    
    }, [repositories]);

    const year = new Date().getFullYear();

    return (
        <>
        <Container>
            <h1>
                <FaGithub size={25} />
                My Repositories
            </h1>

            <ErrorMessage alert={!alert} >
                {alertMessage}       
            </ErrorMessage>

            <Form onSubmit={handleSubmit} alert={alert} >
                <input type="text" placeholder="Add Repository (example: facebook/react)" value={newRepo} onChange={handleInputChange} />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map(repo => (
                    <li key={repo.name} >
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)} >
                                <FaTrash size={14} />   
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repo/${encodeURIComponent(repo.name)}`} > {/*ver abaixo*/}
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
        <Footer>
            <p>VTisbierek © {year}</p>
        </Footer>
        </>
    );
} //preciso usar encodeURIComponent porque o router vai achar que a barra no nome do repo é outra pasta, e vai dizer que esse caminho não existe, usando a função encodeURIComponent a gnt diz pro route que aquilo tudo é uma coisa só