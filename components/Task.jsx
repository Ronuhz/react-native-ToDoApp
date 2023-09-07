import { Text, StyleSheet, View, Pressable } from 'react-native'
import { Circle, CheckCircle, Trash2 } from 'lucide-react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useCallback, useContext, useRef, useState } from 'react'
import { TasksContext } from '../contexts/todo-list.context'
import * as Haptics from 'expo-haptics'

const Task = ({ task, index }) => {
	const [pressed, setPressed] = useState(false)
	const { tasks, setTasks } = useContext(TasksContext)
	const swipeRef = useRef(null)

	const handleTaskDelete = useCallback((taskIndex) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

		setTasks((prevTasks) => {
			const newTasks = [...prevTasks]
			newTasks.splice(taskIndex, 1)[0]
			return newTasks
		})
	}, [])

	const handleTaskPress = useCallback((taskIndex) => {
		Haptics.selectionAsync()

		setTasks((prevTasks) => {
			const clickedTask = prevTasks.splice(taskIndex, 1)[0]
			const newTasks = [
				{ ...clickedTask, done: !clickedTask.done },
				...prevTasks,
			]

			return newTasks
		})
	}, [])

	return (
		<Pressable
			onPress={() => handleTaskPress(index)}
			style={({ pressed }) => {
				setPressed(pressed)
			}}
		>
			<Swipeable
				ref={swipeRef}
				renderRightActions={() => (
					<View style={[styles.iconContainer]}>
						<Trash2 size={32} color='red' />
					</View>
				)}
				rightThreshold={70}
				overshootFriction={1}
				containerStyle={{
					overflow: 'visible',
				}}
				onSwipeableWillOpen={(direction) => {
					if (direction === 'right') {
						swipeRef.current.close()
						handleTaskDelete(index)
					}
				}}
			>
				<View
					style={[
						styles.task,
						{
							backgroundColor: task.color,
						},
						pressed && { opacity: 0.4 },
					]}
				>
					{/* Check Circle */}
					{!task.done ? (
						<Circle size={24} color='#55BCF6' />
					) : (
						<CheckCircle size={24} color='#55BCF6' />
					)}

					{/* Task Text */}
					<Text
						style={[task.done && styles.completedText, { maxWidth: '90%' }]}
					>
						{task.title}
					</Text>
				</View>
			</Swipeable>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	task: {
		height: 54,
		borderRadius: 10,
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 10,
		shadowColor: 'gray',
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: 1,
		elevation: 2,
	},
	completedText: {
		textDecorationLine: 'line-through',
	},
	iconContainer: {
		minHeight: 54,
		width: 54,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Task
