import './searchForm.css';

const SearchForm = ({city, search, onChange}) => {
   const handleCityChange = (event) => {
      onChange(event.target.value);
   };

   return (
      <div className='search-box'>
         <input
         type='text'
         className='search-bar'
         placeholder='Start typing...'
         onChange={handleCityChange}
         value={city}
         onKeyPress={search}
         />
      </div>
   );
};

export default SearchForm;