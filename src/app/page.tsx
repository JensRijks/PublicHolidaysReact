import { getAllAvailableCountries } from "@/server/publicHolidays";
import SearchableDropdown from "./components/SearchableDropdown";

export default async function Home() {
	const countries = await getAllAvailableCountries();

	return (
		<main className="flex min-h-screen  flex-col items-center justify-between">
			<SearchableDropdown options={countries} />
		</main>
	);
}
