import { makeAutoObservable } from "mobx";
import axios from "axios";

interface IQuote {
  id: number;
  author: string;
  quote: string;
}

type TQuotes = Array<IQuote>;

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

  setSelectedAuthor = (value: string | null) => {
    this.selectedAuthor = value;
  };

  setIsLoading(value: boolean) {
    this.isLoading = value;
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

  clear() {
    this.quotes = [];
  }

  get authors() {
    const authors: string[] = this.quotes.map((quote: IQuote) => quote.author);
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
}

export const rootStore = new RootStore();
