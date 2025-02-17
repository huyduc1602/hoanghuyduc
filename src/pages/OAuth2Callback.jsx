import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Xử lý callback và lưu token
        const handleCallback = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                // Xử lý code ở đây nếu cần
                navigate('/'); // Chuyển hướng về trang chủ
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Processing authentication...</div>;
};

export default OAuth2Callback;
