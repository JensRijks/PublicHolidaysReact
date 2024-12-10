"use client";

import { DropdownCountry, PublicHoliday } from "@/types/publicHolidays";
import React, { useState } from "react";
import { LoadingSpinner } from "./loaders/Spinner";

interface PublicHolidaysForCountryProps {
	publicHolidays: PublicHoliday[] | undefined;
	selectedCountry: DropdownCountry | null;
	year: number;
}

function PublicHolidaysForCountry({
	publicHolidays,
	selectedCountry,
	year,
}: PublicHolidaysForCountryProps) {
	const [sortColumn, setSortColumn] = useState<"date" | "day" | "holiday">(
		"date"
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const sortedPublicHolidays = [...(publicHolidays || [])]
		.sort((a, b) => {
			let comparison = 0;

			// Sort based on the column
			if (sortColumn === "date") {
				comparison =
					new Date(a.date).getTime() - new Date(b.date).getTime();
			} else if (sortColumn === "day") {
				const dayA = new Date(a.date).toLocaleString("en-US", {
					weekday: "long",
				});
				const dayB = new Date(b.date).toLocaleString("en-US", {
					weekday: "long",
				});
				comparison = dayA.localeCompare(dayB);
			} else if (sortColumn === "holiday") {
				comparison = a.name.localeCompare(b.name);
			}

			return sortOrder === "asc" ? comparison : -comparison;
		})
		.reduce((acc: PublicHoliday[], holiday) => {
			// Remove duplicates
			const existingHoliday = acc.find(
				(h) =>
					new Date(h.date).toLocaleDateString() ===
					new Date(holiday.date).toLocaleDateString()
			);

			if (!existingHoliday) {
				acc.push(holiday);
			}

			return acc;
		}, []);

	const handleSort = (column: "date" | "day" | "holiday") => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	return publicHolidays && publicHolidays.length > 0 ? (
		<div className="mt-2 bg-white p-2 rounded-md w-full">
			<div className="flex flex-row  text-stone-600 text-base sm:text-xl">
				<p
					onClick={() => handleSort("date")}
					className=" font-semibold w-40 sm:w-48 pl-2 cursor-pointer flex items-center"
				>
					DATE
					{sortColumn === "date" && (
						<span
							className="ml-2 text-base"
							dangerouslySetInnerHTML={{
								__html:
									sortOrder === "asc" ? "&#9650;" : "&#9660;",
							}}
						/>
					)}
				</p>
				<p
					onClick={() => handleSort("day")}
					className="hidden sm:block sm:w-44 font-semibold  pl-3 cursor-pointer  items-center"
				>
					DAY
					{sortColumn === "day" && (
						<span
							className="ml-2 text-base"
							dangerouslySetInnerHTML={{
								__html:
									sortOrder === "asc" ? "&#9650;" : "&#9660;",
							}}
						/>
					)}
				</p>
				<p
					onClick={() => handleSort("holiday")}
					className="w-full font-semibold pl-4 cursor-pointer flex items-center"
				>
					HOLIDAY
					{sortColumn === "holiday" && (
						<span
							className="ml-2 text-base"
							dangerouslySetInnerHTML={{
								__html:
									sortOrder === "asc" ? "&#9650;" : "&#9660;",
							}}
						/>
					)}
				</p>
			</div>
			<div className="flex flex-col gap-1">
				{sortedPublicHolidays.map((holiday, index) => {
					const dayOfWeek = new Date(holiday.date).toLocaleString(
						"en-US",
						{ weekday: "long" }
					);

					return (
						<div
							key={holiday.date + " " + index}
							className="p-2 rounded-md"
							style={
								index % 2 === 0
									? {
											backgroundColor:
												"rgba(42, 156, 255, 0.3)",
									  }
									: {
											backgroundColor:
												"rgba(42, 156, 255, 0.1)",
									  }
							}
						>
							<div className="text-stone-700 font-medium flex flex-row gap-3 text-base sm:text-lg">
								<p className="w-40 sm:w-48">{holiday.date}</p>
								<p className="hidden sm:block sm:w-44">
									{dayOfWeek}
								</p>
								<p className="w-full">{holiday.name}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	) : selectedCountry && publicHolidays && publicHolidays.length === 0 ? (
		<div className="mt-2 bg-white p-4 rounded-md w-full">
			<p className="text-stone-600 text-xl">
				No holidays found for{" "}
				<span className="font-bold">{selectedCountry.name}</span> in the
				year <span className="font-bold">{year}</span> AC
			</p>
		</div>
	) : selectedCountry ? (
		<div className="h-[50vh] flex items-center justify-center">
			<LoadingSpinner size={30} />
		</div>
	) : null;
}

export default PublicHolidaysForCountry;
