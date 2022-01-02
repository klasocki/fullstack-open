import React from 'react'

const Search = ({newQuery, handleQueryChange}) => (
    <div>filter shown with <input value={newQuery} onChange={handleQueryChange}/></div>
)

export default Search
