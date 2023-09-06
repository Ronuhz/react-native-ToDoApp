import { View, Text, StyleSheet } from 'react-native'
import { Circle, CheckCircle } from 'lucide-react-native'

const Task = ({ text, color, completed }) => {
	return (
		<View style={[styles.item, { backgroundColor: color }]}>
			{/* Check Circle */}
			{!completed ? (
				<Circle size={24} color='#55BCF6' />
			) : (
				<CheckCircle size={24} color='#55BCF6' />
			)}

			{/* Task Text */}
			<Text style={[styles.itemText, completed ? styles.completedText : null]}>
				{text}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		padding: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 10,
		marginBottom: 20,
		shadowColor: 'gray',
		shadowOpacity: 0.25,
		shadowRadius: 5,
		shadowOffset: 1,
	},
	itemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	completedText: {
		textDecorationLine: 'line-through',
	},
	itemText: {
		maxWidth: '89%',
	},
})

export default Task
