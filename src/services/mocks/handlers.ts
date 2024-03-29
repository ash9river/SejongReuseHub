import { http, HttpResponse } from 'msw';

export const handlers = [
  /*   http.get('/tmpmarkers', async ({ request }) => {
    const url = new URL(request.url || '');

    const latitude = url.searchParams.get('latitude');
    const longitude = url.searchParams.get('longitude');

    const latitudeDelta = url.searchParams.get('latitudeDelta');
    const longitudeDelta = url.searchParams.get('longitudeDelta');

    const northEastBoundary = {
      latitude: Number(latitude) + Number(latitudeDelta),
      longitude: Number(longitude) + Number(longitudeDelta),
    };

    const southWestBoundary = {
      latitude: Number(latitude) - Number(longitudeDelta),
      longitude: Number(longitude) - Number(longitudeDelta),
    };
    console.log(
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      northEastBoundary,
      southWestBoundary,
    );

    return HttpResponse.json([
      {
        markerId: 'test_marker0',
        markerName: 'test_marker0',
        latitude: 0,
        longitude: 0,
      },
      {
        markerId: 'test_marker1',
        markerName: 'test_marker1',
        latitude: 1,
        longitude: 1,
      },
    ]);
  }), */
];
