import styled, { css } from 'styled-components';

const Row = styled.div`
    display: flex;

    ${({ type }) =>
        type === 'horizontal' &&
        css`
            justify-content: space-between;
            align-items: center;
        `}
    ${({ type }) =>
        type === 'vertical' &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;

// You can define static defaultProps to set the default props for the styled component
Row.defaultProps = {
    type: 'vertical',
};

export default Row;
