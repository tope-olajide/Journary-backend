/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
import cloudinary from 'cloudinary';
import db from '../db';

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
export default class ImageGallery {
  static async saveImageUrl({
    user,
    body
  }, res) {
    const userId = user.id;
    const {
      stringifiedImageUrl
    } = body;
    console.log(stringifiedImageUrl, userId);
    const parsedImageUrlArray = JSON.parse(stringifiedImageUrl);
    console.log(parsedImageUrlArray);
    const queryText = `INSERT INTO image_galleries (user_id, image_id, image_url)
    VALUES($1, $2, $3)
        returning *`;
    try {
      const savedImageUrl = parsedImageUrlArray.map(async (eachImage) => {
        await db.query(queryText, [userId, eachImage.imageId, eachImage.imageUrl]);
      });
      Promise.all(savedImageUrl).then(() => {
        console.log(parsedImageUrlArray);
        return res.status(201).json({
          success: true,
          message: 'Uploaded image Url saved successfully',
          gallery: parsedImageUrlArray
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error saving image Url'
      });
    }
  }

  static async fetchImageGallery({
    user
  }, res) {
    const userId = user.id;
    const fetchGalleriesQuery = 'SELECT * FROM image_galleries WHERE user_id=$1';
    try {
      const {
        rows
      } = await db.query(fetchGalleriesQuery, [userId]);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'No image found'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Galleries found',
        gallery: rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error Retrieving Galleries'
      });
    }
  }

  static async deleteImage({
    params,
    user
  }, res) {
    const {
      imageId
    } = params;
    const userId = user.id;
    const findImageQuery = 'SELECT * FROM image_galleries WHERE gallery_id =$1';
    const deleteQuery = 'DELETE FROM image_galleries WHERE gallery_id =$1 returning *';
    try {
      const {
        rows
      } = await db.query(findImageQuery, [imageId]);
      console.log(rows);
      if (!rows[0]) {
        return res.status(404).json({
          success: false,
          message: 'Image does not exist!'
        });
      }
      if (rows[0].user_id !== userId) {
        return res.status(401).json({
          success: false,
          message: 'You do not have the permision to delete this image!'
        });
      }
      cloudinary.v2.uploader.destroy(rows[0].image_id, (error, result) => {
        console.log(result, error);
      });
      await db.query(deleteQuery, [imageId]);
      res.status(200).json({
        success: true,
        message: 'Image Removed successfully!'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error Removing Image'
      });
    }
  }
}
