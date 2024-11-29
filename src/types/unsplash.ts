// Collection IDs from Unsplash
const COLLECTIONS = {
    MOVIES: ['8512350', '4957858', '9951107'],
    PEOPLE: ['8363126'],
    BACKDROPS: ['4957858'],
  } as const;
  
  export const generateUnsplashUrl = (
    collection: keyof typeof COLLECTIONS,
    width: number,
    height: number
  ) => {
    const collections = COLLECTIONS[collection];
    const randomCollection = collections[Math.floor(Math.random() * collections.length)];
    return `https://source.unsplash.com/collection/${randomCollection}/${width}x${height}`;
  };
  
  export const generateMovieCoverUrl = () => generateUnsplashUrl('MOVIES', 1920, 1080);
  export const generateAvatarUrl = () => generateUnsplashUrl('PEOPLE', 300, 300);
  export const generateBackdropUrl = () => generateUnsplashUrl('BACKDROPS', 1920, 1080);
  