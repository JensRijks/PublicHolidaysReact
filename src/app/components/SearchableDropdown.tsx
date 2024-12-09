"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
	name: string;
	countryCode: string;
}

const SearchableDropdown: React.FC<{ options: DropdownOption[] }> = ({
	options,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
		null
	);

	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Close dropdown when clicking outside of the dropdown or input
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				inputRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!inputRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // Close the dropdown if the click is outside
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredOptions = options.filter((option) =>
		option.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleOptionSelect = (option: DropdownOption) => {
		setSearchTerm(option.name);
		setIsOpen(false);
		setSelectedOption(option);
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setIsOpen(true);
	};

	return (
		<div className="w-full grow flex flex-col items-center justify-center">
			<div className="relative w-64" ref={dropdownRef}>
				{/* Input for searching */}
				<input
					ref={inputRef}
					type="text"
					className="border rounded p-2 bg-white text-black w-full cursor-pointer"
					placeholder="Select an option..."
					value={searchTerm} // Display selected option or search term
					onChange={onChangeInput} // Update search term while typing
					onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility on click
				/>

				{/* Dropdown List */}
				{isOpen && (
					<div className="absolute mt-2 w-full border rounded bg-white z-10">
						{/* Options List */}
						<ul className="max-h-40 overflow-auto">
							{searchTerm === "" // If no search term, show all options
								? options.map((option) => (
										<li
											key={option.countryCode}
											className="p-2 hover:bg-gray-100 cursor-pointer"
											onClick={() =>
												handleOptionSelect(option)
											}
										>
											{option.name}
										</li>
								  ))
								: filteredOptions.map((option) => (
										<li
											key={option.countryCode}
											className="p-2 hover:bg-gray-100 cursor-pointer"
											onClick={() =>
												handleOptionSelect(option)
											}
										>
											{option.name}
										</li>
								  ))}
							{filteredOptions.length === 0 &&
								searchTerm !== "" && (
									<li className="p-2 text-gray-500">
										No options found
									</li>
								)}
						</ul>
					</div>
				)}
			</div>

			<div>
				{selectedOption && (
					<div className="mt-2">
						<p className="font-bold text-white">
							Selected Option: {selectedOption.name}
						</p>
						<p>Country Code: {selectedOption.countryCode}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchableDropdown;
