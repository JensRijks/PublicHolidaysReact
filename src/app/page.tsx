import { getAllAvailableCountries } from "@/server/publicHolidays";
import HomePage from "./components/HomePage";

export default async function Home() {
	const countries = await getAllAvailableCountries();

	return (
		<main className="flex min-h-screen  flex-col items-center justify-between">
			<HomePage countries={countries} />
		</main>
	);
}
