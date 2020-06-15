import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "GoStack",
      url: "https://www.rocketseat.com.br/",
      techs: ["ReactJS", "NodeJs"]
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => {
      const newRepo = repositories.filter((repository) => repository.id !== id);
      setRepository([...newRepo]);
    });
  }

  useEffect(()=>{
    api.get("/repositories").then(response => {
      setRepository(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
