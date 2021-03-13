import React, {useEffect, useState} from 'react';
import {
  ListItem as NBListItem,
  Left,
  Right,
  Text,
  Body,
} from 'native-base';
import {Image} from 'react-native';

/* Relative import */
import {getImageBase64} from '../../utility/file';
import {Placeholder} from '../image/Placeholder';

export const ListItem = ({imageUUID, bodySection, buttonSection}) => {
  const [imageBase64, setImageBase64] = useState('');
  useEffect(() => {
    let cleanupFunction = false;
    if (imageUUID) {
      const load = async () => {
        await getImageBase64(
            imageUUID,
            (imageBase64) => {
              if (!cleanupFunction) {
                setImageBase64('data:image/jpg;base64,' + imageBase64);
              }
            },
            () => {},
        );
      };
      load();

      return () => {
        cleanupFunction = true;
      };
    }
  }, [imageUUID]);

  return (
    <NBListItem thumbnail style={{marginVertical: 4}}>
      <Left>
        {imageBase64 ? (
          <Image
            source={{uri: imageBase64}}
            style={{height: 110, width: 110}}
          />
        ) : (
          <Placeholder height={110} width={110} />
        )}
      </Left>
      {bodySection &&
      (<Body style={{height: '100%'}}>
        {bodySection}
      </Body>)}
      {buttonSection && (<Right>{buttonSection}</Right>)}
    </NBListItem>
  );
};
