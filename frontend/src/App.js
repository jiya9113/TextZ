import {Route,Link} from "react-router-dom"; /*for navigation */
import Homepage from "./Pages/Homepage";/*for homepage */
import Chatpage from "./Pages/Chatpage";
import "./App.css";
/* exact is used for perfect address*/
function App() {
  return (
    <div className="App">
      <Route path="/"      component={Homepage} exact/> 
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
