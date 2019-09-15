import React from 'react';
import { Route, Switch } from 'react-router-dom';

// screens
import LoginScreen from './screens/Login';
import SecureScreen from './screens/Secure';
import DisasterScreen from './screens/Disasters/Disasters';
import { NotFoundScreen } from './screens/NotFound';
import DisasterInfo from "./screens/DisastersInfo/DisasterInfo";
import User from "./screens/User/User";


import  RegisterDisaster  from './screens/RegisterDisaster';
import {connect} from 'react-redux';

import {updateDisasters} from './store/actions'
import {firestore} from './lib/firebase'
import { PersonIdentifier } from './screens/PersonIdentifier';

class App extends React.Component {
  componentDidMount() {
    //this.listenDisasters()
  }

  listenDisasters(){
    firestore.collection('disasters').onSnapshot(disasters => {
      this.props.updateDisasters(disasters.docs.map(d => d.data()))
    });
  }
  
  render() {
    return (
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/usuario" exact component={User} />
        <Route path="/personIdentifier" exact component={PersonIdentifier} />
        <Route path="/registerDisaster" exact component={RegisterDisaster} />
        <Route path="/" exact component={LoginScreen} />
        <Route path="/seguro" exact component={SecureScreen} />
        <Route path="/desastresInfo" exact component={DisasterInfo} />
        <Route path="/desastres" exact component={DisasterScreen} />
        <Route path="/desastres/criar" exact component={RegisterDisaster} />
        <Route path="*" exact component={NotFoundScreen} />
      </Switch>
    );
  }
}



export default connect(null, {updateDisasters})(App);
