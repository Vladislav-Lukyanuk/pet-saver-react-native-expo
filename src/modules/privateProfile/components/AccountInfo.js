import React, {useCallback} from 'react';
import {Item, Text, Body, Right, Button} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

/* Relative import */
import {LOG_OUT} from '../../../textConstant';
import {userLogout} from '../../account/action';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  icon: {
    marginRight: 16,
  },
});

export const AccountInfo = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const dispatchLogout = useCallback(() => dispatch(userLogout()), [dispatch]);

  return (
    <Item style={styles.container}>
      <Ionicons
        name="md-contact"
        size={56}
        color={'gray'}
        style={styles.icon}
      />
      <Body>
        <Text numberOfLines={1}>{account.userId}</Text>
      </Body>
      <Right>
        <Button small light onPress={() => dispatchLogout()}>
          <Text>{LOG_OUT}</Text>
        </Button>
      </Right>
    </Item>
  );
};
