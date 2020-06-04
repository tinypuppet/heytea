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
	martDetail
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