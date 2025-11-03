import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all projects' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get project ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create new project' });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update project ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete project ${req.params.id}` });
});

export default router;
