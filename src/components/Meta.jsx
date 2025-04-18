import { Helmet } from 'react-helmet-async';
import favicon from '../assets/favicon.ico?url';
import { siteConfig } from '../config';

const Meta = ({ title, description, keywords, image }) => {
    // Get absolute URL for OG image
    const getOgImageUrl = () => {
        if (!image) return `${siteConfig.url}${siteConfig.ogImage}`;
        if (image.startsWith('http')) return image;
        return `${siteConfig.url}${image.startsWith('/') ? '' : '/'}${image}`;
    };

    const pageTitle = title ? `${title} - ${siteConfig.name}` : `${siteConfig.name} - Portfolio`;
    const ogImageUrl = getOgImageUrl();

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph meta tags */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : siteConfig.url} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:secure_url" content={ogImageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title || siteConfig.name} />
            <meta property="og:site_name" content={siteConfig.name} />

            {/* Twitter Card meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />
            <meta name="twitter:image:alt" content={title || siteConfig.name} />

            {/* Basic meta tags */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />

            {/* Facebook App ID */}
            <meta property="fb:app_id" content={import.meta.env.VITE_FACEBOOK_APP_ID} />

            {/* Favicon */}
            <link rel="icon" type="image/svg+xml" href={favicon} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: '',
    description: siteConfig.description,
    keywords: 'web development, programming, full stack, react, node.js',
    image: siteConfig.ogImage
};

export default Meta;