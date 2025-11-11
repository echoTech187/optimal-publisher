
import React from 'react';

const FormHeader = (props :{title: string, description: string, className?: string}) => {
    const { title, description, className } = props;
    return (
        <header className={`p-6 ${className ?? ''}`}>
            <h1 className="max-md:text-xl md:text-2xl 2xl:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight">{title}</h1>
            <p>{description}</p>
        </header>
    );
};

export default FormHeader;
