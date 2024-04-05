export const SETLOCATION = 'map/locationReducer/SETLOCATION' as const;

export const setLocation = (payload: coordinateType) => ({
  type: SETLOCATION,
  payload,
});

export type coordinateType = {
  longitude: number;
  latitude: number;
};

type LocationActuon = ReturnType<typeof setLocation>;

type CurrentLocationState = {
  coordinate: coordinateType;
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
      const newLocation: coordinateType = {
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
