import React from 'react';
import { Route, Switch } from 'react-router-dom';

// screens
import { LoginScreen } from './screens/Login';
import DisasterScreen from './screens/Disasters/Disasters';
import { NotFoundScreen } from './screens/NotFound';

import {connect} from 'react-redux';

import {updateDisasters} from './store/actions'
import {firestore} from './lib/firebase'

class App extends React.Component {
  componentDidMount() {
    firestore.collection('disasters').onSnapshot(disasters => {

      this.props.updateDisasters(disasters.docs.map(d => d.data()))
    });
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path="/desastres" exact component={DisasterScreen} />
        <Route path="*" exact component={NotFoundScreen} />
      </Switch>
    );
  }
}



export default connect(null, {updateDisasters})(App);
