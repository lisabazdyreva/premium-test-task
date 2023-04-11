export const BEER_PER_PAGE = 5;
export const INITIAL_CURRENT_PAGE = 1;

export const BEER_LIST_EMPTY_MESSAGE =
  'List of favorite beer is empty. You can add beer to this list on beer page.';

export const PageValue = {
  Previous: 'previous',
  Next: 'next',
} as const;

export const STORAGE_KEY_FAVORITE_BEER_LIST = 'favoriteBeerList';

export const Route = {
  Home: 'home',
  Empty: '',
  Beer: 'beer',
} as const;
