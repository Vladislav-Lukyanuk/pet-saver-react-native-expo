import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import {Container, Content, Form, Textarea} from 'native-base';
import {Field, Form as RFForm} from 'react-final-form';
import MapView, {Marker} from 'react-native-maps';
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
import {SAVE, TITLE, DESCRIPTION} from '../../../textConstant';
import {addMapper} from '../../../core/mapper/add';
import {ActivityIndicator} from '../../../core/ui/loader/ActivityIndicator';
import {useLocation} from '../../../core/hook/useLocation';

const styles = StyleSheet.create({
  description: {
    alignSelf: 'center',
    marginTop: 25,
    width: '95%',
  },
  error: {
    alignSelf: 'center',
    width: '95%',
  },
  map: {
    alignSelf: 'center',
    height: 300,
    marginBottom: 15,
    marginTop: 25,
    width: '95%',
  },
  title: {
    alignSelf: 'center',
    marginTop: 25,
    width: '95%',
  },
});

const validationSchema = {
  field: {
    title: [
      {validator: minLengthValidator, customArgs: {min: 10}},
      {validator: maxLengthValidator, customArgs: {max: 150}},
    ],
    description: [
      {validator: minLengthValidator, customArgs: {min: 20}},
      {validator: maxLengthValidator, customArgs: {max: 300}},
    ],
  },
};

const finalFormValidation = createFinalFormValidation(validationSchema);

export const AddModal = compose(
    withAdd,
    withPrivateProfile,
    withModal,
)(({
  isLoading,
  dispatchUpload,
  dispatchCloseModal,
  privateProfileItems,
  itemId}) => {
  const location = useLocation();

  const handleSave = (obj) => {
    const mappedData = addMapper(obj);
    if (itemId) {
      dispatchUpload({...mappedData, id: itemId});
      return;
    }
    dispatchUpload(mappedData);
  };

  const initialObj =
      itemId &&
      privateProfileItems.find((a) => a.id === itemId) || null;

  const initialValues = {
    image: {value: initialObj && initialObj.image || null},
    title: {value: initialObj && initialObj.name || ''},
    description: {value: ''},
    coordinate: {
      value: {
        latitude:
          (location && location.coords && location.coords.latitude) || 0,
        longitude:
          (location && location.coords && location.coords.longitude) || 0,
      },
    },
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
                  <Field name="title" type="text">
                    {({input: {value, onChange}, meta}) => (
                      <>
                        <Textarea
                          rowSpan={2}
                          style={styles.title}
                          bordered
                          placeholder={TITLE.capitalize()}
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
                  <Field name="description" type="text">
                    {({input: {value, onChange}, meta}) => (
                      <>
                        <Textarea
                          rowSpan={5}
                          style={styles.description}
                          bordered
                          placeholder={DESCRIPTION.capitalize()}
                          value={value.value}
                          onChange={(description) =>
                            onChange({value: description.nativeEvent.text})
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
                <Field name="coordinate">
                  {({input: {value, onChange}}) => (
                    <MapView
                      region={{
                        latitude: value.value.latitude,
                        longitude: value.value.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      style={styles.map}
                    >
                      <Marker
                        draggable
                        coordinate={value.value}
                        onDragEnd={(e) =>
                          onChange({value: e.nativeEvent.coordinate})
                        }
                        pinColor="wheat"
                      />
                    </MapView>
                  )}
                </Field>
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
