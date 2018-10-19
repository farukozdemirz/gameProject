import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PopupDialog, { DialogTitle, DialogButton, SlideAnimation, ScaleAnimation, FadeAnimation } from "react-native-popup-dialog";

const scaleAnimation = new ScaleAnimation();
class Popup extends Component {
	componentDidUpdate() {
		if (this.props.popup === 1) {
			this.scaleAnimationDialog.show();
		}
	}

	state = {
		users: [
			{ name: "Karl Benz", detail: "Karl Benz runs Motor company", prices: "10 Million" },
			{ name: "Gabriel Jobs", detail: "Gabriel Jobs runs Electronics Inc.", prices: "111 Million" },
			{ name: "Jenice Collier", detail: "Jenice Collier runs Pharma Group", prices: "556 Milion" },
			{ name: "Amadeo Giannini", detail: "Amadeo Giannini runs Bank", prices: "10 Billion" },
			{ name: "John D. Rockefeller", detail: "John D.Rockefeller runs Oil Company", prices: "100 Bilion" },
			{ name: "Aiden Adams", detail: "Oil Company expand cost 10% lower & Shows cash per sec", prices: "10 Angels" },
			{ name: "Isabella Green", detail: "Bank expand cost 10% lower & Shows cash per sec", prices: "100 Angels" },
			{ name: "Abraham Lincoln", detail: "Pharma Group expand cost 10% lower & Shows cash per sec", prices: "1,000 Angels" }
		],
		upgrade: [
			{ item: "Clothing Store profit x3", cost: "$5 Milion" },
			{ item: "Iron Mine profit x3", cost: "$10 Milion" },
			{ item: "Motor Company profit x3", cost: "$25 Milion" },
			{ item: "Electronics Inc.profit x3", cost: "$500 Milion" },
			{ item: "Pharma Group profit x3", cost: "$10 Bilion" },
			{ item: "Bank profit x3", cost: "$50 Bilion" },
			{ item: "Oil Company profit x3", cost: "$250 Bilion" }
		]
	};
	render() {
		return (
			<View style={styles.container}>
				<PopupDialog
					width={350}
					height={450}
					ref={popupDialog => {
						this.scaleAnimationDialog = popupDialog;
					}}
					dialogAnimation={scaleAnimation}
					dialogTitle={<DialogTitle titleStyle={styles.popupTitleStyle} titleTextStyle={styles.titleTextStyle} title="Menu" />}
					actions={[
						<DialogButton
							textStyle={styles.popupButtonTextStyle}
							buttonStyle={styles.popupButtonStyle}
							text="CLOSE"
							onPress={() => {
								this.scaleAnimationDialog.dismiss();
							}}
							key="button-1"
						/>
					]}
				>
					<View style={styles.dialogContentView}>
						<TouchableOpacity style={styles.popupContentTextWrapper} onPress={() => this.fadeAnimationDialog.show()}>
							<Text style={styles.popupContentText}>Manager</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.popupContentTextWrapper} onPress={() => this.popupDialog.show()}>
							<Text style={styles.popupContentText}>Upgrade</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.popupContentTextWrapper}>
							<Text style={styles.popupContentText}>Unlocks</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.popupContentTextWrapper}>
							<Text style={styles.popupContentText}>Gold Boosts</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.popupContentTextWrapper}>
							<Text style={styles.popupContentText}>Options</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.popupContentTextWrapper}>
							<Text style={styles.popupContentText}>Feedback</Text>
						</TouchableOpacity>
					</View>
				</PopupDialog>
				<PopupDialog
					height={450}
					width={350}
					ref={fadeAnimationDialog => {
						this.fadeAnimationDialog = fadeAnimationDialog;
					}}
					dialogTitle={<DialogTitle titleStyle={styles.popupTitleStyle} titleTextStyle={styles.titleTextStyle} title="Manager" />}
				>
					<ScrollView style={styles.managerPopup}>
						{this.state.users.map((a, b) => (
							<View style={styles.managerPopupContainer} key={b}>
								<View style={{ flexDirection: "row" }} key={b}>
									<View style={styles.managerPopupContent}>
										<Text style={styles.managerPopupName}>{a.name}</Text>
										<Text style={styles.managerPopupCompany}>{a.detail}</Text>
										<Text style={styles.managerPopupWealth}>{a.prices}</Text>
									</View>
									<TouchableOpacity style={styles.managerHireButton}>
										<Text>Hire!</Text>
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>
				</PopupDialog>
				<PopupDialog
					height={450}
					width={350}
					dialogTitle={<DialogTitle titleStyle={styles.popupTitleStyle} titleTextStyle={styles.titleTextStyle} title="Upgrade" />}
					ref={popupDialog => {
						this.popupDialog = popupDialog;
					}}
				>
					<View style={styles.upgradePopup}>
						<View style={styles.upgradePopupContainer}>
							<TouchableOpacity style={styles.upgradeElementsContainer}>
								<View style={styles.upgradeButtonWrapper} />
								<View style={styles.upgradeButton}>
									<Text style={styles.upgradeButtonText}>Upgrade</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.upgradeElementsContainer}>
								<View style={styles.upgradeButtonWrapper} />
								<View style={styles.upgradeButton}>
									<Text style={styles.upgradeButtonText}>Text</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.upgradeElementsContainer}>
								<View style={styles.upgradeButtonWrapper} />
								<View style={styles.upgradeButton}>
									<Text style={styles.upgradeButtonText}>Props</Text>
								</View>
							</TouchableOpacity>
						</View>
						<ScrollView>
							{this.state.upgrade.map((c, d) => (
								<View style={styles.upgradeItemWrapper} key={d}>
									<View style={styles.upgradePopupContent}>
										<Text style={styles.upgradePopupItem}>{c.item}</Text>
										<Text style={styles.upgradePopupCost}>{c.cost}</Text>
									</View>
									<TouchableOpacity style={styles.buyButtonStyle}>
										<Text style={styles.buyButtonText}>Buy!</Text>
									</TouchableOpacity>
								</View>
							))}
						</ScrollView>
					</View>
				</PopupDialog>
			</View>
		);
	}
}
export default Popup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},

	dialogContentView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#797365"
	},
	popupTitleStyle: {
		backgroundColor: "#49453D"
	},
	titleTextStyle: {
		fontSize: 25,
		color: "#797365"
	},
	popupButtonStyle: {
		backgroundColor: "#49453D",
		width: 350
	},
	popupButtonTextStyle: {
		color: "#797365"
	},
	popupContentTextWrapper: {
		marginTop: 15,
		backgroundColor: "#49453D",
		width: 250,
		alignItems: "center"
	},
	popupContentText: {
		fontSize: 25,
		color: "#797365"
	},
	managerPopup: {
		flex: 1,
		backgroundColor: "#797365",
		flexDirection: "column"
	},
	managerPopupContent: {
		flex: 1,
		backgroundColor: "#83B7B5",
		height: 50,
		alignItems: "center",
		width: 250
	},
	managerPopupContainer: {
		marginTop: 10
	},
	managerHireButton: {
		height: 50,
		width: 50,
		backgroundColor: "#54B8FF",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#49453D",
		borderRadius: 10
	},
	managerPopupName: {
		fontWeight: "600"
	},
	managerPopupCompany: {
		fontSize: 10
	},
	managerPopupWealth: {
		color: "#fff",
		fontWeight: "600"
	},
	upgradePopupContainer: {
		flexDirection: "row",
		justifyContent: "space-around"
	},
	upgradeElementsContainer: {
		flexDirection: "column"
	},
	upgradeButtonWrapper: {
		height: 50,
		width: 50,
		backgroundColor: "#F59800",
		borderRadius: 50
	},
	upgradeButton: {
		height: 15,
		width: 50,
		backgroundColor: "#F59800",
		marginTop: -10,
		borderWidth: 1,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	upgradeButtonText: {
		fontSize: 11,
		fontWeight: "600"
	},
	upgradePopup: {
		flex: 1,
		backgroundColor: "#FBD87C"
	},
	upgradePopupContent: {
		flex: 1,
		height: 50,
		backgroundColor: "#EFAD54",
		alignItems: "center",
		justifyContent: "center"
	},
	upgradeItemWrapper: {
		flexDirection: "row",
		marginTop: 10
	},
	buyButtonStyle: {
		height: 50,
		width: 50,
		backgroundColor: "#EC7D00",
		alignItems: "center",
		justifyContent: "center"
	},
	buyButtonText: {
		fontSize: 20,
		fontWeight: "600"
	},
	upgradePopupItem: {
		fontSize: 12,
		fontWeight: "600"
	},
	upgradePopupCost: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "500"
	}
});
