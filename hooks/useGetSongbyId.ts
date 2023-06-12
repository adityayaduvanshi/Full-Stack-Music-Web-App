import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';

const useGetSongbyId = (id?: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setisLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setisLoading(false);
        return toast.error(error.message);
      }
      setSong(data as Song);
      setisLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongbyId;
