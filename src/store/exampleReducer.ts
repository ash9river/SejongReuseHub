import { GithubProfile } from 'services/getData';

export const EXAMPLEACTIONTYPE = 'exampleReducer/EXAMPLEACTIONTYPE' as const;

export const exampleActionFunction = (variable: GithubProfile) => ({
  type: EXAMPLEACTIONTYPE,
  payload: variable,
});
export const exampleActionFunctionVersionTwo = (variable: GithubProfile) => ({
  type: EXAMPLEACTIONTYPE,
  payload: variable,
});

type ExampleAction =
  | ReturnType<typeof exampleActionFunction>
  | ReturnType<typeof exampleActionFunctionVersionTwo>;
//  | ReturnType<typeof 액션함수>

type ExampleState = {
  exampleItems: GithubProfile[];
};

const initailState: ExampleState = {
  exampleItems: [],
};

const exampleReducer = (
  state: ExampleState = initailState,
  action: ExampleAction,
) => {
  switch (action.type) {
    case EXAMPLEACTIONTYPE: {
      const existIdx = state.exampleItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existIdx === -1) {
        return {
          ...state,
          exampleItems: [...state.exampleItems, action.payload],
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default exampleReducer;
