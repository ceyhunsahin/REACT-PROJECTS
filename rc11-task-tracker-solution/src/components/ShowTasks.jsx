import { FaTimesCircle } from "react-icons/fa";

function ShowTasks({ tasks, setTasks }) {
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  /**
  |--------------------------------------------------
  | PUT icin;
    const toggleData = async (id) => {
    
    const {data} = await axios.get(`${baseURL}/${id}`);
    const updatedTask = {...data, isDone:!data.isDone};
    await axios.put(`${baseURL}/${id}`, updatedTask);
    fetchTask();

    PATCH ICIN

    const toggleData = async (id) => {
    
    const {data} = await axios.get(`${baseURL}/${id}`);
    const updatedTask = {...data, isDone:!data.isDone};
    await axios.patch(`${baseURL}/${id}`, {isDone:!data.isDone});
    fetchTask();

  |--------------------------------------------------
  */

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

/**
|--------------------------------------------------
| const deleteTask = async (id) => {
    await axios.delete(`${baseURL}/${id}`); // Delete islemi ilgili ID'ye yapilir
    fetchTask();
}
|--------------------------------------------------
*/

  return (
    <div>
      {tasks.map((task) => {
        const { id, text, day, isDone } = task;
        return (
          <div
            className={`task ${isDone ? "done" : ""}`}
            key={id}
            onDoubleClick={() => toggleDone(id)}
          >
            <h3>
              {text}
              <FaTimesCircle
                style={{ color: "red" }}
                onClick={() => deleteTask(id)}
              />
            </h3>
            <h6>{day}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default ShowTasks;