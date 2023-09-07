import { useContext } from 'react'
import * as Haptics from 'expo-haptics'
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	Platform,
	SafeAreaView,
} from 'react-native'
import Task from '../Task'
import { TasksContext } from '../../contexts/todo-list.context'
import { ScrollView } from 'react-native-gesture-handler'

const Home = ({ navigation }) => {
	const { tasks, setTasks } = useContext(TasksContext)

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
					style={({ pressed }) => [pressed && { opacity: 0.4 }]}
				>
					<Text style={{ fontSize: 36, fontWeight: 200 }}>+</Text>
				</Pressable>
			</View>

			<ScrollView style={styles.items}>
				{/* Welcome */}
				{tasks.length === 0 && (
					<View style={styles.welcomeContainer}>
						<Text style={{ fontSize: 18 }}>You have 0 tasks.</Text>
						<Text style={{ fontSize: 18 }}>
							Click on the + to add a new one.
						</Text>
					</View>
				)}

				<View style={{ gap: 10, marginBottom: 30 }}>
					{/* Active Tasks */}
					{tasks.map(
						(task, index) =>
							!task.done && (
								<Task key={`active-${index}`} task={task} index={index} />
							)
					)}

					{/* Done Tasks */}
					{tasks.map(
						(task, index) =>
							task.done && (
								<Task key={`done-${index}`} task={task} index={index} />
							)
					)}
				</View>
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
})

export default Home
