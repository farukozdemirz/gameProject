import React, { Component } from "react";
import { View, Animated, Easing, Text, StyleSheet } from "react-native";

class EarnedMoney extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animatestatus: false
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

	animation(time) {
		this._width.setValue(0);
		let _this = this;
		Animated.timing(this._width, {
			toValue: 294,
			duration: time,
			easing: Easing.linear
		}).start(() => {
			this._width.setValue(0);
		});
		setTimeout(() => {
			_this.setState({
				animatestatus: false
			});
		}, time);
	}
	render() {
		return <Animated.View style={[styles.earnedMoneyBackground, { width: this._width }]} />;
	}
}
export default EarnedMoney;

const styles = StyleSheet.create({
	earnedMoneyBackground: {
		backgroundColor: "#8AD327",
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	}
});
