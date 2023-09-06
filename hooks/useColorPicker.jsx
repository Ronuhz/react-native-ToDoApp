import { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'

const COLORS = [
	'#FFFFFF', // White
	'#FFDDC1', // Pastel Orange
	'#B5EAD7', // Pastel Turquoise
	'#F9CCCA', // Pastel Pink
	'#E1B0D1', // Pastel Purple
	'#F8E6A8', // Pastel Yellow
	'#D6E3F8', // Pastel Blue
	'#FFB7B2', // Pastel Coral
	'#FFE4A3', // Pastel Apricot
	'#C9E4DE', // Pastel Teal
	'#F3B0C3', // Pastel Rose
	'#DAD8A7', // Pastel Lime
]

export const useColorPicker = () => {
	const [selectedColorIndex, setSelectedColorIndex] = useState(0)
	const [color, SetColor] = useState(COLORS[selectedColorIndex])

	const ColorPicker = (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				gap: 9,
				marginTop: 20,
			}}
		>
			{COLORS.map((color, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						setSelectedColorIndex(index)
						SetColor(COLORS[index])
						Haptics.selectionAsync()
					}}
					style={[
						styles.colorCircle,
						{
							backgroundColor: color,
						},
						selectedColorIndex === index ? styles.colorCircleSelected : {},
					]}
				></TouchableOpacity>
			))}
		</View>
	)

	return { ColorPicker, color }
}

const styles = StyleSheet.create({
	colorCircle: {
		width: 48,
		height: 48,
		borderRadius: 60,
		shadowColor: 'gray',
		shadowRadius: 5,
		shadowOffset: 1,
		shadowOpacity: 0.2,
		elevation: 5, //Android shadow
	},
	colorCircleSelected: {
		borderColor: '#007aff',
		borderWidth: 2,
	},
})
