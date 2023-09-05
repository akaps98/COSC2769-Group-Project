function CartRow({ data }) {
    const quantity = 4;
    return (
        <tr>
            <th scope="row">{data.ProductID}</th>
            <td className='d-flex'>
                <img src={data.imagePATH} className='item-img d-block'></img>
                <div className='item-info ps-4'>
                    <h3 className='item-name'>{data.name}</h3>
                    <p className='item-date text-warning py-0'>[Date Added: {data.dateAdded}]</p>
                    <button className='remove-btn bg-light text-black-50'>Remove</button>
                </div>

            </td>
            <td>{data.price}</td>
            <td>
                <div className='d-flex'>
                    <button className='quantity-btn bg-danger'>-</button>
                    <span className='quantity-box d-inline-block bg-light text-black text-center border'>{quantity}</span>
                    <button className='quantity-btn bg-primary'>+</button>
                </div>
            </td>
            <td>${data.price * quantity}</td>
        </tr>
    )
}

export default CartRow