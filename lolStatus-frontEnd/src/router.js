import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./components/Home/home"; 
import StatusPage from "./components/statusPage/statusPage"; 




function MainRouter() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}>
                        <Home/>
                    </Route>
                    <Route  path="/statusPage/:summonerName" component={StatusPage}>
                        <StatusPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
  }
  
  export default MainRouter;