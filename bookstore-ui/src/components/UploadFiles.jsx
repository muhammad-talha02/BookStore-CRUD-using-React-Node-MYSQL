import React, { useEffect } from 'react'
import { useDropzone } from "react-dropzone"
const UploadFiles = () => {

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/png": [".png", ".jpg", ".jpeg"]
        },
        maxFiles: 1,
        maxSize: 100000
    });
    useEffect(() => {
        console.log(acceptedFiles)
    }, [])
    const FileUploaded = acceptedFiles.map(file => <h5 key={file.path}>{file.name}</h5>)
    const fileRejected = fileRejections.map(({ file, errors }) => {
        return (
            <>
                <h5>{file.name}</h5>
                <ul>
                    {
                        errors.map((e, index) => <li key={index}>{e.message}</li>)
                    }
                </ul>
            </>
        )
    })

    console.log(acceptedFiles)
    return (
        <>

            <div {...getRootProps({ className: "dropzone" })} className='my-3'>
                <h5>Upload Cover Image:</h5>
                <input {...getInputProps()} />
                <p className='upload_input'><i className="fa-solid fa-cloud-arrow-up h1"></i></p>
            </div>
            <div>
                {acceptedFiles.length ? <h5 className='text-success'> Uploaded: {FileUploaded}</h5> : null}
            </div>
            <div>
                {fileRejections.length ? <h5 className='text-danger'>Rejected: {fileRejected}</h5> : null}
            </div>
        </>
    )
}

export default UploadFiles
