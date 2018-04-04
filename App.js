import React, {Component} from 'react';
import RootScene from './RootScene'
import {Provider} from 'mobx-react/native'
import stores from './app/store'
// import SplashScreen from 'react-native-splash-screen'

export default class App extends Component<{}> {

    // componentDidMount() {
    //     SplashScreen.hide();
    // }

    render() {
        return (
            <Provider {...stores}>
              <RootScene/>
            </Provider>
        );
    }
}

