import { Switch, Route } from 'react-router-dom';
import Home from 'components/Home'
import SignUp from 'components/forms/SignUp'
import SignIn from 'components/forms/SignIn'

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/signin" render={() => <SignIn />} />
        </Switch>
    );

}

export default Routes;