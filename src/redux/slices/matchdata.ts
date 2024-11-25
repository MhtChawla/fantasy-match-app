import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Match {
    id: string;
    name: string;
    day: string;
    timeSlot: string;
    participants: string[];
}

interface MatchState {
    matches: Match[];
}

const initialState: MatchState = {
    matches: [{
        id: "abc",
        name: "abc",
        day: "24 Nov 2024",
        timeSlot: "2-4 PM",
        participants: ["jatin", "rohan"]
    }],
};

const slice = createSlice({
    name: 'matchdata',
    initialState,
    reducers: {
        addMatch: (state, action: PayloadAction<Match>) => {
            state?.matches?.push(action.payload);
        },
        updateMatch: (state, action: PayloadAction<Match>) => {
            const index = state.matches.findIndex(match => match.id === action.payload.id);
            if (index !== -1) {
                state.matches[index] = action.payload;
            }
        },
        deleteMatch: (state, action: PayloadAction<string>) => {
            state.matches = state.matches.filter(match => match.id !== action.payload);
        },
        setMatches: (state, action: PayloadAction<Match[]>) => {
            state.matches = action.payload;
        },
    },
});

export default slice.reducer;

export const { addMatch, deleteMatch, setMatches, updateMatch } = slice.actions;


