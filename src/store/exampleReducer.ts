export const EXAMPLEACTIONTYPE = 'exampleReducer/EXAMPLEACTIONTYPE' as const;

export const exampleActionFunction = (variable: number) => ({
  type: EXAMPLEACTIONTYPE,
  payload: variable,
});
export const exampleActionFunctionVersionTwo = (variable: number) => ({
  type: EXAMPLEACTIONTYPE,
  payload: variable,
});

type ExampleAction =
  | ReturnType<typeof exampleActionFunction>
  | ReturnType<typeof exampleActionFunctionVersionTwo>;
//  | ReturnType<typeof 액션함수>

type ExampleState = {
  exampleItems: number[];
};

const initailState: ExampleState = {
  exampleItems: [],
};

const exampleReducer = (
  state: ExampleState = initailState,
  action: ExampleAction,
) => {
  switch (action.type) {
    case EXAMPLEACTIONTYPE:
      return {
        ...state,
        exampleItems: [...state.exampleItems, action.payload],
      };
    default:
      return state;
  }
};

export default exampleReducer;
