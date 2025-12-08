// Remplacez 'VOTRE_CLE_API' par la clé que vous avez obtenue d'Alpha Vantage
const API_KEY = 'VOTRE_CLE_API';
const SYMBOL = 'AAPL'; // Symbole boursier que vous voulez suivre
const FUNCTION = 'TIME_SERIES_DAILY'; // Récupérer les données journalières
const OUTPUT_SIZE = 'compact'; // 'compact' donne les 100 derniers jours, 'full' donne 20 ans

const URL = `https://www.alphavantage.co/query?function=${FUNCTION}&symbol=${SYMBOL}&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`;

// Fonction pour récupérer les données
async function fetchData() {
    try {
        const response = await fetch(URL);
        
        // Vérifier si la réponse est valide
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // La structure JSON d'Alpha Vantage est imbriquée.
        // On récupère la clé qui contient les données de la série temporelle.
        const timeSeriesKey = 'Time Series (Daily)';
        const dailyData = data[timeSeriesKey];
        
        if (dailyData) {
            console.log("Données journalières récupérées :", dailyData);
            
            // --- Étape suivante : Formater et Afficher les données ---
            // Vous pouvez maintenant boucler sur dailyData pour l'alimenter 
            // dans votre bibliothèque de graphiques (ex: ApexCharts ou Lightweight Charts).
            
            // Exemple : Afficher le prix de clôture d'hier
            const latestDate = Object.keys(dailyData)[0];
            const latestClose = dailyData[latestDate]['4. close'];
            
            document.getElementById('stock-price').innerText = 
                `Prix de clôture d'hier (${latestDate}) pour ${SYMBOL}: ${latestClose}`;
        
        } else {
             console.error("Erreur: Impossible de trouver les données de la série temporelle. Vérifiez votre clé API et le symbole.");
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des données Alpha Vantage:", error);
    }
}

// Appeler la fonction au chargement de la page
fetchData();
