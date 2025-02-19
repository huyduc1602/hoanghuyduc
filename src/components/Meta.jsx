import { Helmet } from 'react-helmet-async';
import favicon from '../assets/favicon.ico?url';

// Default preview image URL - replace with your actual hosted image URL
const DEFAULT_PREVIEW = 'https://hoanghuyduc.com/preview.png';

const Meta = ({ title, description, keywords, image }) => {
    return (
        <Helmet>
            <title>{title ? `${title} - Hoang Huy Duc` : 'Hoang Huy Duc - Portfolio'}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title ? `${title} - Hoang Huy Duc` : 'Hoang Huy Duc - Portfolio'} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} - Hoang Huy Duc` : 'Hoang Huy Duc - Portfolio'} />
            <meta name="twitter:description" content={description} />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content="https://hoanghuyduc.com/" />
            <meta property="og:image" content={image || DEFAULT_PREVIEW} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <link rel="icon" type="image/svg+xml" href={favicon} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: '',
    description: 'Portfolio website of Hoang Huy Duc - Full Stack Developer',
    keywords: 'web development, programming, full stack, react, node.js',
    image: DEFAULT_PREVIEW
};

export default Meta;