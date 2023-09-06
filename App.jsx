import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/navigation/Home'
import NewTask from './components/navigation/NewTask'
import { TodoListProvider } from './contexts/todo-list.context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Platform } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<TodoListProvider>
			<NavigationContainer>
				<StatusBar style='auto'></StatusBar>
				<Stack.Navigator
					initialRouteName='Home'
					screenOptions={{ headerShown: false, headerShadowVisible: false }}
				>
					<Stack.Group
						screenOptions={{
							headerShown: false,
							headerShadowVisible: false,
							presentation: 'formSheet',
							animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
							gestureEnabled: true,
						}}
					>
						<Stack.Screen
							name='NewTask'
							component={NewTask}
							options={{
								cardStyle: {
									backgroundColor: '#E8EAED',
								},
							}}
						/>
					</Stack.Group>
					<Stack.Screen name='Home' component={Home} />
				</Stack.Navigator>
			</NavigationContainer>
		</TodoListProvider>
	)
}
