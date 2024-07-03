export const BASEAPIURL: string = "https://dev-storm-rest-api.pantheonsite.io"

export const getFetchNews = async () => {
  try {
    const response = await fetch(`${BASEAPIURL}/api/v1/news`);
    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw error;
  }
}