import { useContext } from 'react'
import * as Haptics from 'expo-haptics'
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Pressable,
	Platform,
	SafeAreaView,
} from 'react-native'
import Task from '../Task'
import {
	ActiveTasksContext,
	CompletedTasksContext,
} from '../../contexts/todo-list.context'

const Home = ({ navigation }) => {
	const { activeTasks, setActiveTasks } = useContext(ActiveTasksContext)
	const { completedTasks, setCompletedTasks } = useContext(
		CompletedTasksContext
	)

	const totalTasks = activeTasks.length + completedTasks.length

	const completeTask = (index) => {
		let activesCopy = [...activeTasks]
		let completedTask = activesCopy.splice(index, 1)[0]
		setActiveTasks(activesCopy)
		setCompletedTasks([completedTask, ...completedTasks])
	}

	const uncompleteTask = (index) => {
		let completesCopy = [...completedTasks]
		let uncompletedTask = completesCopy.splice(index, 1)[0]
		setCompletedTasks(completesCopy)
		setActiveTasks([uncompletedTask, ...activeTasks])
	}

	return (
		<SafeAreaView style={styles.tasksWrapper}>
			{/* Header */}
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
				}}
			>
				<Text style={styles.sectionTitle}>Today's tasks</Text>

				{/* Add task button */}
				<Pressable
					onPress={() => {
						navigation.navigate('NewTask')
						Haptics.impactAsync()
					}}
				>
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
				{/* Welcome */}
				{totalTasks === 0 ? (
					<View style={styles.welcomeContainer}>
						<Text style={styles.welcomeText}>You have 0 tasks.</Text>
						<Text style={styles.welcomeText}>
							Click on the + to add a new one.
						</Text>
					</View>
				) : (
					<></>
				)}

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
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	welcomeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	welcomeText: { fontSize: 18, color: 'white' },
})

export default Home
