import { createContext, useContext, useEffect, useState } from 'react';
import { Subscription, UserDetails } from '@/types';
import { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null | undefined>(undefined);
  const [subscription, setSubscription] = useState<Subscription | null | undefined>(undefined);

  const getUserDetails = () => supabase.from('users').select('*').maybeSingle();
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(* , products(*))')
      // .in('status', ['trialing', 'active'])
      .maybeSingle();

  useEffect(() => {
    if (user && !isLoadingData && userDetails !== undefined && subscription !== undefined) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingData]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must used within MyUserContextProvider ');
  }
  return context;
};
