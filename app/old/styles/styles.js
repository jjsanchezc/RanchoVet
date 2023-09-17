import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";


export const styles = StyleSheet.create({
	loginscreen: {
		flex: 1,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		width: "100%",
	},
	loginheading: {
		fontSize: 26,
		marginBottom: 10,
	},
	logininputContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	logininput: {
	// 	borderWidth: 1,
	// 	width: "90%",
	// 	padding: 8,
	// 	borderRadius: 2,
	// },
	// 
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		fontSize: 16,
	  },
	loginbutton: {
		backgroundColor: COLORS.secondary,
		padding: 12,
		marginVertical: 10,
		width: "60%",
		borderRadius: 50,
		elevation: 1,
	},
	loginbuttonText: {
		textAlign: "center",
		color: COLORS.black,
		fontWeight: "600",
		fontSize: 18,
	},
	chatscreen: {
		backgroundColor: COLORS.primary,
		flex: 1,
		padding: 10,
		position: "relative",
	},
	chatheading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#EFC88B",
	},
	chattopContainer: {
		backgroundColor: COLORS.primary,
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginBottom: 15,
		elevation: 2,
	},
	chatheader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	chatlistContainer: {
		paddingHorizontal: 10,
	},
	chatemptyContainer: {
		width: "100%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
	messagingscreen: {
		flex: 1,
	},
	messaginginputContainer: {
		width: "100%",
		minHeight: 100,
		backgroundColor: "white",
		paddingVertical: 30,
		paddingHorizontal: 15,
		justifyContent: "center",
		flexDirection: "row",
	},
	messaginginput: {
		borderWidth: 1,
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	messagingbuttonContainer: {
		width: "30%",
		backgroundColor: "#EFC88B",
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
	modalbutton: {
		width: "40%",
		height: 45,
		backgroundColor: "green",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
	},
	modalbuttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	modaltext: {
		color: "#fff",
	},
	modalContainer: {
		width: "100%",
		borderTopColor: "#ddd",
		borderTopWidth: 1,
		elevation: 1,
		height: 400,
		backgroundColor: "#fff",
		position: "absolute",
		bottom: 0,
		zIndex: 10,
		paddingVertical: 50,
		paddingHorizontal: 20,
	},
	modalinput: {
		borderWidth: 2,
		padding: 15,
	},
	modalsubheading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	mmessageWrapper: {
		width: "100%",
		alignItems: "flex-start",
		marginBottom: 15,
	},
	mmessage: {
		maxWidth: "50%",
		backgroundColor: "#f5ccc2",
		padding: 15,
		borderRadius: 10,
		marginBottom: 2,
	},
	mvatar: {
		marginRight: 5,
	},
	cchat: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		height: 80,
		marginBottom: 10,
	},
	cavatar: {
		marginRight: 15,
	},
	cusername: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: "bold",
	},
	cmessage: {
		fontSize: 14,
		opacity: 0.7,
	},
	crightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	ctime: {
		opacity: 0.5,
	},
});