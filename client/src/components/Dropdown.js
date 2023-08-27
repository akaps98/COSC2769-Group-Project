function Dropdown({ data }) {
    return (
        <option value={data.category.main}>{data.category.main}</option>
    )
}

export default Dropdown;