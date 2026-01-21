// src/app/pannels/public-user/components/pages/SubSubCategoryDetails.jsx
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { getSubSubCategoryById } from '../../../../../api';
import Header1 from '../../../../common/header/header1';
import { getHeaderConfig } from '../../../../../globals/layout-config';

import LLPRegistrationPage from './LLPRegistrationPage';
import LLPRegistrationPage2 from './LLPRegistrationPage2';
import LLPRegistrationPage3 from './LLPRegistrationPage3';
import LLPRegistrationPage4 from './LLPRegistrationPage4';
import LLPRegistrationPage5 from './LLPRegistrationPage5';
import { getServiceDetailsByserviceId } from '../../../../../adminApi';


// ✅ All available templates
const templateMap = {
    llp_page1: LLPRegistrationPage,
    llp_page2: LLPRegistrationPage2,
    llp_page3: LLPRegistrationPage3,
    llp_page4: LLPRegistrationPage4,
    llp_page5: LLPRegistrationPage5,
    // Add more templates here
};

// ✅ Default templateKey
const DEFAULT_TEMPLATE_KEY = 'llp_page2';

function SubSubCategoryDetails() {
    const { id } = useParams();
    const currentPath = useLocation().pathname;
    const [details, setDetails] = useState(null);
console.log(details,"serviced dkdkfj")
    useEffect(() => {
        setDetails(null); // Reset before fetch to show loading state
          getServiceDetailsByserviceId(id)
            .then((response) => {
                if (response.service) {
                    const key = response.service.templateKey;
                    response.service.templateKey = templateMap[key] ? key : DEFAULT_TEMPLATE_KEY;

                    if (!templateMap[key]) {
                        console.warn(
                            `⚠️ Missing/invalid templateKey "${key}" for ID ${id}, using default: '${DEFAULT_TEMPLATE_KEY}'`
                        );
                    }

                    setDetails(response.service);
                } else {
                    console.error(`❌ No data returned for subsubcategory ID: ${id}`);
                }
            })
            .catch((error) => {
                console.error('🚨 Error fetching subsubcategory details:', error);
            });
    }, [id]);

    if (!details) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    const SelectedComponent = templateMap[details.templateKey];

    return (
        <>
            <Header1 _config={getHeaderConfig(currentPath)} />
            <div className="pt-16 max-w-7xl mx-auto px-4" style={{ marginTop: '7%' }}>
                {SelectedComponent ? (
                    <SelectedComponent data={details} />
                ) : (
                    <div className="text-center text-red-600">
                        <h2 className="text-xl font-semibold">
                            🚫 No template found for <code>{details.templateKey}</code>
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Please ensure this subsubcategory has a valid <code>templateKey</code>.
                        </p>
                        <pre className="text-xs text-gray-500 bg-gray-100 p-4 rounded mt-4 text-left overflow-auto max-h-96">
                            {JSON.stringify(details, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </>
    );
}

export default SubSubCategoryDetails;
