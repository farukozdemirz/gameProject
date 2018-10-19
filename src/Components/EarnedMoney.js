import React, { Component } from "react";
import { View, Animated, Easing, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

class EarnedMoney extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animatestatus: false,
			deneme: false
		};
		this._width = new Animated.Value(0);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			animationstatus: nextProps.status
		});
	}
	componentDidUpdate(prevProps) {
		if (this.props.gamestatus && this.props.timecontrol === 1 && this.state.animatestatus === false) {
			this.setState(
				{
					animatestatus: true
				},
				() => {
					this.animation(this.props.time);
				}
			);
		}
	}
	componentDidMount() {}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, nextState);
		if (nextState.animatestatus == true) return false;
		return true;
	}

	animation(time) {
		this.setState({
			deneme: true
		});
		this._width.setValue(0);
		let _this = this;

		Animated.timing(this._width, {
			toValue: width - 100,
			duration: time,
			easing: Easing.linear
		}).start(() => {
			this._width.setValue(0);
		});

		setTimeout(() => {
			_this.setState({
				animatestatus: false
			});
		}, time + 100);
	}

	render() {
		return <Animated.View style={[styles.earnedMoneyBackground, { width: this._width }]} />;
	}
}
export default EarnedMoney;

const styles = StyleSheet.create({
	earnedMoneyBackground: {
		backgroundColor: "#8AD327",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	}
});
