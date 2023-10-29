import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface IQuote {
  id: number;
  author: string;
  quote: string;
}

export type TQuotes = Array<IQuote>;

interface IQuotesResponse {
  quotes: TQuotes;
}

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }

  quotes: TQuotes = [];
  isLoading: boolean = false;
  selectedAuthor: string | null = null;
  favoriteQuoteIds: number[] = [];

  setSelectedAuthor = (value: string | null) => {
    this.selectedAuthor = value;
  };

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  setFavoriteQuoteIds(value: number[]) {
    this.favoriteQuoteIds = value;
  }

  async loadQuotes() {
    try {
      this.setIsLoading(true);

      const response = await axios<IQuotesResponse>({
        method: "GET",
        url: "https://dummyjson.com/quotes?skip=0&limit=100",
      });

      this.quotes = response.data.quotes;
    } catch (error) {
      console.log("Ошибка получения данных");
    } finally {
      this.setIsLoading(false);
    }
  }

  toggleFaforite(id: number) {
    if (this.favoriteQuoteIds.includes(id)) {
      const newQuotes = this.favoriteQuoteIds.filter((i) => i !== id);
      this.favoriteQuoteIds = newQuotes;
    } else {
      this.favoriteQuoteIds = [...this.favoriteQuoteIds, id];
    }
    localStorage.setItem("favorite", JSON.stringify(this.favoriteQuoteIds));
  }

  get authors() {
    const authors: string[] = this.quotes.map((quote: IQuote) => quote.author);
    const uniqueAuthors = [...new Set(authors)];
    return uniqueAuthors.sort();
  }

  get favoriteAuthors() {
    const authors: string[] = this.favoriteQuotes.map(
      (quote: IQuote) => quote.author
    );
    const uniqueAuthors = [...new Set(authors)];
    return uniqueAuthors.sort();
  }

  get filteredQuotes() {
    if (this.selectedAuthor) {
      return this.quotes.filter(
        (quote) => quote.author === this.selectedAuthor
      );
    }
    return this.quotes;
  }

  get favoriteQuotes() {
    return this.filteredQuotes.filter((item) =>
      this.favoriteQuoteIds.includes(item.id)
    );
  }

  clear() {
    this.quotes = [];
  }
}

export const rootStore = new RootStore();
