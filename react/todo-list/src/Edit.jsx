import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://6796457bbedc5d43a6c4c20e.mockapi.io/api/v1/todos/";

function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState({ name: "" });

  const fetchTodos = async (todoId) => {
    try {
      const response = await axios.get(BASE_URL + todoId);
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos(id);
  }, [id]);

  function nameChange(event) {
    setTodo((previousState) => ({
      ...previousState,
      name: event.target.value,
    }));
  }

  async function updateName() {
    try {
      await axios.put(`${BASE_URL}/${id}`, {
        name: todo.name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>Hello Edit page {todo.id}</div>
      <div>
        <input type="text" onChange={nameChange} value={todo.name} />
        {todo.gender}
      </div>
      <button type="submit" onClick={() => updateName()}>
        Edit
      </button>
    </>
  );
}

export default Edit;
