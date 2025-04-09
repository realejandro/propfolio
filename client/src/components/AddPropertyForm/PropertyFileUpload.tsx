import {
    Field,
    Input,
    Button,
    Spinner,
    Text,
  } from '@chakra-ui/react';
  import { ChangeEvent } from 'react';
  import { uploadImages } from '../../utils/cloudinary/uploadImages';
  
  interface PropertyFileUploadProps {
    uploading: boolean;
    setUploading: (val: boolean) => void;
    photos: string[];
    setPhotos: (urls: string[]) => void;
  }
  
  const PropertyFileUpload = ({
    uploading,
    setUploading,
    photos,
    setPhotos,
  }: PropertyFileUploadProps) => {
    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
  
      setUploading(true);
      try {
        const urls = await uploadImages(files);
        setPhotos([...photos, ...urls]);
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <Field.Root>
        <Field.Label>Upload Photos (JPG or PNG)</Field.Label>
  
        {/* Hidden native file input */}
        <Input
          type="file"
          accept=".jpg,.png"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          display="none"
          id="file-upload"
        />
  
        {/* Styled Chakra button triggers file input */}
        <label htmlFor="file-upload">
          <Button as="span" colorScheme="blue" size="sm" mt={2} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
        </label>
  
        {uploading && <Spinner size="sm" ml={2} />}
  
        {photos.length > 0 && (
          <Text mt={2} fontSize="sm" color="gray.600">
            {photos.length} image{photos.length > 1 ? 's' : ''} uploaded
          </Text>
        )}
      </Field.Root>
    );
  };
  
  export default PropertyFileUpload;
  