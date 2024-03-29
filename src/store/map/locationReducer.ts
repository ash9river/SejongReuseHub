export const SETLOCATION = 'map/locationReducer/SETLOCATION' as const;

export const setLocation = (payload: coordinate) => ({
  type: SETLOCATION,
  payload,
});

export type coordinate = {
  longitude: number;
  latitude: number;
};

type LocationActuon = ReturnType<typeof setLocation>;

type CurrentLocationState = {
  coordinate: coordinate;
};

const initialState: CurrentLocationState = {
  coordinate: {
    longitude: 0,
    latitude: 0,
  },
};

const locationReducer = (
  state: CurrentLocationState = initialState,
  action: LocationActuon,
) => {
  const { type, payload } = action;
  switch (type) {
    case SETLOCATION: {
      const newLocation: coordinate = {
        latitude: payload.latitude,
        longitude: payload.longitude,
      };

      return {
        ...state,
        coordinate: newLocation,
      };
    }

    default:
      return state;
  }
};

export default locationReducer;
