import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Field, Form as RFForm} from 'react-final-form';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import {createFinalFormValidation} from '@lemoncode/fonk-final-form';
import {cond, isEqual} from 'lodash-es';
import {useDispatch, useSelector} from 'react-redux';

/* Relative import */
import {AccountType} from '../../type';
import {LOGIN, REGISTER, RESET_PASSWORD, USERNAME, PASSWORD} from '../../textConstant';
import {CenteredButton} from '../../core/ui/button/CenteredButton';
import {AbsoluteButton} from '../../core/ui/button/AbsoluteButton';
import {emailValidator} from '../../core/validator/emailValidator';
import {passwordValidator} from '../../core/validator/passwordValidator';
import {Error} from '../../core/ui/label/Error';
import {loginMapper} from '../../core/mapper/login';
import {TransparentButton} from '../../core/ui/button/TransparentButton';
import {login, register, resetPassword} from './action';
import {ActivityIndicator} from '../../core/ui/loader/ActivityIndicator';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  error: {
    alignSelf: 'center',
    width: '95%',
  },
});

const validationSchema = {
  field: {
    login: [{validator: emailValidator}],
    password: [{validator: passwordValidator}],
  },
};

const finalFormValidation = createFinalFormValidation(validationSchema);

const initialValues = {
  login: {value: ''},
  password: {value: ''},
};

const buttonText = cond([
  [(mode) => isEqual(mode, AccountType.login), () => LOGIN],
  [(mode) => isEqual(mode, AccountType.register), () => REGISTER],
  [(mode) => isEqual(mode, AccountType.resetPassword), () => RESET_PASSWORD],
]);

const submitByType = cond([
  [
    (mode) => isEqual(mode, AccountType.login),
    (mode, dispatch, data) => dispatch(login(data.login, data.password)),
  ],
  [
    (mode) => isEqual(mode, AccountType.register),
    (mode, dispatch, data) => dispatch(register(data.login, data.password)),
  ],
  [
    (mode) => isEqual(mode, AccountType.resetPassword),
    (mode, dispatch, data) =>
      dispatch(resetPassword(data.login, data.password)),
  ],
]);

export const Account = () => {
  const [mode, setMode] = useState(AccountType.login);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const handleSave = (obj) => {
    const mappedData = loginMapper(obj);
    console.log(mappedData);

    submitByType(mode, dispatch, mappedData);
  };

  return (
    <Container>
      <Content>
        <RFForm
          onSubmit={handleSave}
          validate={(values) => finalFormValidation.validateForm(values)}
          initialValues={initialValues}
          render={({handleSubmit}) => (
            <Form
              style={{
                flex: 1,
                height: height - 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Ionicons name="md-paw" size={186} color="green" />
              </View>
              <View
                style={{flex: 1, justifyContent: 'center', width: '100%'}}
              >
                <Field name="login">
                  {({input: {value, onChange}, meta}) => (
                    <>
                      <Item>
                        {/* eslint-disable-next-line max-len */}
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        <Label>{USERNAME.capitalize()}</Label>
                        <Input
                          value={value.value}
                          onChangeText={(data) => {
                            return onChange({value: data});
                          }}
                        />
                      </Item>
                      {meta && Boolean(meta.touched) && Boolean(meta.error) && (
                        <Error style={styles.error}>{meta.error}</Error>
                      )}
                    </>
                  )}
                </Field>
                {mode !== AccountType.resetPassword && (
                  <Field name="password">
                    {({input: {value, onChange}, meta}) => (
                      <>
                        <Item>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line react-native/no-raw-text */}
                          <Label>{PASSWORD.capitalize()}</Label>
                          <Input
                            secureTextEntry
                            value={value.value}
                            onChangeText={(data) => {
                              return onChange({value: data});
                            }}
                          />
                        </Item>
                        {meta &&
                          Boolean(meta.touched) &&
                          Boolean(meta.error) && (
                          <Error style={styles.error}>{meta.error}</Error>
                        )}
                      </>
                    )}
                  </Field>
                )}
                {mode === AccountType.register && (
                  <TransparentButton
                    onPress={() => setMode(AccountType.resetPassword)}
                    text={RESET_PASSWORD}
                  />
                )}
                <CenteredButton
                  text={buttonText(mode)}
                  onPress={handleSubmit}
                />
              </View>
            </Form>
          )}
        />
      </Content>
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
          if (mode === AccountType.login) {
            setMode(AccountType.register);
            return;
          }
          setMode(AccountType.login);
        }}
        color="green"
        icon="md-repeat"
      />
    </Container>
  );
};
