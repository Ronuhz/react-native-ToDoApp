import { CommonActions } from '@react-navigation/native'
import { ActiveTasksContext } from '../../contexts/todo-list.context'
import { useContext, useState } from 'react'
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Platform,
	Keyboard,
} from 'react-native'
import { useColorPicker } from '../../hooks/useColorPicker'
import * as Haptics from 'expo-haptics'

const NewTask = ({ navigation }) => {
	const { activeTasks, setActiveTasks } = useContext(ActiveTasksContext)
	const { ColorPicker, color } = useColorPicker()
	const [task, setTask] = useState({
		title: '',
		color: '',
	})

	const addTask = () => {
		if (!task.title) return

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

		setActiveTasks([{ ...task, color }, ...activeTasks])

		Keyboard.dismiss()
		navigation.dispatch(CommonActions.goBack())

		setTask({
			title: '',
			color: '',
		})
	}

	return (
		<SafeAreaView style={{ margin: 20 }}>
			{/* Header */}
			<View style={styles.headerContainer}>
				{/* Close Button */}
				<TouchableOpacity
					onPress={() => {
						Haptics.selectionAsync()
						navigation.dispatch(CommonActions.goBack())
					}}
				>
					<Text style={{ fontSize: 16, color: '#007aff', fontWeight: 600 }}>
						Cancel
					</Text>
				</TouchableOpacity>

				{/* Save button */}
				<TouchableOpacity disabled={!task.title} onPress={() => addTask()}>
					<Text
						style={[
							{ fontSize: 18, fontWeight: 600 },
							!task.title ? { color: '#a8a8aa' } : { color: '#007aff' },
						]}
					>
						Add
					</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.title}>Create Task</Text>

			{/* Body */}
			<TextInput
				placeholder='e.g. Buy iPhone 15 Pro'
				value={task.title}
				onChangeText={(text) => setTask({ ...task, title: text })}
				style={styles.taskInput}
			/>

			{ColorPicker}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: Platform.OS === 'android' ? 15 : 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: '#4e4e54',
		padding: 6,
		borderRadius: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
	taskInput: {
		backgroundColor: 'white',
		paddingHorizontal: 10,
		paddingVertical: Platform.OS === 'ios' ? 16 : 12,
		borderRadius: 8,
		fontSize: 16,
	},
})

export default NewTask
