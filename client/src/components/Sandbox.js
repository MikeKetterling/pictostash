import {useState} from "react";
function Sandbox() {
    const [formData, setFormData] = useState([]);
    //COMPONENT GOAL:
    // Create a form to accept an image as input
    // then pass that image to the cloudinary API
    // and log resulting data (the URL for the hosted image)

    function newSubmitHandler(e) {
        e.preventDefault();
        console.log("I see you trying to submit - let's check state data");
        console.log(formData);
        if (formData[0] instanceof File) {
            console.log("State data appears to contain at least one file!");
            console.log("Proceeding to create a file upload request for each file.");
            //CURRENTLY DISABLED - MULTIPLE FILE UPLOAD DISABLED
            /*
            for (const file of formData) {
                let fd = new FormData();
                fd.append('file', file);
                fd.append('upload_preset', 'unsigned_user');
                
                const postURL = 'https://api.cloudinary.com/v1_1/flatironstudent/image/upload';
                const postConfig = {
                    method: 'POST',                    
                    body: fd
                };

                fetch(postURL, postConfig)
                .then(res => res.json())
                .then(response => {
                    console.log(response);            
                    let image_url = response.secure_url;
                    console.log(image_url);
                })
            }*/
        } else {
            console.log("You're trying to trick me! There's no file here D'=");
        }
    }


    function submitHandler(e) {
        e.preventDefault();
        console.log("Image upload in Sandbox currently disabled! But I see your submit request :D");
        // CURRENTLY DISABLED - SINGLE FILE UPLOAD DISABLED 
        // didn't need a ton of test data in the cloudinary account, now that the feature works
        // uncomment the block below if you need to test the full upload features
        /*
        let fd = new FormData();
        fd.append('file', formData.file);
        fd.append('upload_preset', 'unsigned_user');        
        //posturl_template = 'https://api.cloudinary.com/v1_1/:cloud_name/:action'
        const postURL = 'https://api.cloudinary.com/v1_1/flatironstudent/image/upload';
        const postConfig = {
            method: 'POST',
            withcredentials: false,            
            body: fd
        };        
        
        fetch(postURL, postConfig)
        .then(res => res.json())
        .then(response => {
            console.log(response);            
            let image_url = response.secure_url;
            console.log(image_url);
        })
        */
    }

    function changeHandler(e) {
        //event 'e' is passed in, need to access image data within form        
        console.log(e.target);
        const form = e.target;        
        const allFiles = form.files;
        console.log(Object.values(allFiles));
        // VERBOSE debugging
        /*
        for (const val of Object.values(allFiles)) {
            console.log(val);            
        }
        */
        setFormData(Object.values(allFiles));
        /* VERBOSE debugging
        for (const file of formData) {
            console.log("You kinda did it, Davery!");
            console.log(file);
        }
        */

                
        //Note: allFiles is actually an object, not an array
        //allFiles = {0, 1, 3... n, length: n}
        //accessing allFiles[i] will index similarly to an array, and return an object that is the image data at that "index" to upload 
        
        //This updates the formData in state to hold the image data the user selected to upload
        /*
        setFormData({
            ...formData,
            file: allFiles[0]
        });
        */
        
        /* This block will allow you to iterate over all the files in
            // an upload with multiple files
        for (const file of allFiles) {
            console.log("Logging a file in allFiles collection");
            console.log(file);
        }
        */       
    }
    return (
        <div id="container">
            <p>This component is a demonstration of a basic single file upload form</p>
            <form id="uploadForm" onSubmit={submitHandler}>
                <div>
                    <input type="file" name="file" onChange={changeHandler}/>
                    <input type="submit" />
                </div>
            </form>
            <p>This component is a WIP for a muptliple file upload form</p>
            <form id="multipleUploadForm" onSubmit={newSubmitHandler} onChange={changeHandler}>
                <input type="file" name="files" onChange={changeHandler} multiple/>
                <input type="submit"/>
            </form>
                        
        </div>
    )
}

export default Sandbox;