import '../styles/hero.css';

const HeroContainer = ({ title, children }) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Astro description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{title}</title>
      </head>
      <body>
        <div className="heroContainer">
          {children}
        </div>
      </body>
    </>
  );
};

export default HeroContainer;
