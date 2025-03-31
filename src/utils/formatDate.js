/**
 * Formatiert ein gegebenes ISO-Datum in ein lesbares Datumsformat.
 * @param {string} isoDate - Das ISO-Datum (z. B. "2024-03-07T12:00:00Z").
 * @returns {string} - Das formatierte Datum in der Form "March 7, 2024".
 */
export const formatDate = (isoDate) => {
    // Erstellt ein neues Datum-Objekt aus dem übergebenen ISO-String
    const date = new Date(isoDate);

    // Wandelt das Datum in ein menschenlesbares Format um (Englisch: Monat Tag, Jahr)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',  // Gibt das Jahr vierstellig aus (z. B. "2024")
        month: 'long',    // Gibt den Monatsnamen als ausgeschriebenen Text aus (z. B. "March")
        day: 'numeric',   // Gibt den Tag als Zahl aus (z. B. "7")
    });
};
