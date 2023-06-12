'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className=" flex flex-col px-6 gap-y-2 w-full  text-neutral-400">
        No liked songs
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-y-2 w-full p-6">
      {songs.map((item, index) => (
        <div className="flex items-center gap-x-4  w-full" key={item.id}>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={item} />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
