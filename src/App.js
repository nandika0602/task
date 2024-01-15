import { useEffect, useState } from "react";

const App = () => {
  const [list, setList] = useState(['a', 'b']);
  const [filteredList, setFilteredList] = useState([])
  useEffect(  () => {
     fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {return res.json()})
    .then((data) => {
      setList(data)
    })
  },[])

  useEffect(() => {
    console.log(filteredList);
  }, [filteredList])
  const add = (e) => {
    // console.log(list);
    const l = list.filter(li => li.name.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(l);
    setFilteredList([...filteredList, ...l])
  }
  return (
    <div className="flex">
      {/* <h1 className="text-3xl">Hii</h1> */}
      <div className="justify-center items-center m-auto border border-black p-3 mt-6">
        {filteredList.map((l, i) => {
          return (<div key={l.id}>
            {console.log(l)}
            <span>{l['name']}tag</span>
            <span>{l.id}items</span>
          </div>)
        })}
      <input type="text" placeholder="search the name" onKeyDown={e => (e.key === "Enter" ? add(e) : null)} />
      </div>

    </div>
  )
}

export default App;