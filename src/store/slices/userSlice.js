import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  stats: {
    strength: 5,
    intelligence: 5,
    endurance: 5,
    charisma: 5,
    luck: 5
  },
  statPoints: 0,
  rank: 'E-Rank Hunter',
  achievements: [],
  joinDate: new Date().toISOString().split('T')[0],
  streakDays: 0,
  lastActive: new Date().toISOString().split('T')[0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setHunterName: (state, action) => {
      state.name = action.payload;
    },
    addExperience: (state, action) => {
      const amount = action.payload;
      let newExp = state.exp + amount;
      let newLevel = state.level;
      let newExpToNextLevel = state.expToNextLevel;
      let newStatPoints = state.statPoints;
      let newRank = state.rank;

      // Check for level up
      while (newExp >= newExpToNextLevel) {
        newExp -= newExpToNextLevel;
        newLevel += 1;
        newStatPoints += 3; // Grant stat points on level up

        // Recalculate exp needed for next level (follows a curve)
        newExpToNextLevel = Math.floor(100 * Math.pow(1.1, newLevel));
      }

      // Update the rank based on level
      if (newLevel >= 20) {
        newRank = 'S-Rank Hunter';
      } else if (newLevel >= 15) {
        newRank = 'A-Rank Hunter';
      } else if (newLevel >= 10) {
        newRank = 'B-Rank Hunter';
      } else if (newLevel >= 5) {
        newRank = 'C-Rank Hunter';
      } else if (newLevel >= 3) {
        newRank = 'D-Rank Hunter';
      } else {
        newRank = 'E-Rank Hunter';
      }

      state.exp = newExp;
      state.level = newLevel;
      state.expToNextLevel = newExpToNextLevel;
      state.statPoints = newStatPoints;
      state.rank = newRank;
    },
    allocateStat: (state, action) => {
      const statName = action.payload;
      if (state.statPoints > 0 && state.stats[statName] !== undefined) {
        state.stats[statName] += 1;
        state.statPoints -= 1;
      }
    },
    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = state.lastActive;

      // Check if this is a new day
      if (today !== lastActive) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // If user was active yesterday, increment streak
        if (lastActive === yesterdayStr) {
          state.streakDays += 1;
        } else {
          // Streak broken
          state.streakDays = 1;
        }

        state.lastActive = today;
      }
    }
  },
});

export const {
  setUserData,
  setHunterName,
  addExperience,
  allocateStat,
  updateStreak
} = userSlice.actions;

export default userSlice.reducer;