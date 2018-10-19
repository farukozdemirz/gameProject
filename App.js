import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, StatusBar } from "react-native";
import Commarization from "./src/Components/Commarization";
import Popup from "./src/Components/Popup";
import EarnedMoney from "./src/Components/EarnedMoney";
import Countdown from "react-countdown-now";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
class App extends Component {
	constructor(props) {
		super(props);

		this._width = new Animated.Value(0);

		this.state = {
			expandCounter: 1,
			expandText: "x1",
			currentvalues: 5555,
			popup: 0,
			game: [
				{
					gameid: 0,
					gamevalue: 0,
					expand: 4,
					dollar: 1,
					factor: 1,
					time: 1000,
					gamestatus: true,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 1,
					gamevalue: 0,
					expand: 60,
					dollar: 60,
					factor: 60,
					time: 3000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 2,
					gamevalue: 0,
					expand: 540,
					dollar: 540,
					factor: 540,
					time: 6000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 3,
					gamevalue: 0,
					expand: 8640,
					dollar: 4320,
					factor: 4320,
					time: 12000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 4,
					gamevalue: 0,
					expand: 103680,
					dollar: 51840,
					factor: 51840,
					time: 24000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 5,
					gamevalue: 0,
					expand: 1244000,
					dollar: 62208,
					factor: 62208,
					time: 96000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 6,
					gamevalue: 0,
					expand: 14929000000,
					dollar: 7464000000,
					factor: 7464000000,
					time: 384000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 7,
					gamevalue: 0,
					expand: 179159000000,
					dollar: 179158000000,
					factor: 179158000000,
					time: 1535000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 8,
					gamevalue: 0,
					expand: 2149000000000,
					dollar: 2148000000000,
					factor: 2148000000000,
					time: 4115000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				},
				{
					gameid: 9,
					gamevalue: 0,
					expand: 25978000000000,
					dollar: 59336000000000,
					factor: 59336000000000,
					time: 36864000,
					gamestatus: false,
					timecontrol: 0,
					anim: 0
				}
			]
		};
	}

	expandType() {
		this.setState(
			{
				expandCounter: this.state.expandCounter >= 4 ? 1 : this.state.expandCounter + 1
			},
			() => {
				this.setState({
					expandText: this.state.expandCounter === 1 ? "x1" : this.state.expandCounter === 2 ? "x10" : this.state.expandCounter === 3 ? "x100" : "xMAX"
				});
			}
		);
	}
	expandsGrain(i, expand, dollar) {
		let value = this.state.game[i].gamevalue >= 25 ? 0 : this.state.game[i].gamevalue + 1;
		let arr = this.state.game.map(
			el =>
				el.gameid === i
					? {
							...el,
							gamevalue: value,
							expand: this.state.game[i].expand * 1.07,
							dollar: this.state.game[i].dollar + this.state.game[i].factor
					  }
					: el
		);

		this.setState({
			game: arr,
			currentvalues: this.state.currentvalues - this.state.game[i].expand
		});
	}

	animationStart(time, dollar, i) {
		let arr = this.state.game.map(el => (el.gameid === i ? { ...el, timecontrol: 1, gamestatus: true } : el));
		this.setState(
			{
				game: arr
			},
			() => {
				setTimeout(() => {
					let arr = this.state.game.map(el => (el.gameid === i ? { ...el, timecontrol: 0, anim: 0 } : el));
					this.setState(
						{
							currentvalues: this.state.currentvalues + dollar,
							game: arr
						},
						() => {
							if (this.state.currentvalues >= arr[i + 1].dollar) {
								let arr = this.state.game.map(el => (el.gameid === i + 1 ? { ...el, gamestatus: true } : el));

								this.setState({
									game: arr
								});
							}
						}
					);
				}, time);
			}
		);
	}

	openPopup = () => {
		this.setState({
			popup: 1
		});
	};

	msToTime = duration => {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	};

	render() {
		const renderer = ({ hours, minutes, seconds, completed }) => {
			if (completed) {
				return <Text>00:00:00</Text>;
			} else {
				// Render a countdown
				return (
					<Text>
						{hours}:{minutes}:{seconds}
					</Text>
				);
			}
		};

		return (
			<View style={styles.container}>
				<StatusBar hidden />
				<View style={styles.headerWrapper}>
					<View style={styles.headerTopWrapper}>
						<View style={styles.headerTrump}>
							<Text>Trump</Text>
						</View>
						<Text style={styles.totalMoney}>
							<Commarization replace={"\n"} number={this.state.currentvalues} />
						</Text>
						<View style={styles.expandBarWrapper}>
							<TouchableOpacity onPress={() => this.expandType()} style={styles.expandBar}>
								<Text style={styles.expandBarText}>Expand By </Text>
								<Text style={styles.expandSubText}>{this.state.expandText}</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.barContainer}>
						<View style={[styles.diamondBar, styles.elementBars]}>
							<Image source={require("./src/Images/diamond.png")} />
							<Text style={styles.diamondText}>2</Text>
						</View>
						<View style={[styles.goldBar, styles.elementBars]}>
							<Image style={styles.goldIcon} source={require("./src/Images/gold-medal.png")} />
						</View>
						<View style={[styles.dolarBar, styles.elementBars]}>
							<Image source={require("./src/Images/money-bag.png")} />
						</View>
					</View>
				</View>
				<ScrollView style={styles.Content}>
					{this.state.game &&
						this.state.game.map((_, i) => (
							<View style={[styles.contentContainer, !_.gamestatus ? { opacity: 0.25 } : { opacity: 1 }]} key={i}>
								<View style={styles.contentSubContainer}>
									<TouchableOpacity
										onPress={() => this.animationStart(_.time, _.dollar, i)}
										style={styles.itemImage}
										disabled={_.gamestatus ? (_.timecontrol === 1 ? true : false) : true}
									>
										<View style={styles.itemImageBackground} />
									</TouchableOpacity>
									<View style={styles.itemBar}>
										<Animated.View style={[styles.itemBarBackground, { width: (_.gamevalue * 60) / 25 }]} />
										<Text style={styles.itemText}> {this.state.game[i].gamevalue}</Text>
									</View>
								</View>
								<View style={styles.itemRightContainer}>
									<View style={styles.earnedMoneyBar}>
										<Text style={styles.earnedMoneyText}>
											<Commarization number={_.dollar} replace={" "} />
										</Text>
										<EarnedMoney id={i} anim={_.anim} timereset={this.timereset} timecontrol={_.timecontrol} gamestatus={_.gamestatus} dollar={_.dollar} time={_.time} />
									</View>
									<View style={styles.itemRightSubContainer}>
										<TouchableOpacity
											onPress={() => this.expandsGrain(i, _.expand)}
											style={[styles.expansionCostBar, this.state.currentvalues >= _.expand ? { opacity: 1 } : { opacity: 0.25 }]}
											disabled={this.state.currentvalues >= _.expand ? (_.timecontrol === 1 ? true : false) : true}
										>
											<View style={styles.expansionAmountContainer}>
												<Text style={styles.expansionText}>Expand</Text>
												<Text style={styles.expansionAmount}>{this.state.expandText}</Text>
											</View>
											<View style={styles.expansionCostContainer}>
												<Text style={styles.expansionCost}>
													<Commarization number={_.expand} replace={"\n"} />
												</Text>
											</View>
										</TouchableOpacity>
										<View style={styles.timeBar}>
											<View style={styles.timeBarBackground}>
												<Text style={{ color: "#fff" }}>{_.timecontrol === 1 ? <Countdown date={Date.now() + _.time} renderer={renderer} /> : this.msToTime(_.time)}</Text>
												{/* <Counter status={this.state.timecontrol} time={_.time} /> */}
											</View>
										</View>
									</View>
								</View>
							</View>
						))}
				</ScrollView>
				<Popup popup={this.state.popup} />
				<View style={styles.menuBarContainer}>
					<TouchableOpacity style={[styles.shopButton, styles.buttonsStyle]} />
					<TouchableOpacity style={[styles.worldButton, styles.buttonsStyle]} />
					<TouchableOpacity onPress={() => this.openPopup()} style={[styles.menuButton, styles.buttonsStyle]}>
						<Text style={{ color: "#fff", fontSize: 20 }}>Menu</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.timeButton, styles.buttonsStyle]}>
						<Text style={{ color: "#fff", fontSize: 20 }}>00:00:00</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
export default App;

const styles = StyleSheet.create({
	container: {
		height: height,
		width: width,
		flex: 1
	},
	headerWrapper: {
		backgroundColor: "#49453D",
		height: 100
	},
	headerTopWrapper: {
		flexDirection: "row",
		marginTop: 10
	},
	headerTrump: {
		height: 60,
		width: 60,
		backgroundColor: "#6A93AA",
		alignItems: "center",
		marginLeft: 5,
		justifyContent: "center"
	},
	totalMoney: {
		color: "#FFE7CC",
		fontSize: 16,
		position: "relative",
		zIndex: 1,
		left: 10,
		height: 45
	},
	wingBar: {
		flexDirection: "row",
		height: 20,
		width: 200,
		borderWidth: 1,
		borderColor: "#979082",
		borderRadius: 20,
		alignItems: "center"
	},
	wingBarText: {
		color: "#fff",
		fontWeight: "600",
		paddingLeft: 5
	},
	barContainer: {
		flexDirection: "row",
		marginLeft: "15%",
		marginTop: -5
	},
	elementBars: {
		height: 20,
		width: 80,
		borderWidth: 1,
		borderColor: "#979082",
		borderRadius: 10,
		marginLeft: 20
	},
	diamondBar: {
		alignItems: "center",
		flexDirection: "row"
	},
	diamondText: {
		color: "#fff",
		fontWeight: "600",
		position: "absolute",
		width: "100%",
		textAlign: "center"
	},
	goldBar: {
		backgroundColor: "#E3BE43",
		justifyContent: "center"
	},
	goldIcon: {},
	dolarBar: {
		backgroundColor: "#6BADEF",
		flexDirection: "row",
		alignItems: "center"
	},
	expandBarWrapper: {
		height: 45,
		position: "absolute",
		right: 5
	},
	expandBar: {
		width: 80,
		height: 45,
		backgroundColor: "#F78331",
		borderRadius: 15,
		justifyContent: "center"
	},
	expandBarText: {
		textAlign: "center",
		color: "#fff",
		textShadowColor: "#49453D",
		textShadowOffset: { width: -1, height: 2 },
		textShadowRadius: 1,
		fontSize: 14,
		fontWeight: "600"
	},
	expandSubText: {
		textAlign: "center",
		color: "#fff",
		fontSize: 14,
		textShadowColor: "#49453D",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		fontWeight: "700"
	},
	menuBarContainer: {
		flexDirection: "row",
		height: 50,
		backgroundColor: "rgba(0,0,0,.3)",
		position: "absolute",
		zIndex: 2,
		width: "100%",
		bottom: 0,
		alignItems: "center"
	},
	buttonsStyle: {
		height: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	shopButton: {
		marginLeft: 5,
		width: 60,
		backgroundColor: "#F78331"
	},
	worldButton: {
		marginLeft: 10,
		width: 60,
		backgroundColor: "yellow"
	},
	menuButton: {
		marginLeft: 20,
		width: 80,
		backgroundColor: "#49453D"
	},
	timeButton: {
		marginLeft: 15,
		width: 100,
		backgroundColor: "#797365"
	},
	Content: {
		backgroundColor: "#797365",
		flexDirection: "column"
	},
	contentContainer: {
		flexDirection: "row",
		paddingTop: 15
	},
	productImage: {
		height: 50,
		width: 50
	},
	contentSubContainer: {
		flexDirection: "column"
	},
	itemImage: {
		height: 80,
		width: 80,
		backgroundColor: "#6A93AA",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 4,
		borderColor: "#49453D"
	},
	itemImageBackground: {
		height: 65,
		width: 65,
		borderRadius: 60,
		backgroundColor: "#495F6C"
	},
	itemBar: {
		height: 20,
		width: 60,
		borderRadius: 20,
		backgroundColor: "#49453D",
		marginTop: -10,
		overflow: "hidden",
		marginLeft: 10
	},
	itemBarBackground: {
		backgroundColor: "#F78331",
		height: 30,
		justifyContent: "center"
	},
	itemText: {
		color: "#fff",
		width: "100%",
		fontSize: 14,
		fontWeight: "800",
		position: "absolute",
		textAlign: "center"
	},
	itemRightContainer: {
		flexDirection: "column"
	},
	earnedMoneyBar: {
		height: 50,
		width: width - 84,
		borderRadius: 30,
		borderWidth: 3,
		borderColor: "#49453D",
		flexDirection: "row",
		alignItems: "center",
		overflow: "hidden"
	},
	earnedMoneyText: {
		fontSize: 23,
		color: "#fff",
		fontWeight: "700",
		textShadowColor: "#49453D",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		position: "absolute",
		zIndex: 10,
		width: "100%",
		textAlign: "center"
	},
	itemRightSubContainer: {
		flexDirection: "row"
	},
	expansionCostBar: {
		height: 50,
		width: width - 162,
		backgroundColor: "#F78331",
		borderRadius: 16,
		borderWidth: 3,
		borderColor: "#49453D",
		flexDirection: "row"
	},
	expansionAmountContainer: {
		flexDirection: "column",
		width: 70,
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 5
	},
	expansionText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "700",
		textShadowColor: "#49453D",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1
	},
	expansionAmount: {
		color: "#fff",
		textShadowColor: "#49453D",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		marginTop: -5
	},
	expansionCostContainer: {
		flexDirection: "column",
		flex: 1,
		alignItems: "flex-end",
		marginRight: 10
	},
	expansionCost: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		textShadowColor: "#49453D",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		textAlign: "right"
	},
	timeBar: {
		height: 50,
		width: 75,
		backgroundColor: "#797365",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 3,
		borderColor: "#49453D",
		overflow: "hidden"
	},
	timeBarBackground: {
		height: 40,
		width: 70,
		backgroundColor: "#645E50",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	timeText: {
		color: "#1AF2FE",
		fontSize: 15,
		fontWeight: "700"
	}
});
