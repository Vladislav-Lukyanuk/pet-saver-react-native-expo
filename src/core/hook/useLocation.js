import {useState, useEffect} from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const asyncUseEffect = async () => {
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setLocation(null);
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    asyncUseEffect();
  }, []);

  return location;
};
