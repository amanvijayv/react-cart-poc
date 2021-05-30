import { useState, useEffect } from 'react';
import Category from './Category';
const Cart = (props) => {
    const [search, setSearch] = useState('');
    const [isStock, setIsStock] = useState(false);
    const [itemCategory, setCategory] = useState({
        dummy: '',
        list: []
    });
    const inputEvent = (event) => {
        setSearch((prevValue) => {
            return event.target.value;
        })
    }
    useEffect(() => {
        function getData(data) {
            console.log("useEffect of cart", data);
            console.log("Hello AMan", data);
            let categoryArray = [];
            data.forEach((element) => {
                console.log("map element", element, "itemCategory list",);
                if (categoryArray.includes(element.category)) {
                    console.log("inside if");

                } else {
                    console.log("inside else");
                    categoryArray.push(element.category);

                }
            })
            setCategory((prevValue) => {
                return {
                    ...prevValue,
                    list: categoryArray
                };
            })
            console.log("category arrya", categoryArray);
        }
        getData(props.data);
    }, []);
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setIsStock((prevValue) => {
            return value;
        });
    }
    if (props.data) {
        console.log("Cart", props.data, "itemdata", itemCategory);
        // filterData(props.data);

    }
    if (Object.keys(itemCategory.list).length === 0) {
        return (
            <h1>OOPS, something went wrong</h1>
        )
    }

    return (
        <div>
            <input type="text" name="search" placeholder="search..." onChange={inputEvent} value={search} />
            <br />
            <label>
                <input
                    name="isStock"
                    type="checkbox"
                    checked={isStock}
                    onChange={handleInputChange}
                    value={isStock} />
            Only show products in stock
        </label><br/>
            <span>Name </span><span> Price</span>
            {itemCategory.list.map((cat) => {
                return <Category data={cat} isStock={isStock} items={props.data} search={search} />
            })}
        </div>
    );
}

export default Cart;