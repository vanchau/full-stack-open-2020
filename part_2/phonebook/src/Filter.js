import React from 'react';

const Filter = (props) => {
    return (
        <div>
            <form>
                filter shown with
                <input
                    value={props.searching}
                    onChange={props.handleSearchChange}
                />
            </form>
        </div>
    );
};

export default Filter;