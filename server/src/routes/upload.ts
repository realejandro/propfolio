import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const router = express.Router();

// Use memory storage (no temp files written to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload-multiple
router.post('/upload-multiple', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const uniqueFilename = uuidv4();

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'propfolio',
            public_id: uniqueFilename,
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              console.error('Cloudinary error:', error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return res.status(200).json({ urls: uploadedUrls }); // send all Cloudinary image URLs
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Something went wrong during upload' });
  }
});

export default router;

