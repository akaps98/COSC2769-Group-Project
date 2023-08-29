import React from 'react';
import { useState } from 'react';

export default function Categories() {
    //******NOTE****** ----EDIT when Admin is developed----
    const categories = {
        categories: [
            { name: "Beauty", subcategories: [
                    { name: "Makeup", subcategories: [
                            { name: "Eyes", subcategories: ["Eyeliners"] },
                            { name: "Lips", subcategories: ["Lipsticks"] },
                            { name: "Cheeks", subcategories: [] },
                            { name: "Face", subcategories: [] }
                        ]
                    },
                    { name: "Hair", subcategories: [
                            { name: "Accessories", subcategories: [] },
                            { name: "Appliances", subcategories: [] }
                        ]
                    }
                ]
            },
            { name: "Electronics", subcategories: [
                    { name: "Computers", subcategories: [
                            { name: "Laptops", subcategories: [] },
                            { name: "Desktops", subcategories: [] }
                        ]
                    },
                    { name: "Mobiles", subcategories: [
                            { name: "Smartphones", subcategories: ["Iphone"] },
                            { name: "Tablets", subcategories: [] }
                        ]
                    },
                    { name: "Televisions", subcategories: [
                            { name: "Smart TVs", subcategories: ["Android"] },
                            { name: "Cable TVs", subcategories: [] }
                        ]
                    },
                    { name: "Small Appliances", subcategories: [
                            { name: "Bathroom", subcategories: ["Hair Dryers"] },
                            { name: "Kitchen", subcategories: [] }
                        ]
                    }
                ]
            },
            { name: "Home", subcategories: [
                    { name: "Furniture", subcategories: [
                            { name: "Living Room", subcategories: ["Sofas"] },
                            { name: "Home Office", subcategories: ["Desks"] },
                            { name: "Bath Room", subcategories: [] },
                            { name: "Bed Room", subcategories: [] },
                            { name: "Kitchen", subcategories: [] }
                        ]
                    },
                    { name: "Decorations", subcategories: [
                            { name: "Artworks", subcategories: [] },
                            { name: "Pottery", subcategories: [] }
                        ]
                    }
                ]
            },
            { name: "Sports", subcategories: [
                    { name: "Outdoor", subcategories: [
                            { name: "Cycling", subcategories: ["Bikes"] },
                            { name: "Soccer", subcategories: [] },
                            { name: "Hiking", subcategories: [] }
                        ]
                    },
                    { name: "Indoor", subcategories: [
                            { name: "Table tennis", subcategories: [] },
                            { name: "Yoga", subcategories: [] }
                        ]
                    }
                ]
            },
            { name: "Wearables", subcategories: [
                    { name: "Bags", subcategories: [
                            { name: "Travel", subcategories: ["Luggage"] },
                            { name: "School", subcategories: [] },
                            { name: "Office", subcategories: [] }
                        ]
                    },
                    { name: "Clothes", subcategories: [
                            { name: "T-Shirt", subcategories: [] },
                            { name: "Coat", subcategories: [] },
                            { name: "Suit", subcategories: [] },
                            { name: "Cardigan", subcategories: [] },
                            { name: "Jeans", subcategories: [] }
                        ]
                    },
                    { name: "Shoes", subcategories: [
                            { name: "Boots", subcategories: [] },
                            { name: "Running shoes", subcategories: [] },
                            { name: "Heels", subcategories: [] },
                            { name: "Sneakers", subcategories: [] },
                            { name: "Loafers", subcategories: [] },
                        ]
                    }
                ]
            },
            { name: "Stationery", subcategories: [
                    { name: "School", subcategories: [
                            { name: "Notebooks", subcategories: ["Lined"] },
                            { name: "Writing", subcategories: [] },
                            { name: "Cutting", subcategories: [] },
                            { name: "Organizing", subcategories: [] }
                        ]
                    },
                    { name: "Office", subcategories: [
                            { name: "Envelopes", subcategories: [] },
                            { name: "Files", subcategories: [] }
                        ]
                    }
                ]
            },
        ]
    };

    const [selection, setSelection] = useState([]);

    const [topCategory, setTopCategory] = useState('');
    const [secondCategory, setSecondCategory] = useState('');
    const [thirdCategory, setThirdCategory] = useState('');

    const topCategoryObj = categories.categories.find(category => category.name === topCategory);
    const secondCategoryObj = topCategoryObj
        ? topCategoryObj.subcategories.find(subcategory => subcategory.name === secondCategory)
        : null;
    const thirdCategoryObj = secondCategoryObj
        ? secondCategoryObj.subcategories.find(subcategory => subcategory.name === thirdCategory)
        : null;

    const handleCategoryChange = (event) => {
        setTopCategory(event.target.value);
        setSecondCategory('');
        setSelection([event.target.value]);
    };

    const handleSubcategoryChange = (event) => {
        setSecondCategory(event.target.value);
        setSelection([...selection.slice(0,1), event.target.value ]);
    };

    const handleSubsubcategoryChange = (event) => {
        setThirdCategory(event.target.value);
        setSelection([...selection.slice(0,2), event.target.value ]);
    };

    return (
        <div className="row">
            <div>
                <input 
                    name="category" 
                    className="form-control" 
                    disabled
                    value={selection.join(' > ')}      
                />
            </div>
            <div className="col-sm-3">
                <select className="form-select" value={topCategory} onChange={handleCategoryChange}>
                    <option selected hidden>Top Category</option>
                    {categories.categories.map(category => (
                    <option value={category.name} key={category.name}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="col-sm-3">
                {topCategoryObj && (
                    <select className="form-select" value={secondCategory} onChange={handleSubcategoryChange}>
                    <option selected hidden>Second category</option>
                    {topCategoryObj.subcategories.map(subcategory => (
                        <option value={subcategory.name} key={subcategory.name}>
                        {subcategory.name}
                        </option>
                    ))}
                    </select>
                )}
            </div>
            <div className="col-sm-3">
                {secondCategoryObj && (
                    <select className="form-select" onChange={handleSubsubcategoryChange}>
                    <option selected hidden>Third category</option>
                    {secondCategoryObj.subcategories.map(thirdCategory => (
                        <option value={thirdCategory.name} key={thirdCategory.name}>
                        {thirdCategory.name}
                        </option>
                    ))}
                    </select>
                )}
            </div>
            <div className="col-sm-3">
                {thirdCategoryObj && (
                    <select className="form-select" onChange={(e)=>setSelection([...selection.slice(0,3), e.target.value])}>
                    <option selected hidden>Last category</option>
                    {thirdCategoryObj.subcategories.map(lastcategory => (
                        <option value={lastcategory} key={lastcategory}>
                        {lastcategory}
                        </option>
                    ))}
                    </select>
                )}
            </div>
        </div>
    );
};
