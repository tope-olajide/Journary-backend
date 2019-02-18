import express from 'express';
import DairyController from '../controller/dairies.controller';

const router = express.Router();

// GET welcome message
router.get('/', (req, res) => {
  res.json({
    message: 'welcome to my-diary app',
    success: true
  });
});
// Get all Entries
router.get('/entries', DairyController.listAllEntries);
// Get an Entries
router.get('/entries/:id', DairyController.getAnEntry);
// POST an Entries
router.post('/entries', DairyController.createEntry);
// PUT update an entry
router.put('/entries/:id', DairyController.updateEntry);

export default router;
