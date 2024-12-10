"use client";

import { PublicHoliday } from "@/types/publicHolidays";
import React from "react";

interface PublicHolidaysForCountryProps {
	publicHolidays: PublicHoliday[] | undefined;
}

function PublicHolidaysForCountry({
	publicHolidays,
}: PublicHolidaysForCountryProps) {
	return (
		publicHolidays && (
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
									<p className="w-40 sm:w-48">
										{holiday.date}
									</p>
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
		)
	);
}

export default PublicHolidaysForCountry;