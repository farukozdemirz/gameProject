import React from "react";
import { View, Text, StyleSheet } from "react-native";

prettifyNumber = (value, replace) => {
	var thousand = 1000;
	var million = 1000000;
	var billion = 1000000000;
	var trillion = 1000000000000;

	if (value < million) {
		return "$" + String(value.toFixed(2));
	}

	if (value >= million && value <= billion) {
		return "$" + Math.round(value / million) + replace + "Million";
	}

	if (value >= billion && value <= trillion) {
		return "$" + Math.round(value / billion) + replace + "Billion";
	} else {
		return "$" + Math.round(value / trillion) + replace + "Trillion";
	}
};

export const Commarization = props => prettifyNumber(props.number, props.replace);

export default Commarization;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
