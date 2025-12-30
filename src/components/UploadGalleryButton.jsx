import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './UploadGalleryButton.css';

const UploadGalleryButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh!');
                return;
            }
            // Validate file size (max 15MB)
            if (selectedFile.size > 15 * 1024 * 1024) {
                alert('File ảnh quá lớn (Max 15MB)!');
                return;
            }

            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

            // 1. Upload to Storage
            const { data: storageData, error: storageError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (storageError) throw storageError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            // 3. Insert into Database
            const { error: dbError } = await supabase
                .from('gallery_images')
                .insert([{ image_url: publicUrl }]);

            if (dbError) throw dbError;

            alert('Upload thành công! Ảnh sẽ sớm xuất hiện trên background.');
            setIsOpen(false);
            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Có lỗi xảy ra khi upload: ' + (error.message || error.error_description || "Unknown error"));
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <button
                className="upload-gallery-btn"
                onClick={() => setIsOpen(true)}
                title="Góp ảnh background"
            >
                📷
            </button>

            {isOpen && (
                <div className="upload-modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="upload-modal" onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Góp Ảnh Kỉ Niệm</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Ảnh bạn upload sẽ được thêm vào background chạy phía sau. Hãy chọn những bức ảnh đẹp nhất nhé!
                        </p>

                        <div className="upload-input-group">
                            <label className="file-input-label">Chọn ảnh (Max 15MB)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="custom-file-input"
                            />
                        </div>

                        {preview && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className="upload-submit-btn"
                                style={{ background: '#64748b' }}
                                onClick={() => setIsOpen(false)}
                                disabled={uploading}
                            >
                                Hủy
                            </button>
                            <button
                                className="upload-submit-btn"
                                onClick={handleUpload}
                                disabled={!file || uploading}
                            >
                                {uploading ? 'Đang tải lên...' : 'Đăng ảnh'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadGalleryButton;
