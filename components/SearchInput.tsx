'use client';

import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from './Input';

import useDebounce from '@/hooks/useDebounce';

interface SearchInputProps {
	placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
	const router = useRouter();
	const [value, setValue] = useState<string>('');
	const debouncedValue = useDebounce<string>(value, 500);

	useEffect(() => {
		const query = {
			title: debouncedValue,
		};

		const url = qs.stringifyUrl({
			url: `${window.location.pathname}`,
			query: query,
		});

		router.push(url);
	}, [debouncedValue, router]);

	return (
		<Input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
	);
};

export default SearchInput;
