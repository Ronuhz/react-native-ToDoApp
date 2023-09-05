import { useState, useContext } from 'react'
import * as Haptics from 'expo-haptics'
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Pressable,
	Platform,
} from 'react-native'
import Task from '../Task'
import { SafeAreaView } from 'react-native'
import {
	ActiveTasksContext,
	CompletedTasksContext,
} from '../../contexts/todo-list.context'

const Home = ({ navigation }) => {
	const { activeTasks, setActiveTasks } = useContext(ActiveTasksContext)
	const { completedTasks, setCompletedTasks } = useContext(
		CompletedTasksContext
	)

	const completeTask = (index) => {
		let activesCopy = [...activeTasks]
		let completedTask = activesCopy.splice(index, 1)[0]
		setActiveTasks(activesCopy)
		setCompletedTasks([...completedTasks, completedTask])
	}

	const uncompleteTask = (index) => {
		let completesCopy = [...completedTasks]
		let uncompletedTask = completesCopy.splice(index, 1)[0]
		setCompletedTasks(completesCopy)
		setActiveTasks([uncompletedTask, ...activeTasks])
	}

	return (
		<SafeAreaView style={styles.tasksWrapper}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
				}}
			>
				<Text style={styles.sectionTitle}>Today's tasks</Text>
				<Pressable onPress={() => navigation.navigate('NewTask')}>
					{({ pressed }) => (
						<Text
							style={[
								{ fontSize: 36, fontWeight: 200 },
								pressed ? { opacity: 0.4 } : {},
							]}
						>
							+
						</Text>
					)}
				</Pressable>
			</View>

			<ScrollView style={styles.items}>
				{/* Active tasks */}
				{activeTasks.map((task, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							Haptics.selectionAsync()
							completeTask(index)
						}}
					>
						<Task text={task.title} color={task.color} completed={false} />
					</TouchableOpacity>
				))}

				{/* Completed tasks */}
				{completedTasks.map((task, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							Haptics.selectionAsync()
							uncompleteTask(index)
						}}
					>
						<Task text={task.title} color={task.color} completed={true} />
					</TouchableOpacity>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	tasksWrapper: {
		paddingTop: Platform.OS === 'android' ? 30 : 10,
		backgroundColor: '#E8EAED',
		height: '100%',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	items: {
		marginTop: 20,
		paddingHorizontal: 20,
	},
})

export default Home
