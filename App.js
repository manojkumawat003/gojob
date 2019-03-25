import {Navigation} from 'react-native-navigation';

import {Provider} from 'react-redux';
import ConfigureStore from './src/store/configureStore';

import WelcomeScreen from './src/components/welcomeScreen';
import AuthScreen from './src/components/authScreen';
import HomeScreen from './src/components/homeScreen';
import DeckScreen from './src/components/deckScreen';
import ReviewScreen from './src/components/reviewScreen';
import SideDrawer from './src/components/sideDrawer';
import DetailScreen from './src/components/deckScreen/detailScreen';
import ShowSavedCards from './src/components/reviewScreen/ShowSavedCards';

const store = ConfigureStore();

Navigation.registerComponent(
  'gojob.WelcomeScreen'
  ,()=>WelcomeScreen,
 
  );

Navigation.registerComponent(
  'gojob.AuthScreen',
  ()=>AuthScreen
  
  );

Navigation.registerComponent(
  'gojob.HomeScreen',
  ()=>HomeScreen
 
  );

Navigation.registerComponentWithRedux(
  'gojob.DeckScreen',
  ()=>DeckScreen,
  Provider,
  store
  );

Navigation.registerComponentWithRedux(
  'gojob.ReviewScreen',
  ()=>ReviewScreen,
    Provider,
    store
  );

Navigation.registerComponent(
  'gojob.SideDrawer',
  ()=>SideDrawer
  );

Navigation.registerComponentWithRedux(
  'gojob.ShowSavedCards',
  ()=>ShowSavedCards,
  Provider,
  store
) ; 

Navigation.registerComponent(
  'gojob.DetailScreen',
  ()=>DetailScreen
  );

Navigation.registerComponent('gojob.WelcomeScreen',()=>WelcomeScreen) 
 
  Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'gojob.WelcomeScreen'
      }
      
    }
  })
});
