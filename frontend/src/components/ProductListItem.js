import React from 'react';

const ProductListItem = (props) => {
    const {title: name, description, price, discount, rating,stock: quantity, imageurl: image} = props.product;
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