import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DateTime, Duration, Interval } from "luxon";

import Button from "../components/Button";
import Colors from "../constants/Colors";

const CUP_IN_ML = 350;

const initialState = {
  initialDuration: Duration.fromMillis(0),
  lastInterval: null,
};

export default class TimerScreen extends React.Component {
  static navigationOptions = {
    title: "Time",
  };

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  state = initialState;

  handleResetButtonPress = () => {
    this.setState(initialState);
  };

  handleStartButtonPress = () => {
    this.setState(
      ({ initialDuration, lastInterval }) =>
        lastInterval
          ? {
              lastInterval: null,
              initialDuration: initialDuration.plus(lastInterval.toDuration()),
            }
          : { lastInterval: Interval.after(DateTime.local(), 0) },
    );
  };

  tick = () => {
    this.setState(
      ({ lastInterval }) =>
        lastInterval
          ? { lastInterval: lastInterval.set({ end: DateTime.local() }) }
          : {},
    );
  };

  render() {
    const duration = this.state.initialDuration.plus(
      this.state.lastInterval ? this.state.lastInterval.toDuration() : 0,
    );

    return (
      <View style={styles.container}>
        <Text style={styles.time}>{duration.toFormat("mm:ss")}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            textStyle={styles.buttonText}
            onPress={this.handleResetButtonPress}
          />
          <Button
            title="Start / Stop"
            inlayStyle={styles.startButtonInlay}
            textStyle={styles.buttonText}
            onPress={this.handleStartButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    color: "white",
    fontSize: 120,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "monospace",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  startButtonInlay: {
    width: 120,
    height: 120,
    borderWidth: 6,
    borderRadius: 60,
  },
  buttonText: {
    fontSize: 15,
  },
});
