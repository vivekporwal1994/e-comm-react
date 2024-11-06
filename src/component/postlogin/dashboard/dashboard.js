import React, { useEffect, useState } from 'react'
import Header from '../../Shared/header/Header'
import Footer from '../../Shared/footer/footer'
import ProductCard from './Card'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
function Dashboard() {
    const [productArr, setProductArr] = useState([])
    useEffect(() => {
        loadApiCalls()
    }, [])

    const loadApiCalls = async () => {
        const resp = await axios.get("https://fakestoreapi.com/products")
        setProductArr(resp?.data)
    }

    const [quantities, setQuantities] = useState({});

    // Calculate total quantity
    const totalQuantity = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
    console.log(totalQuantity, "quantity")

    // Function to update quantity for a specific product
    const updateQuantity = (id, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: quantity,
        }));
    };
    return (
        <>
            <Header
                totalQuantity={totalQuantity}
            />
            <Container className='p-0'>
                <Row className='p-0 d-flex flex-wrap'>
                    {productArr && productArr.map((item) => (
                        <Col md={3} key={item.id}>
                            <ProductCard
                                image={item.image}
                                title={item.title}
                                category={item.category}
                                price={item.price}
                                quantity={quantities[item.id] || 0}
                                updateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Dashboard