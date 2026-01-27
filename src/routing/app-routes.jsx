// // src/AppRoutes.js
// import { Routes, Route, useParams } from "react-router-dom";
// import { AuthProvider } from '../auth/Auth';
// import PublicUserLayout from "../layouts/public-user-layout";
// // import EmployerLayout from "../layouts/employer-layout";
// // import CandidateLayout from "../layouts/candidate-layout";
// import { base } from "../globals/route-names";
// // import AddCategories from "../admin/addCategories";
// // import AddSubCategory from "../admin/AddSubCategory";
// // import SubSubCategory from "../admin/SubSubCategory";
// // import AddCaseStudy from "../admin/addCaseStudy";
// // import AddBlogs from "../admin/addBlogs";
// import SubSubCategoryDetails from "../app/pannels/public-user/components/pages/SubSubCategoryDetails";
// import GlobalSearchBar from "../app/pannels/public-user/components/pages/GlobalSearchBar";
// // import SubSubCategoryDetailsAdmin from "../app/pannels/public-user/components/pages/SubSubCategoryDetailsAdmin";
// import AdminDashboard from "../unicx_cms_dashboard/AdminDashboard"
// import TrademarkSearchPage from "../app/pannels/public-user/components/pages/TrademarkSearch";
// // import AdminDashboard from "../admin/Dashboard";
// import ProtectedRoute from "../auth/protectedRoute";
// import LoginPage from "../services/login"
// // import FAQManagement from "../admin/addFaqs";
// import Category  from "../services/category";
// import Sub_category from "../services/sub_category"
// import SubSubCategory  from "../services/sub_sub_category"
// import ServicesDetailsPage from "../services/servicesDetailsPage"
// import Blogs from "../services/blogs"
// import CaseStudy from "../services/caseStudy"
// import Faq from "../services/faq"
// import OrderService from "../services/serviceorder"
// import AdminDashboardList from "../services/Dashboard";

// function SubSubCategoryPageWithKey() {
//   const { id } = useParams();
//   return <SubSubCategoryDetails key={id} />;
// }


// function AppRoutes() {
//     return (
//         <AuthProvider>
//             <Routes>
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path={base.PUBLIC_PRE + "/*"} element={<PublicUserLayout />} />
//                 {/* <Route path={base.EMPLOYER_PRE + "/*"} element={<EmployerLayout />} /> */}
//                 {/* <Route path={base.CANDIDATE_PRE + "/*"} element={<CandidateLayout />} /> */}
                
//                 {/* Admin Routes Protected */}
//              <Route path="/admin" element={
//                     <ProtectedRoute>
//                         {/* <AdminDashboard /> */}
//                         <AdminDashboard/>
//                     </ProtectedRoute>
//                 } >
//                      <Route path="/admin/" element={
//                     <ProtectedRoute>
//                         {/* <AdminDashboard /> */}
//                         <AdminDashboardList/>
//                     </ProtectedRoute>
//                 } ></Route>
//                 <Route path="/admin/add-category" element={
//                     <ProtectedRoute>
//                         {/* <AddCategories /> */}
//                         <Category/>
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/add-Subcategory" element={
//                     <ProtectedRoute>
//                         {/* <AddSubCategory /> */}
//                         <Sub_category/>
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/add-SubSubcategory" element={
//                     <ProtectedRoute>
//                         {/* <SubSubCategory /> */}
//                         <SubSubCategory />
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/subsubcategory-details/:id" element={
//                     <ProtectedRoute>
//                         {/* <SubSubCategoryDetailsAdmin /> */}
//                         <ServicesDetailsPage/>
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/add-caseStudy" element={
//                     <ProtectedRoute>
//                         {/* <AddCaseStudy /> */}
//                         <CaseStudy/>
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/add-blogs" element={
//                     <ProtectedRoute>
//                         {/* <AddBlogs /> */}
//                         <Blogs/>
//                     </ProtectedRoute>
//                 } />
//                 <Route path="/admin/add-faqs" element={
//                     <ProtectedRoute>
//                         {/* <FAQManagement /> */}
//                         <Faq/>
//                     </ProtectedRoute>
//                 } />
//                   <Route path="/admin/service-order" element={
//                     <ProtectedRoute>
//                         {/* <FAQManagement /> */}
//                         <OrderService/>
//                     </ProtectedRoute>
                    
//                 } />
//                   {/* <Route path="/admin/services_details/:id" element={
//                     <ProtectedRoute>
                       
//                         <ServiceDetailsPage/>
//                     </ProtectedRoute>
                    
//                 } /> */}
                
//                  </Route>
//                 {/* Public Routes */}
//                 {/* <Route path="/subsubcategory/:id" element={<SubSubCategoryDetails />} /> */}
//                 <Route path="/subsubcategory/:id" element={<SubSubCategoryPageWithKey />} />
//                 <Route path="/trademark-search" element={<TrademarkSearchPage />} />
//                 <Route path="/search" element={<GlobalSearchBar />} />
//             </Routes>
//         </AuthProvider>
//     );
// }

// export default AppRoutes;




// src/AppRoutes.js
import { Routes, Route, useParams } from "react-router-dom";
import { AuthProvider } from "../auth/Auth";
import PublicUserLayout from "../layouts/public-user-layout";
import { base } from "../globals/route-names";

import AdminDashboard from "../unicx_cms_dashboard/AdminDashboard";
import ProtectedRoute from "../auth/protectedRoute";
import LoginPage from "../services/login";

import Category from "../services/category";
import Sub_category from "../services/sub_category";
import SubSubCategory from "../services/sub_sub_category";
import ServicesDetailsPage from "../services/servicesDetailsPage";
import Blogs from "../services/blogs";
import CaseStudy from "../services/caseStudy";
import Faq from "../services/faq";
import OrderService from "../services/serviceorder";
import AdminDashboardList from "../services/Dashboard";

import SubSubCategoryDetails from "../app/pannels/public-user/components/pages/SubSubCategoryDetails";
import GlobalSearchBar from "../app/pannels/public-user/components/pages/GlobalSearchBar";
import TrademarkSearchPage from "../app/pannels/public-user/components/pages/TrademarkSearch";

function SubSubCategoryPageWithKey() {
  const { id } = useParams();
  return <SubSubCategoryDetails key={id} />;
}

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* PUBLIC */}
        <Route path={base.PUBLIC_PRE + "/*"} element={<PublicUserLayout />} />

        {/* ADMIN (LAYOUT ROUTE) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* 👇 DEFAULT ADMIN PAGE */}
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminDashboardList />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-Subcategory"
            element={
              <ProtectedRoute>
                <Sub_category />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-SubSubcategory"
            element={
              <ProtectedRoute>
                <SubSubCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="subsubcategory-details/:id"
            element={
              <ProtectedRoute>
                <ServicesDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-caseStudy"
            element={
              <ProtectedRoute>
                <CaseStudy />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-faqs"
            element={
              <ProtectedRoute>
                <Faq />
              </ProtectedRoute>
            }
          />

          <Route
            path="service-order"
            element={
              <ProtectedRoute>
                <OrderService />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route path="/subsubcategory/:id" element={<SubSubCategoryPageWithKey />} />
        <Route path="/trademark-search" element={<TrademarkSearchPage />} />
        <Route path="/search" element={<GlobalSearchBar />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;


