import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AuthSuccess() {
  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: '/settings',
      params,
    });
  }, []);

  return null;
}