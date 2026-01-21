import { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { loadScript } from "../../../../globals/constants";
import { DropzoneComponent } from "react-dropzone-component";

function EmpCompanyProfilePage() {

    useEffect(() => {
        loadScript("js/custom.js")
    })

    var componentConfig = {
        postUrl: 'upload.php'
    };

    const [youtubeFields, setYoutubeFields] = useState(0);
    const [vimeoFields, setVimeoFields] = useState(0);

    function handleYoutubeClick() {
        setYoutubeFields(youtubeFields + 1);
    }

    function handleVimeoClick() {
        setVimeoFields(vimeoFields+1);
    }

    return (
        <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Company Profile!</h2>
                <div className="breadcrumbs"><a href="#">Home</a><a href="#">Dasboard</a><span>Company Profile!</span></div>
            </div>
            {/*Logo and Cover image*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Logo and Cover image</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <div className="dashboard-profile-pic">
                                    <div className="dashboard-profile-photo">
                                        <JobZImage src="images/jobs-company/pic1.jpg" alt="" />
                                        <div className="upload-btn-wrapper">
                                            <div id="upload-image-grid" />
                                            <button className="site-button button-sm">Upload Photo</button>
                                            <input type="file" name="myfile" id="file-uploader" accept=".jpg, .jpeg, .png" />
                                        </div>
                                    </div>
                                    <p><b>Company Logo :- </b> Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg &amp; .png</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="dashboard-cover-pic">
                                <DropzoneComponent config={componentConfig} />
                                <p><b>Background Banner Image :- </b> Max file size is 1MB, Minimum dimension: 770 x 310 And Suitable files are .jpg &amp; .png</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Basic Information*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Basic Informations</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <form>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="company_name" type="text" placeholder="Devid Smith" />
                                        <i className="fs-input-icon fa fa-user " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="company_phone" type="text" placeholder="(251) 1234-456-7890" />
                                        <i className="fs-input-icon fa fa-phone-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="company_Email" type="email" placeholder="Devid@example.com" />
                                        <i className="fs-input-icon fa fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Website</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="company_website" type="text" placeholder="https://..." />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Est. Since</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="company_since" type="text" placeholder="Since..." />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Team Size</label>
                                    <div className="ls-inputicon-box">
                                        <select className="wt-select-box selectpicker" name="team-size" data-live-search="true" title="team-size" id="city" data-bv-field="size">
                                            <option className="bs-title-option" value>5-10</option>
                                            <option value>10+</option>
                                            <option value>20+</option>
                                            <option value>50+</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-sort-numeric-up" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" rows={3} placeholder="Greetings! We are Galaxy Software Development Company." defaultValue={""} />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*Photo gallery*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Photo Gallery</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <DropzoneComponent config={componentConfig} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="text-left">
                                <button type="submit" className="site-button">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Video gallery*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Video Gallery</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Youtube</label>
                                <div className="ls-inputicon-box input_fields_youtube">
                                    <input className="form-control wt-form-control" name="mytext[]" type="text" placeholder="https://www.youtube.com/" />
                                    <i className="fs-input-icon fab fa-youtube" />
                                    {
                                        Array.from(Array(youtubeFields)).map(() => {
                                            return <div class="ls-inputicon-box">
                                                <input class="form-control wt-form-control m-tb10" name="mytext[]" type="text" placeholder="https://www.youtube.com/" />
                                                <i class="fs-input-icon fab fa-youtube"></i>
                                                <a href="#" class="remove_field">
                                                    <i class="fa fa-times"></i>
                                                </a>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="text-right m-tb10">
                                    <button className="add_field_youtube" onClick={handleYoutubeClick}>Add More Fields <i className="fa fa-plus" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Vimeo</label>
                                <div className="ls-inputicon-box input_fields_vimeo">
                                    <input className="form-control wt-form-control" name="mytext[]" type="text" placeholder="https://vimeo.com/" />
                                    <i className="fs-input-icon fab fa-vimeo-v" />
                                    {
                                        Array.from(Array(vimeoFields)).map(() => {
                                            return <div class="ls-inputicon-box">
                                                <input class="form-control m-tb10 wt-form-control" name="mytext[]" type="text" placeholder="https://vimeo.com/" />
                                                <i class="fs-input-icon fab fa-vimeo-v"></i>
                                                <a href="#" class="remove_field">
                                                    <i class="fa fa-times"></i>
                                                </a>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="text-right m-tb10">
                                    <button className="add_field_vimeo" onClick={handleVimeoClick}>Add More Fields <i className="fa fa-plus" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="custome-video-upload form-group">
                                <label>Custom Video</label>
                                <DropzoneComponent config={componentConfig} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="text-left">
                                <button type="submit" className="site-button">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Social Network*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Social Network</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <form>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Facebook</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://www.facebook.com/" />
                                        <i className="fs-input-icon fab fa-facebook-f" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Twitter</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://twitter.com/" />
                                        <i className="fs-input-icon fab fa-twitter" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>linkedin</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://in.linkedin.com/" />
                                        <i className="fs-input-icon fab fa-linkedin-in" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Whatsapp</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://www.whatsapp.com/" />
                                        <i className="fs-input-icon fab fa-whatsapp" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Instagram</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://www.instagram.com/" />
                                        <i className="fs-input-icon fab fa-instagram" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Pinterest</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://in.pinterest.com/" />
                                        <i className="fs-input-icon fab fa-pinterest-p" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Tumblr</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://www.tumblr.com/" />
                                        <i className="fs-input-icon fab fa-tumblr" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Youtube</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control wt-form-control" name="company_name" type="text" placeholder="https://www.youtube.com/" />
                                        <i className="fs-input-icon fab fa-youtube" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EmpCompanyProfilePage;