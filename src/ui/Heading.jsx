import styled, { css } from 'styled-components';

// Default tag returned is an h1
const Heading = styled.h1`
    line-height: 1.4;
    // Special prop that will render the passed HTML tag
    ${({ as }) =>
        as === 'h1' &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

    ${({ as }) =>
        as === 'h2' &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}

    ${({ as }) =>
        as === 'h3' &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}
`;

export default Heading;
