import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from './fetchDataSlice';

export type Side = 'left' | 'right';
export type Card = 'cardOne' | 'cardTwo' | 'cardThree';

export type Hp = {
  cardOne: {
    hp: number;
    attack: number;
    defense: number;
  };
  cardTwo: {
    hp: number;
    attack: number;
    defense: number;
  };
  cardThree: {
    hp: number;
    attack: number;
    defense: number;
  };
  chosen: Card;
  chosenId?: number;
};
export type GameState = {
  left: Hp;
  right: Hp;
  isNewRound: boolean;
  winner?: string;
};

const initialState: GameState = {
  left: {
    cardOne: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    cardTwo: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    cardThree: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    chosen: 'cardOne',
    chosenId: 0,
  },
  right: {
    cardOne: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    cardTwo: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    cardThree: {
      hp: 0,
      attack: 0,
      defense: 0,
    },
    chosen: 'cardOne',
    chosenId: 0,
  },
  isNewRound: true,
  winner: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    pushHp: (
      state: GameState,
      action: PayloadAction<{ side: Side; card: Card; pokemon: Pokemon }>
    ) => {
      if (action.payload.pokemon.stats) {
        state[action.payload.side][action.payload.card].hp =
          action.payload.pokemon.stats[0].base_stat;
      }
    },
    choose: (
      state: GameState,
      action: PayloadAction<{ side: Side; card: Card; pokemon: Pokemon }>
    ) => {
      if (action.payload.pokemon.stats) {
        state[action.payload.side][action.payload.card].attack = Math.floor(
          action.payload.pokemon.stats[1].base_stat *
            (Math.random() * 0.5 + 0.5)
        );
        state[action.payload.side][action.payload.card].defense = Math.floor(
          action.payload.pokemon.stats[2].base_stat * Math.random()
        );
      }
      state[action.payload.side].chosen = action.payload.card;
      state[action.payload.side].chosenId = action.payload.pokemon.id;
    },
    pk: (state: GameState) => {
      const leftChoose = state.left.chosen;
      const rightChoose = state.right.chosen;
      const leftAttact = state.left[leftChoose].attack;
      const leftDefense = state.left[leftChoose].defense;
      const rightAttact = state.right[rightChoose].attack;
      const rightDefense = state.right[rightChoose].defense;

      if (
        leftAttact > rightDefense &&
        state.right[rightChoose].hp >= -rightDefense + leftAttact
      ) {
        state.right[rightChoose].hp =
          state.right[rightChoose].hp + rightDefense - leftAttact;
      } else if (
        leftAttact > rightDefense &&
        state.right[rightChoose].hp < -rightDefense + leftAttact
      ) {
        state.right[rightChoose].hp = 0;
      } else {
        state.right[rightChoose].defense = leftAttact;
        state.right[rightChoose].hp = state.right[rightChoose].hp + 0;
      }

      if (
        rightAttact > leftDefense &&
        state.left[leftChoose].hp >= -leftDefense + rightAttact
      ) {
        state.left[leftChoose].hp =
          state.left[leftChoose].hp + leftDefense - rightAttact;
      } else if (
        rightAttact > leftDefense &&
        state.left[leftChoose].hp < -leftDefense + rightAttact
      ) {
        state.left[leftChoose].hp = 0;
      } else {
        state.left[leftChoose].defense = rightAttact;
        state.left[leftChoose].hp = state.left[leftChoose].hp + 0;
      }
      state.isNewRound = false;
    },
    nextRound: (state: GameState) => {
      state.left.chosenId = 0;
      state.right.chosenId = 0;
      state.isNewRound = true;
    },
    deleteGame: (state: GameState) => {
      return initialState;
    },
  },
});

export const { pushHp, choose, pk, deleteGame, nextRound } = gameSlice.actions;

export type PushHpAction = ReturnType<typeof pushHp>;
export type DeleteGameAction = ReturnType<typeof deleteGame>;

export default gameSlice.reducer;
