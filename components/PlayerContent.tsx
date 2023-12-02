'use client';

import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { TbRepeatOff, TbRepeatOnce } from 'react-icons/tb';

import usePlayer from '@/hooks/usePlayer';
import { padStartWithZero } from '@/utils/padStartWithZero';

import { Song } from '@/types';

interface PlayerContentProps {
	song: Song;
	songUrl: string;
}

// TODO - random songs logic
// TODO - song track performance check
// TODO - hover time hints

const getSongDuration = (duration: number) => {
	const sec = duration / 1000;
	const min = Math.floor(sec / 60);
	const secRemain = Math.floor(sec % 60);
	const time = {
		min: min,
		sec: secRemain
	};

	return time;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
	const player = usePlayer();

	const [volumeState, setVolumeState] = useState(player.volume);
	const [time, setTime] = useState({
		min: 0,
		sec: 0,
	});
	const [currTime, setCurrTime] = useState({
		min: 0,
		sec: 0,
	});
	const [seconds, setSeconds] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [repeatState, setRepeatState] = useState(player.repeat);

	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	const VolumeIcon = !volumeState ? HiSpeakerXMark : HiSpeakerWave;
	const RepeatIcon = repeatState ? TbRepeatOnce : TbRepeatOff;

	const onPlay = async (next: boolean, userClick: boolean) => {
		if (!player.ids.length) {
			return;
		}

		const currentIdx = player.ids.findIndex((id) => id === player.activeId);

		if (repeatState && !userClick && player.activeId) {
			await player.setId('');
			player.setId(player.ids[currentIdx]);
			return;
		}

		if (next) {
			const nextSong = player.ids[currentIdx + 1];

			if (!nextSong) {
				return player.setId(player.ids[0]);
			}

			return player.setId(nextSong);
		} else {
			const prevSong = player.ids[currentIdx - 1];

			if (!prevSong) {
				return player.setId(player.ids[player.ids.length - 1]);
			}

			player.setId(prevSong);
		}
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

	const [play, { pause, sound, duration }] = useSound(
		songUrl,
		{
			volume: volumeState,
			onplay: () => setIsPlaying(true),
			onend: () => {
				setIsPlaying(false);
				onPlay(true, false);
			},
			onpause: () => setIsPlaying(false),
			format: ['mp3'],
		}
	);

	useEffect(() => {
		if (duration) {
			setTime(getSongDuration(duration));
		}
	}, [duration]);

	useEffect(() => {
		sound?.play();

		const interval = setInterval(() => {
			if (sound) {
				setSeconds(sound.seek([]));
				const min = Math.floor(sound.seek([]) / 60);
				const sec = Math.floor(sound.seek([]) % 60);
				setCurrTime({
					min,
					sec,
				});
			}
		}, 1000);

		return () => {
			clearInterval(interval);
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
		<>
			<Slider step={0.01} min={0} max={(duration ?? 0) / 1000} defaultVal={0} className='px-2' value={seconds} onChange={(e) => {
				sound.seek([e]);
			}} />
			<div className='grid grid-cols-2 md:grid-cols-3 h-full'>
				<div className='flex w-full justify-start'>
					<div className='flex items-center gap-x-4'>
						<MediaItem data={song} />
						<LikeButton songId={song.id} />
						<p>{padStartWithZero(time.min)}:{padStartWithZero(time.sec)}</p>
					</div>
				</div>

				<div className='flex md:hidden col-auto w-full justify-end items-center'>
					<div onClick={handlePlay}
							 className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
						<Icon size={30} className='text-black' />
					</div>
				</div>

				<div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
					<AiFillStepBackward size={30} onClick={() => onPlay(false, true)}
						className='text-neutral-400 cursor-pointer hover:text-white transition' />
					<div onClick={handlePlay}
							 className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'>
						<Icon size={30} className='text-black' />
					</div>
					<AiFillStepForward size={30} onClick={() => onPlay(true, true)}
														 className='text-neutral-400 cursor-pointer hover:text-white transition' />
				</div>

				<div className='hidden md:flex w-full justify-end pr-2'>
					<div className='flex items-center gap-x-2 w-[45%]'>
						<p>{padStartWithZero(currTime.min)}:{padStartWithZero(currTime.sec)}</p>
						<RepeatIcon onClick={onRepeatSong} className='cursor-pointer' size={34} />
						<VolumeIcon onClick={toggleMute} className='cursor-pointer' size={34} />
						<Slider step={0.01} min={0} max={1} defaultVal={1} value={volumeState} onChange={(value) => setVolume(value)} />
					</div>
				</div>

			</div>
		</>
	);
};

export default PlayerContent;
