import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AvailableSeats({
  date,
  seatsData,
}: {
  date: Date | any;
  seatsData: any;
}) {
  const formattedTargetDate = new Date(date).toLocaleDateString('en-IN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  // Find matching seats for the formatted target date
  let matchingSeats = seatsData[formattedTargetDate];

  // If no match is found, try with a date without leading zeros
  if (!matchingSeats) {
    const alternateFormattedDate = new Date(date).toLocaleDateString('en-IN', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    console.log(alternateFormattedDate)
    matchingSeats = seatsData[alternateFormattedDate];
  }

  // Return the matching seats or an empty array if no match is found
  return matchingSeats || [];
}
