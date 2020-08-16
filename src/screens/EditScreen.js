import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/NoteContext';
import NoteForm from '../components/NoteForm';

const EditScreen = ({ navigation }) => {
	const noteId = navigation.getParam('id');
	const { state, editNote } = useContext(Context);

	const note = state.find((note) => note.id === noteId);

  return( 
		<NoteForm 
			initialValues={{ title: note.title, content: note.content }}
			onSubmit={(title, content) => {
				editNote(noteId, title, content, () => navigation.pop());
			}}
		/>
	)
};

const styles = StyleSheet.create({});

export default EditScreen;