import { Dispatch } from 'redux';
import { getData } from './api-requester';
import { exampleActionFunction } from '../store/exampleReducer';

export async function getUserData(username: string) {
  const response = await getData<GithubProfile>(
    `https://api.github.com/users/${username}`,
  );

  return response;
}

export const getUserDataWithThunk = (): ((
  dispatch: Dispatch,
) => Promise<void>) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData = await getUserData('ash9river');

      dispatch(exampleActionFunction(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
};

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface GithubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: null;
  email: null;
  hireable: null;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}
