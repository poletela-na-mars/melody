'use client';

import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { TbRepeatOff } from 'react-icons/tb';
import { TbRepeatOnce } from 'react-icons/tb';

import usePlayer from '@/hooks/usePlayer';

import { Song } from '@/types';

interface PlayerContentProps {
	song: Song;
	songUrl: string;
}

// TODO - random songs logic
// TODO - onPlayPrev/Next in one basic function
// TODO - song track (ползунок)

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
	const player = usePlayer();

	const [volumeState, setVolumeState] = useState(player.volume);
	const [isPlaying, setIsPlaying] = useState(false);
	const [repeatState, setRepeatState] = useState(player.repeat);

	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	const VolumeIcon = !volumeState ? HiSpeakerXMark : HiSpeakerWave;
	const RepeatIcon = repeatState? TbRepeatOnce : TbRepeatOff;

	const onPlayNext = async (userClick: boolean) => {
		if (!player.ids.length) {
			return;
		}

		const currentIdx = player.ids.findIndex((id) => id === player.activeId);

		if (repeatState && !userClick && player.activeId) {
			await player.setId('');
			player.setId(player.ids[currentIdx]);
			return;
		}

		const nextSong = player.ids[currentIdx + 1];

		if (!nextSong) {
			return player.setId(player.ids[0]);
		}

		player.setId(nextSong);
	};

	const onPlayPrev = async (userClick: boolean) => {
		if (!player.ids.length) {
			return;
		}

		const currentIdx = player.ids.findIndex((id) => id === player.activeId);

		if (repeatState && !userClick && player.activeId) {
			await player.setId('');
			player.setId(player.ids[currentIdx]);
			return;
		}

		const prevSong = player.ids[currentIdx - 1];

		if (!prevSong) {
			return player.setId(player.ids[player.ids.length - 1]);
		}

		player.setId(prevSong);
	};

	const onRepeatSong = () => {
		if (!player.ids.length || !player.activeId) {
			return;
		}

		if (repeatState) {
			setRepeatState(false);
			player.repeat = false;
		} else {
			setRepeatState(true);
			player.repeat = true;
		}
	};

	const [play, { pause, sound }] = useSound(
		songUrl,
		{
			volume: volumeState,
			onplay: () => setIsPlaying(true),
			onend: () => {
				setIsPlaying(false);
				onPlayNext(false);
			},
			onpause: () => setIsPlaying(false),
			format: ['mp3'],
		}
	);

	useEffect(() => {
		sound?.play();

		return () => {
			sound?.unload();
		}
	}, [sound]);

	const handlePlay = () => {
		if (!isPlaying) {
			play();
		} else {
			pause();
		}
	};

	const toggleMute = () => {
		if (volumeState === 0) {
			setVolume(1);
		} else {
			setVolume(0);
		}
	};

	const setVolume = (value: number) => {
		setVolumeState(value);
		player.setVolume(value);
	};

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 h-full'>
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>

			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div onClick={handlePlay}
						 className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
					<Icon size={30} className='text-black' />
				</div>
			</div>

			<div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
				<AiFillStepBackward size={30} onClick={() => onPlayPrev(true)}
					className='text-neutral-400 cursor-pointer hover:text-white transition' />
				<div onClick={handlePlay}
						 className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'>
					<Icon size={30} className='text-black' />
				</div>
				<AiFillStepForward size={30} onClick={() => onPlayNext(true)}
													 className='text-neutral-400 cursor-pointer hover:text-white transition' />
			</div>

			<div className='hidden md:flex w-full justify-end pr-2'>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<RepeatIcon onClick={onRepeatSong} className='cursor-pointer' size={34} />
					<VolumeIcon onClick={toggleMute} className='cursor-pointer' size={34} />
					<Slider value={volumeState} onChange={(value) => setVolume(value)} />
				</div>
			</div>

		</div>
	);
};

export default PlayerContent;
