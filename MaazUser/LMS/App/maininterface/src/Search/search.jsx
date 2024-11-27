import { useRef, useState, useEffect } from "react";
import BookCard from "../BookCard/bookCard.jsx";
import "./search.css";

function Search(props) {
  const [books, setBooks] = useState([]);
  const [noBooks, setNoBook] = useState(false);

  useEffect(() => {
    fetch("/api/getPopularBooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
      });
  }, []);

  const handleSearch = () => {
    function isDuplicate(book, data) {
      console.log(book);
      return data.some((existingBook) => existingBook.Book_id === book.Book_id);
    }
    if (selectedValue === "title") {
      const input = searchinputRef.current.value;
      if (input === "") {
        return;
      }
      fetch("/api/getBookbyTitle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length != 0) {
            setNoBook(false);
            while (data.data.length < 10) {
              let book = books.shift();
              if (!isDuplicate(book, data.data)) {
                data.data.push(book);
              }
            }
            setBooks(data.data);
          } else {
            setNoBook(true);
          }
        });
    } else if (selectedValue === "author") {
      const input = searchinputRef.current.value;
      if (input === "") {
        return;
      }
      fetch("/api/getBookbyAuthor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length != 0) {
            setNoBook(false);
            while (data.data.length < 10) {
              let book = books.shift();
              if (!isDuplicate(book, data.data)) {
                data.data.push(book);
              }
            }
            setBooks(data.data);
          } else {
            setNoBook(true);
          }
        });
    } else if (selectedValue === "publisher") {
      const input = searchinputRef.current.value;
      if (input === "") {
        return;
      }
      fetch("/api/getBookbyPublisher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length != 0) {
            setNoBook(false);
            while (data.data.length < 10) {
              let book = books.shift();
              if (!isDuplicate(book, data.data)) {
                data.data.push(book);
              }
            }
            setBooks(data.data);
          } else {
            setNoBook(true);
          }
        });
    } else if (selectedValue === "isbn") {
      const input = searchinputRef.current.value;
      if (input === "") {
        return;
      }
      fetch("/api/getBookbyISBN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length != 0) {
            setNoBook(false);
            while (data.data.length < 10) {
              let book = books.shift();
              if (!isDuplicate(book, data.data)) {
                data.data.push(book);
              }
            }
            setBooks(data.data);
          } else {
            setNoBook(true);
          }
        });
    } else if (selectedValue === "genre") {
      if (selectedGenres.length == 0) {
        return;
      }
      fetch("/api/filterGenres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: selectedGenres }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length != 0) {
            setNoBook(false);
            while (data.data.length < 10) {
              let book = books.shift();
              if (!isDuplicate(book, data.data)) {
                data.data.push(book);
              }
            }
            setBooks(data.data);
          } else {
            setNoBook(true);
          }
        });
    }
  };
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("/api/getGenres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const famousGenres = [
          "Fiction",
          "Education",
          "Classic",
          "Romance",
          "Fantasy",
          "Thriller",
          "Memoir",
          "Non-fiction",
          "Self-Help",
          "Psychology",
          "Business",
        ];
        const genres = data.data.map((item) => item.Genre);
        const filteredGenres = genres.filter((genre) =>
          famousGenres.includes(genre)
        );
        setGenres(filteredGenres);
      });
  }, []);

  const searchinputRef = useRef();
  const [selectedValue, setSelectedValue] = useState("title");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (!selectedValue || !searchinputRef.current) return;

    searchinputRef.current.value = "";

    if (selectedValue === "isbn") {
      setSelectedGenres("");
      searchinputRef.current.type = "text";
      searchinputRef.current.pattern = "^(97(8|9))?\\d{9}(\\d|X)$";
      searchinputRef.current.placeholder =
        "Enter ISBN (e.g. 978-3-16-148410-0)";
    } else if (
      selectedValue === "title" ||
      selectedValue === "author" ||
      selectedValue === "publisher"
    ) {
      setSelectedGenres("");
      searchinputRef.current.type = "text";
      searchinputRef.current.placeholder = `Enter the ${selectedValue}`;
    }
  }, [selectedValue]);

  const handlechange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(value)
        ? prevSelectedGenres.filter((genre) => genre !== value)
        : [...prevSelectedGenres, value]
    );
  };

  return (
    <>
      <div className="search-contain">
        <div className="search-banner">
          <div className="search-tag">
            <span>Simplify Your Search</span>
            <br />
            <span>Find Exactly What You're Looking for.</span>
          </div>
        </div>
        <div className="search-bar">
          <select
            className="dropdown"
            value={selectedValue}
            onChange={handlechange}
          >
            <option value="title">--Title</option>
            <option value="genre">--Genre</option>
            <option value="author">--Author</option>
            <option value="publisher">--Publisher</option>
            <option value="isbn">--ISBN</option>
          </select>

          <div className="genre-checkboxes">
            {selectedValue === "genre" &&
              genres.map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
          </div>

          {selectedValue != "genre" && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              ref={searchinputRef}
            />
          )}
          <button className="search-button" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {noBooks && (
          <div className="noBooks">
            <h1>
              No results found in the catalog <br /> Please try again
            </h1>
          </div>
        )}

        {!noBooks &&
          books.map((book) => (
            <BookCard
              key={book.Book_id}
              logged={props.logged}
              title={book.Title}
              genre={book.Genre}
              author={book.Author}
              publisher={book.Publisher}
              isbn={book.ISBN}
              count={book.Books_count - book.Outgoing_copies}
            />
          ))}
        <div className="empty"></div>
      </div>
    </>
  );
}

export default Search;
