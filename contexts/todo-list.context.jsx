import { createContext, useState } from 'react'

export const TasksContext = createContext({
	tasks: [],
	setTasks: () => {},
})

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
		{
			title: 'Click the + to create a new task',
			color: '#D6E3F8',
			done: false,
		},
		{
			title: 'Swipe a task from right to left to delete it',
			color: '#FFB7B2',
			done: false,
		},
	])

	return (
		<TasksContext.Provider value={{ tasks, setTasks }}>
			{children}
		</TasksContext.Provider>
	)
}
