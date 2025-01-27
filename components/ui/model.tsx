export interface Event {
    _id: string;
    name: string;
    date: string;
    description: string;
    googleFormLink: string;
    posterUrls: string[];
  }
  
  export interface User {
    id: string;
    email: string;
    name?: string;
  }
  