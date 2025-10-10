import React from 'react';

const FormHeader = (props :{title: string, description: string}) => {
    const { title, description } = props;
    return (
        <header className="p-6">
            <h1 className="max-md:text-xl md:text-2xl 2xl:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight">{title}</h1>
            <p>{description}</p>
        </header>
    );
};

export default FormHeader;