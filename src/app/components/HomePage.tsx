"use client";

import { getPublicHolidays } from "@/server/publicHolidays";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import emptyTrashIcon from "@/assets/trashEmpty.svg";
import Image from "next/image";
import { DropdownCountry } from "@/types/publicHolidays";
import PublicHolidaysForCountry from "./PublicHolidaysForCountry";
import Flag from "react-world-flags";

const HomePage: React.FC<{ countries: DropdownCountry[] }> = ({
	countries,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenDelay, setIsOpenDelay] = useState(false);
	const [selectedCountry, setSelectedCountry] =
		useState<DropdownCountry | null>(null);
	const [year, setYear] = useState<number>(2024);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const { data: publicHolidays } = useQuery({
		queryKey: [
			"publicHolidays",
			{ year: year, countryCode: selectedCountry?.countryCode },
		],
		queryFn: () =>
			getPublicHolidays(year, selectedCountry?.countryCode ?? ""),
		enabled: !!selectedCountry?.countryCode,
	});

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleOpen = () => {
		setIsOpen(true);
		if (selectedCountry) {
			setIsOpenDelay(true);
			return;
		}
		setTimeout(() => {
			setIsOpenDelay(true);
		}, 200);
	};

	const handleClose = () => {
		setIsOpen(false);
		setIsOpenDelay(false);
	};
	const handleCountrySelect = (option: DropdownCountry) => {
		setSearchTerm(option.name);
		handleClose();
		setSelectedCountry(option);
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		handleOpen();
	};

	// Close dropdown when clicking outside of the dropdown or input
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={` grow w-full h-full flex flex-col items-center p-4 pt-8 transition-all duration-300 ease-in-out`}
			style={{
				paddingTop: isOpen || selectedCountry ? "2rem" : 0,
				position: "absolute",
				top: isOpen || selectedCountry ? "0" : "40%",
			}}
		>
			<div className="max-w-lg sm:max-w-xl md:max-w-2xl w-full ">
				<h1
					className={` font-black mb-4 text-white font-sans  text-center  ${
						isOpen || selectedCountry
							? "text-lg sm:text-4xl md:text-5xl"
							: "text-4xl sm:text-6xl md:text-7xl"
					}`}
				>
					Discover{" "}
					<span
						style={{
							color: "rgb(42 156 255)",
						}}
					>
						Holidays
					</span>{" "}
					Around the World
				</h1>

				<div className="relative w-full px-6 " ref={dropdownRef}>
					<div
						className={` flex flex-row bg-white  ${
							isOpen ? "rounded-t-md" : "rounded-md"
						}`}
					>
						<input
							type="text"
							className=" rounded-l-md p-2  text-center sm:w-24 md:w-28 text-lg sm:text-2xl md:text-3xl bg-white text-black border-r-2 border-black w-16"
							placeholder="Year"
							value={year === 0 ? "" : year}
							onChange={(e) => {
								handleClose();
								if (e.target.value === "") {
									setYear(0);
								}
								const year = Number(e.target.value);
								if (year) {
									setYear(year);
								}
							}}
						/>
						<div className="relative w-full">
							<input
								type="text"
								className="p-2 sm:p-4 w-full text-xl sm:text-3xl md:text-4xl bg-white text-black cursor-pointer pr-10 rounded-r-md"
								placeholder="Select a country..."
								value={searchTerm}
								onChange={onChangeInput}
								onClick={handleOpen}
							/>

							{searchTerm && (
								<Image
									className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-7 mr-1 sm:w-10 md:w-10 lg:w-12 xl:w-12"
									priority
									src={emptyTrashIcon as string}
									alt="Empty trash icon"
									width={22}
									height={22}
									onClick={() => {
										setSearchTerm("");
										handleClose();
										setSelectedCountry(null);
										setYear(2024);
									}}
								/>
							)}
						</div>
					</div>

					{isOpenDelay && (
						<div className=" transition-all duration-300 ease-in-out font-semibold font-sans rounded-b-md bg-stone-700 text-white shadow-stone-500 shadow-sm ">
							<ul className="max-h-[70vh]  overflow-auto py-1 px-2 text-lg sm:text-2xl flex flex-col gap-1 sm:gap-2">
								{searchTerm === ""
									? countries.map((country) => (
											<li
												key={country.countryCode}
												className="p-2 hover:bg-secondary cursor-pointer flex flex-row gap-2 items-center"
												onClick={() =>
													handleCountrySelect(country)
												}
											>
												{country.countryCode && (
													<Flag
														code={
															country.countryCode
														}
														className="w-6 h-6"
													/>
												)}
												{country.name}
											</li>
									  ))
									: filteredCountries.map((option) => (
											<li
												key={option.countryCode}
												className="p-2 hover:bg-secondary cursor-pointer flex flex-row gap-2 items-center"
												onClick={() =>
													handleCountrySelect(option)
												}
											>
												{option.countryCode && (
													<Flag
														code={
															option.countryCode
														}
														className="w-6 h-6"
													/>
												)}
												{option.name}
											</li>
									  ))}
								{filteredCountries.length === 0 &&
									searchTerm !== "" && (
										<li className="p-2 text-gray-400">
											No countries found
										</li>
									)}
							</ul>
						</div>
					)}
				</div>

				<PublicHolidaysForCountry
					publicHolidays={publicHolidays}
					selectedCountry={selectedCountry}
					year={year}
				/>
			</div>
		</div>
	);
};

export default HomePage;
