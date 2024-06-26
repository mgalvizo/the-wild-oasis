import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${({ active }) =>
        active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

// Filtering logic state will be managed in the URL
const Filter = ({ filterField, options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // The param in the URL or the first option
    const currentFilter = searchParams.get(filterField || options.at(0).value);

    const handleClick = value => {
        // The URLSearchParams API
        searchParams.set(filterField, value);

        if (searchParams.get('page')) {
            searchParams.set('page', 1);
        }

        setSearchParams(searchParams);
    };

    const renderedOptions = options.map(option => {
        const { value, label } = option;
        return (
            <FilterButton
                key={value}
                onClick={() => handleClick(value)}
                active={value === currentFilter}
                disabled={value === currentFilter}
            >
                {label}
            </FilterButton>
        );
    });

    return <StyledFilter>{renderedOptions}</StyledFilter>;
};

export default Filter;
