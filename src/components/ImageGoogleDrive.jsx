import React, { useState, useEffect } from 'react';
import GooglePicker from 'react-google-picker';

const ImageGoogleDrive = ({ imageUrl, alt, className, onImageSelect }) => {
    const [directUrl, setDirectUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [urlIndex, setUrlIndex] = useState(0);

    const getImageUrls = (fileId) => [
        `https://lh3.googleusercontent.com/d/${fileId}`,
        `https://drive.google.com/uc?export=view&id=${fileId}`,
        `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
    ];

    const convertToDirectUrl = (driveUrl) => {
        if (!driveUrl) return '';

        let fileId = '';
        const fileMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
        const idMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);

        if (fileMatch) {
            fileId = fileMatch[1];
        } else if (idMatch) {
            fileId = idMatch[1];
        } else {
            fileId = driveUrl;
        }

        const urls = getImageUrls(fileId);
        return urls[urlIndex];
    };

    useEffect(() => {
        const loadImage = async (url) => {
            setLoading(true);
            try {
                const img = new Image();
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = url;
                });
                setDirectUrl(url);
                setLoading(false);
            } catch (error) {
                console.error('Error loading image:', error);
                // Try next URL format if available
                if (urlIndex < 2) {
                    setUrlIndex(prev => prev + 1);
                } else {
                    setDirectUrl('/placeholder.jpg');
                    setLoading(false);
                }
            }
        };

        const url = convertToDirectUrl(imageUrl);
        if (url) loadImage(url);
    }, [imageUrl, urlIndex]);

    return (
        <div className="relative group">
            {loading ? (
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
            ) : (
                <img
                    src={directUrl}
                    alt={alt}
                    className={`${className} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    onError={(e) => {
                        if (urlIndex < 2) {
                            setUrlIndex(prev => prev + 1);
                        } else {
                            e.target.src = '/placeholder.jpg';
                        }
                    }}
                />
            )}
            <div className="hidden">
                <GooglePicker
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    developerKey={import.meta.env.VITE_GOOGLE_API_KEY}
                    scope={['https://www.googleapis.com/auth/drive.readonly']}
                    onChange={data => {
                        if (data.action === 'picked') {
                            const file = data.docs[0];
                            const driveUrl = `https://drive.google.com/file/d/${file.id}/view`;
                            onImageSelect?.(driveUrl);
                        }
                    }}
                    redirectUri={import.meta.env.VITE_REDIRECT_URI}
                    multiselect={false}
                    navHidden={true}
                    authImmediate={false}
                    viewId={'DOCS_IMAGES'}
                    createPicker={(google, oauthToken) => {
                        const picker = new google.picker.PickerBuilder()
                            .addView(google.picker.ViewId.DOCS_IMAGES)
                            .setOAuthToken(oauthToken)
                            .setDeveloperKey(import.meta.env.VITE_GOOGLE_API_KEY)
                            .setCallback((data) => {
                                if (data.action === 'picked') {
                                    const file = data.docs[0];
                                    const driveUrl = `https://drive.google.com/file/d/${file.id}/view`;
                                    onImageSelect?.(driveUrl);
                                }
                            });

                        return picker.build();
                    }}
                />
            </div>
        </div>
    );
};

export default ImageGoogleDrive;