import * as React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import Camera from 'react-native-camera';
import ImageRecognizer from '../ImageRecognizer';

export class WelcomeScreen extends React.Component {
    camera: any;
    componentDidMount() {
      this.recognizer = new ImageRecognizer({
        model: require('../../assets/model.pb'),
        labels: require('../../assets/labels.txt'),
      });
    }
    render() {
        return (
            <View style={{ flex: 1 }} testID="welcomeScreen" accessibilityLabel={"welcomeScreen"} accessible={true}>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                captureTargets={
                    Platform.OS == 'ios'
                    ? Camera.constants.CaptureTarget.disk
                    : Camera.constants.CaptureTarget.cameraRoll
                }
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
                <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
                    Capture
                </Text>
            </View>
        );
    }
    async takePicture() {
      const results = await this.recognizer.recognize({
        image: data.path,
        inputName: 'Placeholder',
        outputName: 'loss',
      });
      if (results.length > 0) {
        alert(`Name: ${results[0].name} - Confidence: ${results[0].confidence.toFixed(2)}`);
      }
      const options = {};
      try
      {
        const data = await this.camera.capture({metadata: options});
        alert("Picture taken");
      }
      catch (err)
      {
        alert(err);
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
