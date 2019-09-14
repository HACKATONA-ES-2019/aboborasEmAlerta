import React from 'react';
import { Route, Switch } from 'react-router-dom';

// screens
import { LoginScreen } from './screens/Login';
import DisasterScreen from './screens/Disasters/Disasters';
import DefenseHome from './screens/DefenseHome/DefenseHome';
import { NotFoundScreen } from './screens/NotFound';

import  RegisterDisaster  from './screens/RegisterDisaster';
import {connect} from 'react-redux';

import {updateDisasters} from './store/actions'
import {firestore} from './lib/firebase'

class App extends React.Component {
  componentDidMount() {
    this.listenDisasters()
  }

  listenDisasters(){
    firestore.collection('disasters').onSnapshot(disasters => {
      this.props.updateDisasters(disasters.docs.map(d => d.data()))
    });
  }

  
  render() {
    return (
      <Switch>
        <Route path="/" exact component={RegisterDisaster} />
        <Route path="/" exact component={LoginScreen} />
        <Route path="/desastres" exact component={DisasterScreen} />
        <Route path="*" exact component={NotFoundScreen} />
      </Switch>
    );
  }
}



export default connect(null, {updateDisasters})(App);
