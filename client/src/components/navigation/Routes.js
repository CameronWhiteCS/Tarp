import { Switch, Route } from 'react-router-dom';
import Home from 'components/Home'
import SignUp from 'components/forms/SignUp'
import SignIn from 'components/forms/SignIn'
import AdminControlPanel from 'components/admin/AdminControlPanel'
import CourseManager from 'components/admin/CourseManager'
import CreateCourse from 'components/admin/forms/CreateCourse'

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/signin" render={() => <SignIn />} />
            <Route exact path="/admin" render={() => <AdminControlPanel />} />
            <Route exact path="/admin/courses" render={() => <CourseManager />} />
            <Route exact path="/admin/courses/create" render={() => <CreateCourse />} />
            <Route exact path="/admin/courses/edit/:id" render={() => <CreateCourse />} />
        </Switch>
    );

}

export default Routes;