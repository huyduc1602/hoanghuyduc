import { Helmet } from 'react-helmet';

const Meta = () => {
    return (
        <Helmet>
            <title>Hoang Huy Duc</title>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/src/assets/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="title" content="Hoang Huy Duc — Developer">
            <meta name="description" content="Profile website of Hoang Huy Duc">
            {/* -- Open Graph / Facebook -- */}
            <meta property="og:type" content="website">
            <meta property="og:title" content="Hoang Huy Duc">
            <meta property="og:description" content="Portfolio page made by Hoang Huy Duc in React.">
            <meta property="og:url" content="https://hoanghuyduc.com/">
            <meta property="og:image" content="https://hoanghuyduc.com/prev.png">
            <meta property="og:image:type" content="image/png">
            <meta property="og:image:width" content="1094">
            <meta property="og:image:height" content="533">
            {/* -- Twitter -- */}
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="https://hoanghuyduc.com/">
            <meta property="twitter:title" content="Hoang Huy Duc">
            <meta property="twitter:description" content="Portfolio page made by Hoang Huy Duc in React.">
            <meta property="twitter:image" content="https://hoanghuyduc.com/prev.png">
            <meta name="robots" content="index, follow">
        </Helmet>
    );
  }

export default Meta;