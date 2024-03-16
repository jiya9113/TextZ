import {Route} from "react-router-dom"; /*for navigation */
import Homepage     from "./pages/homePage"; /*for homepage */
import Chatpage     from "./pages/chatPage"; /*for chatpage */
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
