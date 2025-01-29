import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../../assets/trash.png';
import { getUsers, createUser, deleteUser } from '../../services/api.js';

function Home() {
  const [users, setUsers] = useState([]);
  const inputTitle = useRef();
  const inputDescription = useRef();
  const inputStatus = useRef();

  async function fetchUsers() {
    try {
      const usersFromApi = await getUsers();
      if (Array.isArray(usersFromApi)) {
        setUsers(usersFromApi);
      } else {
        console.error('Erro: O retorno da API não é um array', usersFromApi);
        setUsers([]);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]);
    }
  }

  async function handleCreateTask() {
    try {
      await createUser({
        titulo: inputTitle.current.value,
        descricao: inputDescription.current.value,
        status: inputStatus.current.value,
      });
      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <form action="">
        <h1>Gerenciador de tarefas</h1>
        <label>Titulo:</label>
        <input name='titulo' type='text' placeholder='Escreva o titulo:' ref={inputTitle} />
        <label>Descrição:</label>
        <input name='descricao' type='text' placeholder='Escreva a descrição:' ref={inputDescription} />
        <label>Status:</label>
        <input name='status' type='text' placeholder='Defina o Status:' ref={inputStatus} />
        <button type='button' onClick={handleCreateTask}>Cadastrar Tarefas</button>
      </form>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Titulo: <span>{user.titulo}</span></p>
              <p>Descrição: <span>{user.descricao}</span></p>
              <p>Status: <span>{user.status}</span></p>
            </div>
            <button onClick={() => handleDeleteUser(user.id)}>
              <img src={Trash} alt="lixo" />
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default Home;