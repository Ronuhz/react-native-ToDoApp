import { X } from 'lucide-react-native'
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
import { COLORS, useColorPicker } from '../../hooks/useColorPicker'

const NewTask = ({ navigation }) => {
	const { activeTasks, setActiveTasks } = useContext(ActiveTasksContext)
	const { ColorPicker, selectedColorIndex } = useColorPicker()
	const [task, setTask] = useState({
		title: '',
		color: '',
	})

	const addTask = () => {
		if (!task.title) return

		setActiveTasks([
			{ ...task, color: COLORS[selectedColorIndex] },
			...activeTasks,
		])

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
				<TouchableOpacity
					onPress={() => navigation.dispatch(CommonActions.goBack())}
				>
					<View style={styles.closeButton}>
						<X size={18} color='black' />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => addTask()}>
					<Text style={{ fontSize: 19, color: '#007aff' }}>Save</Text>
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
		backgroundColor: '#d1d1d1',
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
