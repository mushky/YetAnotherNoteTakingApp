import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const noteReducer = (state, action) => {
	switch (action.type) {
		case 'get_notes': 
			return action.payload;
		case 'delete_note':
			return state.filter((note) => note.id !== action.payload);
		case 'add_note':
			return [
				...state, 
				{ 
					id: Math.floor(Math.random() * 9999),
					title: action.payload.title,
					content: action.payload.content
				}
			];
		case 'edit_note':
			return state.map((note) => {
				return note.id === action.payload.id ? action.payload : note;
			});
		default: 
			return state;
	}
};

const getNotes = dispatch => {
	return async () => {
		const response = await jsonServer.get('/notes');

		dispatch({ type: 'get_notes', payload: response.data });
	};
};

const addNote = dispatch => {
	return async (title, content, callback) => {
		await jsonServer.post('/notes', { title, content });
		
		// dispatch({ type: 'add_note', payload: { title: title, content: content} });
		if (callback) {
			callback();
		};
	}
};

const deleteNote = dispatch => {
	return (id) => {
		dispatch({ type: 'delete_note', payload: id });
	};
}

const editNote = dispatch => {
	return (id, title, content, callback) => {
		dispatch({ type: 'edit_note', payload: { id: id, title: title, content: content }})
		if (callback) {
			callback();
		}
	}
}

export const { Context, Provider } = createDataContext(
	noteReducer, 
	{ getNotes, addNote, deleteNote, editNote },
	
);