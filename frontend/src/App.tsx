// README
//redux-toolkit.js.org/tutorials/quick-start

https: import { useSelector, useDispatch } from "react-redux";
import { loadBugs } from "../store/bugs.js";
import "./App.css";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.entities.bugs);

  useEffect(() => {
    if (!list.data) {
      dispatch(loadBugs());
    }
  }, []);

  return (
    <>
      <ul>
        {list.data ? (
          list.data.map((item) => <li key={item.id}>{item.title}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </>
  );
}

export default App;
