import { StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { FONT } from "../constants";
import { ColorSpace } from "react-native-reanimated";


export const styles = StyleSheet.create({
	loginBox: {
		width: "80%", // Adjust the width as needed
		backgroundColor: COLORS.background,
		padding: 20,
		borderRadius: 10,
		elevation: 5,
		alignItems: "center",
	},
	logo: {
		width: 100, // Adjust the width as needed
		height: 100, // Adjust the height as needed
		resizeMode: "contain", // Ensure the logo scales correctly
		marginBottom: 20,
	},
	loginscreen: {
		flex: 1,
		backgroundColor: COLORS.background,
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
	loginbutton: {
		backgroundColor: COLORS.tertiary,
		padding: 12,
		marginVertical: 10,
		borderRadius: 50,
		elevation: 1,
	},
	loginbuttonText: {
		textAlign: "center",
		color: "#fff",
		fontWeight: "600",
	},
	inputWrapper: {
		flexDirection: "row", // Alinea los elementos en fila horizontalmente
		alignItems: "center", // Centra verticalmente los elementos en la fila
		borderWidth: 1,
		borderColor: COLORS.background,
		backgroundColor: COLORS.background,
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
		borderColor: COLORS.secondary,
		borderRadius: 5,
		padding: 10,
		marginBottom: 5,
		fontSize: 16,
		flex: 1,
	},
	mainMenuContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		display: "flex",
		alignItems: "center",
		backgroundColor: COLORS.background,
		justifyContent: "center",
	},
	mainMenuButtonContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center", // Center the buttons horizontally
		alignItems: "center", // Center the buttons vertically
	},
	mainMenuButton: {
		borderRadius: 5,
		width: "40%",
		height: 70,
		backgroundColor: "#CF5C36",
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	mainMenuButtonText: {
		color: "white",
		fontSize: 20,
	},
	mainMenuButtonSubText: {
		color: "white",
		fontSize: 10,
		textAlign: "center",
	},
	//chat 
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.secundary,
		borderRadius: 8,
		flex: 1,
		marginRight: 16,
	  },
	  searchInput: {
		flex: 1,
		padding: 8,
	  },
	  searchBtn: {
		padding: 6,
		backgroundColor: '#CF5C36',
		borderRadius: 10,
	  },
	  searchButtonText: {
		color: '#050517',
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
		backgroundColor: COLORS.secondary,
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
		flex: 1,
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
		backgroundColor: COLORS.background,
	},
	messaginginputContainer: {
		width: "100%",
		minHeight: 100,
		backgroundColor: COLORS.background,
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
	directoryscreen: {
		backgroundColor: COLORS.primary,
		flex: 1,
		padding: 10,
		position: "relative",
	},
	directoryBox: {
		width: "100%",
		height: 200,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "flex-start",
		color: COLORS.black,
		flexDirection: "row",
		padding: 10,
		position: "relative",
	},
	columnContainer: {
		flexDirection: 'column',
		justifySelf: 'flex-end',
		alignSelf: "flex-end",
		margin: 10,
	  },
	rowContainer: {
		flexDirection: 'row', 
		justifyContent: 'flex-start', 
	  },
	directoryText: {
		color: COLORS.black,

	},
	directoryDetailsText: {
		color: COLORS.black,
		flex: 1,
		padding: 10,

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
		backgroundColor: COLORS.background,
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
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	menu: {
		display: "flex",
		flexGrow: 1,
		height: 72,
		maxWidth: 370,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#fff",
		shadowColor: "#342ead",
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
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textDecorationLine: "none",
	},
	menuItemFocused: {
		// Define styles for focused or hovered state here
		// Example: backgroundColor: '#342ead'
	},
	materialIcons: {
		fontFamily: "Material Icons",
		marginBottom: 4,
		fontSize: 26,
		color: "#342ead",
		transitionDuration: "0.25s",
	},
	menuItemLabel: {
		fontSize: 13,
		color: "#342ead",
		transitionDuration: "0.25s",
	},
	forumScreen: {
		backgroundColor: COLORS.background,
		flex: 1,
		padding: 10,
		position: "relative",
	},
	forumThreadContainer: {
		width: "100%",
		alignItems: "center",
		backgroundColor: COLORS.background,
		justifyContent: "center",
	},
	forumThreadItem: {
		width: "90%",
		margin: 10,
		flexDirection: 'row', // Make the children display in a row
		alignItems: 'center', // Align children vertically in the center
		borderRadius: 5,
		backgroundColor: COLORS.secondary,
	},
	forumInput: {
		borderWidth: 2,
		padding: 15,
	},
	forumButton: {
		backgroundColor: COLORS.tertiary,
		padding: 12,
		marginVertical: 10,
		width: "80%",
		borderRadius: 50,
		elevation: 1,
	},
	forumThreadTitle: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		margin: 20,
	},
	filterMenu: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		backgroundColor: COLORS.background, // Color de fondo
		padding: 10, // Espaciado interno
		borderWidth: 1, // Ancho del borde
		borderColor: COLORS.secondary, // Color del borde
		borderRadius: 5, // Bordes redondeados
		zIndex: 60, // Asegura que el menú esté sobre otros elementos
	  },
	  menuItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.secondary,
	  },
	
	  menuItemLabel: {
		color: COLORS.tertiary,
		fontSize: 16,
	  },
	  //Directory
	  searchButton: {
		backgroundColor: COLORS.tertiary,
		padding: 12,
		marginVertical: 10,
		width: "60%",
		borderRadius: 50,
		elevation: 1,
	  },
	  container: {
		flexDirection: 'row',
		alignItems: 'center',
	  },
	  dropdownButton: {
		backgroundColor: COLORS.primary,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		marginLeft: 10,
	  },
	  modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	  },
	  modalItem: {
		backgroundColor: COLORS.primary,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	  },
	  directoryItemContent: {
		flexDirection: 'row', // Esto alinea los elementos en fila (horizontalmente)
		justifyContent: 'space-between', // Esto distribuye los elementos a lo largo del espacio disponible
		alignItems: 'center', 
		padding: 10, 
	  },
	  userInfo: {
		alignItems: 'center', 
		marginBottom: 10, 

	  },
	  buttonRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'down',

	  },
	  journalButton: {
		backgroundColor: COLORS.tertiary,
		padding: 12,
		borderRadius: 50,
		elevation: 1,
		alignSelf: 'flex-end',
		marginBottom: 10,
		justifySelf: 'flex-end', 
	},

	distribution: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	  },

	profileDetailsText: {
		fontSize: 16,
		marginVertical: 8,
		fontWeight: 'bold',
	  },

});
	

