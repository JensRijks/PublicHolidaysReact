"use client";

import { DropdownCountry, PublicHoliday } from "@/types/publicHolidays";
import React, { useEffect, useState } from "react";
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
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (selectedCountry) {
			// Wait 500ms before showing the content
			const timer = setTimeout(() => {
				setShowContent(true);
			}, 500); // 500ms delay

			// Cleanup the timer when component unmounts or selectedCountry changes
			return () => clearTimeout(timer);
		} else {
			setShowContent(false);
		}
	}, [selectedCountry]);

	return publicHolidays && publicHolidays.length > 0 ? (
		<div className="mt-2 bg-white p-2 rounded-md w-full">
			<div className="flex flex-row  text-stone-600 text-base sm:text-xl">
				<p className="w-full font-semibold pl-4 pr-24 sm:pr-16 flex-1">
					DATE
				</p>
				<p className="hidden sm:block w-full font-semibold pl-4 ">
					DAY
				</p>
				<p className="w-full font-semibold sm:pr-40">HOLIDAY</p>
			</div>
			<div className="flex flex-col gap-1">
				{publicHolidays.map((holiday, index) => {
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
	) : selectedCountry && showContent ? (
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
