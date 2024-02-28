import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as userStore from '@store/user';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const userStores = useAppSelector((state: RootState) => state.user);

  const editFirstName = (data: any) => {
    return dispatch(userStore.editFirstName({ data }));
  };

  return {
    ...userStores,
    editFirstName,
  };
};
