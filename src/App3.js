import { useEffect, useRef, useState } from "react";

const App3 = () => {
  const inputValue = useRef("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      });
  }, []);

  const handleFocus = () => {
    const item = list.filter((listItem) =>
      listItem.name.toLowerCase().includes(inputValue.current.value.toLowerCase())
    );
    if (!selectedList.length) {
      setFilteredList(item);
    }
  };

  const handleOnChange = () => {
    const listName = selectedList.map((list) => list.name);
    const removeSelectedListFromFilteredList = list.filter((e, i) => {
      return !listName.includes(e.name);
    });
    const updatedFList = removeSelectedListFromFilteredList.filter((list) =>
      list.name.toLowerCase().includes(inputValue.current.value.toLowerCase())
    );
    setFilteredList(updatedFList);
  };

  const addItem = (listObj) => {
    setSelectedList([...selectedList, listObj]);
    const removeSelectedItems = filteredList.filter((list) => {
      return list.name !== listObj.name;
    });
    setFilteredList(removeSelectedItems);
  };

  const removeList = (listToRemove) => {
    const updatedList = selectedList.filter(
      (list) => list.name !== listToRemove.name
    );
    setSelectedList(updatedList);
    setFilteredList([...filteredList, listToRemove]);
  };
  return (
    <div className="mx-96">
      <div className="border border-black p-3 mt-6">
        {selectedList.map((list) => {
          return (
            <div
              key={list.id}
              className="justify-between inline-block p-2 bg-slate-300 mb-2 ml-2 rounded-full cursor-pointer hover:bg-slate-500"
            >
              <span className="text-xl">{list.name} &nbsp;</span>
              <span
                className="hover:bg-red-500 rounded-full px-3 py-1"
                onClick={() => removeList(list)}
              >
                ╳
              </span>
            </div>
          );
        })}
        <input
          type="text"
          className="border border-none outline-none w-[750px]"
          ref={inputValue}
          onFocus={handleFocus}
          onChange={handleOnChange}
        />
      </div>
      {filteredList.length ? (
        <div className="mx-auto border border-black p-3 mt-6">
          {filteredList.map((list) => {
            return (
              <div
                className="p-3 bg-slate-300 mb-1 cursor-pointer hover:bg-slate-400"
                onClick={() => addItem(list)}
                key={list.id}
              >
                {console.log(list)}
                <span className="text-xl">{list["name"]}</span>
                <br />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default App3;
