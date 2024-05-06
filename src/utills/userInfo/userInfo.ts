import { useEffect } from 'react';
import useInfoStore from '../../store/userInfoStore';

const useUserInfo = () => {
  const { setUserId } = useInfoStore();

  useEffect(() => {
    const token = localStorage.getItem('access_Token');
    if (token !== null) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.userId;

      setUserId(userId);
    }
  }, [setUserId]);

  return useInfoStore((state) => state.userId);
};

export default useUserInfo;
