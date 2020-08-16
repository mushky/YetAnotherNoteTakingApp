import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/NoteContext';
import NoteForm from '../components/NoteForm';

const CreateScreen = ({ navigation }) => {

	const { addNote } = useContext(Context);

	return <NoteForm onSubmit={(title, content) => {
		addNote(title, content, () => navigation.navigate('Index'));
	}} />
}

const styles = StyleSheet.create({

});

export default CreateScreen;