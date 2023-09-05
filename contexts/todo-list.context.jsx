import { createContext, useState } from 'react'

export const ActiveTasksContext = createContext({
	activeTasks: [],
	setActiveTasks: () => {},
})

export const CompletedTasksContext = createContext({
	completedTasks: [],
	setCompletedTasks: () => {},
})

export const TodoListProvider = ({ children }) => {
	const [activeTasks, setActiveTasks] = useState([
		{ title: 'Plan a Picnic', color: '#FFDDC1' },
		{ title: 'Go for a Nature Walk', color: '#A2D9CE' },
		{ title: 'Try a New Smoothie Recipe', color: '#B5EAD7' },
		{ title: 'Write a Gratitude Journal', color: '#F9CCCA' },
		{ title: 'Sketch in Your Notebook', color: '#E1B0D1' },
		{ title: 'Visit a Local Farmers Market', color: '#F8E6A8' },
	])
	const [completedTasks, setCompletedTasks] = useState([
		{
			title: 'completed hehe',
			color: '#D6E3F8',
		},
	])

	return (
		<ActiveTasksContext.Provider value={{ activeTasks, setActiveTasks }}>
			<CompletedTasksContext.Provider
				value={{ completedTasks, setCompletedTasks }}
			>
				{children}
			</CompletedTasksContext.Provider>
		</ActiveTasksContext.Provider>
	)
}
