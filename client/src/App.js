import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserData } from 'actions/userDataActions'
import { removeLoadingReason, addLoadingReason } from 'actions/loadingReasonActions';

import Sidebar from 'components/navigation/Sidebar'
import Routes from 'components/navigation/Routes';
import Errors from 'components/Errors'
import Loading from 'components/Loading'
import ConfirmationDialogues from 'components/ConfirmationDialogues'

import 'css/macroLayout.css'
import 'css/globals.css'
import 'css/bootstrap.min.css'

const App = (props) => {

  const history = useHistory();

  const init = (history) => {

    const loadingReason = 'Loading user profile...'

    addLoadingReason(loadingReason)(props.dispatch)

    axios.get('/api/v1/session')
      .then((res) => {
        setUserData(res.data)(props.dispatch)
      })
      .catch(err => {
      if(err) history.push('/signin')
      })
      .finally(() => {
        removeLoadingReason(loadingReason)(props.dispatch)
      })
  }

  useEffect(() => init(history), [])

  return (

    <>
      <Loading />
      <Errors />
      <ConfirmationDialogues />
      <div id="macro-layout">
        <Sidebar />
        <div id="ribbon-and-main">
          <div id="ribbon">
            RIBBON
          </div>
          <div id="main">
            <Routes />
          </div>
        </div>
      </div>

    </>

  )


}

const mapStateToProps = (state) => ({
  userData: state.userData
})

export default connect(mapStateToProps)(App);
