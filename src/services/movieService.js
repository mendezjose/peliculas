const movies = [
  {
    id: 1,
    title: "X Man: Días del futuro pasado",
    date: new Date("05-10-2016"),
    status: "Inactivo",
    shiftId: 1,
  },
  {
    id: 2,
    title: "Alicia en el país de las maravillas",
    date: new Date("05-17-2016"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 3,
    title: "Locos de amor",
    date: new Date("05-24-2016"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 4,
    title: "Tortugas ninja 2",
    date: new Date("05-31-2016"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 5,
    title: "Titanic",
    date: new Date("01-10-2017"),
    status: "Inactivo",
    shiftId: null,
  },
  {
    id: 6,
    title: "Jurassic Park",
    date: new Date("03-17-2017"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 7,
    title: "El resplandor",
    date: new Date("02-14-2017"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 8,
    title: "El padrino",
    date: new Date("09-10-2017"),
    status: "Activo",
    shiftId: null,
  },
  {
    id: 9,
    title: "Star Wars",
    date: new Date("01-01-2017"),
    status: "Activo",
    shiftId: null,
  },
];

let lastId = movies.length;

export function getMovies() {
  return movies;
}

export function getMovie(movieId) {
  return movies;
}

export function saveMovie(movie) {
  if (!movie.id) {
    const newMovie = {
      id: ++lastId,
      title: movie.title,
      date: movie.date,
      status: movie.status,
      shiftId: null,
    };
    movies.push(newMovie);
    return;
  }

  const index = movies.findIndex((m) => m.id === movie.id);
  movies[index] = movie;
}

export function deleteMovie(movieId) {
  const index = movies.findIndex((m) => m.id === movieId);
  movies.splice(index, 1);
}

export function assignShiftToMovie(movieId, shiftId) {
  const index = movies.findIndex((m) => m.id === movieId);
  movies[index].shiftId = shiftId;
}

export function deleteShiftFromMovies(shiftId) {
  movies.forEach((m) => {
    if (m.shiftId == shiftId) m.shiftId = null;
  });
}
