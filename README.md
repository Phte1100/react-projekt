# EzReadz – En plats för böcker och recensioner

EzReadz är en webbapp där användare kan lägga till böcker automatiskt med ISBN, gilla sina favoriter och skriva recensioner. Målet är att skapa en smidig plattform där användare kan utforska böcker, se vad andra tycker och bidra med egna åsikter. Applikationen består av en frontend byggd i React och en backend byggs med Fastify. Boken hämtas automatiskt med hjälp av Google Books API.

## Funktioner i applikationen

Användare kan söka efter böcker och se detaljerad information som titel, författare, beskrivning och genrer. Om en bok inte redan finns i systemet kan en användare som är inloggad lägga till den med hjälp av ISBN. Böcker kan gillas av användare och recensioner kan skrivas för att dela tankar om en bok. Gilla-markeringar och recensioner lagras i backend och är kopplade till användarkonton.

## Hantering av state och dynamiskt innehåll

För att hantera dynamiskt innehåll används useState och useEffect. När en användare exempelvis söker efter en bok eller lägger till en ny recension uppdateras UI i realtid. När boklistan laddas in från backend används en laddningsanimation som visas tills datan har hämtats. React Router används för navigering mellan sidor, så att användare enkelt kan klicka sig vidare till bokdetaljer, inloggning eller andra funktioner.

## Validering av formulär

Alla inmatningsfält har validering med Yup och react-hook-form. Exempelvis måste lösenord vara minst sex tecken långt, innehålla en siffra och ett specialtecken. Användarnamn får bara innehålla bokstäver och siffror, och e-postadresser måste vara i rätt format. Detta säkerställer att användarinformationen är korrekt innan den skickas till backend.

## Användarroller och åtkomst

Webbappen har olika användarroller som styr vilka funktioner en användare har tillgång till. En vanlig användare kan söka efter böcker, gilla böcker och skriva recensioner. En redaktör har tillgång till en adminsida och kan lägga till och ändra böcker. En admin har utökade rättigheter och kan hantera användare samt radera böcker och recensioner. Rollerna hanteras med hjälp av JWT-tokens som skickas med varje förfrågan till backend.

## Backend och datalagring

Backend är byggd med Fastify. Det hanterar API-förfrågningar, autentisering och datalagring i en MySQL-databas. När en användare loggar in valideras deras uppgifter mot databasen och en JWT-token genereras. Bokdata hämtas antingen från backend eller direkt från Google Books API om boken inte redan finns i systemet.

## Installerade paket

- **React** – Bibliotek för att bygga användargränssnitt.  
- **React Router** – Hanterar sidnavigering.  
- **React Hook Form** – Enkel hantering av formulär.  
- **Yup** – Validering av formulärinmatningar.  
- **Axios** – Skickar och hämtar data från backend.  
- **React Toastify** – Visar notifikationer.  
- **React Spinners** – Laddningsanimationer.  
- **Bulma** – CSS-ramverk för responsiv design.  
- **React Awesome Loaders** – Extra laddningsanimationer.  
- **React Icons** – Ikonbibliotek för UI.  
