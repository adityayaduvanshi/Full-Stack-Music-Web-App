import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';
import Header from '@/components/Header';
import LikedContent from './components/LikedContent';

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col items-center md:flex-row gap-x-5">
            <div className=" relative w-32 h-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/images/liked.png"
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-4xl text-white sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
