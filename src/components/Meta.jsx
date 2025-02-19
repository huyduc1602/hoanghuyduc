import { Helmet } from 'react-helmet-async';
import favicon from '../assets/favicon.ico?url';

// Use absolute URL for preview image
const DEFAULT_PREVIEW = `${window.location.origin}/preview.png`;

const Meta = ({ title, description, keywords, image }) => {
    // Convert relative URLs to absolute URLs for og:image
    const getAbsoluteUrl = (url) => {
        if (url?.startsWith('http')) return url;
        return `${window.location.origin}${url?.startsWith('/') ? '' : '/'}${url}`;
    };

    const ogImage = getAbsoluteUrl(image || DEFAULT_PREVIEW);

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
            <meta property="og:url" content={window.location.href} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title || 'Hoang Huy Duc - Portfolio'} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={title || 'Hoang Huy Duc - Portfolio'} />
            <meta property="fb:app_id" content={import.meta.env.VITE_FACEBOOK_APP_ID} />
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