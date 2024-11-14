import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  Check,
  Trash2,
  Edit,
  PlusCircle,
} from "lucide-react";

export default function Home() {
  const [item, setItem] = useState({ title: "", remainder: "" });
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [alarm, setAlarm] = useState({});

  const date = new Date();

  const handleInputValue = (e) => {
    setItem({ ...item, title: e.target.value }); // Fixed: Preserve remainder when updating title
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.title) {
      try {
        const url = isEdit
          ? `https://store-room-api.vercel.app/todo/${isEdit}`
          : `https://store-room-api.vercel.app/todo`;
        const response = await fetch(url, {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });

        const data = await response.json();
        if (response.ok) {
          if (isEdit) {
            const updatedTodo = data.todo || data;
            setAllData((prevData) =>
              prevData.map((todo) => (todo._id === isEdit ? updatedTodo : todo))
            );
            setIsEdit(null);
          } else {
            setAllData([data, ...allData]);
          }
          setItem({ title: "", remainder: "" });
          setAlarm({});
          
        } else {
          console.log("Failed to add item", data.error);
        }
      } catch (error) {
        console.log("Error from frontend", error);
      }
    }
  };

  const fetchTodo = async () => {
    try {
      const response = await fetch("https://store-room-api.vercel.app/todo");
      const data = await response.json();
      setAllData(data.todos.reverse());
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleEdit = (todo) => {
    setIsEdit(todo._id);
    setItem({ title: todo.title, remainder: todo.remainder || "" });
  };

  const handleDelete = async (todoId) => {
    try {
      const url = `https://store-room-api.vercel.app/todo/${todoId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAllData((prevdata) => prevdata.filter((item) => item._id !== todoId));
      }
    } catch (error) {
      console.log("error from delete op", error);
    }
  };

  const handleReminderChange = (e) => {
    const reminderDate = e.target.value;
    setItem({ ...item, remainder: reminderDate }); // Fixed: Preserve title when updating remainder
  };

  const handleSetReminder = (e, todoId) => {
    e.preventDefault();

    if (item.remainder) {
      setAlarm((prev) => ({
        ...prev,
        [todoId]: {
          time: item.remainder,
          isSet: true,
        },
      }));

      const targetTime = new Date(item.remainder).getTime();
      const currentTime = Date.now();
      const delay = targetTime - currentTime;

      if (delay > 0) {
        const timer = setTimeout(() => {
          showNotification(item.title || "Your Task Reminder");
          setAlarm((prev) => ({
            ...prev,
            [todoId]: {
              ...prev[todoId],
              isSet: false,
            },
          }));
        }, delay);
        

        return () => clearTimeout(timer);
      } else {
        alert("The reminder time should be in the future!");
      }
    } else {
      alert("Please enter a reminder time.");
    }
  };

  const showNotification = (message) => {
    const audio = new Audio("/alaram.wav");
    audio.play();

    if (Notification.permission === "granted") {
      new Notification(`Reminder: ${message}`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(`Reminder: ${message}`);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 md:p-8 lg:p-12 font-['MonoLisa_Trial',Consolas,'Courier_New',monospace]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text">
            Todo List
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Built with modern stack
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 shadow-lg transition-all duration-300 hover:border-zinc-700">
            <div className="flex-1">
              <input
                type="text"
                value={item.title}
                required
                onChange={handleInputValue}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-zinc-900 text-zinc-100 border-0 focus:ring-1 focus:ring-cyan-500 focus:outline-none rounded-xl placeholder-zinc-500"
                placeholder="Add a new task..."
              />
            </div>

            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="datetime-local"
                  value={item.remainder}
                  onChange={handleReminderChange}
                  className="w-full pl-11 pr-4 py-3 sm:py-4 text-base sm:text-lg 
                        bg-zinc-900 text-zinc-100 border-0 
                        focus:ring-1 focus:ring-cyan-500 focus:outline-none 
                        rounded-xl placeholder-zinc-500
                        [&::-webkit-calendar-picker-indicator]:bg-cyan-400
                        [&::-webkit-calendar-picker-indicator]:hover:bg-cyan-300
                        [&::-webkit-calendar-picker-indicator]:rounded"
                />
              </div>

              <button
                type="button"
                onClick={(e) => handleSetReminder(e, isEdit || item._id)}
                className={`px-4 py-3 sm:py-4 rounded-xl 
                      font-medium flex items-center justify-center gap-2 
                      transition-all duration-300 
                      ${
                        alarm[isEdit || item._id]?.isSet
                          ? "bg-emerald-500 text-zinc-900"
                          : "bg-gradient-to-r from-cyan-400 to-blue-400"
                      }`}
              >
                {alarm[isEdit || item._id]?.isSet ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Set!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    <span className="hidden sm:inline">Reminder</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="submit"
              className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl text-zinc-900 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isEdit
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500"
                  : "bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500"
              }`}
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                {isEdit ? "Update" : "Add"}
              </span>
            </button>
          </div>
        </form>

        <div className="space-y-3 sm:space-y-4">
          {allData.length === 0 && (
            <div className="text-center text-zinc-400">
              Let's create your first task with a reminder!
            </div>
          )}

          {allData.map((todo) => (
            <div
              key={todo._id}
              className="bg-zinc-900 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-zinc-800 shadow-md transition-all duration-300 hover:border-zinc-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-zinc-100 mb-1">
                    {todo.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 font-normal">
                    {alarm[todo._id]?.isSet ? (
                      <div className="flex items-center gap-1 text-cyan-400">
                        <Clock className="w-4 h-4" />
                        <span>
                          Reminder:{" "}
                          {new Date(alarm[todo._id].time).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-zinc-500">
                        <span>
                          
                          {date.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span>No Reminder Set</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-1.5 sm:p-2 rounded-lg text-amber-400 hover:bg-zinc-800 transition-colors duration-300"
                    aria-label="Edit task"
                  >
                    <Edit className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="p-1.5 sm:p-2 rounded-lg text-red-400 hover:bg-zinc-800 transition-colors duration-300"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}