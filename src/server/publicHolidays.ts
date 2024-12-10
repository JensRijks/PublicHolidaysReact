'use server'

import { PublicHoliday, publicHolidaysSchema } from "@/types/publicHolidays";

export const getAllAvailableCountries = async () => {
    try {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries', {
            next: { revalidate: 86400 },
            cache: 'force-cache',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch available countries. Status: ${response.status}`);
        }

     
        return response.json();
        
    } catch (error) {
  
        throw new Error(`Failed to fetch available countries. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};


export const getPublicHolidays = async (year: number, countryCode: string) => {
  
    const result = publicHolidaysSchema.safeParse({ year, countryCode });

    if (!result.success) {
        let errorMessage = "";

        result.error.errors.forEach((issue) => {
            errorMessage += `${issue.path[0]} ${issue.message}. `;
        });

        throw new Error(errorMessage);
    }

    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 86400 },
            cache: 'force-cache',
        });

        if (!response.ok) {
       
            return [];
        }

      
    
        const data: PublicHoliday[] = await response.json();

        return data;


    } catch (error) {
      
        throw new Error(`Failed to fetch public holidays. Error: ${error instanceof Error ? error.message : 'Unknown error'} `);
    }
};
