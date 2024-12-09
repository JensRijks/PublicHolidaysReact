'use server'


export const getAllAvailableCountries = async () => {
    const response = await fetch('https://date.nager.at/api/v3/AvailableCountries', {
        next: { revalidate: 86400 }, 
        cache: 'force-cache'
      });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();

}

export const getPublicHolidays = async () => {

}