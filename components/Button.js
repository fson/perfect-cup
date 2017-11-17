import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default class Button extends React.Component {
  state = { scale: new Animated.Value(1) };

  handlePress = event => {
    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
    this.props.onPress(event);
  };

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.button}
        onPress={this.handlePress}>
        <Animated.View
          style={[
            styles.buttonInlay,
            { transform: [{ scale: this.state.scale }] },
            this.props.inlayStyle,
          ]}>
          <Text style={[styles.buttonLabel, this.props.textStyle]}>
            {this.props.title}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {},
  buttonInlay: {
    margin: 10,
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 30,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "white",
    fontSize: 60,
    lineHeight: Platform.OS === "android" ? 40 : 60,
    fontWeight: "200",
  },
});
