/**
 * Uploads image files to the backend (Cloudinary) and returns the URLs.
 * Only accepts .jpg and .png files.
 *
 * @param files FileList from input element (e.target.files)
 * @returns Array of Cloudinary image URLs
 */

export const uploadImages = async (files: FileList): Promise<string[]> => {
    const validTypes = ['image/jpeg', 'image/png']; // Allow only JPG/PNG
    const uploadedUrls: string[] = [];
  
    for (const file of Array.from(files)) {
      if (!validTypes.includes(file.type)) {
        console.warn(`⛔ Unsupported file type: ${file.name} (${file.type})`);
        continue; // Skip invalid file types
      }
  
      const formData = new FormData();
      formData.append('images', file); // Must match backend multer field name
  
      try {
        const response = await fetch('http://localhost:3001/api/upload-multiple', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok && data.urls) {
          console.log(`✅ Uploaded: ${file.name}`, data.urls);
          uploadedUrls.push(...data.urls);
        } else {
          console.error(`❌ Upload failed for ${file.name}:`, data.message || 'Unknown error');
        }
      } catch (error) {
        console.error(`❌ Upload error for ${file.name}:`, error);
      }
    }
  
    return uploadedUrls;
  };
  

  