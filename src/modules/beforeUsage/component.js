import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {
  Container,
  Content,
  Text,
} from 'native-base';

/* Relative import */
import {AGREEMENT, PRIVACY, ACCEPT_RULES} from '../../textConstant';
import {CenteredButton} from '../../core/ui/button/CenteredButton';
import {Link} from '../../core/ui/label/Link';
import {AGREEMENT_URI, PRIVACY_URI} from '../../core/data-layer/route';

const {height, width} = Dimensions.get('window');

export const BeforeUsage = ({handleAccept}) => {
  return (
    <Container>
      <Content>
        <View style={{
          height: height - 80,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="md-paw" size={186} color="green" />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
            <View>
              <Link
                style={{marginBottom: 4}}
                url={AGREEMENT_URI}
              >{AGREEMENT.capitalize()}</Link>
              <Link
                style={{marginBottom: 4}}
                url={PRIVACY_URI}
              >{PRIVACY.capitalize()}</Link>
            </View>
            <CenteredButton
              text={ACCEPT_RULES}
              onPress={handleAccept}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};
