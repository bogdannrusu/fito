/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const handleBack = () => {
        navigate('/navbar');
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Result
                status="404"
                title="404"
                subTitle={t("Sorry, the page you visited does not exist.")}
                extra={
                    <Button onClick={handleBack} type="primary">
                        {t('Back')}
                    </Button>
                }
            />
        </div>
    )
}

export default NotFound
