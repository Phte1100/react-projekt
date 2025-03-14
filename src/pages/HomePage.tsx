import BookList from "../components/BookList";

const HomePage = () => {
  return (
    <>
      <h1 className="title is-1 has-text-centered">📚 Välkommen till EzReadz</h1>
      <p className="has-text-centered mt-4 is-size-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        Här kan du hitta och lägga till böcker för att få betyg och recensioner. Sök efter titlar,
        gilla dina favoriter och se vad andra tycker om böckerna. <strong>Logga in</strong> för att
        delta och bidra med egna recensioner!
      </p>
      <br />

      <BookList /> {/* Laddar komponenten för att visa listan med böcker */}
    </>
  );
};

export default HomePage;
