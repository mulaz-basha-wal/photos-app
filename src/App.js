import "./App.css";
import axios from "axios";
import Menu from "./components/Menu";
import Photos from "./components/Photos";
import { useEffect, useReducer, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";
import PaginationWidget from "./components/Pagination";
import PhotosReducer from "./components/PhotosReducer";
import PhotosContext from "./components/PhotosContext";

function App() {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((res) => {
        dispatch({ type: "add", data: res.data });
      })
      .catch((error) => console.log(error));
    setStatus(true);
  }, []);
  const [state, dispatch] = useReducer(PhotosReducer, { photos: [] });
  return (
    <div className='text-center'>
      <Menu />
      <PhotosContext.Provider value={{ state, dispatch }}>
        {status ? (
          <div>
            <Photos />
          </div>
        ) : (
          <Spinner className='hide-spin text-dark display-1 m-6 p-6' />
        )}
        <PaginationWidget />
      </PhotosContext.Provider>
    </div>
  );
}

export default App;
