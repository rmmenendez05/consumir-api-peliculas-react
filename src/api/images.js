export const imgUrl = (path, size = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;