import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="magnus-home-page">

      {/* Welcome Section */}
      <section className="home-welcome">
        <h1>Welcome to JALA Academy</h1>

        <p>
          The world's best up-skilling academy
        </p>
      </section>


      {/* Information Text */}
      <section className="home-introduction">

        <p>
          Do you want to learn Selenium/cucumber Automation completely
          with Practical Scenarios in 7 Days? Use this website to find
          all the scenarios at one place.
        </p>

        <p>
          To understand or test RESTful APIs, use the JALA Academy FREE
          live APIs. Search on Google with the keyword
          "JALA Academy Postman APIs"
        </p>

      </section>


      {/* Information Card */}
      <section className="home-card">

        <p>
          You learn Everything by doing projects if you are very serious
          to get a software job in 90 days{" "}
          <a
            href="https://jalatechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://jalatechnologies.com
          </a>
        </p>

        <p>
          Don't forget to read our website JALA Academy completely to know
          more opportunities
        </p>

      </section>


      {/* Yellow Notice */}
      <section className="home-yellow-card">

        <div className="home-yellow-message">
          If you are a working professional, Up-skill with JALA Academy
          Job Guarantee Programs to keep your Job secure for 10 Years
        </div>

      </section>

    </div>
  );
};

export default HomePage;