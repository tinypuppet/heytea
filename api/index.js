import categories from './categories.js'
import orders from './orders.js'
import storeOrders from './storeOrders.js'
import boardcast from './boardcast.js'
import mart from './mart.js'
import productList from './productList.js'
import notices from './notices.js'
import productDetail from './productDetail.js'
import scores from './scores.js'
import martDetail from './martDetail.js'
import hotSearch from './hotSearch.js'
import historySearch from './historySearch.js'
import orderDetail from './orderDetail.js'
import giftCards from './giftCards.js'

const json = {
	categories,
	orders,
	storeOrders,
	boardcast,
	mart,
	productList,
	notices,
	productDetail,
	scores,
	martDetail,
	hotSearch,
	historySearch,
	orderDetail,
	giftCards
}

export default (name, loading = true) => {
	if(loading) {
		uni.showLoading()
	}
	
	return new Promise(resolve => {
		setTimeout(() => {
			uni.hideLoading()
			resolve(json[name])
		}, 500)
	})
}