import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {cond, isEqual} from 'lodash-es';
import {Button} from 'native-base';
import {useSelector} from 'react-redux';

/* Relative imports */
import {
  LOST,
  FOUND,
  QR_SCANNER,
  ACCOUNT,
  BEFORE_USAGE,
  APP_NAME,
} from './textConstant';
import {PAGE_SIZE} from './constant';
import {LostComponent} from './modules/lost/component';
import {FoundComponent} from './modules/found/component';
import {QRComponent} from './modules/qr/component';
import {Account} from './modules/account/component';
import {BeforeUsage} from './modules/beforeUsage/component';
import {userInfo} from './modules/account/action';
import {
  fetchWithPagination as fetchWithPaginationLost,
} from './modules/lost/action';
import {
  fetchWithPagination as fetchWithPaginationFound,
} from './modules/found/action';
import {
  fetchWithPagination as fetchWithPaginationPrivateProfile,
} from './modules/privateProfile/action';
import {PrivateProfile} from './modules/privateProfile/component';
import {getData, storeData} from './core/utility/localStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  activeTintColor: 'green',
  inactiveTintColor: 'gray',
  labelStyle: {
    textTransform: 'capitalize',
  },
};

const getTabIcon = cond([
  [(val) => isEqual(val, LOST), () => 'md-alarm'],
  [(val) => isEqual(val, FOUND), () => 'md-paw'],
  [(val) => isEqual(val, QR_SCANNER), () => 'md-qr-scanner'],
  [() => true, () => ''],
]);

const screenOptions = ({route}) => ({
  tabBarIcon: ({color, size}) => {
    return <Ionicons name={getTabIcon(route.name)} size={size} color={color} />;
  },
});

const MainScreen = () => <Tab.Navigator
  tabBarOptions={tabBarOptions}
  screenOptions={screenOptions}
>
  <Tab.Screen name={LOST} component={LostComponent} />
  <Tab.Screen name={FOUND} component={FoundComponent} />
  <Tab.Screen name={QR_SCANNER} component={QRComponent} />
</Tab.Navigator>;

export const Navigation = () => {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    const requestUserConfirmation = async () => {
      const acceptedObj = await getData('acceptedObj');
      if (acceptedObj) {
        setRulesAccepted(JSON.parse(acceptedObj).accepted);
      }
    };
    requestUserConfirmation();
  }, []);

  useEffect(() => {
    if (rulesAccepted) {
      dispatch(userInfo());
      dispatch(fetchWithPaginationLost(0, PAGE_SIZE));
      dispatch(fetchWithPaginationFound(0, PAGE_SIZE));
      dispatch(fetchWithPaginationPrivateProfile(0, PAGE_SIZE));
    }
  }, [rulesAccepted]);

  const renderBeforeUsage = () => (<BeforeUsage handleAccept={async () => {
    await storeData('acceptedObj', JSON.stringify({accepted: true}));
    setRulesAccepted(true);
  }}/>);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!rulesAccepted && (<Stack.Screen
          name={BEFORE_USAGE}
          component={renderBeforeUsage}
        />)}
        <Stack.Screen
          name={APP_NAME}
          component={MainScreen}
          options={({navigation, route}) => ({
            headerRight: () => (
              <Button
                transparent
                onPress={() => {
                  navigation.navigate(ACCOUNT);
                }}
                style={{marginRight: 25}}
              >
                <Ionicons
                  name="md-contact"
                  size={28}
                  color={account.isAuthorizated ? 'green' : 'gray'}
                />
              </Button>
            ),
          })}
        />
        <Stack.Screen
          name={ACCOUNT}
          component={
            account.isAuthorizated ? PrivateProfile : Account
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
