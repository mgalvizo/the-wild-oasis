import styled from 'styled-components';

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${({ type }) =>
            type === 'white'
                ? 'var(--color-grey-100)'
                : 'var(--color-grey-300)'};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

// ...props is whatever extra props we would like to pass to the component
const Select = ({ options, value, onChange, ...props }) => {
    const renderedOptions = options.map(option => {
        const { label, value } = option;
        return (
            <option value={value} key={value}>
                {label}
            </option>
        );
    });

    // Spread whatever props we pass to the component so we do NOT have to write them twice
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {renderedOptions}
        </StyledSelect>
    );
};

export default Select;
