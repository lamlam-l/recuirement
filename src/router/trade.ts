import express from 'express'
import { createTrade, createTradeValidate } from '../controller/trade/createTrade'
import { readTrade, readTradeValidate } from '../controller/trade/readTrade'
import { readTrades, readTradesValidate } from '../controller/trade/readTrades'
import auth from '../middleware/authentication/auth'
const router = express.Router()

router.get('/:teamId/trade/:id', auth, readTradeValidate, readTrade)
router.get('/:teamId/trades/:walletId', auth, readTradesValidate, readTrades)
router.post('/:teamId/trade/:walletId', auth, createTradeValidate, createTrade)
router.put('/:teamId/trade/:id', auth)
router.delete('/:teamId/trade/:id', auth)
router.delete('/:teamId/trades/:walletId', auth)

export default router
