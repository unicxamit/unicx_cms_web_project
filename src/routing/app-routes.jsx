// src/AppRoutes.js
import { Routes, Route, useParams } from "react-router-dom";
import { AuthProvider } from '../auth/Auth';
import PublicUserLayout from "../layouts/public-user-layout";
import EmployerLayout from "../layouts/employer-layout";
import CandidateLayout from "../layouts/candidate-layout";
import { base } from "../globals/route-names";
import AddCategories from "../admin/addCategories";
import AddSubCategory from "../admin/AddSubCategory";
// import SubSubCategory from "../admin/SubSubCategory";
import AddCaseStudy from "../admin/addCaseStudy";
import AddBlogs from "../admin/addBlogs";
import SubSubCategoryDetails from "../app/pannels/public-user/components/pages/SubSubCategoryDetails";
import GlobalSearchBar from "../app/pannels/public-user/components/pages/GlobalSearchBar";
import SubSubCategoryDetailsAdmin from "../app/pannels/public-user/components/pages/SubSubCategoryDetailsAdmin";
import AdminDashboard from "../unicx_cms_dashboard/AdminDashboard"
import TrademarkSearchPage from "../app/pannels/public-user/components/pages/TrademarkSearch";
// import AdminDashboard from "../admin/Dashboard";
import ProtectedRoute from "../auth/protectedRoute";
import LoginPage from "../admin/login"; // Import your LoginPage component
import FAQManagement from "../admin/addFaqs";
import Category  from "../services/category";
import Sub_category from "../services/sub_category"
import SubSubCategory  from "../services/sub_sub_category"
import ServicesDetailsPage from "../services/servicesDetailsPage"
import Blogs from "../services/blogs"
import CaseStudy from "../services/caseStudy"
import Faq from "../services/faq"
import OrderService from "../services/serviceorder"

function SubSubCategoryPageWithKey() {
  const { id } = useParams();
  return <SubSubCategoryDetails key={id} />;
}


function AppRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path={base.PUBLIC_PRE + "/*"} element={<PublicUserLayout />} />
                <Route path={base.EMPLOYER_PRE + "/*"} element={<EmployerLayout />} />
                <Route path={base.CANDIDATE_PRE + "/*"} element={<CandidateLayout />} />
                
                {/* Admin Routes Protected */}
             <Route path="/admin" element={
                    <ProtectedRoute>
                        {/* <AdminDashboard /> */}
                        <AdminDashboard/>
                    </ProtectedRoute>
                } >
                <Route path="/admin/add-category" element={
                    <ProtectedRoute>
                        {/* <AddCategories /> */}
                        <Category/>
                    </ProtectedRoute>
                } />
                <Route path="/admin/add-Subcategory" element={
                    <ProtectedRoute>
                        {/* <AddSubCategory /> */}
                        <Sub_category/>
                    </ProtectedRoute>
                } />
                <Route path="/admin/add-SubSubcategory" element={
                    <ProtectedRoute>
                        {/* <SubSubCategory /> */}
                        <SubSubCategory />
                    </ProtectedRoute>
                } />
                <Route path="/admin/subsubcategory-details/:id" element={
                    <ProtectedRoute>
                        {/* <SubSubCategoryDetailsAdmin /> */}
                        <ServicesDetailsPage/>
                    </ProtectedRoute>
                } />
                <Route path="/admin/add-caseStudy" element={
                    <ProtectedRoute>
                        {/* <AddCaseStudy /> */}
                        <CaseStudy/>
                    </ProtectedRoute>
                } />
                <Route path="/admin/add-blogs" element={
                    <ProtectedRoute>
                        {/* <AddBlogs /> */}
                        <Blogs/>
                    </ProtectedRoute>
                } />
                <Route path="/admin/add-faqs" element={
                    <ProtectedRoute>
                        {/* <FAQManagement /> */}
                        <Faq/>
                    </ProtectedRoute>
                } />
                  <Route path="/admin/service-order" element={
                    <ProtectedRoute>
                        {/* <FAQManagement /> */}
                        <OrderService/>
                    </ProtectedRoute>
                    
                } />
                  {/* <Route path="/admin/services_details/:id" element={
                    <ProtectedRoute>
                       
                        <ServiceDetailsPage/>
                    </ProtectedRoute>
                    
                } /> */}
                
                 </Route>
                {/* Public Routes */}
                {/* <Route path="/subsubcategory/:id" element={<SubSubCategoryDetails />} /> */}
                <Route path="/subsubcategory/:id" element={<SubSubCategoryPageWithKey />} />
                <Route path="/trademark-search" element={<TrademarkSearchPage />} />
                <Route path="/search" element={<GlobalSearchBar />} />
            </Routes>
        </AuthProvider>
    );
}

export default AppRoutes;




