import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'application/vnd.ms-excel') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select an Excel file (.xlsx or .xls)');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    console.log("formdata",formData);

    try {
      const response = await fetch('http://localhost:8080/api/employees/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess('File uploaded successfully!');
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-header bg-primary text-white">
            <h5 className="card-title mb-0 text-center">Excel File Upload</h5>
          </div>

          <div className="card-body">
            <div className="text-center mb-4">
              <Upload className="mb-3" size={48} color="#0d6efd" />
              <div className="upload-area p-4 mb-3 border-2 border-dashed rounded-3 bg-light">
                <label className="w-100">
                  <input
                      type="file"
                      className="form-control"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                  />
                </label>
                {file && (
                    <div className="mt-2 text-muted">
                      Selected: {file.name}
                    </div>
                )}
              </div>

              <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="btn btn-primary w-100"
              >
                {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                ) : (
                    'Upload Excel File'
                )}
              </button>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ExcelUpload;