import {Navigation} from 'react-native-navigation';


 const LoadTabs = () => {

  Navigation.setDefaultOptions({
    animations: {
      setRoot: {
        enabled: 'true', // Optional, used to enable/disable the animation
        alpha: {
          from: 0,
          to: 1,
          duration: 1000,
          startDelay: 100,
          interpolation: 'accelerate'  
        }
      }
    }
  });
   
             
      //////////this is used to show topBar on other tab screen like Review Screen or Deck screen///
            
      Navigation.setRoot({
        root: {
          sideMenu: {
          left: {
            width: 100,
            height: '100%',
            visible: true,
            enabled: true,
            component: {
                id: 'leftSideMenu',
                name: 'gojob.SideDrawer',
            }
          },
          
          center: {
            bottomTabs: {
                    children: [{
                      stack: {
                        children: [{
                          component: {
                            name: 'gojob.HomeScreen',
                            passProps: {
                              text: 'Home'
                            },
                            id:'homeScreenId',
                           }
                        }],
                        options: {
                          bottomTab: {
                            text: 'Home',
                            icon: require('../../assets/homeIcon.png'),
                            testID: 'FIRST_TAB_BAR_BUTTON'
                          }
                        }
                      }
                    },{
                      stack: {
                        children: [{
                          component: {
                            name: 'gojob.DeckScreen',
                            passProps: {
                              text: 'Deck'
                            },
                            id:'deckScreenId',
                           }
                        }],
                        options: {
                          bottomTab: {
                            text: 'View Jobs',
                            icon: require('../../assets/jobSearchIcon.png'),
                            testID: 'SECOND_TAB_BAR_BUTTON'
                          }
                        }
                      }
                    },
                    {
                      stack: {
                        children: [{
                          component: {
                            name: 'gojob.ReviewScreen',
                            passProps: {
                              text: 'Review'
                            },
                            id:'reviewScreenId',
                           }
                        }],
                        options: {
                          bottomTab: {
                            text: 'Review',
                            icon: require('../../assets/reviewIcon.png'),
                            testID: 'THIRD_TAB_BAR_BUTTON'
                          }
                        }
                      }
                    },
                   
                   
                ]
                  }
          },
          },
        },
      });
  

     }

export default LoadTabs;