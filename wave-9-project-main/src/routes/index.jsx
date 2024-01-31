import React from 'react';

import { Route, Routes } from 'react-router-dom';

// Import your layout and page components

import ProfilePage from '../pages/profilePage';

import HomeLayout from '../layouts/HomeLayout';

import LoginPage from '../pages/LoginPage';

import HomePage from '../pages/HomePage';

import ErrorPage from '../pages/ErrorPage';

import PropertyDetails from '../pages/PropertyDetails';

import Contacts from '../pages/Contacts';

import RegisterPage from '../pages/RegisterPage';

import Catalog from '../components/catalog/Catalog';
import AboutUs from '../pages/AboutUsPage.jsx';
import MyProperties from '../pages/MyPropertiesPage';
import PrivateLayout from '../layouts/PrivateLayout';
import CreatePage from '../pages/CreatePage';
import LoggedInGuard from '../routeGuards/LoggedInGuard';
import EditPage from '../pages/EditPage';
import LoggedInProtect from '../routeGuards/loggedInProtect';
import ForSale from '../pages/ForSale';
import ForRent from '../pages/ForRent';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                <Route path="/for-rent" element={<HomeLayout />}>
                    <Route path="/for-rent" element={<ForRent />} />

                    <Route
                        path="/for-rent/:propertyId"
                        element={<PropertyDetails />}
                    />
                    {/* <Route
                        path="/for-rent/:propertyId/edit"
                        element={<EditPage />}
                    /> */}
                </Route>

                <Route path="/for-sale" element={<HomeLayout />}>
                    <Route path="/for-sale" element={<ForSale />} />

                    <Route
                        path="/for-sale/:propertyId"
                        element={<PropertyDetails />}
                    />
                    {/* <Route
                        path="/for-sale/:propertyId/edit"
                        element={<EditPage />}
                    /> */}
                </Route>

                <Route path="/contacts" element={<HomeLayout />}>
                    <Route path="/contacts" element={<Contacts />} />
                </Route>

                <Route path="/about-us" element={<HomeLayout />}>
                    <Route path="/about-us" element={<AboutUs />} />
                </Route>

                <Route element={<LoggedInGuard />}>
                    <Route path="/create" element={<HomeLayout />}>
                        <Route path="/create" element={<CreatePage />} />
                    </Route>
                </Route>

                <Route element={<LoggedInProtect />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<LoggedInGuard />}>
                    <Route
                        path="/private/profile"
                        element={<PrivateLayout heading={`my profile`} />}
                    >
                        <Route
                            path="/private/profile"
                            element={<ProfilePage />}
                        ></Route>
                    </Route>
                    <Route
                        path="/private/my-properties"
                        element={<PrivateLayout heading={'my properties'} />}
                    >
                        <Route
                            path="/private/my-properties"
                            element={<MyProperties arrayKey={'properties'} />}
                        />
                    </Route>

                    <Route
                        path="/private/favorites"
                        element={
                            <PrivateLayout heading={'Favorite Properties'} />
                        }
                    >
                        <Route
                            path="/private/favorites"
                            element={<MyProperties arrayKey={'favorites'} />}
                        />
                    </Route>

                    <Route
                        path="/private/create"
                        element={<PrivateLayout heading={'add a property'} />}
                    >
                        <Route
                            path="/private/create"
                            element={<CreatePage />}
                        />
                    </Route>

                    <Route
                        path="/private/for-rent/:propertyId/edit"
                        element={<PrivateLayout heading={'add a property'} />}
                    >
                        <Route
                            path="/private/for-rent/:propertyId/edit"
                            element={<EditPage />}
                        />
                    </Route>

                    <Route
                        path="/private/for-sale/:propertyId/edit"
                        element={<PrivateLayout heading={'add a property'} />}
                    >
                        <Route
                            path="/private/for-sale/:propertyId/edit"
                            element={<EditPage />}
                        />
                    </Route>
                </Route>

                {/* If none of the above routes match, show the ErrorPage */}

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
