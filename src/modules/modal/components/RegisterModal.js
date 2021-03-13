import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import {Container, Content, Form, Textarea} from 'native-base';
import {Field, Form as RFForm} from 'react-final-form';
import {compose} from 'recompose';
import {createFinalFormValidation} from '@lemoncode/fonk-final-form';

/* Relative import */
import {CloseButton} from '../../../core/ui/button/CloseButton';
import {ImagePicker} from '../../../core/ui/expo/ImagePicker';
import {CenteredButton} from '../../../core/ui/button/CenteredButton';
import {withModal} from '../../../core/hoc/withModal';
import {withAdd} from '../../../core/hoc/withAdd';
import {withPrivateProfile} from '../../../core/hoc/withPrivateProfile';
import {Error} from '../../../core/ui/label/Error';
import {minLengthValidator} from '../../../core/validator/minLengthValidator';
import {maxLengthValidator} from '../../../core/validator/maxLengthValidator';
import {SAVE, NAME} from '../../../textConstant';
import {registerAnimalMapper} from '../../../core/mapper/registerAnimal';
import {ActivityIndicator} from '../../../core/ui/loader/ActivityIndicator';

const styles = StyleSheet.create({
  error: {
    alignSelf: 'center',
    width: '95%',
  },
  name: {
    alignSelf: 'center',
    marginTop: 25,
    width: '95%',
  },
});

const validationSchema = {
  field: {
    name: [
      {validator: minLengthValidator, customArgs: {min: 3}},
      {validator: maxLengthValidator, customArgs: {max: 150}},
    ],
  },
};

const finalFormValidation = createFinalFormValidation(validationSchema);

export const RegisterModal = compose(
    withAdd,
    withPrivateProfile,
    withModal,
)(({
  isLoading,
  dispatchRegister,
  dispatchCloseModal,
}) => {
  const handleSave = (obj) => {
    const mappedData = registerAnimalMapper(obj);
    dispatchRegister(mappedData);
  };

  const initialValues = {
    image: {value: null},
    name: {value: ''},
  };

  return (
    <Modal transparent animationType="slide" visible onRequestClose={() => {}}>
      <Container>
        <Content>
          <CloseButton
            onPress={() => {
              dispatchCloseModal();
            }}
          />
          <RFForm
            onSubmit={handleSave}
            validate={(values) => finalFormValidation.validateForm(values)}
            initialValues={initialValues}
            render={({handleSubmit}) => (
              <>
                <Field name="image" type="text">
                  {({input: {value, onChange}}) => (
                    <ImagePicker
                      imageUri={value.value}
                      setImage={(imageURI) => onChange({value: imageURI})}
                    />
                  )}
                </Field>
                <Form>
                  <Field name="name" type="text">
                    {({input: {value, onChange}, meta}) => (
                      <>
                        <Textarea
                          rowSpan={2}
                          style={styles.name}
                          bordered
                          placeholder={NAME.capitalize()}
                          value={value.value}
                          onChange={(title) =>
                            onChange({value: title.nativeEvent.text})
                          }
                        />
                        {meta &&
                        Boolean(meta.touched) &&
                        Boolean(meta.error) && (
                          <Error style={styles.error}>{meta.error}</Error>
                        )}
                      </>
                    )}
                  </Field>
                </Form>
                <ActivityIndicator size={48} isLoading={isLoading} />
                {!isLoading && (
                  <CenteredButton text={SAVE} onPress={handleSubmit} />
                )}
              </>
            )}
          />
        </Content>
      </Container>
    </Modal>
  );
});
