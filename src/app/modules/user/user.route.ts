import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);

router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId/orders/total-price', UserControllers.getUserTotalPrice);
router.get('/users/:userId/orders', UserControllers.getAllOrders);
router.put('/users/:userId/orders', UserControllers.updateOrder)
router.put('/users/:userIdToUpdate', UserControllers.updateSingleUser)
router.get('/users/:userId', UserControllers.getSingleUser);

router.delete('/users/:userId', UserControllers.deleteUser);



export const UserRoutes = router;
