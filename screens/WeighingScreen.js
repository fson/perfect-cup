import React from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

class Button extends React.Component {
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
          ]}>
          <Text style={styles.buttonLabel}>{this.props.title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const CUP_IN_ML = 350;

const State = {
  fromWater: (water, denominator) => {
    const coffee = water / denominator;
    const cups = water / CUP_IN_ML;
    return {
      cups: Math.round(cups),
      coffee: Math.round(coffee),
      water: Math.round(water),
      denominator: Math.round(denominator),
    };
  },
  fromCups: (cups, denominator) => {
    const water = cups * CUP_IN_ML;
    return State.fromWater(water, denominator);
  },
  fromCoffee: (coffee, denominator) => {
    const water = coffee * denominator;
    return State.fromWater(water, denominator);
  },
};

export default class WeighingScreen extends React.Component {
  static navigationOptions = {
    title: "Perfect Cup",
  };

  state = State.fromCups(2, 14);

  handleDecrementCups = () => {
    this.setState(
      state =>
        state.cups > 0
          ? State.fromCups(state.cups - 1, state.denominator)
          : state,
    );
  };
  handleIncrementCups = () => {
    this.setState(state => State.fromCups(state.cups + 1, state.denominator));
  };
  handleDecrementCoffee = () => {
    this.setState(
      state =>
        state.coffee > 0
          ? State.fromCoffee(state.coffee - 1, state.denominator)
          : state,
    );
  };
  handleIncrementCoffee = () => {
    this.setState(state =>
      State.fromCoffee(state.coffee + 1, state.denominator),
    );
  };
  handleDecrementWater = () => {
    this.setState(
      state =>
        state.water > 0
          ? State.fromWater(state.water - 10, state.denominator)
          : state,
    );
  };
  handleIncrementWater = () => {
    this.setState(state =>
      State.fromWater(state.water + 10, state.denominator),
    );
  };
  handleDecrementDenominator = () => {
    this.setState(
      state =>
        state.denominator > 0
          ? State.fromWater(state.water, state.denominator - 1)
          : state,
    );
  };
  handleIncrementDenominator = () => {
    this.setState(state => State.fromWater(state.water, state.denominator + 1));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Cups</Text>
        <View style={styles.row}>
          <Button title="-" onPress={this.handleDecrementCups} />
          <Text style={styles.cups}>{this.state.cups}</Text>
          <Button title="+" onPress={this.handleIncrementCups} />
        </View>
        <Text style={styles.label}>Coffee (g)</Text>
        <View style={styles.row}>
          <Button title="-" onPress={this.handleDecrementCoffee} />
          <Text style={styles.cups}>{this.state.coffee}</Text>
          <Button title="+" onPress={this.handleIncrementCoffee} />
        </View>
        <Text style={styles.label}>Water (ml)</Text>
        <View style={styles.row}>
          <Button title="-" onPress={this.handleDecrementWater} />
          <Text style={styles.cups}>{this.state.water}</Text>
          <Button title="+" onPress={this.handleIncrementWater} />
        </View>
        <Text style={styles.label}>Ratio</Text>
        <View style={styles.row}>
          <Button title="-" onPress={this.handleDecrementDenominator} />
          <Text style={styles.cups}>1:{this.state.denominator}</Text>
          <Button title="+" onPress={this.handleIncrementDenominator} />
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
  },
  label: {
    textAlign: "center",
    color: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  cups: {
    fontSize: 60,
    color: "white",
  },
  amount: {
    flex: 1,
    fontSize: 60,
    color: "white",
    textAlign: "center",
  },
});
