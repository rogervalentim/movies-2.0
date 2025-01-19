interface ImagesData {
  file_path: string;
}

export interface Backdrops {
  backdrops: ImagesData[];
  file_path: string;
}

export interface MovieDetailsData {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  name?: string;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  original_title: string;
  budget: number;
  revenue: number;
  spoken_languages: [
    {
      name: string;
    }
  ];
  production_companies: [
    {
      name: string;
    }
  ];
  belongs_to_collection?: {
    id: number;
    name: string;
    backdrop_path: string;
    poster_path: string;
  };
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface ActorDetails {
  id: number;
  name: string;
  character: string;
  biography: string;
  profile_path: string | null;
  birthday: string | number;
  place_of_birth: number;
  known_for_department: string;
}
