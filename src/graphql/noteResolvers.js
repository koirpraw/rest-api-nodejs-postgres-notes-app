const Note = require('../model/note')

const resolvers = {
    Query: {
        notes: async (_, { userId }, { user }) => {
            if (user.role !== 'admin' && user.role !== 'moderator') {
                throw new Error('Not authorized');
            }
            return userId ?
                await Note.findUserNotes(userId) :
                await Note.findAll();
        },

        userNotes: async (_, __, { user }) => {
            return await Note.findUserNotes(user.userId);
        },

        adminNotes: async () => {
            return await Note.findAdminNotes();
        },

        note: async (_, { id }, { user }) => {
            const note = await Note.findById(id);
            if (!note) return null;

            if (note.userId !== user.userId && user.role !== 'admin') {
                throw new Error('Not authorized');
            }
            return note;
        }
    },

    Mutation: {
        createNote: async (_, { input }, { user }) => {
            const note = await Note.create({
                ...input,
                userId: user.userId
            });
            return note;
        },

        updateNote: async (_, { id, input }, { user }) => {
            const note = await Note.findById(id);
            if (!note) throw new Error('Note not found');

            if (note.userId !== user.userId && user.role !== 'admin') {
                throw new Error('Not authorized');
            }

            return await Note.update(id, input);
        },

        deleteNote: async (_, { id }, { user }) => {
            const note = await Note.findById(id);
            if (!note) throw new Error('Note not found');

            if (note.userId !== user.userId && user.role !== 'admin') {
                throw new Error('Not authorized');
            }

            await Note.remove(id);
            return true;
        }
    },

    Note: {
        user: async (note) => {
            // Implement user lookup
            return await User.findById(note.userId);
        }
    }
};

module.exports = resolvers;