import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://6796457bbedc5d43a6c4c20e.mockapi.io/api/v1/profiles/";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}${id}`);
      await fetchTodos();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              {todo.id} {todo.name} {todo.gender}
              <Link to={`/todo/${todo.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={async () => await deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
