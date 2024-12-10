import { PublicHoliday } from "@/types/publicHolidays";
import React from "react";
import Flag from "react-world-flags";

interface HolidayModalProps {
	isModalOpen: boolean;
	selectedHoliday: PublicHoliday | null;
	handleCloseModal: () => void;
}

function HolidayModal({
	isModalOpen,
	selectedHoliday,
	handleCloseModal,
}: HolidayModalProps) {
	return (
		isModalOpen &&
		selectedHoliday && (
			<div
				className=" bg-black bg-opacity-40 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
				onClick={handleCloseModal}
			>
				<div
					className="bg-white p-6 rounded-md w-11/12 sm:w-96 relative"
					onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
				>
					<button
						className="absolute top-4 right-4 text-xl font-bold"
						onClick={handleCloseModal}
					>
						X
						{selectedHoliday.countryCode && (
							<Flag
								code={selectedHoliday.countryCode}
								className="w-6 h-6"
							/>
						)}
					</button>
					<h2 className="text-3xl font-bold ">
						{selectedHoliday.name}
					</h2>
					{selectedHoliday.localName &&
						selectedHoliday.name !== selectedHoliday.localName && (
							<>
								<span>Or, the local name:</span>
								<p className="font-bold">
									{selectedHoliday.localName}
								</p>
							</>
						)}

					<div className="mt-4">
						<p>
							<strong>Date:</strong> {selectedHoliday.date}
						</p>

						<p>
							<strong>Country Code:</strong>{" "}
							{selectedHoliday.countryCode}
						</p>

						<p>
							<strong>Global:</strong>{" "}
							{selectedHoliday.global ? "Yes" : "No"}
						</p>
						{selectedHoliday.counties && (
							<p>
								<strong>Counties:</strong>{" "}
								{selectedHoliday.counties}
							</p>
						)}
						{selectedHoliday.launchYear && (
							<p>
								<strong>Launch Year:</strong>{" "}
								{selectedHoliday.launchYear}
							</p>
						)}

						<p>
							<strong>Holiday Type:</strong>{" "}
							{selectedHoliday.types
								? selectedHoliday.types.join(", ")
								: "N/A"}
						</p>
					</div>
				</div>
			</div>
		)
	);
}

export default HolidayModal;
