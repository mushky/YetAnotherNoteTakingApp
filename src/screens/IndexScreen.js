import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context } from '../context/NoteContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
	const { state, deleteNote, getNotes } = useContext(Context);

	useEffect(() => {
		getNotes();

		const listener = navigation.addListener('didFocus', () => {
			getNotes();
		});

		return () => {
			listener.remove();
		}
	}, []);

	return(
		<View>
			<FlatList
				data={state}
				keyExtractor={note => note.title }
				renderItem={({ item }) => {
					return(
						<TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
							<View style={styles.row}>
								<Text style={styles.title}>{item.title} - {item.id} </Text>
								<TouchableOpacity onPress={() => deleteNote(item.id)}>
									<Feather name="trash" syle={styles.icon}></Feather>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					)
				}}
			/>
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate('Create')}>
				<Feather name="plus" size={30} />
			</TouchableOpacity>
		),
	};
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'gray'
	},
	title: {
		fontSize: 18
	},
	icon: {
		fontSize: 24
	}
});

export default IndexScreen;