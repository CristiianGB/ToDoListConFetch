import React, { useEffect, useState } from "react";

export default function List() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() =>{
    //createNewUser()
  },[])

  function createNewUser() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jeSus", {
      method: "POST",
      body: JSON.stringify([{label:"hola", done:false}]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp; //(returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function sendTodoList(toDos) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(toDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp; //(returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function addItem() {
    //Si el input esta vacio, no seguimos ejecutando
    if (!inputValue && inputValue.trim().length <= 0 ) return;
    //esto siempre será el caso contrario, por lo que se ejecutará
    /* no have falta pasarle el previus estate, ya que no lo vamos a alterar (modificar), aqui
    *  solo vamos a sumar items
    */
    setItems([
      ...items,
      {
        id: inputValue,
        label: inputValue,
        done: false,
      },
    ]);
  
    //llamamos funcion y pasamos nuevo array
    sendTodoList([
      ...items,
      {
        id: inputValue,
        label: inputValue,
        done: false,
      },
    ])

    setInputValue("");
  }

  function handleDone(i) {
    console.log("posicion array", i)
    let temp = [...items];
    console.log("el item del array", temp[i]);
    temp[i].done = !temp[i].done;
    setItems(temp);
  }
  
  console.log("nuestro todo array", items);

  return (
    <div className="d-inline-flex flex-column w-100 container justify-content-center align-items-center shadows">
      <div className="row">
        <h1 className="col-12">To-Do List</h1>
      </div>

      <div className="row mt-3">
        <input
          className="col-8"
          type="text"
          placeholder="Add an item"
          value={inputValue}
          // desestructuramos el objecto event y cogemos lo que nos interesa, el target y su value
          // target tambien es un objecto, por lo que volvemos a repetir la desestructuración del objeto
          onChange={({ target:{ value } }) => setInputValue(value)}
          // la funcion (listener) onChange, obtendra cualquier cambio en nuestro input, 
          // haciendo el set a nuestro estado setInputValue
        />
        <button className="col-4" onClick={() => addItem()}>
          Add
        </button>
      </div>

      <ul id="list" className="list-group col-12 mt-3">
        {!items.length ? (
          <li className="list-group-item text-center">
            List is empty, add a task
          </li>
        ) : (
          //                                                                condicion
          //                                                                    ||
          //                                                                    \/
          // comprobamos que no esté vacío y que tambien exista, (existe && (y) su longitud es mayor que 0) && y si cumple
          // vamos, que si es true, seguimos con el map
          items &&
            items.length && 
              items.map((item, i) => (
                <li
                  className="list-group-item text-center"
                  id={i}
                  key={i}
                  onClick={() => {
                    // modificamos si está "finiquitao" el todo o no, aqui podemos pasarle una de las dos var que nos da el map
                    // por facilidad, yo elegí el i (indice) y ahora vemos porqué 
                    handleDone(i);
                  }}
                  style={{
                    cursor: "pointer"
                  }}
                >
                  <span
                    className={item.done ? "text-decoration-line-through" : null}
                  >
                    {item.label}
                  </span>
                </li>
              ))
          )}

        <li className="list-group-item text-center text-black-50">
          {items.length}
        </li>
      </ul>
    </div>
  );
};
