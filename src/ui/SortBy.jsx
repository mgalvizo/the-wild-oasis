import { useSearchParams } from 'react-router-dom';
import Select from './Select';

// React router setSearchParams adds additional search params to the URL by joining them automatically with an "&"
const SortBy = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || '';

    const handleChange = e => {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    };

    return (
        <Select
            options={options}
            type="white"
            value={sortBy}
            onChange={handleChange}
        />
    );
};

export default SortBy;
