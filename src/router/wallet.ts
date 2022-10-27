import express from 'express'
import auth from '../middleware/authentication/auth'
const router = express.Router()
import { createWallet, createWalletValidate } from '../controller/wallet/createWallet'
import { deleteWallet, deleteWalletValidate } from '../controller/wallet/deleteWallet'
import { readWallet, readWalletValidate } from '../controller/wallet/readWallet'
import { readWallets } from '../controller/wallet/readWallets'
import { updateWallet, updateWalletValidate } from '../controller/wallet/updateWallet'

router.get('/:teamId/wallet/:id', auth, readWalletValidate, readWallet)
router.get('/:teamId/wallets', auth, readWallets)
router.post('/:teamId/wallet', auth, createWalletValidate, createWallet)
router.put('/:teamId/wallet/:id', auth, updateWalletValidate, updateWallet)
router.delete('/:teamId/wallet/:id', auth, deleteWalletValidate, deleteWallet)

export default router