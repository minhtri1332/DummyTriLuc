import {RawProfile} from '@/store/Profile/types';
import {createDynamicReducer} from '@/ultils/createDynamicReducer';

const {setStore, reducer, sync, useByKey, setQueries, useKeysByQuery} =
    createDynamicReducer<RawProfile>('profile', 'id');

export const setProfileStore = setStore;
export const profileReducer = reducer;
export const syncProfile = sync;
export const useProfile = useByKey;
export const useProfileByQuery = useKeysByQuery;
