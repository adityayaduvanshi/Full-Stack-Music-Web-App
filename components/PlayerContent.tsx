'use client';

import { useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2';
import useSound from 'use-sound';

import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setisPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const ValumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length == 0) {
      return;
    }

    const currentSong = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentSong + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length == 0) {
      return;
    }

    const currentSong = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentSong - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setisPlaying(true),
    onend: () => {
      setisPlaying(false);
      onPlayNext();
    },
    onpause: () => setisPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      return play();
    } else pause();
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else setVolume(0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex  justify-start w-full">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="md:hidden flex col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center p-1 cursor-pointer bg-white justify-center rounded-full"
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>

      <div className="hidden md:flex h-full justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <ValumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
