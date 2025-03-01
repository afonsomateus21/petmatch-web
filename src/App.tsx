import React, { useEffect, useState } from 'react';
import { Cat, Heart, Users, Trash2 } from 'lucide-react';
import { api } from './api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [animals, setAnimals] = useState([]);
  
  const [newUser, setNewUser] = useState({ 
    name: '', 
    login: '', 
    email: '', 
    password: '' 
  });

  const [newAnimal, setNewAnimal] = useState({ 
    name: '', 
    age: '', 
    size: '', 
    color: '', 
    gender: '', 
    description: '', 
    medicalHistory: '', 
    status: '', 
    guardian: '', 
    ong: '', 
    adopter: '', 
    typeOfAnimal: '' 
  });

  const fetchData = async () => {
    try {
      const userResponse = await api.get("/user");
      const animalResponse = await api.get("/animal");
      
      setUsers(userResponse.data);
      setAnimals(animalResponse.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleAnimalChange = (e) => {
    const { name, value } = e.target;
  
    setNewAnimal({ 
      ...newAnimal, 
      [name]: name === "age" && value !== "" ? Number(value) : value 
    });
  };
  
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/animal", newAnimal);
      setNewAnimal({ name: '', age: '', size: '', color: '', gender: '', description: '', medicalHistory: '', status: '', guardian: '', ong: '', adopter: '', typeOfAnimal: '' });
      await fetchData();
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
    }
  };
  
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user", newUser);
      setNewUser({ name: '', login: '', email: '', password: '' });
      await fetchData();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const removeUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  };

  const removeAnimal = async (id) => {
    try {
      await api.delete(`/animal/${id}`);
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover animal:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Heart className="w-8 h-8 text-rose-500" /> Dashboard de Adoção
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Cat className="w-5 h-5 text-purple-500" /> Cadastro de Animais
          </h2>
          <form onSubmit={handleAnimalSubmit} className="mt-4 space-y-2">
            <input type="text" name="name" placeholder="Nome" value={newAnimal.name} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="number" name="age" placeholder="Idade" value={newAnimal.age} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="size" placeholder="Porte" value={newAnimal.size} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="color" placeholder="Cor" value={newAnimal.color} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="gender" placeholder="Sexo" value={newAnimal.gender} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="description" placeholder="Descrição" value={newAnimal.description} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="medicalHistory" placeholder="Histórico" value={newAnimal.medicalHistory} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="status" placeholder="Status" value={newAnimal.status} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="guardian" placeholder="Guardian" value={newAnimal.guardian} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="ong" placeholder="ONG" value={newAnimal.ong} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="adopter" placeholder="Adotante" value={newAnimal.adopter} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />
            <input type="text" name="typeOfAnimal" placeholder="Tipo de Animal" value={newAnimal.typeOfAnimal} onChange={handleAnimalChange} className="w-full p-2 border rounded" required />

            <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">Cadastrar Animal</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" /> Cadastro de Usuários
          </h2>
          <form onSubmit={handleUserSubmit} className="mt-4 space-y-2">
            <input type="text" name="name" placeholder="Nome" value={newUser.name} onChange={handleUserChange} className="w-full p-2 border rounded" required />
            <input type="text" name="login" placeholder="Login" value={newUser.login} onChange={handleUserChange} className="w-full p-2 border rounded" required />
            <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleUserChange} className="w-full p-2 border rounded" required />
            <input type="password" name="password" placeholder="Senha" value={newUser.password} onChange={handleUserChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Cadastrar Usuário</button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Usuários Cadastrados</h2>
        <div className="bg-white p-6 rounded-lg shadow mt-4">
          {users.length === 0 ? <p className="text-gray-500">Nenhum usuário cadastrado.</p> : (
            <ul>
              {users.map(user => (
                <li key={user.codigo_usuario || user.id} className="flex justify-between items-center p-2 border-b">
                  <div className='w-full flex justify-evenly'>
                    <span>{user.nome || user.name}</span>
                    <span>{user.email}</span> 
                    <span>{user.login}</span>
                  </div>
                  <button onClick={() => removeUser(user.codigo_usuario || user.id)} className="text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Animais Cadastrados</h2>
        <div className="bg-white p-6 rounded-lg shadow mt-4">
          {animals.length === 0 ? <p className="text-gray-500">Nenhum animal cadastrado.</p> : (
            <ul>
              {animals.map(animal => (
                <li key={animal.codigo_animal || animal.id} className="flex justify-between items-center p-2 border-b">
                  <span>{animal.nome || animal.name} idade:{animal.idade || animal.age}</span>
                  <button onClick={() => removeAnimal(animal.codigo_animal || animal.id)} className="text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;