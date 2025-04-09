import { FiToggleLeft } from "react-icons/fi";
import { FaToggleOn } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

import { BiSearch } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completedAllTodos,
  completedTodo,
  removeTodos,
} from "./Redux/Feature/todoSlice";

function App() {
  const [todoValue, setTodoValue] = useState("");
  const [search, setSearch] = useState("");
  const todos = useSelector((state) => state.todo.todoList);

  const filterTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const dispatch = useDispatch();

  const handleAddToDo = () => {
    if (todoValue === "") {
      alert("add any todo");
    } else {
      dispatch(addTodo(todoValue));
    }
  };

  return (
    <>
      <section className="bg-[#f2f4f5] max-w-6xl min-h-7  px-10 mx-auto  mt-10 rounded-lg">
        <div className="p-7">
          <h1 className="font-semibold  text-center text-3xl">
            PERSONAL TODO APP
          </h1>

          {/*   add todo  */}

          <div className="mt-7 flex gap-4 items-end ">
            <input
              type="text"
              id="id"
              value={todoValue}
              onChange={(e) => {
                setTodoValue(e.target.value);
              }}
              name="name"
              placeholder="Add Todo"
              className=" w-[95%] border-b-2 border-gray-500  rounded-t  py-3 px-5 outline-none	bg-white focus:border-blue-600 duration-300"
            />

            <BsPlus
              onClick={() => {
                handleAddToDo();
                setTodoValue("");
              }}
              size={40}
              className=" bg-blue-600 p-1 cursor-pointer rounded-lg font-semibold text-white "
            />
          </div>

          {/* filter and search todo */}
          <div className="flex justify-between items-center max-md:gap-7 max-md:flex-col-reverse mt-5">
            {/* right  */}
            <div className="space-x-3 flex items-center max-md:text-sm">
              <select className="p-2 rounded-t outline-none border-white border-2 cursor-pointer w-[120px] ">
                <option value="">Default</option>
                <option value="">Default</option>
                <option value="">Default</option>
              </select>

              <button
                onClick={() => {
                  dispatch(completedAllTodos());
                }}
                className={`p-2 rounded-lg outline-none bg-purple-500   text-white  ${
                  filterTodos.length ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
              >
                Mark All Completed
              </button>
            </div>
            {/* left */}
            <div className="flex gap-4 items-end">
              <input
                type="text"
                id="id"
                name="name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search Todo"
                className="w-[200px] border-b-2 mr-1 border-gray-600 px-4 py-2 rounded-t outline-none	bg-white focus:border-blue-600 duration-300"
              />

              <BiSearch className="text-4xl bg-blue-600 p-1 rounded-lg font-semibold cursor-pointer text-white" />
            </div>
          </div>

          <div className=" mt-6 p-4">
            {filterTodos.length ? (
              <div>
                {filterTodos.map(({ title, id, completed }) => (
                  <div key={id}>
                    <div className="flex items-center justify-between p-2">
                      <div className="flex space-x-3 text-lg font-medium">
                        <p>{id} . </p>
                        <h4 className={`${completed ? "line-through" : ""} `}>
                          {title}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-3">
                        {completed ? (
                          <FaToggleOn
                            onClick={() => {
                              dispatch(completedTodo(id));
                            }}
                            size={25}
                            className="text-teal-400 cursor-pointer "
                          />
                        ) : (
                          <FiToggleLeft
                            onClick={() => {
                              dispatch(completedTodo(id));
                            }}
                            size={25}
                            className="text-rose-500 cursor-pointer "
                          />
                        )}

                        <MdDelete
                          onClick={() => {
                            dispatch(removeTodos(id));
                          }}
                          size={25}
                          className="text-rose-500 cursor-pointer "
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl font-medium">No tasks found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
