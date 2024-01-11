export interface Property {
    popular: boolean;
    _id: string;
    image: string | null;
    title: string;
    description: string;
    code: string;
    city: string;
    region: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
}

export interface SearchFilters {
    available_date?: Date | null;
    location?: string;
    price_from?: number;
    price_to?: number;
    property_type?: string;
}

export interface PropertiesFilter extends SearchFilters {
    page?: string;
    size?: string;
    payment_type?: string;
    owner?: string;
}

export interface owner {
    number_of_properties: number;
    average_rating: number;
    _id: String;
    role: String;
    name: String;
    image: String | null;
}

export interface Review {
    _id: string;
    owner: string;
    user: string;
    rate: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Review {
    _id: string;
    owner: string;
    user: string;
    rate: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export class User {
    id: string;
    name: string;
  
    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
    }
}

export type VideoLike = {
    id: string;
    user: User;
};

export type Video = {
    _id: string;
    name: string;
    title: string;
    user: User;
    thumbnail: string;
    comments: number;
    like: VideoLike[];
    views: number;
};
  