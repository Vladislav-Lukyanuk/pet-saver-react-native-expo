import React from 'react';
import {Container, Content, List, Text} from 'native-base';
import {compose} from 'recompose';

/* relative imports */
import {CenteredButton} from '../../core/ui/button/CenteredButton';
import {TransparentButton} from '../../core/ui/button/TransparentButton';
import {MORE, SHOW, NO_FOUND_ANIMALS} from '../../textConstant';
import {AbsoluteButton} from '../../core/ui/button/AbsoluteButton';
import {withModal} from '../../core/hoc/withModal';
import {withFound} from '../../core/hoc/withFound';
import {ScreenType} from '../../type';
import {ListItem} from '../../core/ui/card/ListItem';
import {PAGE_SIZE} from '../../constant';
import {Placeholder} from '../../core/ui/card/Placeholder';
import {ActivityIndicator} from '../../core/ui/loader/ActivityIndicator';

export const FoundComponent = compose(
    withFound,
    withModal,
)(
    ({
      foundItems,
      isLoading,
      dispatchFetchWithPagination,
      dispatchOpenViewModal,
      dispatchOpenAddModal,
    }) => {
      return (
        <Container>
          {foundItems.length > 0 && (
            <Content>
              <List>
                {foundItems.map((animal) => (
                // eslint-disable-next-line react/no-array-index-key
                  <ListItem
                    key={`found_${Math.random()}`}
                    imageUUID={animal.image}
                    bodySection={
                      <>
                        <Text numberOfLines={1}>{animal.title}</Text>
                        <Text note numberOfLines={2}>
                          {animal.description}
                        </Text>
                      </>}
                    buttonSection={
                      <TransparentButton
                        text={SHOW}
                        onPress={() => {
                          dispatchOpenViewModal(
                              ScreenType.foundScreen,
                              animal.id,
                          );
                        }}
                      />
                    }
                  />
                ))}
                {foundItems.length > 0 &&
                foundItems.length % PAGE_SIZE === 0 && (
                  <CenteredButton
                    text={MORE}
                    onPress={() => {
                      dispatchFetchWithPagination(foundItems.length, PAGE_SIZE);
                    }}
                  />
                )}
              </List>
            </Content>
          )}
          {foundItems.length === 0 && !isLoading && (
            <Placeholder title={NO_FOUND_ANIMALS} />
          )}
          <ActivityIndicator
            isLoading={isLoading}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={48}
          />
          <AbsoluteButton
            onPress={() => {
              dispatchOpenAddModal(ScreenType.foundScreen);
            }}
            color="green"
            icon="md-add"
          />
        </Container>
      );
    },
);
