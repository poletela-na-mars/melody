import { useEffect, useMemo, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

import { useUser } from '@/hooks/useUser';

import { domUserId } from '@/consts/domUserId';

import { Song } from '@/types';

const useGetRecommendedSongs = () => {
	const [songs, setSongs] = useState<Song[]>([]);
	const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
	const { supabaseClient } = useSessionContext();
	const { user } = useUser();

	useEffect(() => {
		const fetchSongs = async () => {
			if (!user) return;
			const { data: userSongs, error: userSongsError } = await supabaseClient
				.from('songs')
				.select('*')
				.eq('user_id', user?.id);

			const { data: commonSongs, error: commonSongsError } = await supabaseClient
				.from('songs')
				.select('*')
				.eq('user_id', domUserId);

			const error = userSongsError || commonSongsError;
			if (error) {
				toast.error(error.message);
			} else {
				const mostListenedSortSongs: Song[] = [...userSongs as Song[], ...commonSongs as Song[]]
					.sort((songA: Song, songB: Song) => songB.listen_counter - songA.listen_counter);

				setSongs(mostListenedSortSongs);
			}
		};

		fetchSongs();
	}, [user, supabaseClient]);

	useEffect(() => {
		if (!songs) return;

		const formRecommendedSongsList = async () => {
			const agmMatch: Song[] = [], agMatch: Song[] = [], amMatch: Song[] = [], gmMatch: Song[] = [], aMatch: Song[] = [], gMatch: Song[] = [], mMatch: Song[] = [];

			for (let i = 0; i < songs.length; i++) {
				for (let j = songs.length - 1; j != i; j--) {
					if (songs[i].author === songs[j].author && songs[i].genre === songs[j].genre && songs[i].mood === songs[j].mood) {
						agmMatch.push(songs[j]);
					} else if (songs[i].author === songs[j].author && songs[i].genre === songs[j].genre) {
						agMatch.push(songs[j]);
					} else if (songs[i].author === songs[j].author && songs[i].mood === songs[j].mood) {
						amMatch.push(songs[j]);
					} else if (songs[i].genre === songs[j].genre && songs[i].mood === songs[j].mood) {
						gmMatch.push(songs[j]);
					} else if (songs[i].author === songs[j].author) {
						aMatch.push(songs[j]);
					} else if (songs[i].genre === songs[j].genre) {
						gMatch.push(songs[j]);
					} else if (songs[i].mood === songs[j].mood) {
						mMatch.push(songs[j]);
					}
				}
			}

			let matchedSongs: Song[] = Array.from(new Set([...agmMatch, ...agMatch, ...amMatch, ...gmMatch, ...aMatch, ...gMatch, ...mMatch]));
			if (!matchedSongs.length) matchedSongs = songs;

			setRecommendedSongs(matchedSongs);
		};

		formRecommendedSongsList();
	}, [songs]);

	return useMemo(() => ({
		recommendedSongs
	}), [recommendedSongs]);
};

export default useGetRecommendedSongs;
