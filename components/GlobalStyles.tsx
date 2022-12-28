import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Remove default margin */
    * {
        margin: 0;
        padding: 0;
        font: inherit;
        cursor: url(/cursor.svg), auto !important;
    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul,
    ol {
        list-style: none;
    }

    /* Set core root defaults */
    html:focus-within {
        scroll-behavior: smooth;
    }

    /* Set core body defaults */

    html,
    body {
        height: 100%;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.colors.background};
    }

    body {
        text-rendering: optimizeSpeed;
        line-height: 1.5;
    }

    /* A elements that don't have a class get default styles */
    a {
        text-decoration: none;
        color: var(--clr-neutral-900);
        cursor: inherit;
    }

    /* Make images easier to work with */
    img,
    picture,
    svg {
        max-width: 100%;
        display: block;
    }

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    /* @media (prefers-reduced-motion: reduce) {
        html:focus-within {
            scroll-behavior: auto;
        }

        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    } */

    h1 {
        font-family: var(--ff-heading);
        font-size: ${({ theme }) => theme.fontSize.heading};
    }
    h2 {
        font-family: var(--ff-heading);
        font-size: ${({ theme }) => theme.fontSize.subHeading};
    }
    h3 {
        font-family: var(--ff-heading);
        font-size: ${({ theme }) => theme.fontSize.subSubHeading};
    }
    p {
        font-family: var(--ff-body);
        font-size: ${({ theme }) => theme.fontSize.body};
    }
    li {
        font-family: var(--ff-body);
        font-size: ${({ theme }) => theme.fontSize.body};
    }

    header,
    main {
        width: 95%;
    }
    header{
        max-width: 1500px;
    }



    /* SCROLL BAR */
    body::-webkit-scrollbar {
        width: 0.4em;
    }
    body::-webkit-scrollbar-track {
        background: var(--clr-accent-600);
        border-radius: 10px;
    }

    body::-webkit-scrollbar-thumb {
        background: var(--clr-primary-200);
        border-radius: 1.5rem;
    }
    body::-webkit-scrollbar-thumb:hover {
        background: blue;
    }
    @supports (scrollbar-color: green, pink) {
        * {
            scrollbar-color: green, pink;
        }
    }
`;

export default GlobalStyle;
