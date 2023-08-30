import React, { useState } from "react";

export default function CategoryTestData() {
    const [topCategories, setTopCategories] = useState(["Electronics","Beauty","Sports","Living"]);
    const [secondCategories, setSecondCategories] = useState({
        Electronics: ["Mobiles","Televisions","Computers"],
        Beauty: ["Lips", "Eyes", "Face"],
        Sports: ["Indoor", "Outdoor"],
        Living: ["Kitchen", "Bed Room", "Living Room", "Bath Room"]
    });

    return (
        <div className="m-5">
            <h3>For frontend Admin category testing</h3>
            {topCategories.map((topCategory) => (
                <>
                    <div className="bg-secondary">{topCategory}</div>
                    <div className="bg-white">
                        {secondCategories[topCategory].map((secondCategory) => (
                            <div>{secondCategory}</div>
                        ))}
                    </div>
                </>
            ))}
        </div>
    );
}