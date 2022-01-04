import {useState} from "react";
function Sandbox() {
    const [formData, setFormData] = useState({
        file: '',
        upload_preset: 'unsigned_user'
    })
    //COMPONENT GOAL:
    // Create a form to accept an image as input
    // then pass that image to the cloudinary API
    // and log resulting data (the URL for the hosted image)

    function submitHandler(e) {
        e.preventDefault();
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
    }

    function changeHandler(e) {
        //event 'e' is passed in, need to access image data within form
        console.log(e.currentTarget);
        const form = e.currentTarget;        
        const allFiles = form.files;
        //Note: allFiles is actually an object, not an array
        //allFiles = {0, 1, 3... n, length: n}
        //accessing allFiles[i] will index similarly to an array, and return an object that is the image data at that "index" to upload 
        
        //This updates the formData in state to hold the image data the user selected to upload
        setFormData({
            ...formData,
            file: allFiles[0]
        });        
        
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
            <div>This component still a WIP</div>
            <form id="uploadForm" onSubmit={submitHandler}>
                <p>
                    <input onChange={changeHandler} type="file" name="file" value={formData.img}/>
                    <input type="submit" />
                </p>
            </form>            
        </div>
    )
}

export default Sandbox;