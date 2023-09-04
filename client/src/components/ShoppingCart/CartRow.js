function CartRow({id, imagePath, name, dateAdded, quantity, price}) {
    <tr>
        <th scope="row">{id}</th>
        <td className='d-flex'>
            <img src={imagePath} className='item-img d-block'></img>
            <div className='item-info ps-4'>
                <h3 className='item-name'>{name}</h3>
                <p className='item-date text-warning py-0'>[Date Added: {dateAdded}]</p>
                <button className='remove-btn bg-light text-black-50'>Remove</button>
            </div>

        </td>
        <td>{price}</td>
        <td>
            <div className='d-flex'>
                <button className='quantity-btn bg-danger'>-</button>
                <span className='quantity-box d-inline-block bg-light text-black text-center border'>{quantity}</span>
                <button className='quantity-btn bg-primary'>+</button>
            </div>
        </td>
        <td>${total * quantity}</td>
    </tr>
}

export default CartRow