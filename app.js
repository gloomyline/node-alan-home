/*
* @Author: Alan
* @Date:   2017-08-09 10:11:09
* @Last Modified by:   Alan
* @Last Modified time: 2017-08-09 10:45:39
*/

'use strict';

const Koa = require('koa')

const app = new Koa()

const port = 3333

// x-response-time
app.use(async (ctx, next) => {
	let start = new Date()
	try{
		await next()
	}
	catch(err) {
		ctx.body = {message: err.message}
		ctx.status = err.status || 500
	}
	let ms = new Date() - start
	ctx.set('x-response-time', ms + 'ms')
})

// logger
app.use(async (ctx, next) => {
	let start = new Date()
	try{
		await next()
	}
	catch(err) {
		ctx.body = {message: err.message}
		ctx.status = err.status || 500
	}
	let ms = new Date() - start
	console.log('%s %s - %sms', ctx.method, ctx.url, ms)
})

// response
app.use(async (ctx, next) => {
	ctx.body = 'Hello Koa'
	try{
		await next()
	}
	catch(err) {
		ctx.body = {message: err.message}
		ctx.status = err.status || 500
	}
})

app.listen(port)
console.log('Server is running on port:' + port)