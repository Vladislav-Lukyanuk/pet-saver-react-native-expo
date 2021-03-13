import React, {useCallback} from 'react';
import {List as NBList, Text, Button, Item} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

/* Relative import */
import {ListItem} from '../../../core/ui/card/ListItem';
import {PAGE_SIZE} from '../../../constant';
import {CenteredButton} from '../../../core/ui/button/CenteredButton';
import {
  MORE,
  NAME,
  SEND_QR_CODE,
  MARK_AS_LOST,
  MARK_AS_FOUND,
  REMOVE,
  TRACK,
} from '../../../textConstant';
import {fetchWithPagination, markAs, remove} from '../action';
import {Flex} from '../../../core/ui/layout/Flex';
import {openAddModal, openViewModal, openQRModal} from '../../modal/action';
import {ScreenType} from '../../../type';

export const List = () => {
  const privateAnimals = useSelector((state) => state.privateProfile.animals);
  const dispatch = useDispatch();
  const dispatchFetchWithPagination = useCallback(
      (skip, count) => dispatch(fetchWithPagination(skip, count)),
      [dispatch]);
  const dispatchMarAsLost = useCallback(
      (id) => dispatch(
          openAddModal({type: ScreenType.markAsScreen, id}),
      ),
      [dispatch]);
  const dispatchTrack = useCallback(
      (id) => dispatch(
          openViewModal({type: ScreenType.lostScreen, id}),
      ),
      [dispatch]);
  const dispatchMarkAsFound = useCallback((id) => dispatch(
      markAs(id, ScreenType.foundScreen, '', '', 0, 0),
  ), [dispatch]);
  const dispatchOpenQR = useCallback((id) => dispatch(
      openQRModal({id: id}),
  ), [dispatch]);
  const dispatchRemove = useCallback((id) => dispatch(
      remove(id),
  ), [dispatch]);

  return (<NBList>
    {privateAnimals.map((animal) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListItem
        key={`lost_${Math.random()}`}
        imageUUID={animal.image}
        bodySection={
          <>
            <Text
              numberOfLines={1}
            >{`${NAME.capitalize()}: ${animal.name}`}</Text>
            <Flex style={{
              justifyContent: 'space-between',
              marginRight: 16,
              marginTop: 16,
            }}>
              <Item
                style={{
                  borderColor: 'white',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Button
                  small
                  light
                  onPress={() => dispatchOpenQR(animal.id)}
                  style={{marginBottom: 16}}
                >
                  <Text>{SEND_QR_CODE}</Text>
                </Button>
                <Button
                  small
                  style={{backgroundColor: animal.animal ? 'gray': '#c62828'}}
                  disabled={Boolean(animal.animal)}
                  onPress={() => dispatchRemove(animal.id)}
                >
                  <Text>{REMOVE}</Text>
                </Button>
              </Item>
              <Item
                style={{
                  borderColor: 'white',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                {animal.animal && (
                  <Button
                    small
                    style={{backgroundColor: 'green', marginBottom: 16}}
                    onPress={() => dispatchMarkAsFound(animal.id)}
                  >
                    <Text>{MARK_AS_FOUND}</Text>
                  </Button>
                ) ||
                (
                  <Button
                    small
                    warning
                    style={{marginBottom: 16}}
                    onPress={() => dispatchMarAsLost(animal.id)}
                  >
                    <Text>{MARK_AS_LOST}</Text>
                  </Button>)}
                <Button
                  small
                  warning
                  onPress={() => dispatchTrack(animal.animal.id)}
                  disabled={!animal.animal}
                >
                  <Text>{TRACK}</Text>
                </Button>
              </Item>
            </Flex>
          </>}
      />
    ))}
    {privateAnimals.length > 0 &&
    privateAnimals.length % PAGE_SIZE === 0 && (
      <CenteredButton
        text={MORE}
        onPress={() => {
          dispatchFetchWithPagination(privateAnimals.length, PAGE_SIZE);
        }}
      />
    )}
  </NBList>);
};
