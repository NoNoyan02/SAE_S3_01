import React from 'react';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ paths }) => {
    return (
        <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
            <ol>
                {paths.map((path, index) => (
                    <li key={index}>
                        {path.url ? (
                            <a href={path.url}>{path.label}</a>
                        ) : (
                            <span>{path.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
