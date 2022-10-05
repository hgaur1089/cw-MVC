import React from 'react';

import './productListItem.css';

const ProductListItem = (props) => {
    const {name, description, price, discount, rating, quantity, image, brand, category} = props;
    return (
        <div className="card">
            <div className="image-block">
                <img src={image} alt={name}/>
            </div>
            <div className="content-block">
                <p className='flexy'>
                    <span>{name}</span> <span className='rating'>{rating} stars</span>
                </p>
                <p className='description'>
                    {description}
                </p>
                <p className='flexy price'>
                    <span>Rs.{price}</span><span className='link discount'>-{discount}%</span>
                </p>
                <p className="link">
                    {quantity} left in stock
                </p>
            </div>
        </div>
    );
}

export default ProductListItem;