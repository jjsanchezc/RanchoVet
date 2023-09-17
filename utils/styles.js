import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { ColorSpace } from "react-native-reanimated";

export const styles = StyleSheet.create({
	loginscreen: {
		flex: 1,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	inputWrapper: {
		flexDirection: "row", // Alinea los elementos en fila horizontalmente
		alignItems: "center", // Centra verticalmente los elementos en la fila
		borderWidth: 1,
		borderColor: COLORS.secondary,
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	icon: {
		marginRight: 10,
		color: COLORS.tertiary,
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
		orderWidth: 1,
		borderColor: COLORS.secondary,
		borderRadius: 5,
		padding: 10,
		marginBottom: 5,
		fontSize: 16,
		flex: 1,
	},
	loginbutton: {
		backgroundColor: COLORS.tertiary,
		padding: 12,
		marginVertical: 10,
		width: "30%",
		borderRadius: 50,
		elevation: 1,
	},
	loginbuttonText: {
		textAlign: "center",
		color: "#fff",
		fontWeight: "600",
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
		color: COLORS.tertiary,
	},
	chattopContainer: {
		backgroundColor: "#FBF4E1",
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
		backgroundColor: "#FBF4E1",
	},
	messaginginputContainer: {
		width: "100%",
		minHeight: 100,
		backgroundColor: "#FBF4E1",
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
		borderColor: COLORS.tertiary,
	},
	messagingbuttonContainer: {
		width: "30%",
		backgroundColor: COLORS.tertiary,
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
	modalbutton: {
		width: "40%",
		height: 45,
		backgroundColor: COLORS.secondary,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		color: COLORS.black,
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
		maxWidth: "100%", // Ajusta el ancho máximo al 100%
		backgroundColor: COLORS.secondary,
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
		backgroundColor: "#FBF4E1",
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
//menu
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	  menu: {
		display: 'flex',
		flexGrow: 1,
		height: 72,
		maxWidth: 370,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#fff',
		shadowColor: '#342ead',
		shadowOpacity: 0.25,
		shadowRadius: 1,
		shadowOffset: {
		  width: 0,
		  height: 1,
		},
		elevation: 3, // Use elevation for Android shadow
	  },
	  menuItem: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textDecorationLine: 'none',
	  },
	  menuItemFocused: {
		// Define styles for focused or hovered state here
		// Example: backgroundColor: '#342ead'
	  },
	  materialIcons: {
		fontFamily: 'Material Icons',
		marginBottom: 4,
		fontSize: 26,
		color: '#342ead',
		transitionDuration: '0.25s',
	  },
	  menuItemLabel: {
		fontSize: 13,
		color: '#342ead',
		transitionDuration: '0.25s',
	  },
	});
	