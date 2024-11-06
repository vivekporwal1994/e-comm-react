// SignupForm.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './signup.css'; // Ensure you have appropriate CSS for styling

const Signup = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  
  const [error, setError] = useState('');

  // Watch selected country and state
  const selectedCountry = watch('country');
  const selectedState = watch('state');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    } else {
      setStates([]);
      setValue('state', '');
      setCities([]);
      setValue('city', '');
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
    } else {
      setCities([]);
      setValue('city', '');
    }
  }, [selectedState, selectedCountry, setValue]);

  const fetchCountries = async () => {
    setLoadingCountries(true);
    try {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
      if (response.data.error) {
        setError('Error fetching countries');
      } else {
        const countryNames = response.data.data.map(country => country.name);
        setCountries(countryNames);
      }
    } catch (err) {
      setError('Error fetching countries');
      console.error(err);
    }
    setLoadingCountries(false);
  };

  const fetchStates = async (country) => {
    setLoadingStates(true);
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
        country
      });
      if (response.data.error) {
        setError('Error fetching states');
        setStates([]);
      } else {
        const stateNames = response.data.data.states.map(state => state.name);
        setStates(stateNames);
      }
    } catch (err) {
      setError('Error fetching states');
      console.error(err);
      setStates([]);
    }
    setLoadingStates(false);
  };

  const fetchCities = async (country, state) => {
    setLoadingCities(true);
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country,
        state
      });
      if (response.data.error) {
        setError('Error fetching cities');
        setCities([]);
      } else {
        setCities(response.data.data);
      }
    } catch (err) {
      setError('Error fetching cities');
      console.error(err);
      setCities([]);
    }
    setLoadingCities(false);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Radio buttons for Individual/Enterprises/Government */}
      <Row className="mb-2 p-0 m-0">
        <Form.Group as={Col} controlId="formGridType">
          <Form.Label className="label-style">Individual/Enterprises/Government</Form.Label>
          <Row>
            <Col md={4} className="p-0">
              <Form.Check
                type="radio"
                label="Individual"
                name="userType"
                id="individual"
                {...register('userType', { required: 'Please select your type' })}
              />
            </Col>
            <Col md={4} className="p-0">
              <Form.Check
                type="radio"
                label="Enterprises"
                name="userType"
                id="enterprises"
                {...register('userType', { required: 'Please select your type' })}
              />
            </Col>
            <Col md={4} className="p-0">
              <Form.Check
                type="radio"
                label="Government"
                name="userType"
                id="government"
                {...register('userType', { required: 'Please select your type' })}
              />
            </Col>
          </Row>
          {errors.userType && <Form.Text className="text-danger">{errors.userType.message}</Form.Text>}
        </Form.Group>
      </Row>

      {/* Full Name */}
      <Row>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2" controlId="formSignupName">
            <Form.Label className="label-style">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First name"
              className="border-radius"
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && <Form.Text className="text-danger">{errors.fullName.message}</Form.Text>}
          </Form.Group>
        </Col>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2" controlId="formSignupLastName">
            <Form.Label className="label-style">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last name"
              className="border-radius"
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      {/* Email */}
      <Form.Group className="mb-2" controlId="formSignupEmail">
        <Form.Label className="label-style">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          className={`border-radius ${errors.email ? 'is-invalid' : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Please enter a valid email',
            },
          })}
        />
        {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
      </Form.Group>

      {/* Address */}
      <Form.Group className="mb-2" controlId="formSignupAddress">
        <Form.Label className="label-style">Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          className={`border-radius ${errors.address ? 'is-invalid' : ''}`}
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <Form.Text className="text-danger">{errors.address.message}</Form.Text>}
      </Form.Group>

      {/* Country, State, City, Pincode */}
      <Row className="mb-2">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label className="label-style">Country</Form.Label>
            <Form.Select
              className={`border-radius ${errors.country ? 'is-invalid' : ''}`}
              {...register('country', { required: 'Please select a country' })}
            >
              <option value="">Choose...</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </Form.Select>
          {errors.country && <Form.Text className="text-danger">{errors.country.message}</Form.Text>}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label className="label-style">State</Form.Label>
            <Form.Select
              className={`border-radius ${errors.state ? 'is-invalid' : ''}`}
              {...register('state', { required: 'Please select a state' })}
              disabled={!selectedCountry || states.length === 0}
            >
              <option value="">Choose...</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </Form.Select>
          {errors.state && <Form.Text className="text-danger">{errors.state.message}</Form.Text>}
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label className="label-style">City</Form.Label>
            <Form.Select
              className={`border-radius ${errors.city ? 'is-invalid' : ''}`}
              {...register('city', { required: 'Please select a city' })}
              disabled={!selectedState || cities.length === 0}
            >
              <option value="">Choose...</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Form.Select>
          {errors.city && <Form.Text className="text-danger">{errors.city.message}</Form.Text>}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPincode">
          <Form.Label className="label-style">Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pincode"
            className={`border-radius ${errors.pincode ? 'is-invalid' : ''}`}
            {...register('pincode', {
              required: 'Pincode is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Please enter a valid 6-digit pincode',
              },
            })}
          />
          {errors.pincode && <Form.Text className="text-danger">{errors.pincode.message}</Form.Text>}
        </Form.Group>
      </Row>

      {/* Mobile Number */}
      <Row className="align-items-center">
        <Col>
          <Form.Label className="label-style">Mobile Number</Form.Label>
          <InputGroup>
            <Col xs={2} className="p-0">
              <Form.Select
                className={`border-radius ${errors.mobileCode ? 'is-invalid' : ''}`}
                {...register('mobileCode', { required: 'Please select a country code' })}
              >
                <option value="">Code</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+81">+81 (Japan)</option>
              </Form.Select>
              {errors.mobileCode && <Form.Text className="text-danger">{errors.mobileCode.message}</Form.Text>}
            </Col>

            <Col xs={10} className="p-0">
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                className={`border-radius ${errors.mobile ? 'is-invalid' : ''}`}
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit mobile number',
                  },
                })}
              />
              {errors.mobile && <Form.Text className="text-danger">{errors.mobile.message}</Form.Text>}
            </Col>
          </InputGroup>
        </Col>
      </Row>

      {/* Fax and Phone */}
      <Row>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2" controlId="formSignupFax">
            <Form.Label className="label-style">Fax</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Fax number"
              className={`border-radius ${errors.fax ? 'is-invalid' : ''}`}
              {...register('fax', {
                required: 'Fax number is required',
                pattern: {
                  value: /^[0-9]{6,}$/,
                  message: 'Please enter a valid fax number',
                },
              })}
            />
            {errors.fax && <Form.Text className="text-danger">{errors.fax.message}</Form.Text>}
          </Form.Group>
        </Col>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2 pl-2" controlId="formSignupPhone">
            <Form.Label className="label-style">Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone number"
              className={`border-radius ${errors.phone ? 'is-invalid' : ''}`}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              })}
            />
            {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      {/* Password and Confirm Password */}
      <Row>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2" controlId="formSignupPassword">
            <Form.Label className="label-style">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              className={`border-radius ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
                },
              })}
            />
            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
          </Form.Group>
        </Col>
        <Col md={6} className="p-0">
          <Form.Group className="mb-2" controlId="formSignupConfirmPassword">
            <Form.Label className="label-style">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              className={`border-radius ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      {/* Submit Button */}
      <Button className="btn-block w-100 border-radius button-active mt-2" type="submit">
        Signup
      </Button>
    </Form>
  );
};

export default Signup;
