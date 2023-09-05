import { View, Text, StyleSheet } from 'react-native'

const Task = ({ text, color, completed }) => {
	return (
		<View style={[styles.item, { backgroundColor: color }]}>
			<View style={styles.itemLeft}>
				<View
					style={[styles.square, completed ? styles.completedSquare : null]}
				></View>
				<Text
					style={[styles.itemText, completed ? styles.completedText : null]}
				>
					{text}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	itemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	completedSquare: {
		backgroundColor: '#55BCF6',
	},
	square: {
		width: 24,
		height: 24,
		opacity: 0.4,
		borderRadius: 5,
		marginRight: 15,
		borderColor: '#55BCF6',
		borderWidth: 3,
	},
	completedText: {
		textDecorationLine: 'line-through',
	},
	itemText: {
		maxWidth: '89%',
	},
})

export default Task
