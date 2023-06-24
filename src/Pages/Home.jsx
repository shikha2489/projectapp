

import React, { useState } from "react";
import './Home.css';
const Home = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [tableData, setTableData] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState("");
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("inputs", inputs);
        if (editClick) {
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs);
            setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: "",
                phone: ""
            });
        } else {
            setTableData([...tableData, inputs]);
            setInputs({
                name: "",
                email: "",
                phone: ""
            });
        }
    };

    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i !== index);
        setTableData(filterData);
    };
    const handleEdit = (index) => {
        const tempData = tableData[index];

        setInputs({ name: tempData.name, email: tempData.email, phone: tempData.phone });
        setEditClick(true);
        setEditIndex(index);
    };
    return (
        <div className="bg-set">
            <div className="main-div">
                <h1>Crud App</h1>
                <div className="form-set">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input name="name" value={inputs.name} onChange={handleChange} placeholder="Enter the name" required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input name="email" value={inputs.email} onChange={handleChange} placeholder="Enter the email" required />
                        </div>

                        <div>
                            <label>phone</label>
                            <input name="phone" type="phone" value={inputs.phone} onChange={handleChange} placeholder="Enter the phone number" required />
                        </div>

                        <button type="submit" className="btn-set">
                            {editClick ? "update" : "Add"}
                        </button>
                    </form>
                </div>
            </div>
            <br></br>
            <div>
                <table className="row-set">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {tableData.map((item, i) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(i)}
                                        className="mr-3 text-yellow-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(i)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Home;